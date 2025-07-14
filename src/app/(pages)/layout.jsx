'use client';

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appSidebar";
import { useAuthStore } from "@/store/store";

export default function DashboardLayout({ children }) {
    const {role} = useAuthStore();
    return (
        <SidebarProvider className="">
            <AppSidebar role={role} />
            <main className="w-full ">
                <div className="w-full shadow-sm sticky top-0 z-50 bg-transparent backdrop-blur-xs h-12  flex items-center justify-start">
                    <SidebarTrigger className={'hover:bg-white '} />
                </div>
                <div className="w-full p-0">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
}
