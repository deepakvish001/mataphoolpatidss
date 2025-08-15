import { useEffect } from 'react';
import { useGlobalCrud } from '@/contexts/GlobalCrudContext';
import { useButtonDetection } from '@/hooks/useButtonDetection';
import { toast } from 'sonner';

interface UseAdminRealTimeOptions {
  tableName: string;
  onInsert?: (data: any) => void;
  onUpdate?: (data: any) => void;
  onDelete?: (data: any) => void;
  customMessages?: {
    insert?: string;
    update?: string;
    delete?: string;
  };
}

/**
 * A standardized hook for implementing real-time updates and button detection
 * across all admin components. This ensures consistent behavior throughout the app.
 * 
 * @param options Configuration object containing table name and event handlers
 * @returns Object with real-time connection status and last event data
 */
export const useAdminRealTime = ({
  tableName,
  onInsert,
  onUpdate,
  onDelete,
  customMessages = {}
}: UseAdminRealTimeOptions) => {
  const { lastEvent, isConnected } = useGlobalCrud();
  
  // Enable button detection for this table
  useButtonDetection(tableName);

  // Default messages for CRUD operations
  const defaultMessages = {
    insert: `New ${tableName.replace('_', ' ')} added successfully!`,
    update: `${tableName.replace('_', ' ')} updated successfully!`,
    delete: `${tableName.replace('_', ' ')} deleted successfully!`
  };

  const messages = { ...defaultMessages, ...customMessages };

  // Listen to global CRUD events for real-time updates
  useEffect(() => {
    if (lastEvent && lastEvent.table === tableName) {
      const { operation, data } = lastEvent;

      switch (operation) {
        case 'INSERT':
          if (onInsert) {
            onInsert(data);
          } else {
            toast.success(messages.insert, {
              duration: 3000,
              position: 'bottom-right'
            });
          }
          break;

        case 'UPDATE':
          if (onUpdate) {
            onUpdate(data);
          } else {
            toast.success(messages.update, {
              duration: 3000,
              position: 'bottom-right'
            });
          }
          break;

        case 'DELETE':
          if (onDelete) {
            onDelete(data);
          } else {
            toast.success(messages.delete, {
              duration: 3000,
              position: 'bottom-right'
            });
          }
          break;

        default:
          console.log(`Unhandled operation: ${operation} on ${tableName}`);
      }
    }
  }, [lastEvent, tableName, onInsert, onUpdate, onDelete, messages]);

  return {
    isConnected,
    lastEvent: lastEvent?.table === tableName ? lastEvent : null
  };
};