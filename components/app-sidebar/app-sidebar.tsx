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
    title: 'Rest-client',
    url: '/rest',
  },
  {
    icon: <GrHistory />,
    title: 'History',
    url: '/history',
  },
  {
    icon: <GrPowerCycle />,
    title: 'Variables',
    url: '/variables',
  },
];

export async function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-fuchsia-50">
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link className="flex items-center gap-2" href={item.url}>
                      {item.icon}
                      <span className="font-caprasimo text-2xl">{item.title}</span>
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
