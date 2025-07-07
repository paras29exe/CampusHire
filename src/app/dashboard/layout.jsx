import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({ children }) {
    return (
        <SidebarProvider className="">
            <AppSidebar role={'student'} />
            <main className="w-full ">
                <div className="w-full sticky top-0 z-50 bg-background h-12  flex items-center justify-start">
                    <SidebarTrigger className={'hover:bg-white '} />
                </div>

                {children}
            </main>
        </SidebarProvider>
    );
}
