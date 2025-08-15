import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ErrorState {
  hasError: boolean;
  error: Error | null;
  isLoading: boolean;
}

export const useErrorHandler = () => {
  const { toast } = useToast();
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    error: null,
    isLoading: false
  });

  const handleError = useCallback((error: Error | unknown, userMessage?: string) => {
    const errorObj = error instanceof Error ? error : new Error('An unknown error occurred');
    
    console.error('Error handled:', errorObj);
    
    setErrorState({
      hasError: true,
      error: errorObj,
      isLoading: false
    });

    toast({
      title: "Error",
      description: userMessage || errorObj.message || "Something went wrong. Please try again.",
      variant: "destructive"
    });
  }, [toast]);

  const handleAsyncOperation = useCallback(async <T>(
    operation: () => Promise<T>,
    loadingMessage?: string,
    successMessage?: string,
    errorMessage?: string
  ): Promise<T | null> => {
    try {
      setErrorState(prev => ({ ...prev, isLoading: true, hasError: false }));
      
      const result = await operation();
      
      setErrorState(prev => ({ ...prev, isLoading: false }));
      
      if (successMessage) {
        toast({
          title: "Success",
          description: successMessage,
          variant: "default"
        });
      }
      
      return result;
    } catch (error) {
      handleError(error, errorMessage);
      return null;
    }
  }, [handleError, toast]);

  const clearError = useCallback(() => {
    setErrorState({
      hasError: false,
      error: null,
      isLoading: false
    });
  }, []);

  const retry = useCallback(async <T>(operation: () => Promise<T>): Promise<T | null> => {
    clearError();
    return handleAsyncOperation(operation);
  }, [clearError, handleAsyncOperation]);

  return {
    ...errorState,
    handleError,
    handleAsyncOperation,
    clearError,
    retry
  };
};