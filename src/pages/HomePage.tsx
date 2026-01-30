import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, FileText, Zap, Rocket, DollarSign } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-yellow-500/50 transition-all">
                <FileText className="w-5 h-5 text-slate-900" />
              </div>
              <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">Cavario.ai</span>
            </div>
            <div className="flex gap-2 sm:gap-4">
              <Link to="/about">
                <Button variant="ghost" className="text-slate-700 hover:bg-slate-100 transition-all">
                  About
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="ghost" className="text-slate-700 hover:bg-slate-100 transition-all">
                  How It Works
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="ghost" className="text-slate-700 hover:bg-slate-100 transition-all">
                  Pricing
                </Button>
              </Link>
              <Link to="/signin">
                <Button variant="outline" className="border-slate-300 text-slate-900 hover:bg-slate-100 transition-all">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 animate-fade-in">
            <Sparkles className="w-4 h-4 text-yellow-600 animate-pulse" />
            <span className="text-sm text-yellow-700">AI-Powered Resume Building</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight animate-slide-up text-slate-900">
            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">Perfect Resume</span> in Minutes
          </h1>
          
          <p className="text-xl text-slate-700 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Let AI help you create a professional, ATS-optimized resume that lands interviews. Choose your path: AI guidance, manual creation, or instant generation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Link to="/signin">
              <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-slate-900 font-semibold gap-2 w-full sm:w-auto shadow-lg hover:shadow-xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button size="lg" variant="outline" className="border-slate-400 text-slate-900 hover:bg-slate-200 w-full sm:w-auto transition-all duration-300">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="group p-6 rounded-xl bg-gradient-to-br from-white/80 to-slate-50/80 border border-slate-200 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-300/20">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center mb-4 group-hover:animate-glow-pulse">
                <Zap className="w-6 h-6 text-slate-900" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-slate-900">AI Chat Builder</h3>
              <p className="text-slate-600">Chat with our AI assistant to build your resume step by step with intelligent suggestions.</p>
            </div>

            <div className="group p-6 rounded-xl bg-gradient-to-br from-white/80 to-slate-50/80 border border-slate-200 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-300/20">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:animate-glow-pulse">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-slate-900">Manual Builder</h3>
              <p className="text-slate-600">Full control over every aspect. Create your resume exactly how you want it.</p>
            </div>

            <div className="group p-6 rounded-xl bg-gradient-to-br from-white/80 to-slate-50/80 border border-slate-200 hover:border-purple-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-300/20">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:animate-glow-pulse">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-slate-900">Quick Generate</h3>
              <p className="text-slate-600">Create a professional resume instantly from your basic information.</p>
            </div>
          </div>

          {/* Pricing Preview Card */}
          <div className="mt-20 p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-300 shadow-2xl max-w-2xl mx-auto animate-scale-in">
            <div className="flex items-center gap-3 mb-6 justify-center">
              <DollarSign className="w-6 h-6 text-yellow-500" />
              <h3 className="text-2xl font-bold text-slate-900">Affordable Pricing</h3>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-100 p-4 rounded-lg border border-slate-300">
                <p className="text-slate-600 text-sm mb-2">Single Resume</p>
                <p className="text-3xl font-bold text-yellow-600">₹99</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-4 rounded-lg border border-yellow-300">
                <p className="text-slate-700 text-sm mb-2">Resume Bundle</p>
                <p className="text-3xl font-bold text-orange-600">₹499</p>
                <p className="text-xs text-yellow-700 mt-1">10 Resumes</p>
              </div>
            </div>
            <Link to="/pricing" className="w-full block">
              <Button variant="outline" className="w-full border-slate-400 text-slate-900 hover:bg-slate-200">
                View All Plans
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
