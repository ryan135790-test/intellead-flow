import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Bot, 
  Users, 
  Linkedin, 
  Mail, 
  Megaphone,
  Sparkles
} from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "ai-automation", label: "AI Automation", icon: Bot },
  { id: "ai-leads", label: "AI Leads", icon: Users },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin },
  { id: "email", label: "Email", icon: Mail },
  { id: "campaigns", label: "Campaigns", icon: Megaphone },
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <div className="w-full border-b bg-card">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">AI Lead Platform</h1>
          </div>
        </div>
        
        <nav className="flex items-center space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  activeTab === tab.id
                    ? "bg-gradient-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}