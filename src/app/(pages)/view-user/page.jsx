'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import ViewAuthority from "@/components/viewAuthority";
import ViewStudent from "@/components/viewStudent";

export default function Page() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams();
    const userId = searchParams.get("uid");
    const role = searchParams.get("role");

    useEffect(() => {
        if (userId && role) {
            const fetchUser = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`/api/views/view-user?userId=${userId}&role=${role}`);
                    setUser(response.data.user);
                } catch (error) {
                    toast.error(error.response?.data?.message || "Failed to fetch user data");
                    
                } finally {
                    setLoading(false);
                }
            };

            fetchUser();
        } else {
            toast.error("Invalid Url parameters");
            setLoading(false);
        }
    }, [userId, role]);


    return (
        role === "student" ? (
            <ViewStudent student={user} loading={loading} />
        ) : (
            <ViewAuthority authority={user} loading={loading} />
        )
    )
}