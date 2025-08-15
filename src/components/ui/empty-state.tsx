import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  className = ""
}) => {
  return (
    <Card className={`border-dashed border-2 ${className}`}>
      <CardContent className="flex flex-col items-center justify-center py-16 px-6">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
        
        <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
        <p className="text-muted-foreground text-center mb-6 max-w-sm">
          {description}
        </p>
        
        {(actionLabel && (onAction || actionHref)) && (
          <div className="flex gap-3">
            {actionHref ? (
              <Button asChild className="bg-gradient-to-r from-primary to-primary/90">
                <a href={actionHref}>
                  {actionLabel}
                </a>
              </Button>
            ) : (
              <Button 
                onClick={onAction}
                className="bg-gradient-to-r from-primary to-primary/90"
              >
                {actionLabel}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};