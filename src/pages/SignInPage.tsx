import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function SignInPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-slate-900 flex flex-col">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                <span className="text-slate-900 font-bold text-sm">R</span>
              </div>
              <span className="font-bold text-lg text-slate-900">Cavario.ai</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md">
          <Link to="/">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-900 gap-2 mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-slate-900">Welcome Back</h1>
            <p className="text-slate-700">Sign in to your Cavario.ai account</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-slate-900 mb-2 block font-semibold">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 pl-10 focus:bg-white focus:border-yellow-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-900 mb-2 block font-semibold">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 pl-10 focus:bg-white focus:border-yellow-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer hover:text-slate-900">
                <input type="checkbox" className="w-4 h-4 rounded bg-slate-100 border-slate-300" />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => toast.info("Forgot password? Contact support or use your account recovery option.")}
                className="text-yellow-600 hover:text-orange-600 font-semibold"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-slate-900 font-semibold h-11 transition-all duration-300"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-100 text-slate-600">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              className="border-slate-300 text-slate-900 hover:bg-slate-100"
              onClick={() => toast.info("Google sign-in coming soon.")}
            >
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-slate-300 text-slate-900 hover:bg-slate-100"
              onClick={() => toast.info("GitHub sign-in coming soon.")}
            >
              GitHub
            </Button>
          </div>

          <p className="mt-8 text-center text-slate-700">
            Don't have an account?{" "}
            <Link to="/signup" className="text-yellow-600 hover:text-orange-600 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
