import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Lock, User, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Sign up
    signup({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "+91 98765 43210",
      location: formData.location || "India",
      bio: "Resume Builder User",
    });

    navigate("/dashboard");
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
              <span className="font-bold text-lg text-slate-900">ResumeAI</span>
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
            <h1 className="text-3xl font-bold mb-2 text-slate-900">Create Account</h1>
            <p className="text-slate-700">Join ResumeAI and start building your professional resume</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5 bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="name" className="text-slate-900 mb-2 block font-semibold">
                Full Name *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 pl-10 focus:bg-white focus:border-yellow-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-slate-900 mb-2 block font-semibold">
                Email Address *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 pl-10 focus:bg-white focus:border-yellow-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-900 mb-2 block font-semibold">
                Password *
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 pl-10 focus:bg-white focus:border-yellow-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-slate-900 mb-2 block font-semibold">
                Confirm Password *
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 pl-10 focus:bg-white focus:border-yellow-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="text-slate-900 mb-2 block font-semibold">
                Phone Number (Optional)
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 pl-10 focus:bg-white focus:border-yellow-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location" className="text-slate-900 mb-2 block font-semibold">
                Location (Optional)
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <Input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="City, Country"
                  value={formData.location}
                  onChange={handleChange}
                  className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 pl-10 focus:bg-white focus:border-yellow-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-slate-900 font-semibold h-11 transition-all duration-300"
            >
              Create Account
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
              onClick={() => toast.info("Google sign-up coming soon.")}
            >
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-slate-300 text-slate-900 hover:bg-slate-100"
              onClick={() => toast.info("GitHub sign-up coming soon.")}
            >
              GitHub
            </Button>
          </div>

          <p className="mt-8 text-center text-slate-700">
            Already have an account?{" "}
            <Link to="/signin" className="text-yellow-600 hover:text-orange-600 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
