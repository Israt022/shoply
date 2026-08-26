"use client";

import BookingCard from "@/component/event/BookingCard";
import { cancelBooking } from "@/lib/action/events";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Link } from "@heroui/react";
import { CalendarDays } from "lucide-react";


const BookingEventList = ({events}: {events:any[]}) => {

  const router = useRouter();


  const handleCancel = async(id:string)=>{

    const result = await cancelBooking(id);


    if(result.success){
      toast.success("Booking cancelled");
      router.refresh();
    }
    else{
      toast.error(result.message);
    }

  };


  return (
  <>
    {events.length === 0 ? (
      <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-dashed border-orange-300 bg-orange-50 px-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
          <CalendarDays className="h-10 w-10 text-orange-500" />
        </div>

        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          No Bookings Yet
        </h2>

        <p className="mt-3 max-w-md text-gray-600">
          You haven't booked any events yet. Explore our latest events and
          reserve your spot to see your bookings here.
        </p>

        <Link
          href="/events"
          className="mt-8 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Explore Events
        </Link>
      </div>
    ) : (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {events.map((event: any) => (
          <BookingCard
            key={event._id}
            event={event}
            onCancel={handleCancel}
          />
        ))}
      </div>
    )}
  </>
);
};

export default BookingEventList;