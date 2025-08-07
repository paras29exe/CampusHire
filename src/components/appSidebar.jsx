'use client';

import React from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter } from "@/components/ui/sidebar";
import { User, GraduationCap } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SheetTrigger } from "./ui/sheet";
import { SidebarCollapsibleItem } from "./ui/sidebarCollapsibleItem";
import { getSidebarItems } from "@/constants/sidebarItems";
import LogoutDialog from "./logoutDialog";
import { Dialog } from "@radix-ui/react-dialog";

export const AppSidebar = ({ role }) => {
  const pathname = usePathname();

  const roleItems = getSidebarItems(role);

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
                <div onClick={() => window.location.href = "/"} className="flex items-center justify-center w-10 aspect-square rounded-lg overflow-hidden">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
                </div>
              </div>
              {/* {open && ( */}
              <SidebarMenuButton className={"bg-transparent hover:bg-transparent"}>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">CampusHire</p>
                  <p className="text-xs text-muted-foreground">{role?.[0]?.toUpperCase() + role.slice(1)} Portal</p>
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
                    <SidebarCollapsibleItem key={index} item={item} pathname={pathname} />
                  ) : (
                    <SidebarMenuButton key={index}
                      className={"text-gray-700 font-semibold"}
                      asChild
                      isActive={pathname.endsWith(item.href)}
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

          <SidebarFooter className={' border-t border-foreground/50 '}>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Profile">
                  <SheetTrigger asChild>
                    <Link href="/profile">
                      <User />
                      <span>Profile</span>
                    </Link>
                  </SheetTrigger>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <SheetTrigger asChild>
                    <Link href="/settings">
                      <Settings />
                      <span>Settings</span>
                    </Link>
                  </SheetTrigger>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              <SidebarMenuItem>
                <SheetTrigger asChild>
                  <LogoutDialog />
                </SheetTrigger>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
      </Dialog>
    </TooltipProvider >
  );
};

export default AppSidebar;