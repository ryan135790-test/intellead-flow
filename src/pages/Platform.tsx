import { useState } from "react";
import { Navigation } from "@/components/layout/navigation";
import { Overview } from "@/components/dashboard/overview";
import { AutomationHub } from "@/components/ai/automation-hub";
import { LeadsDashboard } from "@/components/ai/leads-dashboard";
import { MultiChannelBuilder } from "@/components/ai/multi-channel-builder";
import { AIChat } from "@/components/ai/ai-chat";
import { ContactsDashboard } from "@/components/crm/contacts-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Linkedin, 
  Mail, 
  Megaphone, 
  Bot,
  Settings,
  Plus,
  TrendingUp
} from "lucide-react";

export default function Platform() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiChatType, setAiChatType] = useState<'workflow' | 'campaign' | 'analysis'>('workflow');

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Overview />;
      case "ai-automation":
        return <AutomationHub />;
      case "ai-leads":
        return <LeadsDashboard />;
      case "ai-builder":
        return <MultiChannelBuilder onOpenAIChat={(type) => { setAiChatType(type); setAiChatOpen(true); }} />;
      case "crm":
        return <ContactsDashboard />;
      case "linkedin":
        return <LinkedInManagement onOpenAIChat={(type) => { setAiChatType(type); setAiChatOpen(true); }} />;
      case "email":
        return <EmailManagement onOpenAIChat={(type) => { setAiChatType(type); setAiChatOpen(true); }} />;
      case "campaigns":
        return <CampaignManagement onOpenAIChat={(type) => { setAiChatType(type); setAiChatOpen(true); }} />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="p-6">
        {renderContent()}
      </main>
      
      <AIChat
        isOpen={aiChatOpen}
        onClose={() => setAiChatOpen(false)}
        sessionType={aiChatType}
        onComplete={() => {
          setAiChatOpen(false);
          // Refresh the active tab if needed
        }}
      />
    </div>
  );
}

function LinkedInManagement({ onOpenAIChat }: { onOpenAIChat: (type: 'workflow' | 'campaign' | 'analysis') => void }) {
  const templates = [
    {
      name: "Profile Enrichment",
      description: "AI analyzes LinkedIn profiles for personalized messaging",
      performance: "94.2%",
      status: "active"
    },
    {
      name: "Message Personalization", 
      description: "Generate personalized connection requests and messages",
      performance: "87.8%",
      status: "active"
    },
    {
      name: "Optimal Timing",
      description: "AI determines best times to send LinkedIn messages",
      performance: "91.5%",
      status: "active"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">LinkedIn AI Campaigns</h2>
          <p className="text-muted-foreground">AI-powered LinkedIn outreach and automation</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => onOpenAIChat('campaign')} variant="outline">
            <Bot className="h-4 w-4 mr-2" />
            AI Campaign Builder
          </Button>
          <Button className="bg-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <Badge className="bg-success text-success-foreground">
                  {template.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{template.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Success Rate</p>
                  <p className="text-2xl font-bold text-success">{template.performance}</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <TrendingUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Linkedin className="h-5 w-5 text-primary" />
            <span>LinkedIn Campaign Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-gradient-card">
              <div className="text-2xl font-bold text-foreground">2,847</div>
              <div className="text-sm text-muted-foreground">Total Connections</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-success">
              <div className="text-2xl font-bold text-success-foreground">87.8%</div>
              <div className="text-sm text-success-foreground/80">Response Rate</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-insight">
              <div className="text-2xl font-bold text-primary-foreground">1,247</div>
              <div className="text-sm text-primary-foreground/80">Qualified Leads</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function EmailManagement({ onOpenAIChat }: { onOpenAIChat: (type: 'workflow' | 'campaign' | 'analysis') => void }) {
  const templates = [
    {
      name: "Subject Line Optimization",
      description: "AI optimizes email subject lines for maximum open rates",
      performance: "92.1%",
      status: "active"
    },
    {
      name: "Content Personalization",
      description: "Generate personalized email content for each recipient",
      performance: "89.4%",
      status: "active"
    },
    {
      name: "Send Time Optimization",
      description: "AI determines optimal send times for each contact",
      performance: "94.7%",
      status: "active"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Email AI Optimization</h2>
          <p className="text-muted-foreground">AI-powered email marketing and automation</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => onOpenAIChat('workflow')} variant="outline">
            <Bot className="h-4 w-4 mr-2" />
            AI Email Builder
          </Button>
          <Button className="bg-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            New Email Campaign
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <Badge className="bg-success text-success-foreground">
                  {template.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{template.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Success Rate</p>
                  <p className="text-2xl font-bold text-success">{template.performance}</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <TrendingUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-accent" />
            <span>Email Campaign Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-lg bg-gradient-card">
              <div className="text-2xl font-bold text-foreground">45,239</div>
              <div className="text-sm text-muted-foreground">Emails Sent</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-success">
              <div className="text-2xl font-bold text-success-foreground">92.1%</div>
              <div className="text-sm text-success-foreground/80">Open Rate</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-insight">
              <div className="text-2xl font-bold text-primary-foreground">67.8%</div>
              <div className="text-sm text-primary-foreground/80">Click Rate</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-primary">
              <div className="text-2xl font-bold text-primary-foreground">23.4%</div>
              <div className="text-sm text-primary-foreground/80">Conversion Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CampaignManagement({ onOpenAIChat }: { onOpenAIChat: (type: 'workflow' | 'campaign' | 'analysis') => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Campaign Management</h2>
          <p className="text-muted-foreground">Traditional marketing campaigns with AI insights</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => onOpenAIChat('campaign')} variant="outline">
            <Bot className="h-4 w-4 mr-2" />
            AI Campaign Builder
          </Button>
          <Button className="bg-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Megaphone className="h-5 w-5 text-primary" />
            <span>Active Campaigns</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Enhanced with AI</h3>
            <p className="text-muted-foreground mb-4">Traditional campaigns powered by AI insights for better performance</p>
            <div className="flex space-x-2">
              <Button onClick={() => onOpenAIChat('analysis')} variant="outline">
                <Bot className="h-4 w-4 mr-2" />
                AI Insights
              </Button>
              <Button className="bg-gradient-primary">
                Get Started
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}