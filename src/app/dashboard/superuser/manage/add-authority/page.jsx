'use client';

import React from 'react'
import AddTeacher from '@/components/addTeacher'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useSearchParams } from 'next/navigation';

function page() {

    const {reset } = useForm()
    const searchParams = useSearchParams();
    const role = searchParams.get("role");
    
    const onSubmit = async (data) => {
        try {
            // const response = await axios.post("/api/superuser/manage/add-", data)

            if (response.status === 201) {
                toast.success("Teacher added successfully!")
                reset()
            } else {
                throw new Error("Failed to add teacher")
            }
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Failed to add teacher")
        }
    }

    return (
        <AddTeacher onSubmit={onSubmit} role={role}/>
    )
}

export default page