from pydantic import BaseModel, HttpUrl, Field
from typing import Optional, List
from datetime import datetime

class ProductBase(BaseModel):
    title: str
    author: str
    description: str
    price_cents: int = Field(ge=0)
    categories: List[str] = []
    age_group: Optional[str] = None
    cover_image_url: Optional[HttpUrl] = None
    downloadable_asset_id: Optional[str] = None
    visible: bool = True
    inventory: Optional[int] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    description: Optional[str] = None
    price_cents: Optional[int] = Field(default=None, ge=0)
    categories: Optional[List[str]] = None
    age_group: Optional[str] = None
    cover_image_url: Optional[HttpUrl] = None
    downloadable_asset_id: Optional[str] = None
    visible: Optional[bool] = None
    inventory: Optional[int] = None

class Product(ProductBase):
    id: str
    created_at: datetime
    updated_at: datetime

class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class CartItem(BaseModel):
    product_id: str
    quantity: int = Field(ge=1)

class OrderCreate(BaseModel):
    items: List[CartItem]

class Order(BaseModel):
    id: str
    items: List[CartItem]
    total_cents: int
    status: str
    created_at: datetime
    download_tokens: List[str] = []

class PayoneerWebhook(BaseModel):
    event: str
    transaction_id: str
    amount_cents: int
    order_id: Optional[str] = None
    signature: Optional[str] = None
