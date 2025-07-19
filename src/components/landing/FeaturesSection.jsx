"use client"

import { motion } from "framer-motion"
import { Shield, FileText, Users, BarChart3, Settings, Zap } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Role-Based Access",
    description: "Secure permissions for students, coordinators, and administrators.",
  },
  {
    icon: FileText,
    title: "AI PDF Extraction",
    description: "Automatically extract job details from company PDFs with high accuracy.",
  },
  {
    icon: Users,
    title: "Bulk Student Management",
    description: "Import and manage student profiles with automated validation.",
  },
  {
    icon: Settings,
    title: "Admin Controls",
    description: "Complete oversight and management tools for placement administrators.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Real-time insights into applications, placements, and drive performance.",
  },
  {
    icon: Zap,
    title: "Smart Workflows",
    description: "Automated notifications and status updates for seamless operations.",
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
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Comprehensive Features</h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Everything you need to run efficient campus recruitment drives.
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
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg "
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
