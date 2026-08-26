import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Star, Tag } from "lucide-react";

export type Event = {
  _id: string;
  title: string;
  category: string;
  venue: string;
  date: string;
  time: string;
  price: number;
  capacity: number;
  description: string;
  organizer: string;
  image: string;
  rating: number;
};

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div
      className=" flex h-full flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-56 w-full">
        <Image
          src={event?.image || '/banner/event2.jpg'}
          alt={event.title}
          fill
          className="object-cover"
        />

        <span
          className=" absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
          {event.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h2 className="line-clamp-2 text-xl font-bold text-slate-900">
          {event.title}
        </h2>

        <p className="mt-3 line-clamp-3 text-sm text-slate-600">
          {event.description}
        </p>

        {/* Meta */}
        <div className="mt-5 space-y-3 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <CalendarDays size={18} className="text-orange-500" />
            <span>
              {event.date} • {event.time}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-orange-500" />
            <span>{event.venue}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag size={18} className="text-orange-500" />
              <span className="font-semibold text-slate-800">
                ৳{event.price}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Star
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />
              <span>{event.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Button */}
        <Link
          href={`/events/${event._id}`}
          className=" mt-6 rounded-xl bg-orange-500 py-3 text-center font-semibold text-white transition hover:bg-orange-600 "
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;