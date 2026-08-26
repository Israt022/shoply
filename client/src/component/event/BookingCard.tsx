import Image from "next/image";
import { CalendarDays, Eye, MapPin, View, XCircle } from "lucide-react";
import { Link } from "@heroui/react";

interface BookingCardProps {
  event: any;
  onCancel: (id: string) => void;
}

const BookingCard = ({ event, onCancel }: BookingCardProps) => {
  return (
    <div className="rounded-2xl border overflow-hidden bg-white shadow-sm">

      <div className="relative h-56">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>


      <div className="p-5 space-y-4">

        <h2 className="text-xl font-bold">
          {event.title}
        </h2>


        <p className="text-gray-600 line-clamp-2">
          {event.description}
        </p>


        <div className="space-y-2 text-sm">

          <p className="flex items-center gap-2">
            <CalendarDays size={16}/>
            {event.date} | {event.time}
          </p>


          <p className="flex items-center gap-2">
            <MapPin size={16}/>
            {event.venue}
          </p>


          <p>
            Price: ${event.price}
          </p>

        </div>


        <button
          onClick={() => onCancel(event.bookingId)}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500 text-white py-2 hover:bg-red-600 transition"
        >
          <XCircle size={18}/>
          Cancel Booking
        </button>
        {/* Button */}
        <Link
          href={`/events/${event._id}`}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-500 text-white py-2 hover:bg-orange-600 transition"
        >
        <Eye size={18} />
          View Details
        </Link>

      </div>

    </div>
  );
};

export default BookingCard;