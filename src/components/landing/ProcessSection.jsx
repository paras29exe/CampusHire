"use client"

import { motion } from "framer-motion"
import { Upload, Zap, Settings, Eye, CheckCircle, BarChart3 } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Get Job Files from Email",
    description:
      "Download job details directly from company emails as files—no typing, no copy‑paste.",
  },
  {
    icon: Zap,
    title: "Upload to CampusHire",
    description:
      "Simply upload the file to the platform. No formatting needed.",
  },
  {
    icon: Settings,
    title: "Automatic Job Listing",
    description:
      "CampusHire instantly pulls out important info and creates a neat job card for you.",
  },
  {
    icon: Eye,
    title: "Add Eligibility & Publish",
    description:
      "Admins quickly fill in batches, criteria, and apply links, then publish for students.",
  },
  {
    icon: CheckCircle,
    title: "Students Apply & Rounds Update",
    description:
      "Students see only eligible drives, apply directly, and admins update round results in bulk via Excel.",
  },
  {
    icon: BarChart3,
    title: "Track & Improve",
    description:
      "View analytics by course or batch to see who applied and how far each student progressed.",
  },
]

export default function ProcessSection() {
  return (
    <section id="process" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            How CampusHire Works
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            A simple, step‑by‑step process to handle your entire campus recruitment workflow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center relative"
            >
              <div className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white text-sm font-bold rounded-full mb-4 relative z-10">
                {index + 1}
              </div>

              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-4">
                <step.icon className="h-8 w-8 text-blue-600" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
