"use client";

import { motion } from "framer-motion";
import {
  ClipboardCheck,
  Palette,
  Sparkles,
  PartyPopper,
} from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Consultation",
    desc: "Share your vision and event goals with our experts.",
    icon: ClipboardCheck,
  },
  {
    id: "02",
    title: "Planning",
    desc: "We design every detail with elegance and precision.",
    icon: Palette,
  },
  {
    id: "03",
    title: "Execution",
    desc: "Our team manages everything on your special day.",
    icon: Sparkles,
  },
  {
    id: "04",
    title: "Celebrate",
    desc: "Relax and enjoy an unforgettable experience.",
    icon: PartyPopper,
  },
];

export default function PlanningProcess() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto max-w-7xl px-6 lg:px-9">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="mb-16 text-center"
        >
          <p className="font-semibold uppercase tracking-[0.35em] text-orange-500">
            OUR PROCESS
          </p>

          <h2 className="mt-4 text-4xl font-black text-slate-900 lg:text-5xl">
            Bringing Your Vision To Life
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
            Every celebration follows a carefully crafted journey—from
            the first conversation to the unforgettable final moment.
          </p>
        </motion.div>

        {/* Timeline */}

        <div className="relative">

          {/* Center Line */}

          <div className="absolute left-1/2 hidden h-full w-[2px] -translate-x-1/2 bg-orange-100 lg:block" />

          <div className="space-y-10">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0
                      ? "lg:flex-row"
                      : "lg:flex-row-reverse"
                  }`}
                >

                  {/* Card */}

                  <div
                    className={`flex-1 flex ${
                        index % 2 === 0
                        ? "justify-start lg:justify-end"
                        : "justify-start"
                    }`}
                    >
                    <motion.div
                        initial={{
                        opacity: 0,
                        x: index % 2 === 0 ? -50 : 50,
                        }}
                        whileInView={{
                        opacity: 1,
                        x: 0,
                        }}
                        viewport={{ once: true }}
                        transition={{
                        duration: 0.6,
                        delay: index * 0.15,
                        }}
                        className="group w-full max-w-[420px] rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-orange-300 hover:shadow-xl"
                    >
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 transition group-hover:bg-orange-500">
                        <Icon
                            size={26}
                            className="text-orange-500 transition group-hover:text-white"
                        />
                        </div>

                        <p className="text-xs font-bold tracking-[0.3em] text-orange-500">
                        STEP {step.id}
                        </p>

                        <h3 className="mt-2 text-2xl font-bold text-slate-900">
                        {step.title}
                        </h3>

                        <p className="mt-3 text-[15px] leading-7 text-slate-600">
                        {step.desc}
                        </p>
                    </motion.div>
                    </div>

                  {/* Center Dot */}

                  <motion.div
                    initial={{
                      scale: 0,
                    }}
                    whileInView={{
                      scale: 1,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * .15,
                      duration: .3,
                    }}
                    className="relative hidden lg:flex h-6 w-6 items-center justify-center rounded-full border-4 border-orange-200 bg-white"
                  >
                    <div className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                  </motion.div>

                  <div className="flex-1" />

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}