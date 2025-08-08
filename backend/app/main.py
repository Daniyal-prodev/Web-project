from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import status
from typing import Dict, List
from datetime import datetime
import uuid
from .schemas import Product, ProductCreate, ProductUpdate, LoginRequest, LoginResponse, OrderCreate, Order, PayoneerWebhook
from .auth import authenticate, require_admin

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_products: Dict[str, Product] = {}
_orders: Dict[str, Order] = {}

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

@app.post("/auth/login", response_model=LoginResponse)
def login(payload: LoginRequest):
    token = authenticate(payload.email, payload.password)
    return LoginResponse(access_token=token)

@app.get("/products", response_model=List[Product])
def list_products(visible_only: bool = True):
    products = list(_products.values())
    if visible_only:
        products = [p for p in products if p.visible]
    return products

@app.get("/products/{product_id}", response_model=Product)
def get_product(product_id: str):
    if product_id not in _products:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    prod = _products[product_id]
    if not prod.visible:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not available")
    return prod

@app.post("/admin/products", response_model=Product)
def create_product(payload: ProductCreate, _: bool = Depends(require_admin)):
    now = datetime.utcnow()
    pid = str(uuid.uuid4())
    prod = Product(id=pid, created_at=now, updated_at=now, **payload.model_dump())
    _products[pid] = prod
    return prod

@app.put("/admin/products/{product_id}", response_model=Product)
def update_product(product_id: str, payload: ProductUpdate, _: bool = Depends(require_admin)):
    if product_id not in _products:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    existing = _products[product_id]
    data = existing.model_dump()
    for k, v in payload.model_dump(exclude_unset=True).items():
        data[k] = v
    data["updated_at"] = datetime.utcnow()
    updated = Product(**data)
    _products[product_id] = updated
    return updated

@app.delete("/admin/products/{product_id}")
def delete_product(product_id: str, _: bool = Depends(require_admin)):
    if product_id not in _products:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    del _products[product_id]
    return {"ok": True}

@app.post("/orders", response_model=Order)
def create_order(payload: OrderCreate):
    total = 0
    for item in payload.items:
        if item.product_id not in _products:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid product in cart")
        prod = _products[item.product_id]
        if not prod.visible:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Product not available")
        total += prod.price_cents * item.quantity
    oid = str(uuid.uuid4())
    order = Order(
        id=oid,
        items=payload.items,
        total_cents=total,
        status="pending",
        created_at=datetime.utcnow(),
        download_tokens=[],
    )
    _orders[oid] = order
    return order

@app.post("/webhooks/payoneer")
def payoneer_webhook(payload: PayoneerWebhook):
    oid = payload.order_id
    if not oid or oid not in _orders:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unknown order")
    order = _orders[oid]
    order.status = "paid"
    order.download_tokens = [str(uuid.uuid4()) for _ in order.items]
    _orders[oid] = order
    return {"ok": True}

@app.get("/orders/{order_id}", response_model=Order)
def get_order(order_id: str):
    if order_id not in _orders:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return _orders[order_id]
