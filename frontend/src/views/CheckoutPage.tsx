import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CheckoutPage(){
  const navigate = useNavigate();
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <p className="text-slate-600 mb-6">Proceed to payment. Payoneer integration will be connected here once credentials are provided.</p>
      <Button onClick={()=> navigate("/success/demo-order")}>Simulate Success</Button>
    </div>
  )
}
