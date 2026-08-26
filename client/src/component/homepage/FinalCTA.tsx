"use client";

import Link from "next/link";
import { ArrowRight, CalendarPlus } from "lucide-react";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="py-24">
      <div className="container mx-auto max-w-7xl px-6 lg:px-9">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-slate-950 via-slate-900 to-orange-950 px-8 py-20 text-center lg:px-20"
        >

          {/* Glow */}
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-orange-500/20 blur-[120px]" />
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-amber-400/10 blur-[120px]" />

          <div className="relative z-10">

            <span className="rounded-full border border-orange-400/30 bg-orange-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">
              Ready To Celebrate?
            </span>

            <h2 className="mx-auto mt-8 max-w-3xl text-4xl font-black leading-tight text-white lg:text-6xl">
              Let's Create Your Next
              <span className="text-orange-400"> Unforgettable Event</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Whether it's a luxury wedding, corporate conference,
              birthday celebration or private gathering, Confluxa is
              ready to make every moment extraordinary.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-5">

              <Link
                href="/events"
                className="flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
              >
                <CalendarPlus size={20} />
                Book Your Event
              </Link>

              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-slate-900"
              >
                Contact Us
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}