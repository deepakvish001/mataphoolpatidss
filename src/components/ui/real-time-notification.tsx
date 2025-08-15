import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp: Date;
  actions?: Array<{
    label: string;
    action: () => void;
    variant?: 'default' | 'destructive' | 'outline';
  }>;
}

interface RealTimeNotificationProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
  onAction?: (id: string, actionIndex: number) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  maxVisible?: number;
}

const getIcon = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return CheckCircle;
    case 'error':
      return AlertCircle;
    case 'warning':
      return AlertTriangle;
    case 'info':
    default:
      return Info;
  }
};

const getColors = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return {
        bg: 'bg-green-50 border-green-200',
        icon: 'text-green-600',
        badge: 'bg-green-100 text-green-800'
      };
    case 'error':
      return {
        bg: 'bg-red-50 border-red-200',
        icon: 'text-red-600',
        badge: 'bg-red-100 text-red-800'
      };
    case 'warning':
      return {
        bg: 'bg-orange-50 border-orange-200',
        icon: 'text-orange-600',
        badge: 'bg-orange-100 text-orange-800'
      };
    case 'info':
    default:
      return {
        bg: 'bg-blue-50 border-blue-200',
        icon: 'text-blue-600',
        badge: 'bg-blue-100 text-blue-800'
      };
  }
};

export const RealTimeNotification: React.FC<RealTimeNotificationProps> = ({
  notifications,
  onDismiss,
  onAction,
  position = 'top-right',
  maxVisible = 5
}) => {
  const [visibleNotifications, setVisibleNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setVisibleNotifications(notifications.slice(0, maxVisible));
  }, [notifications, maxVisible]);

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'top-right':
      default:
        return 'top-4 right-4';
    }
  };

  const handleDismiss = (id: string) => {
    setVisibleNotifications(prev => prev.filter(n => n.id !== id));
    setTimeout(() => onDismiss(id), 150);
  };

  if (visibleNotifications.length === 0) return null;

  return (
    <div className={`fixed z-50 space-y-3 ${getPositionClasses()} max-w-sm w-full`}>
      {visibleNotifications.map((notification, index) => {
        const Icon = getIcon(notification.type);
        const colors = getColors(notification.type);
        
        return (
          <Card
            key={notification.id}
            className={`${colors.bg} border shadow-lg animate-slide-in-right`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className={`p-1 rounded-full ${colors.bg}`}>
                  <Icon className={`h-5 w-5 ${colors.icon}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-foreground truncate">
                      {notification.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className={`text-xs ${colors.badge}`}>
                        {notification.type}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDismiss(notification.id)}
                        className="h-6 w-6 p-0 hover:bg-background/50"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {notification.timestamp.toLocaleTimeString()}
                    </span>
                    
                    {notification.actions && notification.actions.length > 0 && (
                      <div className="flex space-x-2">
                        {notification.actions.map((action, actionIndex) => (
                          <Button
                            key={actionIndex}
                            size="sm"
                            variant={action.variant || 'outline'}
                            onClick={() => {
                              action.action();
                              onAction?.(notification.id, actionIndex);
                            }}
                            className="h-6 px-2 text-xs"
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};