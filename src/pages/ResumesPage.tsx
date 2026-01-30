import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Trash2, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { jsPDF } from "jspdf";

type ResumeItem = { id: number; company: string; role: string; created: string; status: string };

const initialResumes: ResumeItem[] = [
  { id: 1, company: "Google", role: "Software Engineer", created: "Jan 25, 2026", status: "Complete" },
  { id: 2, company: "Microsoft", role: "Product Manager", created: "Jan 22, 2026", status: "Complete" },
  { id: 3, company: "Amazon", role: "Data Scientist", created: "Jan 20, 2026", status: "Draft" },
  { id: 4, company: "Meta", role: "Frontend Developer", created: "Jan 18, 2026", status: "Complete" },
  { id: 5, company: "Apple", role: "iOS Engineer", created: "Jan 15, 2026", status: "Complete" },
];

function downloadResumePdf(resume: ResumeItem) {
  const doc = new jsPDF({ format: "a4", unit: "mm" });
  const margin = 20;
  doc.setFontSize(22);
  doc.text("Resume", margin, 25);
  doc.setFontSize(14);
  doc.text(`${resume.role} at ${resume.company}`, margin, 40);
  doc.setFontSize(10);
  doc.text(`Created: ${resume.created} | Status: ${resume.status}`, margin, 50);
  doc.text("This is a placeholder. Build resumes via AI Chat to get full content.", margin, 70);
  doc.save(`Resume_${resume.company.replace(/\s+/g, "_")}.pdf`);
}

export default function ResumesPage() {
  const [resumes, setResumes] = useState<ResumeItem[]>(initialResumes);

  const handleView = (resume: ResumeItem) => {
    toast.info(`Preview for ${resume.role} at ${resume.company} — coming soon.`);
  };

  const handleDownloadPdf = (resume: ResumeItem) => {
    try {
      downloadResumePdf(resume);
      toast.success("PDF downloaded");
    } catch {
      toast.error("Failed to download PDF");
    }
  };

  const handleDelete = (resume: ResumeItem) => {
    setResumes((prev) => prev.filter((r) => r.id !== resume.id));
    toast.success("Resume removed");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">My Resumes</h1>
          <p className="text-muted-foreground text-sm">Manage all your generated resumes</p>
        </div>
        <Button asChild className="gradient-gold hover:opacity-90 shadow-gold text-navy-dark">
          <Link to="/chat">
            <PlusCircle className="w-4 h-4 mr-2" />
            New Resume
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resumes.map((resume) => (
          <Card key={resume.id} className="shadow-soft hover:shadow-medium transition-all group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <FileText className="w-5 h-5 text-accent" />
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  resume.status === "Complete" 
                    ? "bg-accent/20 text-accent" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {resume.status}
                </span>
              </div>
              <CardTitle className="text-base mt-3">{resume.company}</CardTitle>
              <CardDescription>{resume.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-4">Created {resume.created}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleView(resume)}>
                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleDownloadPdf(resume)}>
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  PDF
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => handleDelete(resume)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
