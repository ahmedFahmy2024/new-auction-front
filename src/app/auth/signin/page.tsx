"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "123456") {
      login();
      router.push("/");
      toast.success("تم تسجيل الدخول بنجاح");
    } else {
      toast.error("البيانات غير صحيحة");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md rounded-lg bg-white shadow-lg">
        <CardHeader className="border-b p-4">
          <CardTitle className="text-center text-xl font-bold text-gray-800">
            تسجيل الدخول
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                البريد الإلكترونى
              </Label>
              <div className="relative mt-1">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="أدخل البريد الإلكترونى..."
                  className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail
                  className="absolute left-2 top-2.5 text-gray-400"
                  size={18}
                />
              </div>
            </div>

            <div className="mb-4">
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                كلمة المرور
              </Label>
              <div className="relative mt-1">
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="أدخل كلمة المرور..."
                  className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock
                  className="absolute left-2 top-2.5 text-gray-400"
                  size={18}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="flex w-full items-center justify-center space-x-2 rounded-md bg-blue-500 px-4 py-2 font-medium text-white"
            >
              <span>تسجيل الدخول</span>
              <Lock size={18} />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
