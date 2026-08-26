"use client";

import { Button } from "@heroui/react";
import { CalendarPlus } from "lucide-react";
import Image from "next/image";
import React from "react";
import { addEventToDashboard } from "@/lib/action/events";
import { toast } from "react-hot-toast";

interface Event {
  _id: string;
  title: string;
  image: string;
  category: string;
  venue: string;
  date: string;
  time: string;
  price: number;
  capacity: number;
  description: string;
  features: string[];
  organizer: string;
  rating: number;
  reviews: any[];
  status: string;
}

interface EventDetailsCardProps {
  event: Event;
}

const EventDetailsCard = ({ event }: EventDetailsCardProps) => {
  return (
    <div className="max-w-6xl mx-auto px-5 py-10 space-y-10">

      {/* Hero / Media Section */}
      <section className="grid md:grid-cols-2 gap-8">

        <div className="relative h-[400px] rounded-2xl overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>


        <div className="space-y-5">
          <span className="text-orange-500 font-semibold">
            {event.category}
          </span>

          <h1 className="text-4xl font-bold">
            {event.title}
          </h1>

          <p className="text-muted-foreground">
            Organized by {event.organizer}
          </p>
          <div className="pt-5">
              <Button
                // color="primary"
                size="lg"
                className="w-full md:w-auto bg-orange-500 text-white"
                onPress={async()=>{

                  const result = await addEventToDashboard(event._id);

                  if(result.success){
                    toast.success("Added to dashboard");
                  }
                  else{
                    toast.error(result.message);
                  }

                }}
              >
                Add to Dashboard
              </Button>
            </div>


          <div className="grid grid-cols-2 gap-4">

            <div>
              <p className="text-sm text-gray-500">
                Date
              </p>
              <p className="font-medium">
                {event.date}
              </p>
            </div>


            <div>
              <p className="text-sm text-gray-500">
                Time
              </p>
              <p className="font-medium">
                {event.time}
              </p>
            </div>


            <div>
              <p className="text-sm text-gray-500">
                Venue
              </p>
              <p className="font-medium">
                {event.venue}
              </p>
            </div>


            <div>
              <p className="text-sm text-gray-500">
                Price
              </p>
              <p className="font-medium">
                ${event.price}
              </p>
            </div>
            

          </div>

        </div>

      </section>


      {/* Description */}
      <section className="space-y-3">
        <h2 className="text-2xl font-bold">
          Overview
        </h2>

        <p className="text-gray-600 leading-7">
          {event.description}
        </p>
      </section>



      {/* Specifications */}
      <section>

        <h2 className="text-2xl font-bold mb-5">
          Key Information
        </h2>


        <div className="grid md:grid-cols-3 gap-5">

          <div className="border rounded-xl p-5">
            <p className="text-gray-500">
              Capacity
            </p>
            <h3 className="text-xl font-semibold">
              {event.capacity} People
            </h3>
          </div>


          <div className="border rounded-xl p-5">
            <p className="text-gray-500">
              Status
            </p>
            <h3 className="text-xl font-semibold capitalize">
              {event.status}
            </h3>
          </div>


          <div className="border rounded-xl p-5">
            <p className="text-gray-500">
              Rating
            </p>
            <h3 className="text-xl font-semibold">
              ⭐ {event.rating}
            </h3>
          </div>

        </div>

      </section>



      {/* Features */}
      <section>

        <h2 className="text-2xl font-bold mb-4">
          Features
        </h2>


        <div className="flex flex-wrap gap-3">

          {
            event.features?.map((feature)=>(
              <span
                key={feature}
                className="px-4 py-2 bg-orange-100 rounded-full"
              >
                {feature}
              </span>
            ))
          }

        </div>

      </section>



      {/* Reviews */}
      <section>

        <h2 className="text-2xl font-bold mb-4">
          Reviews & Ratings
        </h2>


        {
          event.reviews?.length ? (
            event.reviews.map((review,index)=>(
              <div key={index}>
                {review}
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No reviews yet.
            </p>
          )
        }

      </section>


    </div>
  );
};

export default EventDetailsCard;