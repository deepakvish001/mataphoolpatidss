import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CrudEvent {
  table: string;
  operation: 'INSERT' | 'UPDATE' | 'DELETE';
  timestamp: number;
  data?: any;
}

interface GlobalCrudContextType {
  lastEvent: CrudEvent | null;
  triggerRefresh: (table: string) => void;
  isConnected: boolean;
}

const GlobalCrudContext = createContext<GlobalCrudContextType | undefined>(undefined);

export const useGlobalCrud = () => {
  const context = useContext(GlobalCrudContext);
  if (!context) {
    throw new Error('useGlobalCrud must be used within a GlobalCrudProvider');
  }
  return context;
};

export const GlobalCrudProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lastEvent, setLastEvent] = useState<CrudEvent | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log('🔄 Starting global CRUD monitoring...');
    
    // Monitor all tables for real-time changes
    const tables = [
      'head_offices',
      'student_profiles', 
      'courses',
      'assignments',
      'certificates',
      'notifications',
      'user_courses',
      'user_assignments',
      'user_stats'
    ];

    const channels: any[] = [];

    tables.forEach(table => {
      const channel = supabase
        .channel(`global-${table}-changes`)
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: table
        }, (payload: any) => {
          const event: CrudEvent = {
            table,
            operation: payload.eventType,
            timestamp: Date.now(),
            data: payload.new || payload.old
          };
          
          console.log(`🔄 Global CRUD Event: ${event.operation} on ${event.table}`, event.data);
          setLastEvent(event);
          
          // Show subtle notification for background updates
          if (event.operation === 'INSERT') {
            toast.success(`✨ New ${table.replace('_', ' ')} added`, { 
              duration: 2000,
              position: 'bottom-right'
            });
          } else if (event.operation === 'UPDATE') {
            toast.success(`⚡ ${table.replace('_', ' ')} updated`, { 
              duration: 2000,
              position: 'bottom-right'
            });
          } else if (event.operation === 'DELETE') {
            toast.success(`🗑️ ${table.replace('_', ' ')} removed`, { 
              duration: 2000,
              position: 'bottom-right'
            });
          }
        })
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log(`✅ Global monitoring active for ${table}`);
          }
        });

      channels.push(channel);
    });

    // Monitor connection status
    const connectionChannel = supabase
      .channel('global-connection-status')
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
        if (status === 'SUBSCRIBED') {
          console.log('🌐 Global CRUD monitoring connected');
          toast.success('🌐 Real-time sync active', { 
            duration: 3000,
            position: 'bottom-right'
          });
        } else if (status === 'CLOSED') {
          console.log('❌ Global CRUD monitoring disconnected');
          toast.error('❌ Real-time sync disconnected', { 
            duration: 3000,
            position: 'bottom-right'
          });
        }
      });

    channels.push(connectionChannel);

    return () => {
      console.log('🛑 Cleaning up global CRUD monitoring');
      channels.forEach(channel => {
        supabase.removeChannel(channel);
      });
    };
  }, []);

  const triggerRefresh = (table: string) => {
    const event: CrudEvent = {
      table,
      operation: 'UPDATE',
      timestamp: Date.now()
    };
    setLastEvent(event);
    console.log(`🔄 Manual refresh triggered for ${table}`);
  };

  return (
    <GlobalCrudContext.Provider value={{
      lastEvent,
      triggerRefresh,
      isConnected
    }}>
      {children}
    </GlobalCrudContext.Provider>
  );
};