"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Premium Event Planning",
  "Luxury Decoration & Styling",
  "Experienced Event Managers",
  "Flexible Packages",
  "24/7 Dedicated Support",
];

export default function LuxuryExperience() {
  return (
    <section className="py-24 bg-[#FFF7ED]">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:px-9 lg:grid-cols-2">
        {/* Left */}
        <div className="relative">

          <Image
            src="/about/luxury.jpeg"
            alt="Luxury Event"
            width={650}
            height={700}
            className="rounded-[32px] object-cover shadow-2xl"
          />

          <div className="absolute bottom-8 left-8 rounded-2xl bg-white px-8 py-5 shadow-xl">
            <h3 className="text-3xl font-bold text-orange-500">10+</h3>
            <p className="text-slate-600">
              Years of Excellence
            </p>
          </div>

        </div>
        {/* Right */}
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
            Luxury Experience
          </span>

          <h2 className="mt-5 text-5xl font-bold leading-tight text-slate-900">
            Every Detail
            <br />
            Crafted To Perfection
          </h2>

          <p className="mt-6 leading-8 text-slate-600">
            Confluxa creates elegant weddings, premium corporate events and
            unforgettable celebrations with creativity, precision and
            world-class service.
          </p>

          <div className="mt-10 space-y-5">
            {features.map((item) => (
              <div key={item} className="flex items-center gap-4">
                <CheckCircle2 className="text-orange-500" size={22} />
                <span className="text-lg text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        

      </div>
    </section>
  );
}