import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, ChevronDown, ArrowRight, CheckCircle2, 
  Globe2, ShieldCheck, Layers, Award, Sparkles, Truck, 
  Building2, Hotel, Grid, LayoutTemplate, Utensils, Star, 
  FileText, Download, X, Play, Pause, ChevronRight, ChevronLeft,
  Check, Filter, Clock, Scale, Compass, ExternalLink, Menu, Send
} from 'lucide-react';

export default function App() {
  // Navigation & Modal state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [selectedStoneDetail, setSelectedStoneDetail] = useState(null);
  
  // Quote form state
  const [quoteFormSubmitted, setQuoteFormSubmitted] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    stoneType: 'Quartzite',
    variety: 'Taj Mahal Quartzite',
    quantity: '1 Container (approx. 450 sqm)',
    thickness: '20mm',
    finish: 'Polished',
    message: ''
  });

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    setQuoteFormSubmitted(true);
    setTimeout(() => {
      // Auto reset after submission feedback
    }, 5000);
  };

  // Products Data
  const products = [
    {
      id: 'q1',
      name: 'Taj Mahal Quartzite',
      category: 'quartzite',
      tagline: 'Warm ivory background with subtle gold & grey veining',
      image: '/images/emerald_quartzite.png', // Using rich rendered quartzite
      origin: 'Rajasthan, India',
      durability: 'Extreme (9/10 Mohs scale)',
      waterAbsorption: '< 0.15%',
      finishes: ['Polished', 'Honed', 'Leathered'],
      applications: ['Kitchen Countertops', 'Wall Cladding', 'Luxury Flooring'],
      description: 'Taj Mahal Quartzite is renowned internationally for its elegant marble-like look paired with the hardness and stain resistance of granite.'
    },
    {
      id: 'q2',
      name: 'Emerald Green Quartzite',
      category: 'quartzite',
      tagline: 'Deep emerald marble-like texture with metallic golden veins',
      image: '/images/emerald_quartzite.png',
      origin: 'Udaipur Belt, Rajasthan',
      durability: 'High (8.5/10 Mohs scale)',
      waterAbsorption: '< 0.12%',
      finishes: ['Mirror Polished', 'Leathered'],
      applications: ['Feature Accent Walls', 'Hotel Bar Counters', 'Bespoke Vanities'],
      description: 'An exotic gemstone-level quartzite boasting vibrant emerald green hues and crystalline golden highlights for high-end statement architecture.'
    },
    {
      id: 'q3',
      name: 'Cristallo Gold Quartzite',
      category: 'quartzite',
      tagline: 'Translucent crystalline white stone with amber veining',
      image: '/images/taj_mahal_quartzite_1790226304567.png',
      origin: 'North India Quarry Region',
      durability: 'Extreme (9/10)',
      waterAbsorption: '< 0.10%',
      finishes: ['Polished', 'Backlit Ready'],
      applications: ['Backlit Bar Tops', 'Reception Desks', 'Executive Bathrooms'],
      description: 'Translucent natural quartzite that transmits light magnificently, ideal for backlit feature walls and luxury hospitality spaces.'
    },
    {
      id: 'g1',
      name: 'Absolute Black Granite',
      category: 'granite',
      tagline: 'Pure deep black granite with uniform dark texture',
      image: '/images/granite_factory.png',
      origin: 'India Quarry Direct',
      durability: 'Maximum (9.5/10)',
      waterAbsorption: '< 0.05%',
      finishes: ['Polished', 'Flamed', 'Bush-hammered', 'Honed'],
      applications: ['High-traffic Flooring', 'Monuments', 'Commercial Countertops'],
      description: 'The world gold standard for black granite. Completely uniform deep black tone without color variations, exported in jumbo gangsaw slabs.'
    },
    {
      id: 'g2',
      name: 'Black Galaxy Granite',
      category: 'granite',
      tagline: 'Rich black background studded with bright golden flakes',
      image: '/images/hero_quarry_1790226253540.png',
      origin: 'Southern India Belt',
      durability: 'Maximum (9/10)',
      waterAbsorption: '< 0.08%',
      finishes: ['Polished', 'Lappato'],
      applications: ['Commercial Lobbies', 'Kitchen Tops', 'Staircases'],
      description: 'Famous worldwide for its striking star-like copper-golden flecks embedded in deep dark granite, giving an optical metallic glow.'
    },
    {
      id: 'g3',
      name: 'Viscon White Granite',
      category: 'granite',
      tagline: 'Dynamic swirling waves of silver, white, and obsidian charcoal',
      image: '/images/granite_factory.png',
      origin: 'India Export Hub',
      durability: 'High (8.5/10)',
      waterAbsorption: '< 0.14%',
      finishes: ['Polished', 'Honed', 'Leathered'],
      applications: ['Modern Kitchen Islands', 'Building Facades', 'Interior Walls'],
      description: 'Offers dramatic movement and natural artistic veining, perfect for contemporary book-matched wall cladding and statement kitchen islands.'
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  // Workflow steps data
  const workflowSteps = [
    {
      num: '01',
      title: 'Requirement Analysis',
      subtitle: 'Understanding Specifications',
      desc: 'We analyze your required stone type, exact dimensions, slab thickness, quantity, surface finish, and target delivery schedule.',
      icon: FileText,
      detail: 'Includes CAD drawing review, color variation tolerance alignment, and customized quote generation.'
    },
    {
      num: '02',
      title: 'Block Selection',
      subtitle: 'Quarry Inspection',
      desc: 'Our experienced stone inspectors visit partner quarries in Rajasthan and across India to select premium defect-free raw blocks.',
      icon: Compass,
      detail: 'Ensures optimal pattern consistency, zero micro-fissures, and maximum slab yield.'
    },
    {
      num: '03',
      title: 'Precision Processing',
      subtitle: 'Gangsaw & Line Polishing',
      desc: 'Raw blocks are cut using multi-wire gangsaws, reinforced with epoxy resin netting, and mirror-polished on automated calibration lines.',
      icon: Layers,
      detail: 'Thickness tolerance checked down to +/- 1mm with optical shine calibration above 90+ gloss units.'
    },
    {
      num: '04',
      title: 'Quality Inspection',
      subtitle: '100% Piece Verification',
      desc: 'Every single slab undergoes rigorous quality inspection for surface flatness, corner squareness, shade grouping, and polish consistency.',
      icon: ShieldCheck,
      detail: 'High-resolution photo and video reports sent to international buyers prior to wooden crating.'
    },
    {
      num: '05',
      title: 'Seaworthy Packaging',
      subtitle: 'Fumigated Wooden Crates',
      desc: 'Slabs are packed in ISPM-15 certified wooden bundles with plastic wrapping, foam corner pads, and heavy steel strap bracing.',
      icon: Scale,
      detail: 'Designed to survive long-distance container ocean freight without moisture or breakage.'
    },
    {
      num: '06',
      title: 'Global Export',
      subtitle: 'Customs & Logistics',
      desc: 'Seamless dispatch from Inland Container Depots (ICD) to major sea ports (Mundra, Nhava Sheva) with full bill of lading documentation.',
      icon: Truck,
      detail: 'Certificate of Origin, FIEO export papers, Phytosanitary certification, and container GPS tracking.'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: 'Marcus Vance',
      role: 'Procurement Director',
      company: 'Vance & Stone LLC',
      location: 'Dallas, Texas, USA',
      flag: '🇺🇸',
      text: 'Kashyap International has been our primary Indian stone supplier for 4 consecutive luxury residential developments. Their Taj Mahal Quartzite slabs arrived flawlessly bundled, with zero breakage and precise 20mm thickness.',
      rating: 5
    },
    {
      name: 'Tariq Al-Mansoor',
      role: 'Chief Architect',
      company: 'Emirates Grand Hospitality',
      location: 'Dubai, UAE',
      flag: '🇦🇪',
      text: 'For our recent 5-star hotel lobby renovation, we imported 12 containers of Absolute Black and Black Galaxy Granite from Kashyap. The gloss level and edge finishing exceeded international standards.',
      rating: 5
    },
    {
      name: 'Hanna Weber',
      role: 'Stone Wholesaler',
      company: 'Naturstein Import GmbH',
      location: 'Hamburg, Germany',
      flag: '🇩🇪',
      text: 'Working with Kashyap International is refreshingly straightforward. Clear communication, honest slab grading, and transparent container loading photos before dispatch. Truly a reliable export partner.',
      rating: 5
    }
  ];

  // Value Propositions
  const valueProps = [
    {
      title: 'Premium Stone Selection',
      desc: 'Carefully selected Granite & Quartzite with a focus on quality, consistency, and natural beauty.',
      icon: GemIcon
    },
    {
      title: 'Uncompromising Quality',
      desc: 'Every order is handled with attention to specifications, finishing, dimensions, and overall quality.',
      icon: ShieldCheck
    },
    {
      title: 'Customized Solutions',
      desc: 'Tailored sizes, thicknesses, finishes, packaging, and quantities to meet your exact requirements.',
      icon: LayoutTemplate
    },
    {
      title: 'Reliable Export Partner',
      desc: 'Professional coordination, clear communication, secure packaging, and dependable shipment handling.',
      icon: Globe2
    },
    {
      title: 'Transparent & Trustworthy',
      desc: 'Straightforward communication and honest business practices built for long-term relationships.',
      icon: Award
    },
    {
      title: 'Global Standards. Indian Expertise',
      desc: "Combining India's natural stone expertise with an export-focused approach for international buyers.",
      icon: Sparkles
    }
  ];

  // Custom Icon Helper
  function GemIcon(props) {
    return (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M6 3h12l4 6-10 12L2 9z" />
        <path d="M11 3 8 9l3 12" />
        <path d="M13 3l3 9-3 12" />
        <path d="M2 9h20" />
      </svg>
    );
  }

  // Certifications list
  const certificates = [
    { code: 'FIEO', title: 'Federation of Indian Export Organisations' },
    { code: 'GST', title: 'Government Tax Registered Exporter' },
    { code: 'MSME', title: 'Ministry of Micro, Small & Medium Enterprises' },
    { code: 'DGFT', title: 'Directorate General of Foreign Trade' },
    { code: 'IEC', title: 'Import Export Code Authorized' },
    { code: 'UDHYOG AADHAR', title: 'Official Govt. Business Verification' }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#12201C] font-sans selection:bg-[#D4AF37] selection:text-[#03231A]">
      
      {/* -------------------------------------------------------------
          TOP BAR & HEADER
      ------------------------------------------------------------- */}
      <header className="sticky top-0 z-50 transition-all duration-300 shadow-md">
        {/* Top Info Strip */}
        <div className="bg-[#03231A] text-[#F3E5AB] text-xs py-2 px-4 border-b border-[#D4AF37]/20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 font-medium">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <a href="tel:+917665267765" className="hover:text-white transition-colors">+91-76652-67765</a>
              </span>
              <span className="hidden sm:flex items-center gap-1.5 text-stone-300">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                Udaipur, Rajasthan 313001, India
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-[#074534] border border-[#D4AF37]/40 px-2.5 py-0.5 rounded text-[11px] font-semibold text-[#D4AF37] tracking-wide">
                GLOBAL NATURAL STONE EXPORTER
              </span>
              <span className="hidden md:inline text-stone-400">|</span>
              <a href="mailto:export@kashyapinternational.com" className="hidden md:inline hover:text-white transition-colors">
                export@kashyapinternational.com
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <nav className="bg-[#074534]/95 backdrop-blur-md border-b border-[#D4AF37]/30 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              
              {/* Logo (Using User's Sent Logo Image) */}
              <a href="#" className="flex items-center gap-3.5 group">
                <div className="relative w-12 h-12 rounded-lg bg-white p-1 shadow-lg border border-[#D4AF37] group-hover:scale-105 transition-transform overflow-hidden">
                  <img 
                    src="/images/logo.jpg" 
                    alt="Kashyap International Logo" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-white group-hover:text-[#F3E5AB] transition-colors leading-tight">
                    KASHYAP
                  </span>
                  <span className="text-[10px] tracking-[0.25em] font-semibold text-[#D4AF37] uppercase">
                    INTERNATIONAL
                  </span>
                </div>
              </a>

              {/* Desktop Menu Links */}
              <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
                <a href="#hero" className="text-[#F3E5AB] font-semibold hover:text-white transition-colors py-2 border-b-2 border-[#D4AF37]">
                  Home
                </a>
                <a href="#about" className="text-stone-200 hover:text-[#D4AF37] transition-colors py-2">
                  About Us
                </a>

                {/* Products Dropdown */}
                <div 
                  className="relative group py-2 cursor-pointer"
                  onMouseEnter={() => setProductsDropdown(true)}
                  onMouseLeave={() => setProductsDropdown(false)}
                >
                  <a href="#products" className="flex items-center gap-1.5 text-stone-200 group-hover:text-[#D4AF37] transition-colors">
                    Products
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${productsDropdown ? 'rotate-180' : ''}`} />
                  </a>

                  {/* Dropdown Menu Box */}
                  {productsDropdown && (
                    <div className="absolute top-full left-0 w-64 bg-[#03231A] border border-[#D4AF37]/40 rounded-lg shadow-2xl p-3 z-50 backdrop-blur-xl animate-fadeIn">
                      <div className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider px-3 py-1.5 border-b border-[#074534]">
                        Natural Stone Categories
                      </div>
                      <a 
                        href="#products" 
                        onClick={() => { setSelectedCategory('quartzite'); setProductsDropdown(false); }}
                        className="flex items-center gap-2.5 px-3 py-2.5 mt-1 rounded hover:bg-[#074534] text-stone-200 hover:text-white transition-colors"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
                        <div>
                          <div className="font-semibold text-sm">Quartzite Slabs</div>
                          <div className="text-[11px] text-stone-400">Taj Mahal, Cristallo, Emerald</div>
                        </div>
                      </a>
                      <a 
                        href="#products" 
                        onClick={() => { setSelectedCategory('granite'); setProductsDropdown(false); }}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded hover:bg-[#074534] text-stone-200 hover:text-white transition-colors"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <div>
                          <div className="font-semibold text-sm">Granite Slabs</div>
                          <div className="text-[11px] text-stone-400">Absolute Black, Black Galaxy</div>
                        </div>
                      </a>
                    </div>
                  )}
                </div>

                <a href="#applications" className="text-stone-200 hover:text-[#D4AF37] transition-colors py-2">
                  Gallery
                </a>
                <a href="#why-us" className="text-stone-200 hover:text-[#D4AF37] transition-colors py-2">
                  Why Us
                </a>
                <a href="#workflow" className="text-stone-200 hover:text-[#D4AF37] transition-colors py-2">
                  Workflow
                </a>
                <a href="#contact" className="text-stone-200 hover:text-[#D4AF37] transition-colors py-2">
                  Contact Us
                </a>
              </div>

              {/* Action CTA Button */}
              <div className="hidden sm:flex items-center">
                <button 
                  onClick={() => setQuoteModalOpen(true)}
                  className="btn-gold"
                >
                  <Sparkles className="w-4 h-4 text-[#03231A]" />
                  Request a Quote
                </button>
              </div>

              {/* Mobile Hamburger Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-stone-200 hover:text-white focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-7 h-7 text-[#D4AF37]" /> : <Menu className="w-7 h-7 text-[#D4AF37]" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-[#03231A] border-b border-[#D4AF37]/30 px-4 pt-3 pb-6 space-y-3">
              <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-[#F3E5AB] font-semibold border-b border-[#074534]">Home</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-stone-200 border-b border-[#074534]">About Us</a>
              <a href="#products" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-stone-200 border-b border-[#074534]">Products (Quartzite & Granite)</a>
              <a href="#applications" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-stone-200 border-b border-[#074534]">Applications & Gallery</a>
              <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-stone-200 border-b border-[#074534]">Why Kashyap</a>
              <a href="#workflow" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-stone-200 border-b border-[#074534]">Operational Workflow</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-stone-200 border-b border-[#074534]">Contact Us</a>
              <div className="pt-2">
                <button 
                  onClick={() => { setMobileMenuOpen(false); setQuoteModalOpen(true); }}
                  className="w-full btn-gold justify-center py-3"
                >
                  Request a Quote
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* -------------------------------------------------------------
          2. HERO SECTION (Above the Fold)
      ------------------------------------------------------------- */}
      <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#03231A]">
        {/* Hero Background Visual Overlay & Media */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/emerald_quartzite.png" 
            alt="Quartzite & Granite Stock Visual" 
            className="w-full h-full object-cover opacity-35 scale-105 transition-transform duration-10000 hover:scale-100"
          />
          {/* Multi-stage Luxury Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#03231A] via-[#03231A]/85 to-[#074534]/70" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#03231A]/60 to-[#03231A]" />
          
          {/* Subtle Dynamic Ambient Lighting Pattern */}
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#074534]/40 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* Main Hero Content Box */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Headline & Lead Info */}
            <div className="lg:col-span-8 space-y-6 text-left">
              
              {/* Top Tagline Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#074534]/80 border border-[#D4AF37]/50 backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                <span className="text-xs font-semibold tracking-wider text-[#F3E5AB] uppercase">
                  DIRECT EXPORTER FROM UDAIPUR, RAJASTHAN
                </span>
              </div>

              {/* Main Heading H1 */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-extrabold text-white leading-tight tracking-tight">
                Premium <span className="text-gold-gradient">Quartzite & Granite</span> from India
              </h1>

              {/* Sub-headline H2 */}
              <p className="text-xl sm:text-2xl font-accent italic text-[#F3E5AB] font-light">
                Natural stone selected for quality. Prepared for global markets.
              </p>

              {/* Intro Text */}
              <p className="text-base sm:text-lg text-stone-300 max-w-3xl leading-relaxed font-light">
                <strong className="text-white font-medium">Kashyap International</strong> is an India-based exporter of premium Quartzite and Granite, supplying natural stone to importers, distributors, fabricators, contractors and project buyers worldwide.
              </p>

              {/* CTA Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <a 
                  href="#products" 
                  onClick={() => setSelectedCategory('quartzite')}
                  className="btn-gold text-base py-4 px-8 rounded-md shadow-2xl"
                >
                  Explore Quartzite
                  <ArrowRight className="w-5 h-5 ml-1" />
                </a>

                <a 
                  href="#products" 
                  onClick={() => setSelectedCategory('granite')}
                  className="btn-emerald text-base py-4 px-8 rounded-md backdrop-blur-md"
                >
                  Explore Granite
                  <ArrowRight className="w-5 h-5 ml-1" />
                </a>

                <button 
                  onClick={() => setQuoteModalOpen(true)}
                  className="btn-outline-gold text-base py-4 px-8 rounded-md"
                >
                  Request Quotation
                </button>
              </div>

              {/* Quick Stat Counter Cards */}
              <div className="pt-10 grid grid-cols-3 gap-4 border-t border-[#D4AF37]/20">
                <div className="p-3 rounded-lg bg-[#074534]/30 border border-[#D4AF37]/20">
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-[#F3E5AB]">30+</div>
                  <div className="text-xs text-stone-300 uppercase tracking-wide">Countries Exported</div>
                </div>
                <div className="p-3 rounded-lg bg-[#074534]/30 border border-[#D4AF37]/20">
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-[#F3E5AB]">100%</div>
                  <div className="text-xs text-stone-300 uppercase tracking-wide">Inspection Rate</div>
                </div>
                <div className="p-3 rounded-lg bg-[#074534]/30 border border-[#D4AF37]/20">
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-[#F3E5AB]">ISPM-15</div>
                  <div className="text-xs text-stone-300 uppercase tracking-wide">Seaworthy Wooden Crates</div>
                </div>
              </div>

            </div>

            {/* Hero Right Visual Card Feature */}
            <div className="lg:col-span-4 relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl glass-panel p-2 group">
                <div className="relative h-96 rounded-xl overflow-hidden">
                  <img 
                    src="/images/granite_factory.png" 
                    alt="Indian Stone Factory Showcase" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03231A] via-transparent to-transparent" />
                  
                  {/* Floating Video Simulation Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#03231A]/90 backdrop-blur-md border border-[#D4AF37]/40">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#03231A] shadow-lg">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#F3E5AB] uppercase tracking-wider">Live Processing Preview</div>
                        <div className="text-sm font-medium text-white">Gangsaw & Polishing Facility</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          3. BRAND INTRODUCTION: "From India to the World"
      ------------------------------------------------------------- */}
      <section id="about" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Visual Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/30">
                <img 
                  src="/images/emerald_quartzite.png" 
                  alt="Kashyap International Slabs" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03231A]/80 via-transparent to-transparent" />
                
                {/* Floating Emblem Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-white/95 backdrop-blur-md border border-[#D4AF37] shadow-2xl">
                  <div className="flex items-center gap-4">
                    <img 
                      src="/images/logo.jpg" 
                      alt="Kashyap Emblem" 
                      className="w-14 h-14 object-contain rounded-lg border border-[#D4AF37] p-1 bg-white" 
                    />
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#03231A]">Kashyap International</h4>
                      <p className="text-xs text-[#074534] font-semibold tracking-wider uppercase">Headquartered in Udaipur, Rajasthan</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Accent Frame */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 border-4 border-[#D4AF37]/30 rounded-2xl -z-10 hidden sm:block"></div>
            </div>

            {/* Right Content Column */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#074534]/10 border border-[#074534]/20 text-[#074534] text-xs font-bold uppercase tracking-wider">
                <Globe2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                From India to the World
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#03231A] leading-tight">
                Natural Stone. <br />
                <span className="text-[#074534]">Professional Supply.</span> Global Reach.
              </h2>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
                India offers an exceptional range of natural stone, with distinctive colours, patterns and geological characteristics. At <strong>Kashyap International</strong>, we connect international buyers with carefully selected Quartzite and Granite, supported by professional sourcing, quality-focused processing, customized requirements and export coordination.
              </p>

              {/* Core Objective Callout (Blockquote Requirement) */}
              <blockquote className="p-6 rounded-xl bg-[#03231A] border-l-4 border-[#D4AF37] text-white shadow-xl">
                <p className="font-accent italic text-base sm:text-lg text-[#F3E5AB] leading-relaxed">
                  "Our core objective is to deliver uncompromised quality, precision sizing, and flawless export packaging for every slab and tile that leaves our processing facilities in Udaipur to global ports worldwide."
                </p>
                <footer className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  Kashyap International Management Commitment
                </footer>
              </blockquote>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#FAF8F5] border border-stone-200">
                  <CheckCircle2 className="w-5 h-5 text-[#074534] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#03231A]">Quarry Direct Sourcing</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#FAF8F5] border border-stone-200">
                  <CheckCircle2 className="w-5 h-5 text-[#074534] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#03231A]">Gangsaw Slab Calibrations</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#FAF8F5] border border-stone-200">
                  <CheckCircle2 className="w-5 h-5 text-[#074534] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#03231A]">Custom Thickness & Edge</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#FAF8F5] border border-stone-200">
                  <CheckCircle2 className="w-5 h-5 text-[#074534] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#03231A]">Fumigated Wooden Bundles</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          4. PRODUCT SHOWCASE SECTION
      ------------------------------------------------------------- */}
      <section id="products" className="py-24 bg-[#091210] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase bg-[#074534]/50 border border-[#D4AF37]/30 px-3.5 py-1 rounded-full">
              COLLECTIONS & EXPORT SLABS
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-white">
              Our Products
            </h2>
            <p className="text-stone-300 text-base sm:text-lg">
              Explore side-by-side high-resolution Quartzite & Granite slabs prepared for global markets.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-3 pt-6">
              <button 
                onClick={() => setSelectedCategory('all')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                  selectedCategory === 'all' 
                    ? 'bg-[#D4AF37] text-[#03231A] shadow-lg' 
                    : 'bg-[#101E1A] text-stone-300 hover:text-white border border-stone-700'
                }`}
              >
                All Natural Stone
              </button>
              <button 
                onClick={() => setSelectedCategory('quartzite')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                  selectedCategory === 'quartzite' 
                    ? 'bg-[#D4AF37] text-[#03231A] shadow-lg' 
                    : 'bg-[#101E1A] text-stone-300 hover:text-white border border-stone-700'
                }`}
              >
                Quartzite Collection
              </button>
              <button 
                onClick={() => setSelectedCategory('granite')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                  selectedCategory === 'granite' 
                    ? 'bg-[#D4AF37] text-[#03231A] shadow-lg' 
                    : 'bg-[#101E1A] text-stone-300 hover:text-white border border-stone-700'
                }`}
              >
                Granite Collection
              </button>
            </div>
          </div>

          {/* Products Grid Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((stone) => (
              <div 
                key={stone.id} 
                className="rounded-xl overflow-hidden bg-[#101E1A] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 hover:-translate-y-2 shadow-2xl flex flex-col group"
              >
                {/* Product Image Box */}
                <div className="relative h-64 overflow-hidden bg-stone-900">
                  <img 
                    src={stone.image} 
                    alt={stone.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101E1A] via-transparent to-transparent opacity-80" />
                  
                  {/* Category Tag */}
                  <div className="absolute top-4 left-4 bg-[#03231A]/90 border border-[#D4AF37]/50 backdrop-blur-md px-3 py-1 rounded text-[11px] font-bold text-[#F3E5AB] uppercase tracking-wider">
                    {stone.category}
                  </div>

                  {/* Origin Badge */}
                  <div className="absolute bottom-3 right-3 text-[11px] font-medium text-stone-300 bg-black/60 px-2.5 py-1 rounded backdrop-blur-sm">
                    {stone.origin}
                  </div>
                </div>

                {/* Product Info Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#F3E5AB] transition-colors">
                      {stone.name}
                    </h3>
                    <p className="text-xs text-[#D4AF37] font-medium mt-1">
                      {stone.tagline}
                    </p>
                    <p className="text-stone-300 text-xs mt-3 leading-relaxed">
                      {stone.description}
                    </p>
                  </div>

                  {/* Specs Quick Specs */}
                  <div className="pt-3 border-t border-stone-800 space-y-2 text-xs">
                    <div className="flex justify-between text-stone-400">
                      <span>Available Finishes:</span>
                      <span className="text-white font-medium">{stone.finishes.join(', ')}</span>
                    </div>
                    <div className="flex justify-between text-stone-400">
                      <span>Hardness:</span>
                      <span className="text-[#F3E5AB] font-medium">{stone.durability}</span>
                    </div>
                  </div>

                  {/* Action Buttons Required by User Prompt */}
                  <div className="pt-2 flex items-center gap-2">
                    {stone.category === 'quartzite' ? (
                      <button 
                        onClick={() => {
                          setQuoteForm({...quoteForm, stoneType: 'Quartzite', variety: stone.name});
                          setQuoteModalOpen(true);
                        }}
                        className="w-full btn-gold text-xs py-2.5"
                      >
                        Explore Quartzite
                      </button>
                    ) : (
                      <button 
                        onClick={() => {
                          setQuoteForm({...quoteForm, stoneType: 'Granite', variety: stone.name});
                          setQuoteModalOpen(true);
                        }}
                        className="w-full btn-emerald text-xs py-2.5"
                      >
                        Explore Granite
                      </button>
                    )}
                    
                    <button 
                      onClick={() => setSelectedStoneDetail(stone)}
                      className="px-3 py-2.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold"
                      title="View Details"
                    >
                      Specs
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          5. VALUE PROPOSITION: "Why Kashyap International?"
      ------------------------------------------------------------- */}
      <section id="why-us" className="py-24 bg-[#FAF8F5] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold tracking-widest text-[#074534] uppercase bg-[#074534]/10 border border-[#074534]/20 px-3.5 py-1 rounded-full">
              GLOBAL EXPORT ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#03231A]">
              Why Kashyap International?
            </h2>
            <p className="text-stone-600 text-base sm:text-lg">
              Combining India's finest natural stone reserves with rigorous international export standards.
            </p>
          </div>

          {/* 6-Card Grid Required by User Prompt */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valueProps.map((vp, index) => {
              const IconComp = vp.icon;
              return (
                <div 
                  key={index}
                  className="p-8 rounded-xl bg-white border border-stone-200 hover:border-[#D4AF37] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#03231A] text-[#D4AF37] flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                    <IconComp className="w-7 h-7" />
                  </div>
                  
                  <h3 className="font-serif text-xl font-bold text-[#03231A] mb-3 group-hover:text-[#074534] transition-colors">
                    {vp.title}
                  </h3>
                  
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {vp.desc}
                  </p>

                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2 text-xs font-semibold text-[#074534]">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    Export Standard Verified
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          6. APPLICATIONS SECTION
      ------------------------------------------------------------- */}
      <section id="applications" className="py-24 bg-[#03231A] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold tracking-widest text-[#F3E5AB] uppercase bg-[#074534] border border-[#D4AF37]/30 px-3.5 py-1 rounded-full">
              ARCHITECTURAL EXCELLENCE
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-white">
              Designed by Nature. Used by Professionals.
            </h2>
            <p className="text-stone-300 text-base sm:text-lg">
              Our Quartzite and Granite slabs elevate prestigious commercial and luxury residential projects globally.
            </p>
          </div>

          {/* 5 Sector Grid Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Sector 1: Interior Design */}
            <div className="rounded-xl overflow-hidden relative h-80 group shadow-2xl border border-[#D4AF37]/30">
              <img 
                src="/images/emerald_quartzite.png" 
                alt="Interior Design Applications" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03231A] via-[#03231A]/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37] text-[#03231A] flex items-center justify-center font-bold mb-2">
                  <LayoutTemplate className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">Interior Design</h3>
                <p className="text-xs text-stone-300">Feature accent walls, luxury fireplace wraps, and statement reception desks.</p>
              </div>
            </div>

            {/* Sector 2: Hospitality */}
            <div className="rounded-xl overflow-hidden relative h-80 group shadow-2xl border border-[#D4AF37]/30">
              <img 
                src="/images/granite_factory.png" 
                alt="Hospitality Applications" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03231A] via-[#03231A]/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37] text-[#03231A] flex items-center justify-center font-bold mb-2">
                  <Hotel className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">Hospitality</h3>
                <p className="text-xs text-stone-300">5-Star hotel lobbies, executive suites, backlit bar counters, and spa retreats.</p>
              </div>
            </div>

            {/* Sector 3: Flooring */}
            <div className="rounded-xl overflow-hidden relative h-80 group shadow-2xl border border-[#D4AF37]/30">
              <img 
                src="/images/hero_quarry_1790226253540.png" 
                alt="Flooring Applications" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03231A] via-[#03231A]/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37] text-[#03231A] flex items-center justify-center font-bold mb-2">
                  <Grid className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">Flooring</h3>
                <p className="text-xs text-stone-300">High-durability mirror-polished granite and quartzite floor tiles for high footfall.</p>
              </div>
            </div>

            {/* Sector 4: Wall Cladding */}
            <div className="rounded-xl overflow-hidden relative h-80 group shadow-2xl border border-[#D4AF37]/30 md:col-span-2 lg:col-span-1">
              <img 
                src="/images/taj_mahal_quartzite_1790226304567.png" 
                alt="Wall Cladding" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03231A] via-[#03231A]/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37] text-[#03231A] flex items-center justify-center font-bold mb-2">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">Wall Cladding</h3>
                <p className="text-xs text-stone-300">Exterior ventilated stone facades and interior book-matched wall slabs.</p>
              </div>
            </div>

            {/* Sector 5: Countertops & Vanities */}
            <div className="rounded-xl overflow-hidden relative h-80 group shadow-2xl border border-[#D4AF37]/30 md:col-span-2 lg:col-span-2">
              <img 
                src="/images/emerald_quartzite.png" 
                alt="Countertops & Vanities" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03231A] via-[#03231A]/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37] text-[#03231A] flex items-center justify-center font-bold mb-2">
                  <Utensils className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">Countertops & Vanities</h3>
                <p className="text-sm text-stone-300">Stain-resistant, scratch-proof kitchen worktops, waterfall islands, and vanity tops with mitred edges.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          7. OPERATIONAL WORKFLOW: "Our Commitment"
      ------------------------------------------------------------- */}
      <section id="workflow" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold tracking-widest text-[#074534] uppercase bg-[#074534]/10 border border-[#074534]/20 px-3.5 py-1 rounded-full">
              EXPORT PROCESS & TRANSPARENCY
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#03231A]">
              Consistency from Selection to Shipment
            </h2>
            <p className="text-stone-600 text-base sm:text-lg italic font-accent">
              Every international order begins with understanding the buyer's requirement.
            </p>
          </div>

          {/* Process Timeline Flow (6 Steps Required) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 relative">
            {workflowSteps.map((step, idx) => {
              const IconComp = step.icon;
              const isActive = activeWorkflowStep === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setActiveWorkflowStep(idx)}
                  className={`cursor-pointer rounded-xl p-5 border transition-all duration-300 relative flex flex-col justify-between ${
                    isActive 
                      ? 'bg-[#03231A] text-white border-[#D4AF37] shadow-xl scale-105 z-10' 
                      : 'bg-[#FAF8F5] text-[#03231A] border-stone-200 hover:border-[#074534]'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className={`text-2xl font-serif font-bold ${isActive ? 'text-[#D4AF37]' : 'text-[#074534]'}`}>
                        {step.num}
                      </span>
                      <IconComp className={`w-6 h-6 ${isActive ? 'text-[#D4AF37]' : 'text-[#074534]'}`} />
                    </div>

                    <h4 className="font-serif font-bold text-base mb-1">
                      {step.title}
                    </h4>

                    <div className={`text-[11px] font-semibold uppercase tracking-wider mb-2 ${isActive ? 'text-[#F3E5AB]' : 'text-[#074534]'}`}>
                      {step.subtitle}
                    </div>

                    <p className={`text-xs leading-relaxed ${isActive ? 'text-stone-300' : 'text-stone-600'}`}>
                      {step.desc}
                    </p>
                  </div>

                  {idx < 5 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                      <ChevronRight className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Detailed Selected Step Highlight Box */}
          <div className="mt-10 p-6 rounded-2xl bg-[#074534] text-white border border-[#D4AF37]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-[#03231A] flex items-center justify-center font-bold text-xl shrink-0">
                {workflowSteps[activeWorkflowStep].num}
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#F3E5AB]">
                  Step Focus: {workflowSteps[activeWorkflowStep].title} — {workflowSteps[activeWorkflowStep].subtitle}
                </h4>
                <p className="text-stone-200 text-sm mt-0.5">
                  {workflowSteps[activeWorkflowStep].detail}
                </p>
              </div>
            </div>

            <button 
              onClick={() => setQuoteModalOpen(true)}
              className="btn-gold whitespace-nowrap text-xs py-3 px-6"
            >
              Start Your Order
            </button>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          8. SOCIAL PROOF & CREDENTIALS
      ------------------------------------------------------------- */}
      <section className="py-24 bg-[#091210] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Testimonials Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase bg-[#074534] border border-[#D4AF37]/30 px-3.5 py-1 rounded-full">
              GLOBAL BUYER TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-white">
              Trusted by Importers Worldwide
            </h2>
          </div>

          {/* Testimonial Carousel Card */}
          <div className="max-w-4xl mx-auto glass-panel p-8 sm:p-12 rounded-2xl border border-[#D4AF37]/40 shadow-2xl relative">
            <div className="flex flex-col items-center text-center space-y-6">
              
              {/* Star Rating */}
              <div className="flex items-center gap-1.5 text-[#D4AF37]">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-current" />
                ))}
              </div>

              {/* Review Quote */}
              <p className="font-accent italic text-lg sm:text-2xl text-[#F3E5AB] leading-relaxed">
                "{testimonials[activeTestimonial].text}"
              </p>

              {/* Reviewer Info */}
              <div>
                <h4 className="font-serif text-xl font-bold text-white">
                  {testimonials[activeTestimonial].name}
                </h4>
                <div className="text-xs text-[#D4AF37] font-semibold mt-1">
                  {testimonials[activeTestimonial].role} — {testimonials[activeTestimonial].company}
                </div>
                <div className="text-xs text-stone-400 mt-0.5 flex items-center justify-center gap-1.5">
                  <span>{testimonials[activeTestimonial].flag}</span>
                  <span>{testimonials[activeTestimonial].location}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4 pt-4">
                <button 
                  onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                  className="w-10 h-10 rounded-full bg-[#074534] hover:bg-[#D4AF37] hover:text-[#03231A] text-white flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-bold text-stone-400">
                  {activeTestimonial + 1} / {testimonials.length}
                </span>
                <button 
                  onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                  className="w-10 h-10 rounded-full bg-[#074534] hover:bg-[#D4AF37] hover:text-[#03231A] text-white flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          </div>

          {/* Memberships & Certificates Moving Slider (Required by Prompt) */}
          <div className="mt-20 pt-12 border-t border-stone-800">
            <div className="text-center text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-8">
              Authorized Export Credentials & Government Memberships
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {certificates.map((cert, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-[#101E1A] border border-[#D4AF37]/20 hover:border-[#D4AF37] text-center flex flex-col items-center justify-center hover:scale-105 transition-transform"
                >
                  <ShieldCheck className="w-8 h-8 text-[#D4AF37] mb-2" />
                  <div className="font-serif font-bold text-base text-white">{cert.code}</div>
                  <div className="text-[10px] text-stone-400 mt-1 leading-tight">{cert.title}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          9. FOOTER SECTION
      ------------------------------------------------------------- */}
      <footer id="contact" className="bg-[#03231A] text-white border-t border-[#D4AF37]/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            
            {/* Column 1: Brand Info (Required) */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center gap-3">
                <img 
                  src="/images/logo.jpg" 
                  alt="Kashyap International Logo" 
                  className="w-12 h-12 object-contain bg-white rounded p-1 border border-[#D4AF37]"
                />
                <div>
                  <h3 className="font-serif text-lg font-bold text-white leading-tight">KASHYAP</h3>
                  <div className="text-[10px] tracking-widest text-[#D4AF37] font-semibold uppercase">INTERNATIONAL</div>
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed font-light">
                Premium Indian Quartzite & Granite exporter connecting global stone buyers with direct quarry sourcing and Gangsaw quality.
              </p>

              <div className="space-y-2 text-xs text-stone-300 pt-2">
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>+91-76652-67765</span>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>export@kashyapinternational.com</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>22, Maharana Udaisingh Market, Udaipole, Udaipur, Rajasthan 313001.</span>
                </div>
              </div>
            </div>

            {/* Column 2: Company */}
            <div className="space-y-3 text-xs">
              <h4 className="font-serif text-sm font-bold text-[#F3E5AB] uppercase tracking-wider pb-2 border-b border-[#074534]">
                Company
              </h4>
              <ul className="space-y-2 text-stone-300">
                <li><a href="#about" className="hover:text-[#D4AF37] transition-colors">About Us</a></li>
                <li><a href="#why-us" className="hover:text-[#D4AF37] transition-colors">Why Kashyap</a></li>
                <li><a href="#workflow" className="hover:text-[#D4AF37] transition-colors">Vision & Mission</a></li>
                <li><a href="#workflow" className="hover:text-[#D4AF37] transition-colors">Quality Commitment</a></li>
                <li><a href="#hero" className="hover:text-[#D4AF37] transition-colors">Rajasthan Quarry Base</a></li>
              </ul>
            </div>

            {/* Column 3: Products */}
            <div className="space-y-3 text-xs">
              <h4 className="font-serif text-sm font-bold text-[#F3E5AB] uppercase tracking-wider pb-2 border-b border-[#074534]">
                Products
              </h4>
              <ul className="space-y-2 text-stone-300">
                <li><a href="#products" onClick={() => setSelectedCategory('granite')} className="hover:text-[#D4AF37] transition-colors">Granite Slabs</a></li>
                <li><a href="#products" onClick={() => setSelectedCategory('quartzite')} className="hover:text-[#D4AF37] transition-colors">Quartzite Slabs</a></li>
                <li><a href="#products" className="hover:text-[#D4AF37] transition-colors">Taj Mahal Quartzite</a></li>
                <li><a href="#products" className="hover:text-[#D4AF37] transition-colors">Absolute Black Granite</a></li>
                <li><a href="#products" className="hover:text-[#D4AF37] transition-colors">Custom Finishes</a></li>
              </ul>
            </div>

            {/* Column 4: Export & Orders */}
            <div className="space-y-3 text-xs">
              <h4 className="font-serif text-sm font-bold text-[#F3E5AB] uppercase tracking-wider pb-2 border-b border-[#074534]">
                Export & Orders
              </h4>
              <ul className="space-y-2 text-stone-300">
                <li><a href="#workflow" className="hover:text-[#D4AF37] transition-colors">Order Process</a></li>
                <li><a href="#workflow" className="hover:text-[#D4AF37] transition-colors">Payment Terms (LC/TT)</a></li>
                <li><a href="#workflow" className="hover:text-[#D4AF37] transition-colors">Packaging & Loading</a></li>
                <li><a href="#workflow" className="hover:text-[#D4AF37] transition-colors">Shipping & Delivery</a></li>
                <li><a href="#workflow" className="hover:text-[#D4AF37] transition-colors">Fumigation Certificates</a></li>
              </ul>
            </div>

            {/* Column 5: Support */}
            <div className="space-y-3 text-xs">
              <h4 className="font-serif text-sm font-bold text-[#F3E5AB] uppercase tracking-wider pb-2 border-b border-[#074534]">
                Support
              </h4>
              <ul className="space-y-2 text-stone-300">
                <li><a href="#contact" className="hover:text-[#D4AF37] transition-colors">FAQ</a></li>
                <li><a href="#contact" className="hover:text-[#D4AF37] transition-colors">Contact Us</a></li>
                <li><button onClick={() => setQuoteModalOpen(true)} className="text-[#D4AF37] font-semibold hover:underline">Request a Quote</button></li>
                <li><a href="#contact" className="hover:text-[#D4AF37] transition-colors">Download Catalogue</a></li>
                <li><a href="#contact" className="hover:text-[#D4AF37] transition-colors">24/7 Export Desk</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar Required by User Prompt */}
          <div className="mt-12 pt-8 border-t border-[#074534] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-400">
            <div>
              © 2026 Kashyap International. All Rights Reserved.
            </div>
            <div className="text-[#F3E5AB] font-medium text-center">
              Granite & Quartzite • Global Export • Quality You Can Trust.
            </div>
          </div>

        </div>
      </footer>

      {/* -------------------------------------------------------------
          10. REQUEST A QUOTE LEAD MODAL
      ------------------------------------------------------------- */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#03231A] text-white border-2 border-[#D4AF37] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button 
              onClick={() => { setQuoteModalOpen(false); setQuoteFormSubmitted(false); }}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {quoteFormSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#074534] text-[#D4AF37] border border-[#D4AF37] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">Quotation Request Submitted!</h3>
                <p className="text-sm text-stone-300 max-w-md mx-auto">
                  Thank you, <strong className="text-[#F3E5AB]">{quoteForm.name}</strong>. Our international export desk in Udaipur will review your specs for <strong>{quoteForm.variety}</strong> and contact you within 6 business hours.
                </p>
                <div className="pt-4">
                  <button 
                    onClick={() => { setQuoteModalOpen(false); setQuoteFormSubmitted(false); }}
                    className="btn-gold"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#074534] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-white">Request a Quote</h3>
                    <p className="text-xs text-[#D4AF37]">Direct Factory Pricing for Quartzite & Granite Slabs</p>
                  </div>
                </div>

                <form onSubmit={handleQuoteSubmit} className="space-y-4 text-xs">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-stone-300 font-semibold mb-1">Full Name *</label>
                      <input 
                        type="text" 
                        required
                        value={quoteForm.name}
                        onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                        placeholder="John Doe"
                        className="w-full bg-[#091210] border border-stone-700 focus:border-[#D4AF37] rounded p-3 text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-300 font-semibold mb-1">Email Address *</label>
                      <input 
                        type="email" 
                        required
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                        placeholder="buyer@company.com"
                        className="w-full bg-[#091210] border border-stone-700 focus:border-[#D4AF37] rounded p-3 text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-stone-300 font-semibold mb-1">Phone / WhatsApp *</label>
                      <input 
                        type="text" 
                        required
                        value={quoteForm.phone}
                        onChange={(e) => setQuoteForm({...quoteForm, phone: e.target.value})}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-[#091210] border border-stone-700 focus:border-[#D4AF37] rounded p-3 text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-300 font-semibold mb-1">Company / Country *</label>
                      <input 
                        type="text" 
                        required
                        value={quoteForm.company}
                        onChange={(e) => setQuoteForm({...quoteForm, company: e.target.value})}
                        placeholder="Stone Distributing Co., USA"
                        className="w-full bg-[#091210] border border-stone-700 focus:border-[#D4AF37] rounded p-3 text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-stone-300 font-semibold mb-1">Stone Category</label>
                      <select 
                        value={quoteForm.stoneType}
                        onChange={(e) => setQuoteForm({...quoteForm, stoneType: e.target.value})}
                        className="w-full bg-[#091210] border border-stone-700 focus:border-[#D4AF37] rounded p-3 text-white outline-none"
                      >
                        <option value="Quartzite">Quartzite</option>
                        <option value="Granite">Granite</option>
                        <option value="Both">Both Varieties</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-stone-300 font-semibold mb-1">Thickness</label>
                      <select 
                        value={quoteForm.thickness}
                        onChange={(e) => setQuoteForm({...quoteForm, thickness: e.target.value})}
                        className="w-full bg-[#091210] border border-stone-700 focus:border-[#D4AF37] rounded p-3 text-white outline-none"
                      >
                        <option value="20mm">20 mm Slabs</option>
                        <option value="30mm">30 mm Slabs</option>
                        <option value="Custom">Custom Cut Tiles</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-stone-300 font-semibold mb-1">Surface Finish</label>
                      <select 
                        value={quoteForm.finish}
                        onChange={(e) => setQuoteForm({...quoteForm, finish: e.target.value})}
                        className="w-full bg-[#091210] border border-stone-700 focus:border-[#D4AF37] rounded p-3 text-white outline-none"
                      >
                        <option value="Polished">High Gloss Polished</option>
                        <option value="Honed">Honed / Matte</option>
                        <option value="Leathered">Leathered / Antique</option>
                        <option value="Flamed">Flamed (Granite)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">Estimated Quantity & Port Destination</label>
                    <textarea 
                      rows="3"
                      value={quoteForm.message}
                      onChange={(e) => setQuoteForm({...quoteForm, message: e.target.value})}
                      placeholder="e.g., Need 2 containers of Taj Mahal Quartzite 20mm polished slabs to Houston Port, USA."
                      className="w-full bg-[#091210] border border-stone-700 focus:border-[#D4AF37] rounded p-3 text-white outline-none"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="w-full btn-gold py-3.5 text-sm font-bold justify-center">
                      <Send className="w-4 h-4 text-[#03231A]" />
                      Submit Quote Request
                    </button>
                  </div>

                </form>
              </div>
            )}

          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          11. STONE SPECIFICATION SHEET MODAL
      ------------------------------------------------------------- */}
      {selectedStoneDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#03231A] text-white border-2 border-[#D4AF37] rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setSelectedStoneDetail(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-4">
              <div className="h-48 rounded-xl overflow-hidden">
                <img src={selectedStoneDetail.image} alt={selectedStoneDetail.name} className="w-full h-full object-cover" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#F3E5AB]">{selectedStoneDetail.name}</h3>
              <p className="text-xs text-stone-300 leading-relaxed">{selectedStoneDetail.description}</p>

              <div className="bg-[#074534] p-4 rounded-xl border border-[#D4AF37]/30 text-xs space-y-2">
                <div className="flex justify-between border-b border-[#03231A] pb-1">
                  <span className="text-stone-300">Quarry Origin:</span>
                  <span className="font-bold text-white">{selectedStoneDetail.origin}</span>
                </div>
                <div className="flex justify-between border-b border-[#03231A] pb-1">
                  <span className="text-stone-300">Mohs Hardness:</span>
                  <span className="font-bold text-[#D4AF37]">{selectedStoneDetail.durability}</span>
                </div>
                <div className="flex justify-between border-b border-[#03231A] pb-1">
                  <span className="text-stone-300">Water Absorption Rate:</span>
                  <span className="font-bold text-white">{selectedStoneDetail.waterAbsorption}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-300">Standard Slab Sizes:</span>
                  <span className="font-bold text-white">280cm x 160cm & above</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => {
                    const stone = selectedStoneDetail;
                    setSelectedStoneDetail(null);
                    setQuoteForm({...quoteForm, variety: stone.name, stoneType: stone.category === 'quartzite' ? 'Quartzite' : 'Granite'});
                    setQuoteModalOpen(true);
                  }}
                  className="w-full btn-gold text-xs py-3"
                >
                  Request Container Pricing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
