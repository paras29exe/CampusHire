import React from 'react'
import AddTeacher from '@/components/addTeacher'

function page() {

    const onSubmit = async (data) => {
        try {
            const response = await fetch("/api/teachers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!response.ok) throw new Error("Failed to add teacher")

            toast.success("Teacher added successfully!")
            reset()
        } catch (error) {
            toast.error("Failed to add teacher")
        }
    }

    return (
        <AddTeacher onSubmit={onSubmit} />
    )
}

export default page