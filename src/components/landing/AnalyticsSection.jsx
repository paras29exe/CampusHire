"use client"

import { motion } from "framer-motion"
import { Activity, Eye, Users, TrendingUp } from "lucide-react"

const analyticsFeatures = [
  {
    icon: Activity,
    title: "Application Tracking",
    description: "Keep a clear record of how many students applied, got shortlisted, or were rejected for each drive.",
  },
  {
    icon: Eye,
    title: "Drive Oversight for Admins",
    description: "Admins can review progress of assigned drives, check recruiter updates, and ensure timelines are followed.",
  },
  {
    icon: Users,
    title: "Student Engagement Reports",
    description: "View overall student participation, see who applied, and identify students yet to participate.",
  },
  {
    icon: TrendingUp,
    title: "Shortlisting via Excel",
    description: "Upload a shortlist Excel file and automatically mark everyone else as rejected to simplify management.",
  },
]


export default function AnalyticsSection() {
  return (
    <section id="analytics" className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Advanced Analytics</h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Make informed decisions with comprehensive analytics and real-time monitoring.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {analyticsFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg "
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
