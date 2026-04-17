/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Leaf, 
  Utensils, 
  Soup, 
  Carrot, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  CheckCircle2,
  Menu,
  X,
  ChefHat,
  BarChart3,
  Clock,
  ChevronRight,
  Apple,
  Coffee,
  Pizza,
  LayoutDashboard,
  Package,
  Sparkles,
  Truck,
  Layers,
  Settings,
  Search,
  Bell,
  Plus,
  AlertCircle,
  Activity
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const StaticIcon = ({ Icon, top, left, size }: { Icon: any, top: string, left: string, size: number, key?: React.Key }) => {
  return (
    <div
      style={{ 
        position: "absolute", 
        top, 
        left, 
        opacity: 0.08,
        zIndex: 0
      }}
    >
      <Icon size={size} className="text-green-primary" />
    </div>
  );
};

const BackgroundIcons = () => {
  const icons = [
    { Icon: Leaf, top: "5%", left: "2%", size: 200 },
    { Icon: Utensils, top: "15%", left: "88%", size: 180 },
    { Icon: Soup, top: "65%", left: "5%", size: 240 },
    { Icon: Carrot, top: "75%", left: "82%", size: 220 },
    { Icon: Apple, top: "35%", left: "42%", size: 150 },
    { Icon: ChefHat, top: "12%", left: "48%", size: 160 },
    { Icon: Coffee, top: "45%", left: "12%", size: 140 },
    { Icon: Pizza, top: "85%", left: "35%", size: 190 },
    { Icon: Leaf, top: "25%", left: "75%", size: 130 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {icons.map((icon, index) => (
        <StaticIcon 
          key={index} 
          Icon={icon.Icon}
          top={icon.top}
          left={icon.left}
          size={icon.size}
        />
      ))}
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md py-3 shadow-sm" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 cursor-pointer group">
          <div className="w-10 h-10 bg-green-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-primary/20 group-hover:scale-105 transition-transform">
            <Leaf size={24} />
          </div>
          <span className="text-2xl font-display font-bold tracking-tight text-text-dark group-hover:text-green-primary transition-colors">ShelfSmart</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {["Features", "How it Works", "Pricing", "About"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s/g, "-")}`} className="text-sm font-medium text-text-muted hover:text-green-primary transition-colors">
              {item}
            </a>
          ))}
          <button className="bg-green-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-green-primary/90 transition-all shadow-lg shadow-green-primary/20 active:scale-95">
            Contact Us
          </button>
        </div>

        <button className="md:hidden text-text-dark" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {["Features", "How it Works", "Pricing", "About"].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(/\s/g, "-")}`} 
                  className="text-lg font-medium text-text-dark" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button className="bg-green-primary text-white px-6 py-3 rounded-xl font-semibold w-full mt-2">
                Contact Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const DashboardPreview = () => {
  return (
    <div className="bg-[#F8FAF9] rounded-[1.5rem] overflow-hidden shadow-2xl border border-gray-100 flex h-[400px] md:h-[500px] w-full max-w-[700px] mx-auto scale-[0.75] sm:scale-90 lg:scale-100 origin-center transition-transform duration-500">
      {/* Sidebar */}
      <div className="w-40 bg-white border-r border-gray-100 p-4 hidden lg:flex flex-col gap-5">
        <div className="flex flex-col gap-0.5">
          <div className="text-green-primary font-display font-bold text-sm">ShelfSmart</div>
          <div className="text-[8px] text-text-muted font-medium uppercase tracking-wider">Intelligent Curator</div>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { icon: LayoutDashboard, label: "Dashboard", active: true },
            { icon: Package, label: "Live Inventory" },
            { icon: Sparkles, label: "Smart Ordering" },
            { icon: Truck, label: "Supplier Shipments" },
            { icon: Layers, label: "Integrations" },
            { icon: Settings, label: "Settings" },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-2 text-[10px] font-semibold ${item.active ? "text-green-primary" : "text-text-muted"}`}>
              <item.icon size={12} />
              {item.label}
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
          <img src="https://picsum.photos/seed/alex/100/100" className="w-6 h-6 rounded-full" alt="User" referrerPolicy="no-referrer" />
          <div className="flex flex-col">
            <div className="text-[8px] font-bold text-text-dark">Alex Chen</div>
            <div className="text-[6px] text-text-muted">Manager</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-12 bg-white/50 backdrop-blur-sm border-b border-gray-100 px-4 flex items-center justify-between">
          <div className="relative w-48">
            <Search size={10} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-gray-100/50 border-none rounded-lg py-1 pl-7 pr-3 text-[8px] focus:ring-1 focus:ring-green-primary/30"
              readOnly
            />
          </div>
          <div className="flex items-center gap-2.5 text-text-muted">
            <Bell size={14} />
            <Settings size={14} />
          </div>
        </div>

        {/* Dashboard Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
          {/* Alert Bar */}
          <div className="bg-red-50 border border-red-100 rounded-lg p-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-coral rounded-full flex items-center justify-center text-white">
                <AlertCircle size={10} />
              </div>
              <div className="text-[8px] font-medium text-text-dark">
                Out of Stock - <span className="text-coral underline cursor-pointer">Resolve</span>
              </div>
            </div>
            <button className="bg-coral text-white text-[6px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
              Find Alt
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Stock Status */}
            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-display font-bold text-[10px] text-text-dark">Stock Status</h4>
                  <p className="text-[7px] text-text-muted">Real-time levels</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-6 h-3 bg-green-primary rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                {[
                  { cat: "DAIRY", items: [
                    { name: "Heavy Cream", val: 0, color: "bg-coral", label: "Critical" },
                    { name: "Whole Milk", val: 85, color: "bg-green-primary" }
                  ]},
                  { cat: "PRODUCE", items: [
                    { name: "Avocados", val: 15, color: "bg-coral", label: "Low" }
                  ]}
                ].map((group, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-[6px] font-bold tracking-widest text-text-muted">
                      <span>{group.cat}</span>
                      {group.items[0].label && <span className={group.items[0].color.replace('bg-', 'text-')}>{group.items[0].label}</span>}
                    </div>
                    {group.items.map((item, j) => (
                      <div key={j} className="space-y-0.5">
                        <div className="flex justify-between text-[7px] font-medium">
                          <span>{item.name}</span>
                          <span className={item.val < 20 ? "text-coral" : "text-text-muted"}>{item.val}%</span>
                        </div>
                        <div className="h-0.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color}`} style={{ width: `${item.val}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Scheduled Orders */}
            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-50">
              <h4 className="font-display font-bold text-[10px] text-text-dark mb-2">Orders</h4>
              <div className="flex border-b border-gray-100 mb-2">
                <div className="px-2 py-1 text-[8px] font-bold text-green-primary border-b-2 border-green-primary">Soon</div>
                <div className="px-2 py-1 text-[8px] font-bold text-text-muted">Drafts</div>
              </div>

              <div className="space-y-2">
                <div className="p-2 rounded-lg border-l-2 border-green-primary bg-green-50/30 flex flex-col gap-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-[6px] font-bold text-green-primary uppercase tracking-wider">SYSCO</div>
                      <div className="text-[8px] font-bold text-text-dark">Produce Mix</div>
                    </div>
                    <div className="bg-white px-1 py-0.5 rounded-full text-[6px] font-bold border border-gray-100">10 AM</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-[6px] text-text-muted">
                      <Truck size={6} />
                      In Transit
                    </div>
                    <div className="text-[8px] font-bold text-text-dark">$1,420</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-0.5 text-green-primary cursor-pointer">
                  <div className="flex items-center gap-1 text-[7px] font-bold">
                    <Sparkles size={8} />
                    3 Drafts
                  </div>
                  <ChevronRight size={10} />
                </div>
              </div>
            </div>
          </div>

          {/* Predictive Demand */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-50">
            <div className="flex items-center gap-1 mb-2">
              <Activity size={10} className="text-green-primary" />
              <span className="text-[6px] font-bold text-green-primary uppercase tracking-widest">Demand</span>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 space-y-2">
                <h4 className="text-sm font-display font-bold text-text-dark">Insights</h4>
                <div className="bg-green-50/50 p-2 rounded-lg border border-green-100 inline-block">
                  <div className="text-[8px] font-medium text-text-dark">
                    Rain + Concert = <span className="bg-green-primary text-white px-1 py-0.5 rounded font-bold">+15%</span>
                  </div>
                </div>
              </div>
              <div className="flex items-end gap-1 h-16">
                {[40, 60, 50, 80, 100, 70, 45].map((h, i) => (
                  <div key={i} className="relative group">
                    <div 
                      className={`w-4 rounded-t-sm transition-all ${i === 4 ? "bg-green-primary/60" : "bg-green-primary/20"}`} 
                      style={{ height: `${h}%` }} 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAB */}
      <div className="absolute bottom-4 right-4 w-7 h-7 bg-green-primary text-white rounded-lg shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
        <Plus size={14} />
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-12 md:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-light/30 text-green-primary text-xs font-bold uppercase tracking-wider mb-6">
            <Zap size={14} />
            <span>AI-Powered Inventory</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-text-dark leading-[1.1] mb-6">
            Always one step <br />
            <span className="text-coral italic">ahead</span> of the menu.
          </h1>
          <p className="text-base md:text-lg text-text-muted leading-relaxed mb-10 max-w-lg">
            ShelfSmart predicts what your kitchen needs <span className="text-coral font-bold">before</span> you run short. Sync supplier orders, foot traffic, and local events into one intelligent workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-coral text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-coral/90 transition-all shadow-xl shadow-coral/20 flex items-center justify-center gap-2 group">
              Get a Custom Quote
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                  <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <div className="text-sm">
              <span className="font-bold text-text-dark">500+ restaurants</span>
              <p className="text-text-muted">trust ShelfSmart daily</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <DashboardPreview />
          
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-coral/20 rounded-full blur-2xl -z-10" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-light/30 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="glass-card p-8 rounded-[2rem] hover:scale-[1.02] transition-transform cursor-default group"
  >
    <div className="w-14 h-14 bg-green-light/20 text-green-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-primary group-hover:text-white transition-colors">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-display font-bold text-text-dark mb-3">{title}</h3>
    <p className="text-text-muted leading-relaxed text-sm">{description}</p>
  </motion.div>
);

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 relative bg-white z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-green-primary uppercase tracking-[0.2em] mb-4">Features</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-text-dark mb-6">Intelligence built for the kitchen.</h3>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            ShelfSmart fuses real-world signals into automated, accurate inventory decisions — so you focus on cooking, not counting.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={TrendingUp}
            title="Predictive Demand"
            description="Fuses foot traffic, local events, and weather forecasts to project exactly what you'll need days in advance."
            delay={0.1}
          />
          <FeatureCard 
            icon={Zap}
            title="Auto-Ordering"
            description="When stock drops below thresholds, orders trigger automatically with your preferred suppliers."
            delay={0.2}
          />
          <FeatureCard 
            icon={BarChart3}
            title="Real-time Sync"
            description="Connects directly to your POS to track every sale and update inventory levels in milliseconds."
            delay={0.3}
          />
          <FeatureCard 
            icon={ShieldCheck}
            title="Waste Reduction"
            description="Smart algorithms identify slow-moving items and suggest menu adjustments to minimize spoilage."
            delay={0.4}
          />
          <FeatureCard 
            icon={Clock}
            title="Time Savings"
            description="Eliminate hours of manual counting. Our system handles the tracking so your team can stay focused."
            delay={0.5}
          />
          <FeatureCard 
            icon={ChefHat}
            title="Recipe Mapping"
            description="Automatically breaks down menu items into raw ingredients for precise inventory depletion tracking."
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { title: "Connect Systems", desc: "Link your POS and supplier accounts in minutes." },
    { title: "AI Analysis", desc: "ShelfSmart reads demand signals from weather and events." },
    { title: "Smart Orders", desc: "Optimal orders are drafted or auto-placed for you." },
    { title: "Zero Waste", desc: "Enjoy a perfectly stocked kitchen with zero effort." },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-mint relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-green-primary uppercase tracking-[0.2em] mb-4">Process</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-text-dark mb-6">From signals to shipment, automatically.</h3>
          </div>
          
          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-8 items-start"
              >
                <div className="w-14 h-14 rounded-2xl bg-green-primary text-white flex items-center justify-center font-display font-bold text-2xl flex-shrink-0 shadow-lg shadow-green-primary/20">
                  {i + 1}
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-text-dark mb-3">{step.title}</h4>
                  <p className="text-text-muted text-lg leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section id="about" className="py-24 px-6 bg-green-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10"><Leaf size={100} /></div>
        <div className="absolute bottom-10 right-10"><Utensils size={100} /></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white text-center mb-16">
          Loved by kitchens that <span className="italic opacity-80">refuse to guess.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              text: "We used to run out of salmon every Friday. ShelfSmart saw the weekend spike coming and had our order in by Wednesday. Game changer.",
              author: "Marcus T.",
              role: "Executive Chef, The Pearl Bistro"
            },
            {
              text: "Our food cost dropped by 28% in the first two months. The scale integration alone paid for itself. I can't imagine running inventory the old way.",
              author: "Priya K.",
              role: "Owner, Spice Route Café"
            },
            {
              text: "The Toast sync is seamless. When we 86 something, it knows. When we run a special, it adjusts. It's like having a full-time manager who never sleeps.",
              author: "James L.",
              role: "GM, Harbor House Kitchen"
            }
          ].map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-[2rem] text-white"
            >
              <div className="flex gap-1 mb-6 text-green-light">
                {[1, 2, 3, 4, 5].map(s => <span key={s}>★</span>)}
              </div>
              <p className="text-lg italic mb-8 opacity-90 leading-relaxed">"{t.text}"</p>
              <div>
                <div className="font-bold text-green-light">{t.author}</div>
                <div className="text-sm opacity-60">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white pt-20 pb-10 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-green-primary rounded-lg flex items-center justify-center text-white">
                <Leaf size={18} />
              </div>
              <span className="text-xl font-display font-bold tracking-tight text-text-dark">ShelfSmart</span>
            </div>
            <p className="text-text-muted max-w-sm leading-relaxed">
              The intelligent inventory platform for the modern kitchen. Reduce waste, save time, and maximize profits with AI-driven insights.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-text-dark mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><a href="#" className="hover:text-green-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-green-primary transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-green-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-green-primary transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-dark mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><a href="#" className="hover:text-green-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-green-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-green-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-green-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-text-muted">© 2025 ShelfSmart Inc. All rights reserved.</p>
          <div className="flex gap-6">
            {/* Social icons placeholder */}
            <div className="w-5 h-5 bg-gray-100 rounded-full" />
            <div className="w-5 h-5 bg-gray-100 rounded-full" />
            <div className="w-5 h-5 bg-gray-100 rounded-full" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-green-light selection:text-green-primary relative">
      <BackgroundIcons />
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Trusted By Bar */}
        <section className="py-10 border-y border-gray-100 bg-white relative z-10 overflow-hidden">
          <div className="relative flex whitespace-nowrap">
            <motion.div 
              animate={{ x: [ "-50%", "0%" ] }}
              transition={{ 
                duration: 30, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="flex items-center gap-16 px-8 opacity-40 grayscale"
            >
              {[
                "TOAST", "SYSCO", "US FOODS", "SQUARE", "CLOVER", "DOORDASH", "UBER EATS", "GRUBHUB"
              ].map((brand, i) => (
                <span key={i} className="text-2xl font-bold font-display tracking-widest">{brand}</span>
              ))}
              {/* Duplicate for seamless loop */}
              {[
                "TOAST", "SYSCO", "US FOODS", "SQUARE", "CLOVER", "DOORDASH", "UBER EATS", "GRUBHUB"
              ].map((brand, i) => (
                <span key={`dup-${i}`} className="text-2xl font-bold font-display tracking-widest">{brand}</span>
              ))}
            </motion.div>
          </div>
        </section>

        <Features />
        <HowItWorks />
        <Testimonials />

        {/* Final CTA */}
        <section id="pricing" className="py-32 px-6 text-center relative overflow-hidden bg-mint z-10">
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-5xl md:text-7xl font-display font-extrabold text-text-dark mb-8">
              Ready to <span className="text-coral">smart</span> up your shelves?
            </h2>
            <p className="text-xl text-text-muted mb-12 leading-relaxed">
              Join 500+ restaurants already saving 20+ hours a month on inventory management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-coral text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-coral/90 transition-all shadow-2xl shadow-coral/20 flex items-center justify-center gap-3 group">
                Contact Our Team
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <p className="mt-8 text-sm text-text-muted italic">Our experts handle the entire implementation and setup for your kitchen.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
