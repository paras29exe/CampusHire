"use client"

import { motion } from "framer-motion"
import { Zap, Users, BarChart3, FileText } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Turns Hours into Seconds",
    description:
      "Companies send job details as emails. Just upload them—CampusHire turns them into ready‑to‑post listings in less than 10 seconds.",
  },
  {
    icon: Users,
    title: "Onboard 450+ Students Fast",
    description:
      "Import students in bulk via Excel. Duplicates are skipped, new passwords are auto‑generated, and credentials are emailed instantly.",
  },
  {
    icon: BarChart3,
    title: "Know What Others Missed",
    description:
      "See which eligible students applied or missed out, and track how far each progressed in every round.",
  },
  {
    icon: Zap,
    title: "Update Rounds in One Go",
    description:
      "Upload a shortlist roll numbers Excel, and CampusHire instantly updates hundreds of student statuses—no manual work.",
  },
]

export default function WhyChooseSection() {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Why Choose CampusHire?
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Stop wasting hours on manual work. Automate and simplify your campus drives.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeInOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-center p-6 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-lg"
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
