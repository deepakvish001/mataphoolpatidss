import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
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
  refreshData: () => void;
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
  const [retryCount, setRetryCount] = useState(0);

  // Force refresh all data
  const refreshData = useCallback(() => {
    const event: CrudEvent = {
      table: 'all',
      operation: 'UPDATE',
      timestamp: Date.now()
    };
    setLastEvent(event);
    toast.success('🔄 Data refreshed across all components', { 
      duration: 2000,
      position: 'bottom-right'
    });
  }, []);

  const setupRealTimeConnection = useCallback(() => {
    console.log(`🔄 Setting up real-time connection (attempt ${retryCount + 1})`);
    
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
      'user_stats',
      'profiles'
    ];

    const channels: any[] = [];
    let connectedCount = 0;

    tables.forEach(table => {
      const channelName = `global-${table}-${Date.now()}`;
      const channel = supabase
        .channel(channelName)
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
          
          // Show notification
          const emoji = event.operation === 'INSERT' ? '✨' : event.operation === 'UPDATE' ? '⚡' : '🗑️';
          const action = event.operation === 'INSERT' ? 'added' : event.operation === 'UPDATE' ? 'updated' : 'removed';
          
          toast.success(`${emoji} ${table.replace('_', ' ')} ${action}`, { 
            duration: 2000,
            position: 'bottom-right'
          });
        })
        .subscribe((status) => {
          console.log(`📡 ${table} subscription status:`, status);
          if (status === 'SUBSCRIBED') {
            connectedCount++;
            console.log(`✅ Connected to ${table} (${connectedCount}/${tables.length})`);
            
            if (connectedCount === tables.length) {
              setIsConnected(true);
              setRetryCount(0);
              toast.success('🌐 Real-time sync active for all tables', { 
                duration: 3000,
                position: 'bottom-right'
              });
            }
          } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
            setIsConnected(false);
            console.log(`❌ ${table} connection failed:`, status);
            
            // Retry connection with exponential backoff
            if (retryCount < 3) {
              const retryDelay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
              setTimeout(() => {
                setRetryCount(prev => prev + 1);
              }, retryDelay);
            }
          }
        });

      channels.push(channel);
    });

    return channels;
  }, [retryCount]);

  useEffect(() => {
    const channels = setupRealTimeConnection();

    // Fallback polling mechanism if real-time fails
    const pollInterval = setInterval(() => {
      if (!isConnected) {
        console.log('🔄 Real-time not connected, triggering polling refresh');
        refreshData();
      }
    }, 5000); // Poll every 5 seconds if real-time is down

    return () => {
      console.log('🛑 Cleaning up global CRUD monitoring');
      channels.forEach(channel => {
        supabase.removeChannel(channel);
      });
      clearInterval(pollInterval);
    };
  }, [setupRealTimeConnection, isConnected, refreshData]);

  const triggerRefresh = useCallback((table: string) => {
    const event: CrudEvent = {
      table,
      operation: 'UPDATE',
      timestamp: Date.now()
    };
    setLastEvent(event);
    console.log(`🔄 Manual refresh triggered for ${table}`);
  }, []);

  return (
    <GlobalCrudContext.Provider value={{
      lastEvent,
      triggerRefresh,
      isConnected,
      refreshData
    }}>
      {children}
    </GlobalCrudContext.Provider>
  );
};