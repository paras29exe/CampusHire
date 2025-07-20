"use client"

import { motion } from "framer-motion"
import { Activity, Eye, Users, TrendingUp } from "lucide-react"

const analyticsFeatures = [
  {
    icon: Activity,
    title: "Round‑Wise Results",
    description:
      "Companies give roll numbers for shortlisted , just upload it and instantly see who progressed and who was rejected — stage by stage.",
  },
  {
    icon: Eye,
    title: "Drive Progress at a Glance",
    description:
      "Track how each drive is moving, spot delays, and see recruiter updates without back‑and‑forth calls.",
  },
  {
    icon: Users,
    title: "Missed Opportunities",
    description:
      "Identify eligible students who haven’t applied yet so teachers can nudge them in time.",
  },
  {
    icon: TrendingUp,
    title: "Actionable Insights",
    description:
      "Get graphs, tables & Filter reports by batch, course, or department to plan better and improve future drives.",
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
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Advanced Drive Analytics</h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Go beyond tracking — take action with insights that help you run smoother, smarter campus drives.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {analyticsFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg"
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
