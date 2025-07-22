"use client"

import { motion } from "framer-motion"
import { Shield, FileText, Users, BarChart3, Settings, Zap } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Clear Role-Based Access",
    description:
      "Different dashboards and permissions for Superusers, Admins, Teachers, and Students—each sees and manages only what they’re supposed to.",
  },
  {
    icon: FileText,
    title: "Instant Job Extraction",
    description:
      "Upload company job PDFs (even download the email as PDF) and get a ready‑made job listing in seconds—no copy‑pasting, no manual typing.",
  },
  {
    icon: Users,
    title: "Bulk Student Onboarding",
    description:
      "Add 450+ students at once by uploading an Excel sheet. The system ignores duplicates and instantly sends login credentials back to the teacher.",
  },
  {
    icon: Settings,
    title: "Drive Management for Admins",
    description:
      "Admins can set eligibility criteria, assign drives, and update round‑wise results with just a few clicks—no paperwork needed.",
  },
  {
    icon: BarChart3,
    title: "Actionable Analytics",
    description:
      "See which students applied or skipped, track progress by batch or course, and view round‑wise performance to make data‑driven decisions.",
  },
  {
    icon: Zap,
    title: "Smart Automation",
    description:
      "Automatic status updates, instant notifications, and time‑saving workflows cut manual work from hours to seconds.",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Everything You Need for Campus Hiring
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            CampusHire automates and simplifies every step—from uploading job details to tracking student progress—so your placement drives run effortlessly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
