import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { GrCloudUpload, GrHistory, GrPowerCycle } from 'react-icons/gr';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const items = [
  {
    icon: <GrCloudUpload />,
    url: 'rest',
  },
  {
    icon: <GrHistory />,
    url: 'history',
  },
  {
    icon: <GrPowerCycle />,
    url: 'variables',
  },
];

export async function AppSidebar() {
  const t = await getTranslations('sidebar');
  return (
    <Sidebar>
      <SidebarContent className="bg-fuchsia-50">
        <SidebarGroup>
          <SidebarGroupLabel>{t('menu')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <Link className="flex items-center gap-2" href={`/${item.url}`}>
                      {item.icon}
                      <span className="font-caprasimo text-2xl">{t(item.url)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
