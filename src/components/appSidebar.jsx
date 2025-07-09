'use client';

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
  useSidebar
} from "@/components/ui/sidebar";
import {
  Briefcase,
  Clipboard,
  LayoutDashboard,
  PersonStanding,
  User,
  Settings,
  LogOut,
  GraduationCap,
  ChevronRight
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SheetTrigger } from "./ui/sheet";
import { Dialog } from "@radix-ui/react-dialog";

export const AppSidebar = ({ role = "student" }) => {
  const { open, setOpen, openMobile, setOpenMobile } = useSidebar()
  const pathname = usePathname();

  const [collapsibleOpen, setCollapsibleOpen] = React.useState(true);

  const items = {
    student: [
      {
        title: 'Dashboard',
        icon: <LayoutDashboard />,
        href: '/dashboard/student',
      },
      {
        title: 'Drives',
        icon: <Briefcase />,
        subItems: [
          {
            title: 'Active Drives',
            href: 'active-drives',
          },
          {
            title: 'Applied Drives',
            href: 'applied-drives',
          },
          {
            title: 'Expired Drives',
            href: 'expired-drives',
          },
          {
            title: 'Shortlisted Drives',
            href: 'shortlisted-drives',
          },
        ]
      },
      {
        title: "Mentor",
        icon: <PersonStanding />,
        href: '/dashboard/student/mentor',
      }
    ]
  };

  const roleItems = items[role] || [];

  if (roleItems.length === 0) {
    return null;
  }

  return (
    <TooltipProvider>
      <Dialog>
        <Sidebar side="left" variant="sidebar" collapsible="icon">
          <SidebarHeader className="mt-2 mb-8 overflow-hidden">
            <div className={"flex items-center gap-2 pl-1"}>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
              </div>
              {/* {open && ( */}
              <SidebarMenuButton className={"bg-transparent hover:bg-transparent"}>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">CampusHire</p>
                  <p className="text-xs text-muted-foreground">Student Portal</p>
                </div>
              </SidebarMenuButton>
              {/* )} */}
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {roleItems.map((item, index) => (
                  // <SidebarMenuItem key={index}>
                  item.subItems ? (
                    <Collapsible key={index} defaultOpen={collapsibleOpen} open={(open || openMobile) && collapsibleOpen} onOpenChange={setCollapsibleOpen} className="group/collapsible ">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title} className={' text-gray-700 text-base font-semibold'}>
                          {item.icon}
                          <span>{item.title}</span>

                          {/* is open then rotate 90 deg */}
                          <ChevronRight className={cn("ml-auto transition-transform outline-gray-700 ", collapsibleOpen ? "rotate-90" : "rotate-0")} />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem, subIndex) => (
                            <SidebarMenuSubItem key={subIndex}>
                              <SidebarMenuSubButton
                                size="sm"
                                className={"text-black font-semibold"}
                                isActive={pathname.endsWith(subItem.href)}
                                asChild
                              >
                                <SheetTrigger asChild>

                                  <Link href={subItem.href}>
                                    {subItem.title}
                                  </Link>
                                </SheetTrigger>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton key={index}
                      className={"text-gray-700 text-base font-semibold"}
                      asChild
                      tooltip={item.title}>
                      <SheetTrigger asChild>
                        <Link href={item.href} >
                          {React.cloneElement(item.icon, { className: 'w-6 h-6' })}
                          <span>{item.title}</span>
                        </Link>
                      </SheetTrigger>
                    </SidebarMenuButton>
                  ))
                )}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Profile">
                  <a href="/profile">
                    <User />
                    <span>Profile</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <a href="/settings">
                    <Settings />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Logout">
                  <a href="/logout">
                    <LogOut />
                    <span>Logout</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
      </Dialog>
    </TooltipProvider >
  );
};

export default AppSidebar;