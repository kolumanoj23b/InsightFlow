import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './InfoPages.css'

function MiniParticles() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId, particles = []
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize(); window.addEventListener('resize', resize)
    class P {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.3; this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3; this.opacity = Math.random() * 0.4 + 0.05
        this.hue = Math.random() > 0.5 ? 258 : 195
      }
      update() {
        this.x += this.speedX; this.y += this.speedY
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${this.hue},80%,70%,${this.opacity})`; ctx.fill()
      }
    }
    for (let i = 0; i < 60; i++) particles.push(new P())
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      animId = requestAnimationFrame(animate)
    }
    animate()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId) }
  }, [])
  return <canvas ref={canvasRef} className="info-particles" />
}

export default function InfoPageLayout({ children, title, subtitle, badge }) {
  const navigate = useNavigate()
  return (
    <div className="info-page">
      <MiniParticles />
      <div className="info-orb info-orb-1" />
      <div className="info-orb info-orb-2" />
      <div className="info-orb info-orb-3" />

      {/* Navbar */}
      <motion.nav className="info-nav" initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        <div className="info-nav-container">
          <Link to="/" className="info-logo">
            <div className="info-logo-icon">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L29.8564 10V26L16 34L2.14359 26V10L16 2Z" stroke="url(#infoLG_new)" strokeWidth="3" strokeLinejoin="round" fill="none" />
                <path d="M16 8L22.9282 12V20L16 24L9.0718 20V12L16 8Z" fill="url(#infoLG_pulse)" fillOpacity="0.6">
                  <animate attributeName="fill-opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
                </path>
                <circle cx="16" cy="16" r="3" fill="#fff">
                  <animate attributeName="r" values="2;3.5;2" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <defs>
                  <linearGradient id="infoLG_new" x1="2" y1="2" x2="30" y2="30">
                    <stop stopColor="#6c5ce7"/><stop offset="1" stopColor="#00d2ff"/>
                  </linearGradient>
                  <linearGradient id="infoLG_pulse" x1="16" y1="8" x2="16" y2="24">
                    <stop stopColor="#a29bfe"/><stop offset="1" stopColor="#6c5ce7"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="info-logo-text">InsightFlow</span>
          </Link>
          <div className="info-nav-links">
            <Link to="/#features">Features</Link>
            <Link to="/#pricing">Pricing</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="info-nav-actions">
            <button className="info-btn-ghost" onClick={() => navigate('/login')}>Sign In</button>
            <button className="info-btn-primary" onClick={() => navigate('/register')}>Get Started</button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Banner */}
      <motion.section className="info-hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
        <div className="info-hero-glow" />
        {badge && (
          <motion.span className="info-hero-badge" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            {badge}
          </motion.span>
        )}
        <motion.h1 className="info-hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}>
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p className="info-hero-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}>
            {subtitle}
          </motion.p>
        )}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          <button className="info-back-btn" onClick={() => navigate('/')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Home
          </button>
        </motion.div>
      </motion.section>

      {/* Page Content */}
      <main className="info-content">
        {children}
      </main>

      {/* Mini Footer */}
      <footer className="info-footer">
        <div className="info-footer-inner">
          <p>&copy; 2026 InsightFlow Inc. All rights reserved.</p>
          <div className="info-footer-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
