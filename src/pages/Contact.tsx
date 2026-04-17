import { motion } from "motion/react";
import React, { useState } from "react";
import { ArrowRight, CheckCircle2, ChevronLeft, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      console.warn("VITE_FORMSPREE_ENDPOINT is not set.");
      setTimeout(() => setStatus("success"), 1000);
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-mint/50 -z-10 hidden md:block rounded-l-[100px]" />
      
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="flex-1 w-full relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-text-muted hover:text-green-primary transition-colors mb-10 font-medium">
            <ChevronLeft size={20} />
            Back to Home
          </Link>
          
          <h1 className="text-5xl md:text-6xl font-display font-extrabold text-text-dark leading-[1.1] mb-6">
            Let's <span className="text-coral">talk</span> about your kitchen.
          </h1>
          <p className="text-lg text-text-muted leading-relaxed mb-10 max-w-md">
            Whether you have questions about integrations, pricing, or just want to chat about inventory, our team is ready to help.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-text-muted">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-primary">
                <Mail size={20} />
              </div>
              <div>
                <div className="text-sm font-bold text-text-dark">Email Us</div>
                <div>hello@shelfsmart.app</div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 w-full bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100"
        >
          {status === "success" ? (
             <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="text-center py-12"
           >
             <div className="w-20 h-20 bg-green-50 text-green-primary rounded-full flex items-center justify-center mx-auto mb-6">
               <CheckCircle2 size={40} />
             </div>
             <h2 className="text-3xl font-display font-bold text-text-dark mb-4">Message Sent!</h2>
             <p className="text-text-muted mb-8 leading-relaxed">
               We've received your message and will get back to you within 24 hours.
             </p>
             <button 
                onClick={() => setStatus("idle")}
                className="bg-gray-100 text-text-dark px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
             >
               Send another message
             </button>
           </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-2xl font-bold text-text-dark mb-6">Send a Message</h3>
              
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-text-dark mb-2">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-green-primary/30 transition-all placeholder:text-gray-400"
                    placeholder="Alex Chen"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-text-dark mb-2">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-green-primary/30 transition-all placeholder:text-gray-400"
                    placeholder="alex@restaurant.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-text-dark mb-2">How can we help?</label>
                <div className="relative">
                  <MessageSquare size={18} className="absolute left-4 top-4 text-gray-400" />
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-green-primary/30 transition-all placeholder:text-gray-400 resize-none"
                    placeholder="Tell us about your inventory needs..."
                  />
                </div>
              </div>
              
              <input type="hidden" name="_subject" value="New Contact Form Submission!" />

              <button 
                type="submit" 
                disabled={status === "submitting"}
                className="w-full bg-text-dark text-white rounded-xl px-4 py-4 font-bold text-lg hover:bg-black flex items-center justify-center gap-2 group transition-all disabled:opacity-70 mt-4 shadow-xl shadow-gray-200"
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
                {!status && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
              </button>

              {status === "error" && (
                <p className="text-coral text-sm text-center mt-4">Oops! Something went wrong. Please try again.</p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
