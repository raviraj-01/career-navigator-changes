import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Trash2, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useUserResumes } from "@/contexts/UserResumesContext";
import { downloadResumeAsPdf } from "@/lib/pdfResume";
import type { StoredResume } from "@/contexts/UserResumesContext";

export default function ResumesPage() {
  const { resumes, deleteResume } = useUserResumes();
  const sortedResumes = [...resumes].sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
  );

  const handleView = (resume: StoredResume) => {
    toast.info(`Preview for ${resume.title} — coming soon.`);
  };

  const handleDownloadPdf = (resume: StoredResume) => {
    try {
      downloadResumeAsPdf(resume.messages, `${resume.title.replace(/\s+/g, "_")}.pdf`);
      toast.success("PDF downloaded");
    } catch {
      toast.error("Failed to download PDF");
    }
  };

  const handleDelete = (resume: StoredResume) => {
    deleteResume(resume.id);
    toast.success("Resume removed");
  };

  const displayTitle = (r: StoredResume) => r.title.split(" - ")[0] || r.role || "Resume";
  const displayRole = (r: StoredResume) => r.role || r.title;

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

      {resumes.length === 0 ? (
        <Card className="shadow-soft">
          <CardContent className="py-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">No resumes yet</p>
            <p className="text-sm text-muted-foreground mb-4">
              Create a resume with AI in the chat, then generate PDF to save it here.
            </p>
            <Button asChild className="gradient-gold hover:opacity-90 shadow-gold text-navy-dark">
              <Link to="/chat">
                <PlusCircle className="w-4 h-4 mr-2" />
                Create resume
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedResumes.map((resume) => (
            <Card key={resume.id} className="shadow-soft hover:shadow-medium transition-all group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      resume.status === "Complete"
                        ? "bg-accent/20 text-accent"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {resume.status}
                  </span>
                </div>
                <CardTitle className="text-base mt-3">{displayTitle(resume)}</CardTitle>
                <CardDescription>{displayRole(resume)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-4">Created {resume.created}</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleView(resume)}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1.5" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDownloadPdf(resume)}
                  >
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
      )}
    </div>
  );
}
