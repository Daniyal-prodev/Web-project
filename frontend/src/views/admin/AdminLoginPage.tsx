import { useState } from "react";
import { apiAuthPost } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await apiAuthPost<{access_token:string}>("/auth/login", { email, password });
    localStorage.setItem("admin_token", res.access_token);
    navigate("/secret-admin");
  };
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <Input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <Button type="submit" className="w-full">Sign in</Button>
      </form>
    </div>
  )
}
