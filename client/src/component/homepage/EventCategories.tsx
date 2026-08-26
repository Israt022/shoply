"use client";

import {
  BriefcaseBusiness,
  Cake,
  Church,
  GraduationCap,
  Music2,
  PartyPopper,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    title: "Wedding",
    icon: Church,
    description: "Luxury wedding planning with premium decoration.",
  },
  {
    title: "Corporate",
    icon: BriefcaseBusiness,
    description: "Professional conferences, meetings and seminars.",
  },
  {
    title: "Birthday",
    icon: Cake,
    description: "Celebrate memorable birthdays with elegant themes.",
  },
  {
    title: "Concert",
    icon: Music2,
    description: "Large-scale concerts and entertainment events.",
  },
  {
    title: "Conference",
    icon: GraduationCap,
    description: "Business conferences and networking events.",
  },
  {
    title: "Festival",
    icon: PartyPopper,
    description: "Public festivals and cultural celebrations.",
  },
];

export default function EventCategories() {
  return (
    <section className="bg-white py-28">
      <div className="container mx-auto max-w-7xl lg:px-9">

        {/* Heading */}

        <div className="mb-16 text-center">
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            Categories
          </span>

          <h2 className="mt-5 text-4xl font-black text-slate-900">
            Explore Event Categories
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Whether it's a luxury wedding, corporate summit or music
            festival, Confluxa delivers unforgettable experiences.
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-3xl border border-orange-100 bg-[#FFF7ED] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-orange-300 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-lg transition group-hover:scale-110">
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {item.description}
                </p>

                <button className="mt-6 flex items-center gap-2 font-semibold text-orange-500 transition group-hover:gap-3">
                  Learn More
                  <ArrowRight size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}