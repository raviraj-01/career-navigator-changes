import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Check, Zap } from "lucide-react";
import { useState } from "react";

export default function PricingPage() {
  const [searchParams] = useSearchParams();
  const fromAiChat = searchParams.get("from") === "ai-chat";
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: "single",
      name: "Single Resume",
      price: 99,
      duration: "One-time",
      resumes: 1,
      features: [
        "1 Professional Resume",
        "AI-powered suggestions",
        "Download as PDF & DOCX",
        "Real-time preview",
        "ATS-optimized formatting",
        "5 templates",
      ],
      popular: false,
      buttonText: "Get Started",
    },
    {
      id: "bundle",
      name: "Resume Bundle",
      price: 499,
      duration: "One-time",
      resumes: 10,
      features: [
        "10 Professional Resumes",
        "AI-powered suggestions",
        "Download as PDF & DOCX",
        "Real-time preview",
        "ATS-optimized formatting",
        "All templates",
        "Priority support",
        "Unlimited revisions",
      ],
      popular: true,
      buttonText: "Most Popular",
      savings: "Save 50%",
    },
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
              <span className="font-bold text-lg text-slate-900">Cavario.ai</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Link to="/">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-900 gap-2 mb-12">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Choose the plan that works best for you. All plans include AI-powered features and professional templates.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 lg:gap-12">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl overflow-hidden transition-all duration-500 transform hover:scale-105 ${
                  plan.popular
                    ? "md:col-span-2 lg:col-span-1 lg:scale-105 shadow-2xl shadow-yellow-500/20 border-2 border-yellow-500/50 bg-gradient-to-br from-white via-blue-50 to-white"
                    : "border border-slate-200 bg-white/80 hover:border-slate-300"
                }`}
              >
                {/* Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100/5 to-transparent animate-shimmer"></div>

                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-slate-900 px-6 py-2 font-bold text-sm rounded-bl-2xl">
                    {plan.savings}
                  </div>
                )}

                <div className="relative p-8 sm:p-10">
                  {/* Plan Name */}
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-slate-900">{plan.name}</h3>
                  <p className="text-slate-500 mb-6">{plan.duration}</p>

                  {/* Price */}
                  <div className="mb-8">
                    <span className="text-5xl sm:text-6xl font-bold text-yellow-500">₹{plan.price}</span>
                    <span className="text-slate-500 ml-2">({plan.resumes} resume{plan.resumes > 1 ? "s" : ""})</span>
                  </div>

                  {/* CTA Button - use explicit styles so both plans are visible on light cards */}
                  <Button
                    onClick={() => setSelectedPlan(plan.id)}
                    variant={plan.popular ? "default" : "secondary"}
                    className={`w-full mb-8 h-12 font-semibold text-lg transition-all duration-300 border-0 ${
                      plan.popular
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-slate-900 shadow-lg hover:shadow-xl"
                        : "!bg-slate-700 !text-white hover:!bg-gradient-to-r hover:!from-yellow-600 hover:!to-orange-600 hover:!text-slate-900 hover:!shadow-xl"
                    }`}
                  >
                    {selectedPlan === plan.id ? "Processing..." : plan.buttonText}
                  </Button>

                  {/* Features List */}
                  <div className="space-y-4">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Modal / Download Section */}
          {selectedPlan && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 max-w-md w-full border border-slate-300 shadow-2xl animate-scale-in">
                <h3 className="text-2xl font-bold mb-6 text-slate-900">Complete Your Payment</h3>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between py-3 border-b border-slate-200">
                    <span className="text-slate-600">Plan</span>
                    <span className="font-semibold text-slate-900">
                      {selectedPlan === "single" ? "Single Resume" : "Resume Bundle"}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-slate-200">
                    <span className="text-slate-600">Resumes</span>
                    <span className="font-semibold text-slate-900">{selectedPlan === "single" ? "1" : "10"}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-slate-600">Total Amount</span>
                    <span className="text-2xl font-bold text-yellow-400">
                      ₹{selectedPlan === "single" ? "99" : "499"}
                    </span>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-3 mb-8">
                  <label className="flex items-center p-3 border border-slate-700 rounded-lg cursor-pointer hover:bg-slate-700/50 transition">
                    <input type="radio" name="payment" defaultChecked className="w-4 h-4" />
                    <span className="ml-3">UPI / Google Pay</span>
                  </label>
                  <label className="flex items-center p-3 border border-slate-700 rounded-lg cursor-pointer hover:bg-slate-700/50 transition">
                    <input type="radio" name="payment" className="w-4 h-4" />
                    <span className="ml-3">Credit / Debit Card</span>
                  </label>
                  <label className="flex items-center p-3 border border-slate-700 rounded-lg cursor-pointer hover:bg-slate-700/50 transition">
                    <input type="radio" name="payment" className="w-4 h-4" />
                    <span className="ml-3">Net Banking</span>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link to={fromAiChat ? "/download?returnTo=chat" : "/download"} className="w-full block">
                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-slate-900 font-bold h-11 transition-all duration-300">
                      Proceed to Payment
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedPlan(null)}
                    className="w-full border-slate-300 text-slate-700 bg-transparent hover:bg-slate-100 hover:text-slate-900"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Section */}
          <div className="mt-20 pt-12 border-t border-slate-700">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  q: "Can I upgrade my plan later?",
                  a: "Yes, you can upgrade anytime. We'll credit the amount you've already paid towards the new plan.",
                },
                {
                  q: "Are there any hidden charges?",
                  a: "No, the price you see is what you pay. No hidden fees or surprise charges.",
                },
                {
                  q: "Can I download my resume multiple times?",
                  a: "Yes, you can download your resume unlimited times in PDF and DOCX formats.",
                },
                {
                  q: "Do you offer refunds?",
                  a: "We offer a 7-day money-back guarantee if you're not satisfied with our service.",
                },
              ].map((faq, index) => (
                <div key={index} className="p-6 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-yellow-500/30 transition">
                  <h4 className="font-semibold mb-2 text-yellow-400">{faq.q}</h4>
                  <p className="text-slate-300">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
