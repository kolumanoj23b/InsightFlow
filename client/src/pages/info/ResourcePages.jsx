import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import InfoPageLayout from './InfoPageLayout'

const fadeUp = (delay = 0) => ({ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay } })

export function DocsPage() {
  const navigate = useNavigate()
  const sections = [
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>, title: 'Quick Start Guide', desc: 'Get up and running in under 5 minutes with our step-by-step setup guide.', tag: 'Getting Started', grad: 'linear-gradient(135deg, #f72585, #ff6b9d)' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>, title: 'File Upload API', desc: 'Learn how to upload CSV, Excel, and PDF files programmatically via REST endpoints.', tag: 'API', grad: 'linear-gradient(135deg, #00d2ff, #40c4ff)' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>, title: 'Report Generation', desc: 'Configure and customize automated report generation with templates and branding.', tag: 'Reports', grad: 'linear-gradient(135deg, #00e676, #69f0ae)' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, title: 'RAG Chat API', desc: 'Build conversational interfaces powered by InsightFlow\'s document intelligence pipeline.', tag: 'AI Chat', grad: 'linear-gradient(135deg, #7c4dff, #b388ff)' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, title: 'Authentication', desc: 'API key management, OAuth 2.0 flows, and webhook signature verification.', tag: 'Security', grad: 'linear-gradient(135deg, #ffa726, #ffcc80)' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>, title: 'Webhooks', desc: 'Subscribe to real-time events: report completion, anomaly detection, file processing.', tag: 'Events', grad: 'linear-gradient(135deg, #6c5ce7, #a29bfe)' },
  ]
  return (
    <InfoPageLayout title="Documentation" subtitle="Comprehensive guides, API references, and tutorials to help you build with InsightFlow." badge="Docs">
      <div className="info-grid-3">
        {sections.map((s, i) => (
          <motion.div key={i} className="info-glass-card" style={{ cursor: 'pointer' }} {...fadeUp(i * 0.08)}>
            <div className="info-card-icon-premium" style={{ background: s.grad }}>{s.icon}</div>
            <span className="info-tag" style={{ background: 'rgba(108,92,231,0.12)', color: '#a29bfe', marginBottom: 12, display: 'inline-block' }}>{s.tag}</span>
            <h3 className="info-card-title">{s.title}</h3>
            <p className="info-card-desc">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </InfoPageLayout>
  )
}



export function BlogPage() {
  const posts = [
    { image: '/images/blog/blog_llm_pipeline_1776597668033.png', title: 'How We Built a Dual-LLM Report Generation Pipeline', date: 'Apr 15, 2026', cat: 'Engineering', excerpt: 'A deep dive into our architecture that uses OpenAI for insight extraction and Google Gemini for structured report generation.' },
    { image: '/images/blog/blog_data_analytics_1776597684551.png', title: 'The Future of Automated Data Analytics in 2026', date: 'Apr 10, 2026', cat: 'Industry', excerpt: 'AI-powered analytics platforms are reshaping how businesses make decisions. Here\'s what\'s coming next.' },
    { image: '/images/blog/blog_rag_finetuning_1776597702355.png', title: 'RAG vs Fine-Tuning: When to Use Each for Document AI', date: 'Apr 5, 2026', cat: 'AI Research', excerpt: 'Comparing Retrieval-Augmented Generation with model fine-tuning for document intelligence applications.' },
    { image: '/images/blog/blog_enterprise_security_1776597719606.png', title: 'Enterprise Data Security: Our Zero-Trust Approach', date: 'Mar 28, 2026', cat: 'Security', excerpt: 'How InsightFlow processes sensitive data in ephemeral containers with AES-256 encryption and SOC 2 compliance.' },
    { image: '/images/blog/blog_csv_analysis_1776597736651.png', title: '10 CSV Analysis Techniques Every Data Team Should Know', date: 'Mar 20, 2026', cat: 'Tutorial', excerpt: 'From pivot tables to anomaly detection — essential techniques for extracting insights from structured data.' },
    { image: '/images/blog/blog_vector_search_1776597752841.png', title: 'Why We Chose FAISS Over Pinecone for Vector Search', date: 'Mar 15, 2026', cat: 'Engineering', excerpt: 'Our technical evaluation of vector databases and why Facebook AI Similarity Search won for our use case.' },
  ]
  return (
    <InfoPageLayout title="Blog & Insights" subtitle="Engineering deep dives, product updates, and data intelligence thought leadership." badge="Blog">
      <div className="info-grid-3">
        {posts.map((p, i) => (
          <motion.div key={i} className="info-glass-card blog-card-premium" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }} {...fadeUp(i * 0.08)}>
            <div className="blog-card-image-wrapper">
              <img src={p.image} alt={p.title} className="blog-card-img" />
              <div className="blog-card-overlay"></div>
            </div>
            <div className="blog-card-body">
              <div className="blog-card-meta">
                <span className="blog-cat">{p.cat}</span>
                <span>{p.date}</span>
              </div>
              <h3 className="blog-card-title">{p.title}</h3>
              <p className="blog-card-excerpt" style={{ marginBottom: 20 }}>{p.excerpt}</p>
              <div className="tutorial-action-link">
                Read Article <span>→</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </InfoPageLayout>
  )
}


