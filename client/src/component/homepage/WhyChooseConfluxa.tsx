"use client";

import Image from "next/image";
import {
  Award,
  ShieldCheck,
  Users,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const features = [
  "Luxury Event Planning",
  "Experienced Professional Team",
  "Trusted Vendor Network",
  "Customized Event Solutions",
];

export default function WhyChooseConfluxa() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:px-9 lg:grid-cols-2">

        {/* Left */}

        <div>

          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            Why Choose Us
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight text-slate-900">
            Premium Event Experiences,
            <span className="text-orange-500">
              {" "}Perfectly Planned.
            </span>
          </h2>

          <p className="mt-6 leading-8 text-slate-600">
            We transform your ideas into unforgettable celebrations with
            creativity, precision, and exceptional service. From intimate
            gatherings to grand corporate events, every detail is managed
            with excellence.
          </p>

          <div className="mt-10 space-y-5">

            {features.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">
                  <CheckCircle2
                    size={22}
                    className="text-orange-500"
                  />
                </div>

                <p className="font-medium text-slate-700">
                  {item}
                </p>
              </div>
            ))}

          </div>

        </div>

        {/* Right */}

        <div className="relative">

          <div className="overflow-hidden rounded-[36px]">

            <Image
              src="/about/about.jpeg"
              alt="Why Choose Confluxa"
              width={700}
              height={800}
              className="h-[600px] w-full object-cover"
            />

          </div>

          {/* Floating Box */}

          <div className="absolute -bottom-8 left-8 rounded-3xl bg-white p-6 shadow-2xl">

            <div className="grid grid-cols-2 gap-6">

              <div className="text-center">
                <Award
                  className="mx-auto text-orange-500"
                  size={30}
                />
                <h3 className="mt-2 text-2xl font-bold">
                  500+
                </h3>
                <p className="text-sm text-slate-500">
                  Events
                </p>
              </div>

              <div className="text-center">
                <Users
                  className="mx-auto text-orange-500"
                  size={30}
                />
                <h3 className="mt-2 text-2xl font-bold">
                  50K+
                </h3>
                <p className="text-sm text-slate-500">
                  Guests
                </p>
              </div>

              <div className="text-center">
                <ShieldCheck
                  className="mx-auto text-orange-500"
                  size={30}
                />
                <h3 className="mt-2 text-2xl font-bold">
                  100%
                </h3>
                <p className="text-sm text-slate-500">
                  Trusted
                </p>
              </div>

              <div className="text-center">
                <Clock3
                  className="mx-auto text-orange-500"
                  size={30}
                />
                <h3 className="mt-2 text-2xl font-bold">
                  24/7
                </h3>
                <p className="text-sm text-slate-500">
                  Support
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}