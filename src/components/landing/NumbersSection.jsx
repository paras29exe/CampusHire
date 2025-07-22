"use client"

import { motion } from "framer-motion"

const stats = [
  { number: "90%", label: "Job Details Captured Correctly", description: "Almost every detail from company files is extracted accurately." },
  { number: "95%", label: "Time Saved on Each Drive", description: "Job listing time reduced to ~10 seconds from 15 minutes" },
  { number: "100%", label: "Safe and Secure Data", description: "Your student and company data is fully protected." },
  { number: "24/7", label: "Always Available", description: "Access the platform anytime, from anywhere." },
]

export default function NumbersSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Built for Real Impact</h2>
          <p className="text-base text-blue-100 max-w-2xl mx-auto">
            CampusHire delivers clear results that save time, reduce errors, and keep your data safe.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-sm font-medium text-blue-100 mb-1">{stat.label}</div>
              <div className="text-xs text-blue-200">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
