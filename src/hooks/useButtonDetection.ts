import { useEffect } from 'react';
import { useGlobalCrud } from '@/contexts/GlobalCrudContext';

export const useButtonDetection = (tableName: string) => {
  const { notifyOperation } = useGlobalCrud();

  useEffect(() => {
    const handleButtonClick = (event: Event) => {
      const target = event.target as HTMLElement;
      
      // Check if the clicked element is a button or has button-like attributes
      if (target.tagName === 'BUTTON' || target.role === 'button' || (target as HTMLButtonElement).type === 'submit') {
        const buttonText = target.textContent?.toLowerCase() || '';
        const className = target.className?.toLowerCase() || '';
        const ariaLabel = target.getAttribute('aria-label')?.toLowerCase() || '';
        
        // Detect CRUD operations based on button text, class, or aria-label
        const allText = `${buttonText} ${className} ${ariaLabel}`;
        
        if (allText.includes('save') || allText.includes('submit') || allText.includes('create') || allText.includes('add')) {
          notifyOperation('Save/Create operation', tableName);
        } else if (allText.includes('update') || allText.includes('edit') || allText.includes('modify')) {
          notifyOperation('Update/Edit operation', tableName);
        } else if (allText.includes('delete') || allText.includes('remove') || allText.includes('trash')) {
          notifyOperation('Delete operation', tableName);
        } else if (allText.includes('refresh') || allText.includes('reload')) {
          notifyOperation('Refresh operation', tableName);
        }
      }
    };

    // Add event listener to capture button clicks
    document.addEventListener('click', handleButtonClick, true);

    return () => {
      document.removeEventListener('click', handleButtonClick, true);
    };
  }, [notifyOperation, tableName]);
};