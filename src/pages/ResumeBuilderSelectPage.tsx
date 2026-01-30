import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageCircle, FileText, Zap, ArrowRight } from "lucide-react";

export default function ResumeBuilderSelectPage() {
  const builders = [
    {
      id: "ai-chat",
      title: "AI Chat Builder",
      description: "Have a conversation with our AI assistant who guides you through building your resume step by step.",
      icon: MessageCircle,
      color: "from-blue-500 to-blue-600",
      features: [
        "Interactive AI guidance",
        "Smart suggestions",
        "Real-time feedback",
        "Perfect for detailed help"
      ],
      route: "/pricing?from=ai-chat"
    },
    {
      id: "manual",
      title: "Manual Builder",
      description: "Take full control and build your resume manually. Perfect if you know exactly what you want.",
      icon: FileText,
      color: "from-purple-500 to-purple-600",
      features: [
        "Complete control",
        "Flexible formatting",
        "Custom sections",
        "Professional templates"
      ],
      route: "/resumes"
    },
    {
      id: "quick-generate",
      title: "Quick Generate",
      description: "Answer a few questions and we'll instantly create a professional resume for you.",
      icon: Zap,
      color: "from-green-500 to-green-600",
      features: [
        "Fastest option",
        "Basic information only",
        "Pre-optimized content",
        "Instant results"
      ],
      route: "/chat"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-900">Choose Your Path</h1>
          <p className="text-xl text-slate-700">
            Select how you'd like to build your resume
          </p>
        </div>

        {/* Builder Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {builders.map((builder) => {
            const Icon = builder.icon;
            return (
              <div
                key={builder.id}
                className="group relative rounded-xl bg-white border border-slate-200 overflow-hidden hover:border-slate-300 transition-all hover:shadow-lg hover:shadow-slate-300/50"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${builder.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>

                <div className="relative p-8 flex flex-col h-full">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${builder.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-2xl font-bold mb-3 text-slate-900">{builder.title}</h3>
                  <p className="text-slate-700 mb-8 flex-1">{builder.description}</p>

                  {/* Features */}
                  <div className="space-y-2 mb-8">
                    {builder.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <Link to={builder.route}>
                    <Button
                      size="lg"
                      className={`w-full bg-gradient-to-r ${builder.color} hover:shadow-lg hover:shadow-${builder.color.split('-')[1]}-500/50 text-white font-semibold gap-2 group/btn`}
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 text-center">
          <p className="text-slate-300 mb-4">
            Not sure which one to choose? All methods create ATS-optimized, professional resumes.
          </p>
          <p className="text-sm text-slate-400">
            You can always switch between methods or create multiple resumes using different approaches.
          </p>
        </div>
      </div>
    </div>
  );
}
