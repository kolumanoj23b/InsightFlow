import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import InfoPageLayout from './InfoPageLayout'

const fadeUp = (delay = 0) => ({ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay } })

export function FeaturesPage() {
  const navigate = useNavigate()
  const features = [
    { icon: '📄', title: 'Smart File Detection', desc: 'Automatically identifies CSV, Excel, and PDF file types and routes them through the optimal processing pipeline.', grad: 'linear-gradient(135deg,#6c5ce7,#a29bfe)' },
    { icon: '📊', title: 'Automated Reports', desc: 'Generate comprehensive PDF reports with charts, KPIs, statistical analysis, and AI-generated executive summaries.', grad: 'linear-gradient(135deg,#00d2ff,#40c4ff)' },
    { icon: '💬', title: 'Chat with PDFs', desc: 'Upload any PDF document and have natural conversations. Get accurate answers with source citations using RAG technology.', grad: 'linear-gradient(135deg,#f72585,#ff6b9d)' },
    { icon: '🔍', title: 'Vector Search (FAISS)', desc: 'Lightning-fast semantic search across all your documents using Facebook AI Similarity Search technology.', grad: 'linear-gradient(135deg,#00e676,#69f0ae)' },
    { icon: '📈', title: 'Dynamic Visualizations', desc: 'Interactive Chart.js visualizations auto-generated from your dataset with customizable chart types.', grad: 'linear-gradient(135deg,#ffa726,#ffcc80)' },
    { icon: '🤖', title: 'AI Insights Engine', desc: 'Google Gemini + OpenAI dual-LLM pipeline discovers patterns, anomalies, and trends that humans miss.', grad: 'linear-gradient(135deg,#7c4dff,#b388ff)' },
    { icon: '🔒', title: 'Enterprise Security', desc: 'AES-256 encryption, SOC 2 compliance, ephemeral processing containers, and private cloud deployment options.', grad: 'linear-gradient(135deg,#00e676,#00f5d4)' },
    { icon: '⚡', title: 'Real-Time Processing', desc: 'Sub-second file analysis with streaming results. Process millions of rows without breaking a sweat.', grad: 'linear-gradient(135deg,#ff6b35,#ffa726)' },
    { icon: '🔗', title: 'API & Integrations', desc: 'RESTful API with Python and JavaScript SDKs. Connect with Snowflake, PostgreSQL, S3, and more.', grad: 'linear-gradient(135deg,#00d2ff,#6c5ce7)' },
  ]
  return (
    <InfoPageLayout title="Platform Features" subtitle="Everything you need to transform raw data into actionable intelligence, all in one platform." badge="Features">
      <div className="info-grid-3">
        {features.map((f, i) => (
          <motion.div key={i} className="info-glass-card" {...fadeUp(i * 0.06)}>
            <div className="info-card-icon" style={{ background: f.grad }}>{f.icon}</div>
            <h3 className="info-card-title">{f.title}</h3>
            <p className="info-card-desc">{f.desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="info-section" style={{ marginTop: 60 }}>
        <div className="info-cta-block">
          <h2>Ready to explore all features?</h2>
          <p>Start your free account and experience everything InsightFlow has to offer.</p>
          <button className="info-cta-btn" onClick={() => navigate('/register')}>Get Started Free →</button>
        </div>
      </div>
    </InfoPageLayout>
  )
}

export function SolutionsPage() {
  const solutions = [
    { icon: '🏦', title: 'Financial Services', desc: 'Transaction analysis, compliance reporting, anomaly detection, and automated audit trails for banks and fintech companies.', tag: 'Finance', tagColor: 'rgba(108,92,231,0.15)', tagText: '#a29bfe' },
    { icon: '🏥', title: 'Healthcare & Life Sciences', desc: 'Clinical data processing, research paper intelligence, patient outcome analytics, and HIPAA-compliant document handling.', tag: 'Healthcare', tagColor: 'rgba(0,210,255,0.15)', tagText: '#00d2ff' },
    { icon: '🛒', title: 'Retail & E-Commerce', desc: 'Sales forecasting, inventory optimization, customer behavior analysis, and real-time revenue dashboards.', tag: 'Retail', tagColor: 'rgba(247,37,133,0.15)', tagText: '#f72585' },
    { icon: '🎓', title: 'Education & Research', desc: 'Student performance analytics, research paper analysis, institutional reporting, and academic data visualization.', tag: 'Education', tagColor: 'rgba(0,230,118,0.15)', tagText: '#00e676' },
    { icon: '⚡', title: 'SaaS & Technology', desc: 'Product analytics, user behavior tracking, churn prediction, and automated KPI reporting for growth teams.', tag: 'Technology', tagColor: 'rgba(255,167,38,0.15)', tagText: '#ffa726' },
    { icon: '🏗️', title: 'Real Estate & Construction', desc: 'Market analysis, property valuations, trend forecasting, and portfolio performance tracking.', tag: 'Real Estate', tagColor: 'rgba(124,77,255,0.15)', tagText: '#7c4dff' },
  ]
  return (
    <InfoPageLayout title="Industry Solutions" subtitle="Tailored analytics solutions for every industry. InsightFlow adapts to your unique data challenges." badge="Solutions">
      <div className="info-grid-2">
        {solutions.map((s, i) => (
          <motion.div key={i} className="info-glass-card" {...fadeUp(i * 0.08)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <span style={{ fontSize: '2.2rem' }}>{s.icon}</span>
              <span className="info-tag" style={{ background: s.tagColor, color: s.tagText }}>{s.tag}</span>
            </div>
            <h3 className="info-card-title">{s.title}</h3>
            <p className="info-card-desc">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </InfoPageLayout>
  )
}

export function PricingPage() {
  const navigate = useNavigate()
  const plans = [
    { tier: 'Starter', price: '$0', period: '/mo', desc: 'For individuals exploring data analytics.', features: ['5 file uploads/month', 'Basic PDF reports', 'CSV & Excel support', 'Email support', 'Community access'], featured: false },
    { tier: 'Professional', price: '$29', period: '/mo', desc: 'For teams needing advanced analytics & AI.', features: ['Unlimited uploads', 'AI-powered insights', 'Chat with PDFs (RAG)', 'Priority support', 'Custom branding', 'API access', 'Advanced visualizations'], featured: true },
    { tier: 'Enterprise', price: 'Custom', period: '', desc: 'Dedicated infrastructure for large orgs.', features: ['Everything in Pro', 'SSO & SAML', 'Dedicated CSM', 'Custom integrations', '99.99% SLA', 'On-premise option', 'Audit logs', 'Training & onboarding'], featured: false },
  ]
  return (
    <InfoPageLayout title="Pricing Plans" subtitle="Start free. Scale as you grow. No hidden fees, no surprises." badge="Pricing">
      <div className="info-grid-3">
        {plans.map((p, i) => (
          <motion.div key={i} className={`info-glass-card info-pricing-card ${p.featured ? 'info-pricing-featured' : ''}`} {...fadeUp(i * 0.1)}>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 8 }}>{p.tier}</div>
            <div className="info-price">{p.price}<span>{p.period}</span></div>
            <div className="info-price-desc">{p.desc}</div>
            <ul className="info-feature-list">
              {p.features.map((f, j) => <li key={j}><span className="check">✓</span>{f}</li>)}
            </ul>
            <button className={p.featured ? 'info-cta-btn' : 'info-back-btn'} style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/register')}>
              {p.tier === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
            </button>
          </motion.div>
        ))}
      </div>
      <motion.div className="info-section" style={{ marginTop: 60 }} {...fadeUp(0.3)}>
        <div className="info-cta-block">
          <h2>Need a custom plan?</h2>
          <p>Our team will work with you to build the perfect solution for your organization.</p>
          <button className="info-cta-btn" onClick={() => navigate('/contact')}>Talk to Sales →</button>
        </div>
      </motion.div>
    </InfoPageLayout>
  )
}

export function IntegrationsPage() {
  const integrations = [
    { icon: '🐘', name: 'PostgreSQL', desc: 'Direct database connectivity for real-time analytics on production data.', cat: 'Database' },
    { icon: '❄️', name: 'Snowflake', desc: 'Cloud data warehouse integration for enterprise-scale analytics.', cat: 'Data Warehouse' },
    { icon: '☁️', name: 'AWS S3', desc: 'Seamless file ingestion from Amazon S3 buckets with auto-sync.', cat: 'Cloud Storage' },
    { icon: '📊', name: 'Tableau', desc: 'Export InsightFlow visualizations directly to Tableau dashboards.', cat: 'BI Tools' },
    { icon: '📁', name: 'Google Sheets', desc: 'Two-way sync with Google Sheets for collaborative data analysis.', cat: 'Productivity' },
    { icon: '🔔', name: 'Slack', desc: 'Get real-time notifications when reports are ready or anomalies detected.', cat: 'Communication' },
    { icon: '📧', name: 'Zapier', desc: 'Connect InsightFlow to 5,000+ apps with zero-code automation workflows.', cat: 'Automation' },
    { icon: '🔄', name: 'REST API', desc: 'Full programmatic access to all InsightFlow capabilities via REST endpoints.', cat: 'Developer' },
  ]
  return (
    <InfoPageLayout title="Integrations" subtitle="Connect InsightFlow to your entire data ecosystem. Native integrations for every modern stack." badge="Integrations">
      <div className="info-grid-4">
        {integrations.map((ig, i) => (
          <motion.div key={i} className="info-glass-card" style={{ textAlign: 'center' }} {...fadeUp(i * 0.06)}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{ig.icon}</div>
            <h3 className="info-card-title">{ig.name}</h3>
            <span className="info-tag" style={{ background: 'rgba(0,210,255,0.1)', color: '#00d2ff', marginBottom: 10, display: 'inline-block' }}>{ig.cat}</span>
            <p className="info-card-desc">{ig.desc}</p>
          </motion.div>
        ))}
      </div>
    </InfoPageLayout>
  )
}

export function ChangelogPage() {
  const entries = [
    { ver: 'v2.4.0', date: 'April 2026', title: 'Gemini 2.5 Pro Integration', changes: ['Upgraded RAG pipeline to Google Gemini 2.5 Pro', 'Added dual-LLM report generation (OpenAI + Gemini)', 'Improved PDF parsing accuracy by 34%', 'New interactive chart types'] },
    { ver: 'v2.3.0', date: 'March 2026', title: 'Dashboard Overhaul', changes: ['Completely redesigned analytics dashboard', 'Added real-time data streaming', 'New visualization export options', 'Performance improvements (2x faster)'] },
    { ver: 'v2.2.0', date: 'February 2026', title: 'Enterprise Features', changes: ['SSO/SAML authentication', 'Audit logging system', 'Custom branding options', 'Team collaboration tools'] },
    { ver: 'v2.1.0', date: 'January 2026', title: 'Chat with PDF Launch', changes: ['FAISS-powered vector search', 'Multi-document chat sessions', 'Source citation in responses', 'PDF text extraction improvements'] },
  ]
  return (
    <InfoPageLayout title="Changelog" subtitle="Track every improvement, feature, and fix. We ship fast and iterate constantly." badge="Updates">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {entries.map((e, i) => (
          <motion.div key={i} className="info-glass-card" {...fadeUp(i * 0.1)}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
              <span className="info-tag" style={{ background: 'rgba(108,92,231,0.15)', color: '#a29bfe' }}>{e.ver}</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{e.date}</span>
            </div>
            <h3 className="info-card-title">{e.title}</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {e.changes.map((c, j) => <li key={j} style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', gap: 8 }}><span style={{ color: 'var(--accent-success)' }}>+</span>{c}</li>)}
            </ul>
          </motion.div>
        ))}
      </div>
    </InfoPageLayout>
  )
}
