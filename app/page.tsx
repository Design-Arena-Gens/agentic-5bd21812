'use client'

import { useState } from 'react'

interface Lead {
  company: string
  industry: string
  contact: string
  email: string
  phone: string
  painPoint: string
  pitch: string
  priority: string
}

export default function Home() {
  const [formData, setFormData] = useState({
    industry: '',
    service: '',
    budget: '',
    location: '',
    targetSize: '',
    additionalInfo: ''
  })

  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/generate-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to generate leads')
      }

      const data = await response.json()
      setLeads(data.leads)
    } catch (err) {
      setError('Failed to generate leads. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🎯 Digital Marketing AI Agent</h1>
        <p>AI-Powered Client Acquisition for Your Marketing Services</p>
      </div>

      <div className="main-grid">
        <div className="card">
          <h2>Target Client Criteria</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Target Industry</label>
              <select name="industry" value={formData.industry} onChange={handleChange} required>
                <option value="">Select Industry</option>
                <option value="e-commerce">E-commerce</option>
                <option value="saas">SaaS</option>
                <option value="healthcare">Healthcare</option>
                <option value="real-estate">Real Estate</option>
                <option value="fitness">Fitness & Wellness</option>
                <option value="restaurants">Restaurants</option>
                <option value="legal">Legal Services</option>
                <option value="education">Education</option>
                <option value="finance">Finance</option>
                <option value="retail">Retail</option>
              </select>
            </div>

            <div className="form-group">
              <label>Marketing Service</label>
              <select name="service" value={formData.service} onChange={handleChange} required>
                <option value="">Select Service</option>
                <option value="seo">SEO & Content Marketing</option>
                <option value="ppc">PPC Advertising (Google/Facebook)</option>
                <option value="social-media">Social Media Management</option>
                <option value="email">Email Marketing</option>
                <option value="web-design">Web Design & Development</option>
                <option value="branding">Branding & Strategy</option>
                <option value="full-service">Full-Service Marketing</option>
              </select>
            </div>

            <div className="form-group">
              <label>Client Budget Range</label>
              <select name="budget" value={formData.budget} onChange={handleChange} required>
                <option value="">Select Budget</option>
                <option value="1k-5k">$1,000 - $5,000/month</option>
                <option value="5k-10k">$5,000 - $10,000/month</option>
                <option value="10k-25k">$10,000 - $25,000/month</option>
                <option value="25k+">$25,000+/month</option>
              </select>
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., New York, USA"
                required
              />
            </div>

            <div className="form-group">
              <label>Target Company Size</label>
              <select name="targetSize" value={formData.targetSize} onChange={handleChange} required>
                <option value="">Select Size</option>
                <option value="startup">Startup (1-10 employees)</option>
                <option value="small">Small Business (11-50 employees)</option>
                <option value="medium">Medium Business (51-200 employees)</option>
                <option value="enterprise">Enterprise (200+ employees)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Additional Requirements (Optional)</label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Any specific requirements or preferences..."
              />
            </div>

            <button type="submit" className="btn" disabled={loading}>
              {loading ? <><span className="spinner"></span> Generating Leads...</> : '🚀 Generate Leads'}
            </button>
          </form>
        </div>

        <div className="card">
          <h2>How It Works</h2>
          <p style={{marginBottom: '15px', lineHeight: '1.6', color: '#555'}}>
            Our AI agent analyzes your target criteria and generates qualified leads based on:
          </p>
          <ul style={{marginLeft: '20px', color: '#555', lineHeight: '1.8'}}>
            <li>Industry pain points and needs</li>
            <li>Budget alignment with services</li>
            <li>Company growth indicators</li>
            <li>Digital presence gaps</li>
            <li>Competitive positioning</li>
          </ul>

          <div className="stats">
            <div className="stat-card">
              <h3>85%</h3>
              <p>Lead Quality Score</p>
            </div>
            <div className="stat-card">
              <h3>2.5x</h3>
              <p>Conversion Rate</p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {loading && (
        <div className="results">
          <div className="loading-text">
            🤖 AI Agent is analyzing and generating qualified leads for you...
          </div>
        </div>
      )}

      {!loading && leads.length > 0 && (
        <div className="results">
          <h2>🎯 Generated Leads ({leads.length})</h2>
          {leads.map((lead, index) => (
            <div key={index} className="lead-item">
              <h3>{lead.company}</h3>
              <p><strong>Industry:</strong> {lead.industry}</p>
              <p><strong>Contact:</strong> {lead.contact}</p>
              <p><strong>Email:</strong> {lead.email}</p>
              <p><strong>Phone:</strong> {lead.phone}</p>
              <p><strong>Priority:</strong> <span style={{
                background: lead.priority === 'High' ? '#4caf50' : lead.priority === 'Medium' ? '#ff9800' : '#2196f3',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}>{lead.priority}</span></p>
              <p><strong>Pain Point:</strong> {lead.painPoint}</p>

              <div className="pitch">
                <h4>💡 Recommended Pitch</h4>
                <p>{lead.pitch}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
