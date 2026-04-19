import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import InfoPageLayout from './InfoPageLayout'

const fadeUp = (delay = 0) => ({ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay } })

export function AboutPage() {
  return (
    <InfoPageLayout title="About InsightFlow" subtitle="We're on a mission to democratize data intelligence for every team, everywhere." badge="Company">
      <div className="info-stat-row" style={{ justifyContent: 'center', marginBottom: 60 }}>
        {[
          { val: '2024', label: 'Founded' },
          { val: '50+', label: 'Team Members' },
          { val: '10K+', label: 'Files Processed' },
          { val: '99.2%', label: 'Accuracy Rate' },
        ].map((s, i) => (
          <motion.div key={i} className="info-stat" {...fadeUp(i * 0.1)}>
            <div className="info-stat-value">{s.val}</div>
            <div className="info-stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="info-section">
        <motion.div className="info-glass-card" {...fadeUp(0.1)} style={{ marginBottom: 24 }}>
          <h3 className="info-card-title" style={{ fontSize: '1.3rem' }}>Our Story</h3>
          <p className="info-card-desc" style={{ maxWidth: '100%' }}>
            InsightFlow was born from a simple frustration: data analysis shouldn't require a PhD. Our founders, experienced data scientists and engineers, 
            watched teams spend days wrestling with spreadsheets and PDFs when the actual insights were hiding in plain sight. We built InsightFlow to 
            bridge the gap between raw data and actionable intelligence — using cutting-edge AI to deliver instant, beautiful, and accurate analytics 
            that anyone can understand.
          </p>
        </motion.div>
        <motion.div className="info-glass-card" {...fadeUp(0.2)}>
          <h3 className="info-card-title" style={{ fontSize: '1.3rem', marginBottom: 32 }}>Our Values</h3>
          <div className="info-grid-3">
            {[
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>, title: 'Accuracy First', desc: 'We never sacrifice data integrity for speed. Every insight is validated.', grad: 'linear-gradient(135deg, #00d2ff, #3a7bd5)' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, title: 'Trust & Security', desc: 'Your data is sacred. We treat it with the highest level of protection.', grad: 'linear-gradient(135deg, #6c5ce7, #a29bfe)' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>, title: 'Ship Fast', desc: 'We iterate rapidly, shipping improvements every week based on real feedback.', grad: 'linear-gradient(135deg, #f72585, #ff6b9d)' },
            ].map((v, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div className="info-card-icon-premium" style={{ background: v.grad, margin: '0 auto 16px' }}>{v.icon}</div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 8px', color: '#fff' }}>{v.title}</h4>
                <p className="info-card-desc" style={{ fontSize: '0.85rem' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="info-section" style={{ marginTop: 60 }}>
        <motion.h2 className="info-section-title" style={{ textAlign: 'center', marginBottom: 40 }} {...fadeUp(0.1)}>Lead by Innovation</motion.h2>
        <div className="info-grid-3">
          {[
            { name: 'Ishan Tiwari', role: 'Chief Technical Architect', bio: 'Engineered the core high-performance RAG pipeline and InsightFlow infrastructure.', grad: 'linear-gradient(135deg, #6c5ce7, #a29bfe)' },
            { name: 'Manoj', role: 'Head of Product Operations', bio: 'Driving user-centric design and operational excellence across the AI platform.', grad: 'linear-gradient(135deg, #00d2ff, #3a7bd5)' },
            { name: 'Khushboo Pathari', role: 'Lead Data Intelligence', bio: 'Expert in multi-modal data extraction strategy and accuracy validation.', grad: 'linear-gradient(135deg, #f72585, #ff6b9d)' },
          ].map((m, i) => (
            <motion.div key={i} className="info-glass-card" style={{ textAlign: 'center', paddingTop: 40 }} {...fadeUp(i * 0.1 + 0.2)}>
              <div className="team-dp-premium" style={{ background: m.grad }}>
                {m.name.charAt(0)}
              </div>
              <h3 className="info-card-title" style={{ fontSize: '1.2rem', marginBottom: 4 }}>{m.name}</h3>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: 16, letterSpacing: '1px' }}>{m.role}</div>
              <p className="info-card-desc" style={{ fontSize: '0.88rem', lineHeight: '1.6' }}>{m.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </InfoPageLayout>
  )
}


export function ContactPage() {
  return (
    <InfoPageLayout title="Get in Touch" subtitle="Have questions? We'd love to hear from you. Our team typically responds within 2 hours." badge="Contact">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <motion.div {...fadeUp(0.1)}>
          <h3 className="info-section-title" style={{ textAlign: 'center' }}>Send us a message</h3>
          <form className="info-form" onSubmit={e => { e.preventDefault(); alert('Message sent! We\'ll get back to you soon.') }}>
            <div className="info-form-row">
              <input className="info-input" placeholder="First Name" required />
              <input className="info-input" placeholder="Last Name" required />
            </div>
            <input className="info-input" type="email" placeholder="Email Address" required />
            <input className="info-input" placeholder="Subject" />
            <textarea className="info-textarea" placeholder="Your message..." required />
            <button type="submit" className="info-submit-btn">Send Message →</button>
          </form>
        </motion.div>
      </div>
    </InfoPageLayout>
  )
}
