import { motion } from "motion/react";
import React, { useState } from "react";
import { ArrowRight, CheckCircle2, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Waitlist() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      console.warn("VITE_FORMSPREE_ENDPOINT is not set.");
      // Simulate success if no endpoint set (for development)
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
    <div className="min-h-screen bg-mint flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-light/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-coral/10 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-text-muted hover:text-green-primary transition-colors mb-8 font-medium">
          <ChevronLeft size={20} />
          Back to Home
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-green-primary/5 border border-white"
        >
          {status === "success" ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 bg-green-50 text-green-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl font-display font-bold text-text-dark mb-4">You're on the list!</h2>
              <p className="text-text-muted mb-8 leading-relaxed">
                Thanks for joining. We'll be in touch soon with your early access invitation.
              </p>
              <Link to="/">
                <button className="bg-gray-100 text-text-dark px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors w-full">
                  Return Home
                </button>
              </Link>
            </motion.div>
          ) : (
            <>
              <h2 className="text-4xl font-display font-extrabold text-text-dark mb-2">
                Join the <span className="text-green-primary">Waitlist</span>
              </h2>
              <p className="text-text-muted mb-8">
                Be the first to know when we launch and get exclusive early access pricing.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-text-dark mb-2">Name or Company</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-green-primary/30 transition-all placeholder:text-gray-400"
                    placeholder="E.g., The Pearl Bistro"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-text-dark mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-green-primary/30 transition-all placeholder:text-gray-400"
                    placeholder="chef@example.com"
                  />
                </div>
                
                {/* Identifier for Formspree to know which form this is */}
                <input type="hidden" name="_subject" value="New Waitlist Signup!" />

                <button 
                  type="submit" 
                  disabled={status === "submitting"}
                  className="w-full bg-green-primary text-white rounded-xl px-4 py-4 font-bold text-lg hover:bg-green-primary/90 flex items-center justify-center gap-2 group transition-all disabled:opacity-70 mt-2 shadow-lg shadow-green-primary/20"
                >
                  {status === "submitting" ? "Submitting..." : "Secure My Spot"}
                  {!status && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                </button>
                
                {status === "error" && (
                  <p className="text-coral text-sm text-center mt-4">Oops! Something went wrong. Please try again.</p>
                )}
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
