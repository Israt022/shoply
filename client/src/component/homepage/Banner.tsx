"use client"

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Sparkles,
} from "lucide-react";

const Banner = () => {
  type BannerType = {
    id: number;
    image: string;
    title: string;
    description: string;
    buttonText: string;
    badge: string;
    cardTitle: string;
    floatingOne: string;
    floatingTwo: string;
  };

  const banners: BannerType[] = [
    {
      id: 1,
      image: "/banner/event1.jpg",
      title: "Creating Royal Moments That Last Forever",
      description:
        "Luxury weddings, premium corporate events and unforgettable celebrations crafted with elegance and perfection.",
      buttonText: "Explore Events",
      badge: "Luxury Event Management",
      cardTitle: "Royal Wedding",
      floatingOne: "500+ Events",
      floatingTwo: "Award Winning",
    },

    {
      id: 2,
      image: "/banner/event4.jpg",
      title: "Elegant Events For Every Occasion",
      description:
        "From exclusive gala nights to corporate conferences, we transform your vision into extraordinary experiences.",
      buttonText: "Book Consultation",
      badge: "Premium Experience",
      cardTitle: "Corporate Summit",
      floatingOne: "Luxury Decoration",
      floatingTwo: "VIP Guests",
    },

    {
      id: 3,
      image: "/banner/event2.jpg",
      title: "Celebrate Every Moment In Style",
      description:
        "Experience exceptional planning, creative decoration and seamless event execution for every celebration.",
      buttonText: "Get Started",
      badge: "Trusted By Thousands",
      cardTitle: "Grand Gala Night",
      floatingOne: "Royal Experience",
      floatingTwo: "Professional Team",
    },
  ];
  return (
    <div className='relative '>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1200}
        loop
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>

            <section className="relative h-[65vh] min-h-[560px] max-h-[760px] overflow-hidden">

              {/* Background */}

              <Image
                src={banner.image}
                alt={banner.title}
                fill
                priority={banner.id === 1}
                className="object-cover"
              />


              {/* Overlay */}

              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30"/>


              {/* Gold Glow */}

              <div className="absolute left-20 top-40 h-72 w-72 rounded-full bg-orange-500/20 blur-[120px] "/>



              {/* Content */}

              <div className="relative z-2 flex h-full items-center pt-2 lg:pt-2 ">

                <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">


                  <div className="max-w-3xl">


                    {/* Badge */}

                    <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-5 py-2 text-sm font-medium text-orange-300 backdrop-blur">

                      ✨ {banner.badge}

                    </div>



                    {/* Title */}

                    <h1 className=" mt-7 text-5xl font-black leading-[1.1] tracking-tight text-white md:text-6xl lg:text-6xl">
                      {banner.title}

                    </h1>



                    {/* Description */}

                    <p className="mt-6 max-w-2xl text-leading-8 ext-slate-300">

                      {banner.description}

                    </p>




                    {/* Buttons */}

                    <div className="mt-10 flex flex-wrap gap-5 mb-22">
                      <button className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-8 py-4 font-bold text-white shadow-[0_15px_40px_rgba(249,115,22,.35)] transition hover:-translate-y-1">

                        {banner.buttonText}

                      </button>
                      <button className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-blac ">
                        View Events
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Bottom Stats */}
      <div className="absolute -bottom-15 left-1/2 z-30 hidden w-[85%] max-w-5xl -translate-x-1/2 rounded-3xl border border-white/20 bg-white/10 p-7 backdrop-blur-xl lg:block">
        <div className="grid grid-cols-3 divide-x divide-white/20">
          <div className="text-center">

            <h3 className="text-4xl font-black text-orange-300">
              500+
            </h3>

            <p className="mt-2 text-sm text-slate-300">
              Luxury Events
            </p>

          </div>

          <div className="text-center">

            <h3 className="text-4xl font-black text-orange-300">
              50K+
            </h3>

            <p className="mt-2 text-sm text-slate-300">
              Happy Clients
            </p>

          </div>

          <div className="text-center">

            <h3 className="text-4xl font-black text-orange-300">
              10+
            </h3>

            <p className="mt-2 text-sm text-slate-300">
              Years Excellence
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;