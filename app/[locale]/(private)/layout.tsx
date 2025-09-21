import { AppSidebar } from '@components';
import { Footer, Header } from '@components';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { getCurrentUser } from '@/actions/auth-actions';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ROUTES } from '@/constants';

export default async function PrivateLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(ROUTES.MAIN);
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Header isAuth={user !== undefined && user !== null} />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}
