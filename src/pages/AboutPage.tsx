import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
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

          <h1 className="text-4xl font-bold mb-6 text-slate-900">About ResumeAI</h1>

          <div className="max-w-none mb-12">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              ResumeAI is a modern, AI-powered resume builder designed to help job seekers create compelling, ATS-optimized resumes that actually get noticed by recruiters and hiring managers.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-900">Our Mission</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              We believe everyone deserves a professional resume that showcases their unique skills and achievements. Our mission is to democratize resume building by providing intelligent tools that make the process simple, fast, and effective.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">Why ResumeAI?</h2>
            <div className="space-y-6 my-6">
              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="font-semibold text-lg mb-2">Intelligent AI Guidance</h3>
                <p className="text-slate-300">Our AI analyzes industry best practices and provides smart suggestions to improve your resume's impact.</p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="font-semibold text-lg mb-2">ATS-Optimized</h3>
                <p className="text-slate-300">Every resume is automatically optimized to pass Applicant Tracking Systems, ensuring your application gets reviewed by humans.</p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="font-semibold text-lg mb-2">Flexible Building Options</h3>
                <p className="text-slate-300">Choose the AI chat builder for guidance, manual editor for full control, or quick generation for instant results.</p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="font-semibold text-lg mb-2">Professional Templates</h3>
                <p className="text-slate-300">Select from beautifully designed, modern resume templates that impress at first glance.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-10 mb-4">Our Story</h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Founded by career professionals and AI enthusiasts, ResumeAI was born from frustration with outdated resume builders. We saw job seekers struggling with formatting, content optimization, and the overall resume creation process. We set out to build something better—a modern tool that combines human expertise with artificial intelligence.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">Key Features</h2>
            <ul className="space-y-3 my-6">
              <li className="flex gap-3">
                <span className="text-yellow-400 font-bold">•</span>
                <span className="text-slate-300">AI-powered chat assistant for personalized guidance</span>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-400 font-bold">•</span>
                <span className="text-slate-300">Real-time preview and live editing</span>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-400 font-bold">•</span>
                <span className="text-slate-300">ATS-optimized templates and formats</span>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-400 font-bold">•</span>
                <span className="text-slate-300">Multiple export formats (PDF, DOCX)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-400 font-bold">•</span>
                <span className="text-slate-300">Content suggestions and optimization tips</span>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-400 font-bold">•</span>
                <span className="text-slate-300">Unlimited resume storage and management</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-center">
            <p className="text-slate-300 mb-6">
              Ready to build your professional resume and take your career to the next level?
            </p>
            <Link to="/signin">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
