import type { ReactNode } from 'react';

import { Footer, Header } from '@components';

import { AppSidebar } from '@/components/app-sidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function LocaleLayout({ children }: { children: ReactNode }) {
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
