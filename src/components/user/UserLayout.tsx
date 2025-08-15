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
      <div className="min-h-screen flex w-full">
        <UserSidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Fixed Header */}
          <UserHeader />
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-6">
              {children}
            </div>
          </main>
          
          {/* Footer */}
          <UserFooter />
        </div>
      </div>
    </SidebarProvider>
  );
};