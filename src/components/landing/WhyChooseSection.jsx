"use client"

import { motion } from "framer-motion"
import { MessageSquareOff, Zap, Users, BarChart3 } from "lucide-react"

const features = [
  {
    icon: MessageSquareOff,
    title: "End WhatsApp Chaos",
    description: "Replace scattered group chats with a unified, organized communication platform.",
  },
  {
    icon: Zap,
    title: "AI-Powered Automation",
    description: "Intelligent PDF processing and automated workflows reducing Job listing time from 15 minutes to ~7 seconds.",
  },
  {
    icon: Users,
    title: "Streamlined Onboarding",
    description: "Bulk import and manage student data with smart validation and processing.",
  },
  {
    icon: BarChart3,
    title: "Unified Dashboard",
    description: "Role-based access with real-time insights for complete recruitment oversight.",
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
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why Choose CampusHire?</h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Modern solutions for age-old campus recruitment challenges.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeInOut" }}
              viewport={{ once: true, amount:0.2 }}
              className="text-center p-6 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-lg "
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
