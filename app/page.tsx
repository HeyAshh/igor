'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Phone, Laptop, Printer, HardDrive, Cpu, Wifi, Shield, Smartphone, Server, Database, Monitor, Wrench, ChevronDown, ChevronUp } from 'lucide-react'

export default function Component() {
  const [showServices, setShowServices] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const controls = useAnimation()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let width = canvas.width
    let height = canvas.height

    const particles: { x: number; y: number; radius: number; vx: number; vy: number }[] = []

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      })
    }

    function animate() {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, width, height)

      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > width) particle.vx *= -1
        if (particle.y < 0 || particle.y > height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 59, 48, 0.05)'
        ctx.fill()
      })
    }

    animate()

    controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } })

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        width = canvas.width
        height = canvas.height
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [controls])

  const services = [
    { icon: Laptop, title: "Popravka laptopova" },
    { icon: Smartphone, title: "Popravka telefona" },
    { icon: Printer, title: "Servis štampača" },
    { icon: HardDrive, title: "Oporavak podataka" },
    { icon: Shield, title: "Sigurnosni sistemi" },
    { icon: Wifi, title: "Podešavanje mreže" },
    { icon: Server, title: "Održavanje servera" },
    { icon: Database, title: "Upravljanje bazama podataka" },
    { icon: Monitor, title: "Popravka ekrana" },
    { icon: Cpu, title: "Nadogradnja hardvera" },
    { icon: Wrench, title: "Opšta IT podrška" },
    { icon: Phone, title: "VoIP rešenja" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 flex flex-col relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center p-4 space-y-6">
        <motion.div 
          className="text-center space-y-3"
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-red-300" style={{ textShadow: '0 0 5px rgba(255, 0, 0, 0.3)' }}>
            Igor Gurenko IT Usluge
          </h1>
          <h2 className="text-xl font-semibold text-gray-300">Profesionalna IT i hardverska rešenja</h2>
          <p className="text-md text-gray-400 max-w-2xl mx-auto">
            Sveobuhvatno održavanje i podrška za sve vaše IT potrebe
          </p>
        </motion.div>

        <motion.a 
          href="tel:+381637719817"
          className="inline-flex items-center px-6 py-3 text-xl font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 rounded-full hover:from-red-500 hover:to-red-400 transition-all duration-300 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
        >
          <Phone className="mr-2 h-5 w-5" />
          +381 63 771 9817
        </motion.a>

        <motion.button
          onClick={() => setShowServices(!showServices)}
          className="relative inline-flex items-center justify-center px-5 py-2 text-lg font-semibold text-white bg-gradient-to-br from-red-900 to-red-700 hover:from-red-800 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 97% 100%, 3% 100%)",
            borderRadius: "12px"
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
        >
          <span className="mr-2 relative z-10">Usluge</span>
          {showServices ? (
            <ChevronUp className="h-4 w-4 relative z-10" />
          ) : (
            <ChevronDown className="h-4 w-4 relative z-10" />
          )}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: showServices ? 1.5 : 0, opacity: showServices ? 0.3 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ borderRadius: '50%' }}
          />
        </motion.button>

        <AnimatePresence>
          {showServices && (
            <motion.div 
              className="grid grid-cols-2 gap-3 max-w-md w-full"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {services.map((service, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-2 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-sm p-2 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 59, 48, 0.1)" }}
                >
                  <div className="bg-gradient-to-br from-red-500 to-red-600 p-1.5 rounded-full shadow-md">
                    <service.icon className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-200">{service.title}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full max-w-4xl mt-10">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold text-center mb-2 bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent" style={{ textShadow: '0 0 5px rgba(255, 0, 0, 0.3)' }}>
              Naša Lokacija
            </h3>
            <p className="text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-red-300" style={{ textShadow: '0 0 5px rgba(255, 0, 0, 0.3)' }}>
              Matice Srpske 91a Kancelarija 3, Beograd
            </p>
          </div>
          <div className="w-full h-64 md:h-80 lg:h-96 mt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2834.4231572386365!2d20.438174815292423!3d44.80450947909862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a70ef9020bf67%3A0xd63ed1433e5073a!2sMatice%20Srpske%2091a%2C%2011000%20Beograd%2C%20Serbia!5e0!3m2!1sen!2sus!4v1696500000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
              title="Google Maps - Matice Srpske 91a, Beograd"
            ></iframe>
          </div>
          <p className="text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-red-300 mt-4" style={{ textShadow: '0 0 5px rgba(255, 0, 0, 0.3)' }}>
            igor.gurenko@yourdomain.rs
          </p>
        </div>
      </div>

      <motion.footer 
        className="relative z-10 p-3 text-center text-xs text-gray-500"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
      >
        <p>&copy; {new Date().getFullYear()} Igor Gurenko IT Usluge. Sva prava zadržana.</p>
      </motion.footer>
    </div>
  )
}
