import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  Bot, 
  Target,
  Linkedin,
  Mail,
  Zap,
  Brain
} from "lucide-react";

export function Overview() {
  return (
    <div className="space-y-6">
      {/* AI Insights Banner */}
      <Card className="bg-gradient-hero border-0 text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span className="text-sm font-medium opacity-90">AI Optimization Score</span>
              </div>
              <div className="text-3xl font-bold">94.2%</div>
              <p className="text-sm opacity-80">Your platform is performing exceptionally well</p>
            </div>
            <div className="text-right space-y-2">
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                +12% vs last week
              </Badge>
              <p className="text-sm opacity-80">AI recommendations active</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Leads"
          value="2,847"
          change="+23.5%"
          trend="up"
          icon={<Users className="h-6 w-6 text-primary" />}
        />
        <MetricCard
          title="AI Lead Score"
          value="94.2%"
          change="+8.2%"
          trend="up"
          variant="success"
          icon={<Target className="h-6 w-6 text-success-foreground" />}
        />
        <MetricCard
          title="LinkedIn Success"
          value="87.8%"
          change="+5.1%"
          trend="up"
          variant="insight"
          icon={<Linkedin className="h-6 w-6 text-primary-foreground" />}
        />
        <MetricCard
          title="Email Performance"
          value="92.1%"
          change="+15.3%"
          trend="up"
          variant="gradient"
          icon={<Mail className="h-6 w-6 text-primary-foreground" />}
        />
      </div>

      {/* AI Workflows Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-primary" />
              <span>Active AI Workflows</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-card">
              <div>
                <p className="font-medium">Smart Lead Scoring</p>
                <p className="text-sm text-muted-foreground">Processing 547 leads</p>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                Active
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-card">
              <div>
                <p className="font-medium">LinkedIn Personalization</p>
                <p className="text-sm text-muted-foreground">89 messages optimized today</p>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                Active
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-card">
              <div>
                <p className="font-medium">Email Subject Optimizer</p>
                <p className="text-sm text-muted-foreground">156 emails enhanced</p>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              <span>Performance Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-gradient-insight">
              <div className="flex items-start space-x-3">
                <Zap className="h-5 w-5 text-primary-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-primary-foreground">Peak Performance Window</p>
                  <p className="text-sm text-primary-foreground/80">Your leads are most active between 2-4 PM</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-secondary">
              <div className="flex items-start space-x-3">
                <Brain className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="font-medium">AI Recommendation</p>
                  <p className="text-sm text-muted-foreground">Increase LinkedIn outreach by 15% for optimal results</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-gradient-success">
              <div className="flex items-start space-x-3">
                <Target className="h-5 w-5 text-success-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-success-foreground">Quality Score</p>
                  <p className="text-sm text-success-foreground/80">Your lead quality has improved by 23% this month</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}