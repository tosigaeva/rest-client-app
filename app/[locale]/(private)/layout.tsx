import type { ReactNode } from 'react';

import { AppSidebar } from '@components';
import { Footer, Header } from '@components';

import { getCurrentUser } from '@/actions/auth-actions';
import { SidebarProvider } from '@/components/ui/sidebar';

export default async function PrivateLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Header user={user} />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}
