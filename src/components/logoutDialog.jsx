'use client';

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { SidebarMenuButton } from "./ui/sidebar";
import { LogOut, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/store/store";

export default function LogoutDialog() {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const router = useRouter()
    const { setUserData, setRole } = useAuthStore()


    const handleConfirmLogout = async () => {
        setIsLoggingOut(true);
        setTimeout(async () => {
            await axios.post('/api/auth/logout');
            setLogoutDialogOpen(false);
            setIsLoggingOut(false);
            router.push('/auth/login');
            setUserData(null);
            setRole(null);
        }, 2000);
    };

    return <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogTrigger asChild>
            <SidebarMenuButton tooltip="Logout">
                <LogOut />
                <span>Logout</span>
            </SidebarMenuButton>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-lg">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    Confirm Logout
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                    Are you sure you want to logout? You will need to sign in again to access your account.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2 sm:gap-2">
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex-1 sm:flex-none"
                    >
                        Cancel
                    </Button>
                </DialogTrigger>

                <Button
                    onClick={handleConfirmLogout}
                    disabled={isLoggingOut}
                    className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white"
                >

                    {isLoggingOut ? "Logging out..." : <> <LogOut className="h-4 w-4 mr-2" /> LogOut </>}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}