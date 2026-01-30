import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, PlusCircle, Target, TrendingUp, Clock, ArrowRight } from "lucide-react";

const recentResumes = [
  { id: 1, company: "Google", created: "2 days ago", status: "Complete" },
  { id: 2, company: "Microsoft", created: "5 days ago", status: "Complete" },
  { id: 3, company: "Amazon", created: "1 week ago", status: "Draft" },
];

const stats = [
  { label: "Resumes Created", value: "12", icon: FileText, trend: "+3 this month" },
  { label: "Companies Targeted", value: "8", icon: Target, trend: "+2 this week" },
  { label: "Avg. Completion Time", value: "8 min", icon: Clock, trend: "Improved by 2 min" },
];

export default function Dashboard() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Welcome back
        </h1>
        <p className="text-muted-foreground">
          Create tailored resumes that get you noticed.
        </p>
      </div>

      {/* Quick Action */}
      <Card className="gradient-navy border-0 shadow-medium overflow-hidden">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="font-display text-xl font-semibold text-primary-foreground">
              Ready to build your next resume?
            </h2>
            <p className="text-primary-foreground/70 text-sm">
              Our AI will guide you through creating a perfectly tailored resume.
            </p>
          </div>
          <Button asChild className="gradient-gold hover:opacity-90 shadow-gold text-navy-dark">
            <Link to="/chat">
              <PlusCircle className="w-4 h-4 mr-2" />
              New Resume
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                  <p className="text-xs text-accent flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {stat.trend}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Resumes */}
      <Card className="shadow-soft">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-display text-lg">Recent Resumes</CardTitle>
            <CardDescription>Your latest resume creations</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
            <Link to="/resumes">
              View all
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentResumes.map((resume) => (
              <div
                key={resume.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-card flex items-center justify-center shadow-soft">
                    <FileText className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">{resume.company}</p>
                    <p className="text-xs text-muted-foreground">{resume.created}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  resume.status === "Complete" 
                    ? "bg-accent/20 text-accent" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {resume.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
