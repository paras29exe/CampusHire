'use client';

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appSidebar";
import { useAuthStore } from "@/store/store";
import { ArrowLeft } from "lucide-react";
import ScrollToTop from "@/components/scrollToTop";

export default function DashboardLayout({ children }) {
    const { role } = useAuthStore();
    return (
        <>
            <ScrollToTop />
            <SidebarProvider className="">
                <AppSidebar role={role} />
                <main className="max-w-[1650px] mx-auto w-full">
                    <div className="w-full shadow-sm sticky top-0 z-50 bg-transparent backdrop-blur-xs h-12  flex items-center justify-start">
                        <SidebarTrigger className={'hover:bg-white '} />
                        <div onClick={() => window.history.back()} className=" ml-2 cursor-default select-none flex items-center gap-1 text-gray-700 font-semibold">
                            <ArrowLeft className="w-4 aspect-square" /> Back
                        </div>
                    </div>
                    <div className="w-full">
                        {children}
                    </div>
                </main>
            </SidebarProvider>
        </>

    );
}
