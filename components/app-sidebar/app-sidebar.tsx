import Link from 'next/link';
import { GrCloudUpload, GrHistory, GrPowerCycle } from 'react-icons/gr';

import { getCurrentUser } from '@/actions/auth-actions';
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
  const user = await getCurrentUser();
  return user ? (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link className="flex items-center gap-2" href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ) : null;
}
