import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Zap, 
  Settings, 
  Play,
  Pause,
  BarChart3,
  Linkedin,
  Mail,
  Users,
  Brain
} from "lucide-react";

export function AutomationHub() {
  const workflows = [
    {
      id: 1,
      name: "Smart Lead Scoring",
      description: "AI-powered lead qualification with 94.2% accuracy",
      status: "active",
      performance: "94.2%",
      icon: Users,
      type: "Lead Management",
      lastRun: "2 minutes ago"
    },
    {
      id: 2,
      name: "LinkedIn Message Personalization",
      description: "Generate personalized LinkedIn messages using AI",
      status: "active",
      performance: "87.8%",
      icon: Linkedin,
      type: "Social Outreach",
      lastRun: "5 minutes ago"
    },
    {
      id: 3,
      name: "Email Subject Optimizer",
      description: "Optimize email subject lines for maximum open rates",
      status: "active",
      performance: "92.1%",
      icon: Mail,
      type: "Email Marketing",
      lastRun: "8 minutes ago"
    },
    {
      id: 4,
      name: "Timing Optimizer",
      description: "AI determines optimal send times for each contact",
      status: "paused",
      performance: "89.3%",
      icon: Brain,
      type: "Optimization",
      lastRun: "1 hour ago"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">AI Automation Hub</h2>
          <p className="text-muted-foreground">Manage and monitor your AI-powered workflows</p>
        </div>
        <Button className="bg-gradient-primary">
          <Zap className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      {/* Active Workflows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workflows.map((workflow) => {
          const Icon = workflow.icon;
          return (
            <Card key={workflow.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gradient-primary">
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{workflow.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{workflow.type}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={workflow.status === "active" ? "default" : "secondary"}
                    className={workflow.status === "active" ? "bg-success text-success-foreground" : ""}
                  >
                    {workflow.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{workflow.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Performance</p>
                    <p className="text-2xl font-bold text-success">{workflow.performance}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm text-muted-foreground">Last Run</p>
                    <p className="text-sm font-medium">{workflow.lastRun}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    size="sm" 
                    variant={workflow.status === "active" ? "outline" : "default"}
                    className="flex-1"
                  >
                    {workflow.status === "active" ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start
                      </>
                    )}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Workflow Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-primary" />
            <span>AI Workflow Templates</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-dashed border-border hover:border-primary transition-colors cursor-pointer">
              <div className="text-center space-y-2">
                <div className="h-12 w-12 mx-auto rounded-lg bg-gradient-insight flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-medium">Lead Enrichment</h3>
                <p className="text-sm text-muted-foreground">Automatically enrich leads with AI-powered data</p>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-dashed border-border hover:border-primary transition-colors cursor-pointer">
              <div className="text-center space-y-2">
                <div className="h-12 w-12 mx-auto rounded-lg bg-gradient-success flex items-center justify-center">
                  <Mail className="h-6 w-6 text-success-foreground" />
                </div>
                <h3 className="font-medium">Email Sequences</h3>
                <p className="text-sm text-muted-foreground">Create AI-driven email sequences</p>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-dashed border-border hover:border-primary transition-colors cursor-pointer">
              <div className="text-center space-y-2">
                <div className="h-12 w-12 mx-auto rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Linkedin className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-medium">Social Automation</h3>
                <p className="text-sm text-muted-foreground">Automate LinkedIn outreach campaigns</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}