"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thank you! Your message has been sent to the Shoply support team.");
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 space-y-12">
        <div className="border-b border-slate-200 pb-6 text-center max-w-xl mx-auto space-y-2">
          <h1 className="text-3xl font-black text-slate-900">Get in Touch</h1>
          <p className="text-sm text-slate-500">
            Have questions about orders, products, or selling on Shoply? We're here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Side */}
          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Headquarters</h4>
                  <p className="text-xs text-slate-500">123 Innovation Way, Tech City</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Phone Support</h4>
                  <p className="text-xs text-slate-500">+1 (800) 555-SHOP</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Email Us</h4>
                  <p className="text-xs text-slate-500">support@shoply.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-2 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Send us a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="Order inquiry, Seller support, etc."
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Type your message here..."
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-orange-600 transition disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}