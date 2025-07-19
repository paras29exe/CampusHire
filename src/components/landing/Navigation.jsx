"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

const navItems = [
  { name: "Features", href: "#features" },
  { name: "How it Works", href: "#process" },
  { name: "Analytics", href: "#analytics" },
  { name: "Contact", href: "#contact" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="sticky top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 aspect-square rounded-lg overflow-hidden flex items-center justify-center">
              <img src="/logo.png" alt="logo" />
            </div>
            <span className="text-xl font-bold text-gray-900">CampusHire</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Login Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={() => router.push('/auth/login')}
              className="bg-blue-600"
              >
              Login
            </Button>
          </div>

          {/* Mobile menu button and login */}
          <div className="md:hidden flex items-center space-x-3">
            <Button onClick={() =>  router.push('/auth/login')} className={"bg-blue-600"}>Login</Button>
            <Button onClick={() => setIsOpen(!isOpen)} variant={"outline"} className={"p-0"}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100"
          >
            <div className="py-4 space-y-4">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <Button
                  variant={'outline'}
                  onClick={() => router.push('/auth/login')}
                >
                  Login
                </Button>
            </div>
          </div>
          </motion.div>
        )}
    </div>
    </motion.nav >
  )
}
