import type { ReactNode } from 'react';

import { AppSidebar } from '@components';
import { Footer, Header } from '@components';

import { SidebarProvider } from '@/components/ui/sidebar';

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}
