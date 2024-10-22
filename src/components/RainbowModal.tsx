import React, { useState, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface RainbowModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export default function RainbowModal({ isOpen = false, onClose = () => {}, title = "Modal Title", children }: RainbowModalProps) {
  const [hue, setHue] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setHue((prevHue) => (prevHue + 0.5) % 360)
    }, 100) // Changed from 50 to 100 milliseconds

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundColor: `hsla(${hue}, 40%, 20%, 0.1)`, // Changed from 0.5 to 0.2
            }}
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
