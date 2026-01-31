import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, PlusCircle, Target, TrendingUp, Clock, ArrowRight, BarChart3 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserResumes } from "@/contexts/UserResumesContext";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { computeAtsScore } from "@/lib/atsScore";
import type { StoredResume } from "@/lib/userResumes";

function formatCreated(created: string): string {
  const d = new Date(created);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week(s) ago`;
  return created;
}

export default function Dashboard() {
  const { user } = useAuth();
  const { resumes } = useUserResumes();

  const sortedResumes = [...resumes].sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
  );
  const recentResumes = sortedResumes.slice(0, 5).map((r) => ({
    id: r.id,
    company: r.title.split(" - ")[0] || r.role || "Resume",
    created: formatCreated(r.created),
    status: r.status,
  }));

  const stats = [
    { label: "Resumes Created", value: String(resumes.length), icon: FileText, trend: resumes.length ? "Your saved resumes" : "Create your first" },
    { label: "Resume Type", value: resumes.length ? String(new Set(resumes.map((r) => r.role)).size) : "0", icon: Target, trend: "categories used" },
    { label: "Latest", value: sortedResumes.length ? formatCreated(sortedResumes[0].created) : "—", icon: Clock, trend: "most recent" },
  ];

  const getAtsScore = (r: StoredResume) => r.atsScore ?? computeAtsScore(r.messages);
  const chartData = sortedResumes.map((r) => ({
    name: r.title.split(" - ")[0]?.slice(0, 18) || r.role || "Resume",
    fullTitle: r.title,
    atsScore: getAtsScore(r),
  }));

  const atsChartConfig = {
    atsScore: {
      label: "ATS Score",
      color: "hsl(var(--accent))",
    },
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
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

      {/* ATS Score Bar Chart */}
      {resumes.length > 0 && (
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-accent" />
              Resume ATS Scores
            </CardTitle>
            <CardDescription>
              Your created resumes by ATS compatibility score (0–100). Higher is better for applicant tracking systems.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={atsChartConfig} className="h-[280px] w-full">
              <BarChart data={chartData} margin={{ top: 12, right: 12, bottom: 24, left: 12 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => (v.length > 12 ? v.slice(0, 12) + "…" : v)}
                />
                <YAxis
                  domain={[0, 100]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => `${v}`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelFormatter={(_, payload) => payload?.[0]?.payload?.fullTitle ?? ""}
                      formatter={(value: number) => (
                        <div className="flex w-full justify-between gap-2 items-center">
                          <span className="text-muted-foreground">ATS Score</span>
                          <span className="font-mono font-medium tabular-nums text-foreground">
                            {value} / 100
                          </span>
                        </div>
                      )}
                    />
                  }
                />
                <Bar dataKey="atsScore" fill="var(--color-atsScore)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

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
            {recentResumes.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No resumes yet. Create one with AI from the chat.
              </p>
            ) : (
              recentResumes.map((resume) => (
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
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
