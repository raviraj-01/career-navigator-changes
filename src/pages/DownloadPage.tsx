import { Button } from "@/components/ui/button";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Download, FileText, Check, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { toast } from "sonner";

const SUBSCRIPTION_KEY = "resumeai_has_subscription";

function downloadResumePdf(filename: string, title: string) {
  const doc = new jsPDF({ format: "a4", unit: "mm" });
  const margin = 20;
  doc.setFontSize(22);
  doc.text("Resume", margin, 25);
  doc.setFontSize(14);
  doc.text(title, margin, 40);
  doc.setFontSize(10);
  doc.text("Cavario.ai — Payment successful. Build your full resume via AI Chat.", margin, 55);
  doc.save(filename);
}

export default function DownloadPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [downloadFormat, setDownloadFormat] = useState<"pdf" | "docx">("pdf");
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    localStorage.setItem(SUBSCRIPTION_KEY, "true");
    const returnTo = searchParams.get("returnTo");
    if (returnTo === "chat") {
      navigate("/chat", { replace: true });
    }
  }, [searchParams, navigate]);

  const handleDownload = () => {
    if (downloadFormat === "docx") {
      toast.info("Word export coming soon. Downloading as PDF.");
    }
    setIsDownloading(true);
    try {
      downloadResumePdf("Software_Engineer_Resume.pdf", "Software Engineer Resume");
      toast.success("Download started");
    } catch {
      toast.error("Download failed");
    }
    setTimeout(() => setIsDownloading(false), 500);
  };

  const handleDownloadItem = (name: string) => {
    try {
      downloadResumePdf(name.replace(/\s+/g, "_") + ".pdf", name);
      toast.success("Download started");
    } catch {
      toast.error("Download failed");
    }
  };

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

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
        <div className="max-w-2xl w-full">
          {/* Success Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Payment Successful!
            </h1>
            <p className="text-xl text-slate-700 mb-8">
              Thank you for your purchase. Your resume is ready for download.
            </p>
          </div>

          {/* Download Card */}
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-300 overflow-hidden shadow-2xl p-8 mb-8 animate-scale-in">
            {/* Purchase Summary */}
            <div className="mb-8 pb-8 border-b border-slate-200">
              <h2 className="text-2xl font-bold mb-6 text-slate-900">Purchase Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Plan</span>
                  <span className="font-semibold text-slate-900">Resume Bundle (10 Resumes)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Amount Paid</span>
                  <span className="text-2xl font-bold text-green-600">₹499</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Transaction ID</span>
                  <span className="font-mono text-sm text-slate-500">TXN-20240128-001234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Date</span>
                  <span className="font-semibold text-slate-900">Jan 28, 2024</span>
                </div>
              </div>
            </div>

            {/* Download Options */}
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-6 text-slate-900">Download Your Resume</h3>

              {/* Format Selection */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { format: "pdf" as const, label: "PDF Format", icon: "📄" },
                  { format: "docx" as const, label: "Word Format", icon: "📝" },
                ].map((option) => (
                  <button
                    key={option.format}
                    onClick={() => setDownloadFormat(option.format)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      downloadFormat === option.format
                        ? "border-yellow-500 bg-yellow-500/10"
                        : "border-slate-700 hover:border-slate-600"
                    }`}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <p className="font-semibold">{option.label}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {option.format === "pdf" ? "Best for printing" : "Editable format"}
                    </p>
                  </button>
                ))}
              </div>

              {/* Resume Preview */}
              <div className="bg-slate-900/50 rounded-lg p-4 mb-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="font-semibold">Software Engineer Resume.{downloadFormat}</p>
                    <p className="text-xs text-slate-400">v1.0 • Latest Version</p>
                  </div>
                </div>
                <div className="h-24 bg-slate-800 rounded border border-slate-700 flex items-center justify-center">
                  <p className="text-slate-500 text-sm">Resume Preview</p>
                </div>
              </div>

              {/* Download Button */}
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-slate-900 font-bold h-12 transition-all duration-300 gap-2 text-lg"
              >
                {isDownloading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Download Resume
                  </>
                )}
              </Button>
            </div>

            {/* Additional Downloads */}
            <div className="pt-8 border-t border-slate-700">
              <h3 className="text-lg font-bold mb-6">Your Downloads</h3>
              <div className="space-y-2">
                {[
                  { name: "Software Engineer Resume", downloads: "Downloaded 1 time" },
                  { name: "Product Manager Resume", downloads: "Downloaded 2 times" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-yellow-400" />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-xs text-slate-400">{item.downloads}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-yellow-400 hover:text-yellow-300"
                      onClick={() => handleDownloadItem(item.name)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Link to="/dashboard" className="block">
              <Button variant="outline" className="w-full border-slate-300 text-slate-900 hover:bg-slate-100 h-11 gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
            <Link to="/chat" className="block">
              <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-slate-900 font-semibold h-11">
                Create New Resume
              </Button>
            </Link>
          </div>

          {/* Help Section */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
            <p className="text-slate-300 mb-3">Need help with your download?</p>
            <Link to="/settings" className="text-yellow-400 hover:text-yellow-300 font-semibold">
              Contact Support →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
