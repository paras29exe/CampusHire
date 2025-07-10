import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appSidebar";

export default function DashboardLayout({ children }) {
    return (
        <SidebarProvider className="">
            <AppSidebar role={'superuser'} />
            <main className="w-full ">
                <div className="w-full shadow-sm sticky top-0 z-50 bg-background h-12  flex items-center justify-start">
                    <SidebarTrigger className={'hover:bg-white '} />
                </div>
                <div className="w-full p-0">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
}
