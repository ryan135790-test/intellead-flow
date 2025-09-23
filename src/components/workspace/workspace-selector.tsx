import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Building2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/auth-provider';
import { useToast } from '@/hooks/use-toast';

interface Workspace {
  id: string;
  name: string;
  linkedin_profile_name: string;
  linkedin_profile_picture?: string;
  linkedin_token_expires_at: string;
}

interface WorkspaceSelectorProps {
  onWorkspaceChange?: (workspaceId: string | null) => void;
  className?: string;
}

export function WorkspaceSelector({ onWorkspaceChange, className }: WorkspaceSelectorProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWorkspaces();
      loadSelectedWorkspace();
    }
  }, [user]);

  const fetchWorkspaces = async () => {
    try {
      const { data, error } = await supabase
        .from('workspaces')
        .select('id, name, linkedin_profile_name, linkedin_profile_picture, linkedin_token_expires_at')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWorkspaces(data || []);
    } catch (error) {
      console.error('Error fetching workspaces:', error);
      toast({
        title: 'Error',
        description: 'Failed to load workspaces',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadSelectedWorkspace = () => {
    const saved = localStorage.getItem('selectedWorkspaceId');
    if (saved) {
      setSelectedWorkspace(saved);
      onWorkspaceChange?.(saved);
    }
  };

  const handleWorkspaceChange = (workspaceId: string) => {
    setSelectedWorkspace(workspaceId);
    localStorage.setItem('selectedWorkspaceId', workspaceId);
    onWorkspaceChange?.(workspaceId);
  };

  const isTokenExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  if (loading) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
        <span className="text-sm text-muted-foreground">Loading workspaces...</span>
      </div>
    );
  }

  if (workspaces.length === 0) {
    return (
      <div className={`flex items-center space-x-2 text-muted-foreground ${className}`}>
        <Building2 className="w-4 h-4" />
        <span className="text-sm">No workspaces available</span>
      </div>
    );
  }

  return (
    <div className={className}>
      <Select value={selectedWorkspace} onValueChange={handleWorkspaceChange}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select a workspace">
            {selectedWorkspace && (
              <div className="flex items-center space-x-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage 
                    src={workspaces.find(w => w.id === selectedWorkspace)?.linkedin_profile_picture} 
                  />
                  <AvatarFallback className="text-xs">
                    {workspaces.find(w => w.id === selectedWorkspace)?.linkedin_profile_name
                      ?.split(' ').map(n => n[0]).join('') || 'WS'}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate">
                  {workspaces.find(w => w.id === selectedWorkspace)?.name}
                </span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {workspaces.map((workspace) => (
            <SelectItem key={workspace.id} value={workspace.id}>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={workspace.linkedin_profile_picture} />
                    <AvatarFallback className="text-xs">
                      {workspace.linkedin_profile_name?.split(' ').map(n => n[0]).join('') || 'WS'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="truncate">{workspace.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {workspace.linkedin_profile_name}
                    </span>
                  </div>
                </div>
                <Badge 
                  variant={isTokenExpired(workspace.linkedin_token_expires_at) ? 'destructive' : 'secondary'}
                  className="text-xs"
                >
                  {isTokenExpired(workspace.linkedin_token_expires_at) ? 'Expired' : 'Active'}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}