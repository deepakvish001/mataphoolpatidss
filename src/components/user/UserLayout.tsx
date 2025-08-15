import { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { UserSidebar } from './UserSidebar';
import { UserHeader } from './UserHeader';
import { UserFooter } from './UserFooter';

interface UserLayoutProps {
  children: ReactNode;
}

export const UserLayout = ({ children }: UserLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full flex-col">
        {/* Fixed Header */}
        <UserHeader />
        
        {/* Main Content Area */}
        <div className="flex flex-1">
          <UserSidebar />
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-6 pb-20"> {/* pb-20 to account for fixed footer */}
              {children}
            </div>
          </main>
        </div>
        
        {/* Fixed Footer */}
        <UserFooter />
      </div>
    </SidebarProvider>
  );
};