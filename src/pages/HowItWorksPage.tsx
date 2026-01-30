import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: "Choose Your Path",
      description: "Select between AI-guided chat, manual builder, or quick generation based on your preference."
    },
    {
      number: 2,
      title: "Build Your Resume",
      description: "Add your experience, education, skills, and achievements. AI suggestions help optimize content."
    },
    {
      number: 3,
      title: "Customize & Perfect",
      description: "Fine-tune formatting, colors, and layout. Preview your resume in real-time."
    },
    {
      number: 4,
      title: "Download & Apply",
      description: "Export as PDF or use directly for applications. Your resume is ATS-optimized by default."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-slate-900">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center">
                <span className="text-slate-900 font-bold">R</span>
              </div>
              <span className="font-bold text-lg text-slate-900">ResumeAI</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-900 gap-2 mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>

          <h1 className="text-4xl font-bold mb-4 text-slate-900">How It Works</h1>
          <p className="text-xl text-slate-700 mb-16">
            Our simple, 4-step process helps you create a professional resume in minutes.
          </p>

          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 text-slate-900 font-bold text-lg">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-slate-300 text-lg">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-12">Why Choose ResumeAI?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">ATS-Optimized</h3>
                  <p className="text-slate-400">Your resume passes applicant tracking systems to reach hiring managers.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">AI-Powered Suggestions</h3>
                  <p className="text-slate-400">Get intelligent recommendations to improve your content and impact.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Multiple Paths</h3>
                  <p className="text-slate-400">Choose AI guidance, manual creation, or instant generation - whatever works for you.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Professional Templates</h3>
                  <p className="text-slate-400">Choose from industry-standard designs that impress recruiters.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <Link to="/signin">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
