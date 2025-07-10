import AddStudentPage from "@/components/addStudent"

function page() {

    const onSubmit = async (data) => {
        try {
            const response = await fetch("/api/students", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!response.ok) throw new Error("Failed to add student")

            toast.success("Student added successfully!")
            reset()
        } catch (error) {
            toast.error("Failed to add student")
        }
    }
    return (
        <AddStudentPage onSubmit={onSubmit} />
    )
}

export default page