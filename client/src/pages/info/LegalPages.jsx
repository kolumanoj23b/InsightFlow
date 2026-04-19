import React from 'react'
import { motion } from 'framer-motion'
import InfoPageLayout from './InfoPageLayout'

const fadeUp = (delay = 0) => ({ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay } })

export function PrivacyPage() {
  const sections = [
    { title: 'Data Collection & Philosophy', content: 'We collect information you provide directly: account details (name, email), uploaded files for processing, and usage data. We use anonymized analytics to improve our product. We do NOT sell your personal data to third parties. Our philosophy is minimal retention: we only keep what is necessary for service delivery.' },
    { title: 'Processing & AI Attribution', content: 'Your data is used exclusively to provide InsightFlow services: file analysis, report generation, and AI-powered chat. Uploaded files are processed in ephemeral containers and deleted within 24 hours of processing unless explicitly stored by you. We use enterprise-tier AI models that do NOT use customer data for training.' },
    { title: 'Infrastructure Security', content: 'All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We are SOC 2 Type II certified and undergo regular third-party security audits. Our infrastructure runs on isolated containers with zero persistent storage by default, ensuring your data never "leaks" between sessions.' },
    { title: 'Global Privacy Rights', content: 'You have the right to access, correct, delete, or export your data at any time. We support GDPR, CCPA, and global privacy standards. For any data-related requests or inquiries into our processing practices, contact our dedicated privacy team at privacy@insightflow.ai.' },
  ]
  return (
    <InfoPageLayout title="Privacy Policy" subtitle="Your privacy is our priority. Here is how we handle and protect your data with absolute transparency." badge="Legal">
      <div className="legal-doc-container">
        <motion.div className="legal-sidebar" {...fadeUp(0.1)}>
          <div className="legal-status-pill">Last updated: April 19, 2026</div>
          <p className="legal-nav-hint">Review our data processing standards and privacy guarantees below.</p>
        </motion.div>
        
        <div className="legal-content">
          {sections.map((s, i) => (
            <motion.div key={i} className="info-glass-card" style={{ marginBottom: 20 }} {...fadeUp(i * 0.08 + 0.2)}>
              <h3 className="info-card-title" style={{ fontSize: '1.2rem', color: '#fff', marginBottom: 16 }}>{s.title}</h3>
              <p className="info-card-desc" style={{ maxWidth: '100%', lineHeight: '1.7', fontSize: '0.95rem' }}>{s.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </InfoPageLayout>
  )
}

export function TermsPage() {
  const sections = [
    { title: 'Acceptance & Scope', content: 'By accessing or using InsightFlow, you agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and InsightFlow Inc. regarding the use of our AI analytics platform, API endpoints, and document processing engine.' },
    { title: 'Account Responsibilities', content: 'You must provide accurate information when creating an account. You are responsible for maintaining the security of your credentials. You represent that you have the right to process all data uploaded to the platform.' },
    { title: 'Intellectual Property', content: 'InsightFlow and its underlying technology, models, and algorithms are owned by InsightFlow Inc. Your data remains your property. All reports and insights generated from your data belong to you under a perpetual, royalty-free license.' },
    { title: 'Service Guarantees', content: 'InsightFlow is provided "as is" with a commitment to 99.9% uptime. While we strive for absolute accuracy in AI insights, we recommend human verification for critical financial or medical document analysis.' },
  ]
  return (
    <InfoPageLayout title="Terms of Service" subtitle="Clear, fair terms that govern your use of InsightFlow. We believe in transparency and mutual trust." badge="Legal">
      <div className="legal-doc-container">
        <motion.div className="legal-sidebar" {...fadeUp(0.1)}>
          <div className="legal-status-pill">Standard Agreement v2.4</div>
          <p className="legal-nav-hint">Effective: January 1, 2026. By using InsightFlow, you agree to these mutual standards.</p>
        </motion.div>
        
        <div className="legal-content">
          {sections.map((s, i) => (
            <motion.div key={i} className="info-glass-card" style={{ marginBottom: 20 }} {...fadeUp(i * 0.08 + 0.2)}>
              <h3 className="info-card-title" style={{ fontSize: '1.2rem', color: '#fff', marginBottom: 16 }}>{s.title}</h3>
              <p className="info-card-desc" style={{ maxWidth: '100%', lineHeight: '1.7', fontSize: '0.95rem' }}>{s.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </InfoPageLayout>
  )
}

export function CookiePolicyPage() {
  return (
    <InfoPageLayout title="Cookie Policy" subtitle="How InsightFlow uses cookies and similar technologies to improve your experience." badge="Legal">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          { title: 'Essential Cookies', desc: 'Required for authentication, security, and basic site functionality. Cannot be disabled.', type: 'Required' },
          { title: 'Analytics Cookies', desc: 'Help us understand how users interact with InsightFlow. We use anonymized analytics to improve features.', type: 'Optional' },
          { title: 'Preference Cookies', desc: 'Remember your settings like theme preference, language, and dashboard layout configurations.', type: 'Optional' },
        ].map((c, i) => (
          <motion.div key={i} className="info-glass-card" {...fadeUp(i * 0.1)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <h3 className="info-card-title" style={{ margin: 0 }}>{c.title}</h3>
              <span className="info-tag" style={{ background: c.type === 'Required' ? 'rgba(255,82,82,0.12)' : 'rgba(0,230,118,0.12)', color: c.type === 'Required' ? '#ff5252' : '#00e676' }}>{c.type}</span>
            </div>
            <p className="info-card-desc">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </InfoPageLayout>
  )
}



export function SecurityPage() {
  const securityFeatures = [
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, title: 'AES-256 Encryption', desc: 'All data encrypted at rest and in transit using military-grade AES-256 encryption standard.', grad: 'linear-gradient(135deg, #f72585, #ff6b9d)' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: 'SOC 2 Type II', desc: 'Independently audited and certified for security, availability, processing integrity, and confidentiality.', grad: 'linear-gradient(135deg, #00d2ff, #40c4ff)' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><polyline points="21 3 21 8 16 8"/></svg>, title: 'Ephemeral Processing', desc: 'Files are processed in isolated containers that are destroyed immediately after analysis completes.', grad: 'linear-gradient(135deg, #00e676, #69f0ae)' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, title: 'TLS 1.3', desc: 'All network communications use the latest TLS 1.3 protocol for maximum transport security.', grad: 'linear-gradient(135deg, #7c4dff, #b388ff)' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/></svg>, title: 'Private Cloud', desc: 'Enterprise customers can deploy InsightFlow in their own VPC or on-premise infrastructure.', grad: 'linear-gradient(135deg, #ffa726, #ffcc80)' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, title: 'Compliance', desc: 'CCPA, HIPAA (with BAA), SOX, and PCI-DSS compliant. Regular third-party penetration testing.', grad: 'linear-gradient(135deg, #6c5ce7, #a29bfe)' },
  ]
  return (
    <InfoPageLayout title="Security" subtitle="Enterprise-grade security is at the core of everything we build. Your data is protected by industry-leading practices." badge="Security">
      <div className="info-grid-3">
        {securityFeatures.map((s, i) => (
          <motion.div key={i} className="info-glass-card" style={{ textAlign: 'center' }} {...fadeUp(i * 0.08)}>
            <div className="info-card-icon-premium" style={{ background: s.grad, margin: '0 auto 20px' }}>{s.icon}</div>
            <h3 className="info-card-title">{s.title}</h3>
            <p className="info-card-desc">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </InfoPageLayout>
  )
}
