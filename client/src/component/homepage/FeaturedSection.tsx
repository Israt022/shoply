"use client";

import Image from "next/image";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

const featuredEvents = [
  {
    id: 1,
    title: "Royal Wedding Ceremony",
    category: "Wedding",
    image: "/banner/event1.jpg",
    date: "24 Dec 2026",
    location: "Dhaka",
  },
  {
    id: 2,
    title: "Corporate Business Summit",
    category: "Corporate",
    image: "/banner/event2.jpg",
    date: "08 Jan 2027",
    location: "Chattogram",
  },
  {
    id: 3,
    title: "Luxury Music Festival",
    category: "Festival",
    image: "/banner/even3.jpg",
    date: "18 Feb 2027",
    location: "Cox's Bazar",
  },
];

export default function FeaturedEvents() {
  return (
    <section className="bg-[#FFF7ED] py-28">
      <div className="container mx-auto max-w-7xl px-6 lg:px-9">

        {/* Heading */}

        <div className="mb-16 flex items-end justify-between">
          <div>
            <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
              Featured Collection
            </span>

            <h2 className="mt-5 text-4xl font-black text-slate-900">
              Signature Events
            </h2>

            <p className="mt-4 max-w-2xl text-slate-500">
              Explore our carefully curated luxury events designed to
              create timeless memories and extraordinary experiences.
            </p>
          </div>

          <button className="hidden items-center gap-2 rounded-xl border border-orange-200 px-5 py-3 font-semibold text-orange-600 transition hover:bg-orange-500 hover:text-white lg:flex">
            View All
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Cards */}

        <div className="grid gap-8 lg:grid-cols-3">

          {featuredEvents.map((event) => (

            <div
              key={event.id}
              className="group overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-200/40"
            >

              {/* Image */}

              <div className="relative h-72 overflow-hidden">

                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <span className="absolute left-5 top-5 rounded-full bg-orange-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                  {event.category}
                </span>

              </div>

              {/* Content */}

              <div className="p-7">

                <h3 className="text-2xl font-bold text-slate-900">
                  {event.title}
                </h3>

                <p className="mt-4 text-slate-500">
                  Elegant planning, premium decoration and flawless
                  execution for unforgettable celebrations.
                </p>

                <div className="mt-6 flex items-center justify-between text-sm text-slate-500">

                  <div className="flex items-center gap-2">
                    <CalendarDays size={17} className="text-orange-500" />
                    {event.date}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={17} className="text-orange-500" />
                    {event.location}
                  </div>

                </div>

                <button className="mt-8 flex items-center gap-2 font-semibold text-orange-500 transition group-hover:gap-3">
                  Explore Event
                  <ArrowRight size={18} />
                </button>

              </div>

            </div>

          ))}

        </div>
      </div>
    </section>
  );
}