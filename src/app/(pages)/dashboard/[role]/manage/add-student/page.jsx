"use client"

import { useForm } from "react-hook-form"
import { UserPlus, GraduationCap, Mail, Phone, User, Hash, Building2, Calendar, Trophy, BookOpen } from "lucide-react"
import { useState } from "react"
import { COURSES, BRANCHES, DEPARTMENTS } from "@/constants/courses"
import { PasswordRevealModal } from "@/components/passwordRevealModal"
import axios from "axios"
import { toast } from "sonner"

export default function AddStudent() {
    const [branches, setBranches] = useState([])
    const [courses, setCourses] = useState(COURSES)

    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, reset } = useForm()

    const handleCourseChange = (value) => {
        setValue("course", value)
        setValue("branch", "")
        setValue("department", "")
        setValue("batch", "")

        setBranches(BRANCHES(value));
    }

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/shared/manage/add-student', data);
            setPassword(response.data.password);
            setModalOpen(() => true);
            reset();
        } catch (error) {
            console.error("Error adding student:", error);
            toast(error.response?.data?.message || "Internal Server Error.", { style: { background: "red", color: "white" } });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {modalOpen &&
                <PasswordRevealModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    password={password}
                />
            }
            {/* Header */}
            <div className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-10">
                <div className="mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 pl-12">
                            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                                <GraduationCap className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-lg sm:text-2xl font-bold text-foreground">Add New Student</h1>
                                <p className="text-xs sm:text-sm text-muted-foreground">Register a new student with complete academic details</p>
                            </div>
                        </div>
                        <span className="text-sm max-md:hidden px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-700">Student Registration</span>
                    </div>
                </div>
            </div>

            {/* Main */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="shadow-lg border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg">
                        <div className="space-y-4 pb-8 p-6 border-b">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Student Information</h2>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span> Required fields
                                </div>
                            </div>
                            <div className="h-px bg-slate-200 dark:bg-slate-700" />
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
                            {/* Personal Details */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                                    <User className="h-5 w-5 text-blue-600" /> Personal Details
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <User className="h-4 w-4" /> Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            {...register("name", { required: "Name is required" })}
                                            placeholder="Enter full name" className="h-11 w-full rounded-md border px-3"
                                        />
                                        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <Hash className="h-4 w-4" /> Roll Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            {...register("roll_number", { required: "Roll number is required" })}
                                            placeholder="Enter roll number" className="h-11 w-full rounded-md border px-3"
                                        />
                                        {errors.roll_number && <p className="text-sm text-red-600">{errors.roll_number.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-slate-200 dark:bg-slate-700" />

                            {/* Contact Info */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                                    <Mail className="h-5 w-5 text-green-600" /> Contact Information
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <Mail className="h-4 w-4" /> Personal Email <span className="text-red-500">*</span>
                                        </label>
                                        <input type="email" {...register("email", {
                                            required: "Email is required",
                                            pattern: { value: /^\S+@\S+$/, message: "Invalid email" }
                                        })} placeholder="Enter personal email" className="h-11 w-full rounded-md border px-3" />
                                        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <Building2 className="h-4 w-4" /> College Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            {...register("college_email", {
                                                required: "College email is required",
                                                pattern: { value: /^\S+@\S+$/, message: "Invalid email" }
                                            })}
                                            placeholder="Enter college email"
                                            className="h-11 w-full rounded-md border px-3"
                                        />
                                        {errors.college_email && <p className="text-sm text-red-600">{errors.college_email.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <Phone className="h-4 w-4" /> Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            {...register("phone", { required: "Phone is required" })}
                                            placeholder="Enter phone number"
                                            className="h-11 w-full rounded-md border px-3"
                                        />
                                        {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-slate-200 dark:bg-slate-700" />

                            {/* Academic Info */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                                    <BookOpen className="h-5 w-5 text-purple-600" /> Academic Information
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <GraduationCap className="h-4 w-4" /> Course <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            {...register("course", {
                                                required: "Course is required",
                                                onChange: (e) => handleCourseChange(e.target.value)
                                            })}
                                            className="h-11 w-full rounded-md border px-3"
                                        >
                                            <option value="">Select course</option>
                                            {courses.map((c) => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                        {errors.course && <p className="text-sm text-red-600">{errors.course.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <BookOpen className="h-4 w-4" /> Branch
                                        </label>
                                        <select
                                            {...register("branch")}
                                            className="h-11 w-full rounded-md border px-3"
                                        >
                                            <option value="">Select branch</option>
                                            {branches.map((b) => <option key={b} value={b}>{b}</option>)}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <Building2 className="h-4 w-4" /> Department <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            {...register("department", { required: "Department is required" })}
                                            className="h-11 w-full rounded-md border px-3"
                                        >
                                            <option value="">Select department</option>
                                            {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                        {errors.department && <p className="text-sm text-red-600">{errors.department.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <Calendar className="h-4 w-4" /> Batch <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            {...register("batch", { required: "Batch is required" })}
                                            placeholder="Enter passing batch"
                                            className="h-11 w-full rounded-md border px-3"
                                        />
                                        {errors.batch && <p className="text-sm text-red-600">{errors.batch.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-slate-200 dark:bg-slate-700" />

                            {/* Academic Performance */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                                    <Trophy className="h-5 w-5 text-orange-600" /> Academic Performance
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <Trophy className="h-4 w-4" /> 10th Percentage <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            {...register("tenth_percentage", { required: "Required" })}
                                            className="h-11 w-full rounded-md border px-3"
                                        />
                                        {errors.tenth_percentage && <p className="text-sm text-red-600">{errors.tenth_percentage.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <Trophy className="h-4 w-4" /> 12th Percentage <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            {...register("twelfth_percentage", { required: "Required" })}
                                            className="h-11 w-full rounded-md border px-3"
                                        />
                                        {errors.twelfth_percentage && <p className="text-sm text-red-600">{errors.twelfth_percentage.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <GraduationCap className="h-4 w-4" /> Graduation Percentage
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            {...register("graduation_percentage")}
                                            className="h-11 w-full rounded-md border px-3"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <Hash className="h-4 w-4" /> Backlogs
                                        </label>
                                        <input
                                            type="number"
                                            {...register("backlogs")}
                                            className="h-11 w-full rounded-md border px-3"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <button
                                    type="reset"
                                    onClick={() => reset()}
                                    className="flex-1 p-2 outline shadow-sm rounded-md"
                                >
                                    Reset Form
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 p-2 rounded-md bg-foreground text-background flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> Adding Student...
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus className="h-4 w-4" /> Add Student
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}