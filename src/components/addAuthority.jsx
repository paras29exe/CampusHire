"use client"

import { useState } from "react"
import { UserPlus, Building2, Mail, Phone, User, Hash } from "lucide-react"
import { useForm } from "react-hook-form"

const DEPARTMENTS = [
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Mechanical",
  "Civil",
  "Mathematics",
  "Physics",
  "Chemistry",
  "English",
  "Management",
]

export default function AddAuthority({ onSubmit, role = "teacher", form }) {
  const roleTitle = role.charAt(0).toUpperCase() + role.slice(1)

  const {handleSubmit, register, reset, formState: { isSubmitting } } = form;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header Section */}
      <div className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:pr-6 sm:pl-12 sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                <UserPlus className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Add New {roleTitle}
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-tight">
                  Create a new {role} account with complete details
                </p>
              </div>
            </div>
            <div className="sm:ml-auto">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                {roleTitle} Registration
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-xl border border-slate-200 bg-white/60 dark:border-slate-800 dark:bg-slate-800/60 backdrop-blur-sm shadow-lg">
            <div className="flex flex-col space-y-4 p-6 pb-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Personal Information
                </h3>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Required fields
                </div>
              </div>
              <div className="h-px bg-slate-200 dark:bg-slate-700"></div>
            </div>

            <div className="p-6 pt-0 space-y-8">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-dashed border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5" />
                  <div>
                    <label className="text-sm font-medium text-slate-900 dark:text-slate-100">Assigned Role</label>
                    <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mt-1">{roleTitle}</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <Hash className="h-4 w-4" />
                        Employee ID
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="employee_id"
                        {...register("employee_id", { required: true })}
                        placeholder="Enter employee ID"
                        className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Full Name
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        {...register("name", { required: true })}
                        placeholder="Enter full name"
                        className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Address
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        {...register("email", { required: true })}
                        placeholder="Enter email address"
                        className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Number
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        {...register("phone", { required: true })}
                        placeholder="Enter phone number"
                        className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Department
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="department"
                        {...register("department", { required: true })}
                        className="flex h-11 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                        required
                      >
                        <option value="">Select department</option>
                        {DEPARTMENTS.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-200 dark:bg-slate-700"></div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="reset"
                    disabled={isSubmitting}
                    onClick={() => reset()}
                    className="flex-1 h-11 inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-800 dark:focus-visible:ring-slate-300"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 h-11 inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 shadow hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 dark:focus-visible:ring-slate-300"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Adding..." : `Add ${roleTitle}`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}