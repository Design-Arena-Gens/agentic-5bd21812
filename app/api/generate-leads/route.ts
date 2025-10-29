import { NextRequest, NextResponse } from 'next/server'

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

const generateMockLeads = (formData: any): Lead[] => {
  const industryData: Record<string, any> = {
    'e-commerce': {
      companies: ['ShopTrend', 'StyleMarket', 'QuickCart', 'UrbanGoods', 'EcoStore'],
      painPoints: [
        'Low conversion rates on product pages',
        'High cart abandonment rates',
        'Poor mobile shopping experience',
        'Limited organic search visibility',
        'Weak social media presence'
      ]
    },
    'saas': {
      companies: ['CloudSync Pro', 'DataFlow Systems', 'AgileTask', 'SecureVault', 'TeamConnect'],
      painPoints: [
        'Low trial-to-paid conversion',
        'Ineffective content marketing strategy',
        'Poor SEO rankings for key terms',
        'Struggling with customer acquisition costs',
        'Limited brand awareness in market'
      ]
    },
    'healthcare': {
      companies: ['HealthFirst Clinic', 'WellCare Medical', 'Prime Health Center', 'VitalLife', 'CarePoint'],
      painPoints: [
        'Low patient appointment bookings',
        'Poor online reputation management',
        'Weak local SEO presence',
        'Outdated website design',
        'No digital patient engagement strategy'
      ]
    },
    'real-estate': {
      companies: ['Premier Realty', 'Skyline Properties', 'Homestead Group', 'Urban Estates', 'Vista Homes'],
      painPoints: [
        'Low quality leads from current marketing',
        'Poor property listing visibility',
        'Weak social media engagement',
        'Limited video marketing capabilities',
        'Ineffective email nurture campaigns'
      ]
    },
    'fitness': {
      companies: ['FitZone Studio', 'PowerFlex Gym', 'Wellness 360', 'CoreStrength', 'Active Life'],
      painPoints: [
        'Declining membership signups',
        'Poor social media reach',
        'No effective local marketing',
        'Weak online booking system',
        'Limited class visibility online'
      ]
    },
    'restaurants': {
      companies: ['Urban Bites', 'Flavor House', 'The Green Kitchen', 'Coastal Grill', 'Spice & Soul'],
      painPoints: [
        'Low online ordering conversion',
        'Poor Google Maps visibility',
        'Weak Instagram presence',
        'No email marketing to customers',
        'Limited delivery platform optimization'
      ]
    },
    'legal': {
      companies: ['Smith & Associates', 'Justice Legal Group', 'Integrity Law Firm', 'Premier Counsel', 'Advocate Partners'],
      painPoints: [
        'Difficulty attracting high-value clients',
        'Poor thought leadership positioning',
        'Weak content marketing strategy',
        'Limited online visibility for practice areas',
        'No systematic referral generation'
      ]
    },
    'education': {
      companies: ['BrightFuture Academy', 'LearnWell Institute', 'Knowledge Plus', 'Elite Tutoring', 'Scholar Path'],
      painPoints: [
        'Low student enrollment rates',
        'Poor parent engagement',
        'Weak online course visibility',
        'Limited social proof and testimonials',
        'Ineffective PPC campaigns'
      ]
    },
    'finance': {
      companies: ['Prosperity Advisors', 'SecureWealth', 'Capital Growth Group', 'WiseInvest', 'Financial Freedom Co'],
      painPoints: [
        'Trust and credibility issues online',
        'Poor lead generation quality',
        'Weak compliance-friendly content',
        'Limited educational content strategy',
        'No effective LinkedIn presence'
      ]
    },
    'retail': {
      companies: ['TrendSetters Boutique', 'Urban Outfitters Local', 'The Style Shop', 'Modern Living', 'Luxe Collection'],
      painPoints: [
        'Low foot traffic to physical store',
        'Poor omnichannel experience',
        'Weak local SEO presence',
        'Limited social commerce integration',
        'No effective loyalty program marketing'
      ]
    }
  }

  const serviceRecommendations: Record<string, string> = {
    'seo': 'Our SEO and content strategy will increase your organic visibility by 300% in 90 days, driving qualified traffic that converts.',
    'ppc': 'We\'ll optimize your PPC campaigns to reduce cost-per-acquisition by 40% while scaling lead volume through advanced targeting and A/B testing.',
    'social-media': 'Our social media management will build an engaged community and drive 3x more leads through strategic content and paid campaigns.',
    'email': 'We\'ll implement email automation sequences that nurture leads and drive 25% increase in customer lifetime value.',
    'web-design': 'Our conversion-optimized web design will transform your site into a 24/7 sales machine with 50%+ improvement in conversion rates.',
    'branding': 'We\'ll develop a cohesive brand strategy that positions you as the industry leader and increases brand recall by 60%.',
    'full-service': 'Our integrated marketing approach combines SEO, PPC, social, and content to deliver a complete system that drives predictable growth.'
  }

  const firstNames = ['John', 'Sarah', 'Michael', 'Emily', 'David', 'Jennifer', 'Robert', 'Lisa', 'James', 'Amanda']
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']

  const industry = formData.industry || 'e-commerce'
  const service = formData.service || 'seo'
  const data = industryData[industry] || industryData['e-commerce']

  const leads: Lead[] = []
  const numLeads = 5

  for (let i = 0; i < numLeads; i++) {
    const company = data.companies[i]
    const firstName = firstNames[i]
    const lastName = lastNames[i]
    const painPoint = data.painPoints[i]
    const priority = i < 2 ? 'High' : i < 4 ? 'Medium' : 'Low'

    leads.push({
      company: company,
      industry: industry.charAt(0).toUpperCase() + industry.slice(1),
      contact: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      painPoint: painPoint,
      pitch: `Hi ${firstName}, I noticed ${company} is experiencing ${painPoint.toLowerCase()}. ${serviceRecommendations[service]} I'd love to show you our proven framework that has helped similar ${industry} businesses grow by 250%. Are you available for a 15-minute call this week?`,
      priority: priority
    })
  }

  return leads
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000))

    const leads = generateMockLeads(formData)

    return NextResponse.json({
      success: true,
      leads: leads,
      message: `Generated ${leads.length} qualified leads based on your criteria`
    })
  } catch (error) {
    console.error('Error generating leads:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate leads' },
      { status: 500 }
    )
  }
}
