"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import EventCard from "./EventCard";
import { CalendarDays, Search, Tags } from "lucide-react";
import { PaginationWithSummary } from "./PaginationWithSummary";

interface SearchFilterPageProps {
  events: any[];
  total: number;
  totalPages: number;
  currentPage: number;
}

const SearchFilterPage = ({
  events,
  total,
  totalPages,
  currentPage,
}: SearchFilterPageProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") || "");
const [category, setCategory] = useState(searchParams.get("category") || "");
const [date, setDate] = useState(searchParams.get("date") || "");

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (search) {
            params.set("search", search);
        } else {
            params.delete("search");
        }

        if (category) {
            params.set("category", category);
        } else {
            params.delete("category");
        }

        if (date) {
            params.set("date", date);
        } else {
            params.delete("date");
        }

        params.set("page", "1");

        router.push(`/events?${params.toString()}`);
        };
    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-9">
                {/* Heading */}
                <div className="text-center mb-12">
                    <p className="uppercase tracking-[.3em] text-orange-500 font-semibold">
                        Events
                    </p>
                    <h1 className="mt-4 text-4xl font-black text-slate-900">
                        Explore Our Events
                    </h1>
                    <p className="mt-4 text-slate-600">
                        Find your perfect event by searching and filtering.
                    </p>
                </div>
                {/* Filter Section */}
                {/* Filter Section */}

                <div className="relative overflow-hidden rounded-[32px] border border-orange-100 bg-gradient-to-br from-white via-orange-50 to-orange-100 p-8 shadow-xl">


                    {/* Glow */}

                    <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-orange-400/20 blur-3xl" />
                    <div className="relative z-10">
                        {/* <div className="mb-8">

                            <h2 className="text-2xl font-black text-slate-900">
                                Find Your Perfect Event
                            </h2>

                            <p className="mt-2 text-slate-600">
                                Search and discover events that match your interest.
                            </p>

                        </div> */}
                        <div className="grid gap-5 md:grid-cols-3">
                            {/* Search */}
                            <div className="relative">
                                <Search
                                    size={20}
                                    className="absolute left-4 top-3.5 text-orange-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Search event title..."
                                    value={search}
                                    onChange={(e)=>setSearch(e.target.value)}
                                    className=" w-full rounded-2xl  border border-orange-100 bg-white py-3 pl-12 pr-4 outline-none transition focus:ring-4 focus:ring-orange-200 "
                                />
                            </div>
                            {/* Category */}
                            <div className="relative">
                                <Tags
                                    size={20}
                                    className="absolute left-4 top-3.5 text-orange-500"
                                />
                                <select
                                    value={category}
                                    onChange={(e)=>setCategory(e.target.value)}
                                    className=" w-full rounded-2xl border border-orange-100 bg-white py-3 pl-12 pr-4 outline-none focus:ring-4 focus:ring-orange-200 ">
                                    <option value="">
                                        All Categories
                                    </option>
                                    <option value="Wedding">
                                        Wedding
                                    </option>
                                    <option value="Corporate">
                                        Corporate
                                    </option>
                                    <option value="Birthday">
                                        Birthday
                                    </option>
                                    <option value="Concert">
                                        Concert
                                    </option>
                                    <option value="Conference">
                                        Conference
                                    </option>
                                    <option value="Festival">
                                        Festival
                                    </option>
                                </select>
                            </div>
                            {/* Date */}
                            <div className="relative">
                                <CalendarDays
                                    size={20}
                                    className="absolute left-4 top-3.5 text-orange-500"
                                />
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e)=>setDate(e.target.value)}
                                    className="w-full rounded-2xl border border-orange-100 bg-white py-3 pl-12 pr-4 outline-none focus:ring-4 focus:ring-orange-200"/>
                            </div>
                        </div>
                        <button
                            onClick={handleSearch}
                            className=" mt-7 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-10 py-3.5 font-bold text-white shadow-lg transition hover:scale-105 hover:shadow-orange-300 ">
                            Search Events
                        </button>
                    </div>
                </div>
                {/* Event Cards */}
                
                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {
                        events.map(event=>(
                            <EventCard
                                key={event._id}
                                event={event}
                            />
                            // <div>{event.image}</div>
                        ))
                    }
                </div>
                <PaginationWithSummary
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={total}
                />
            </div>
        </section>
    );
};
export default SearchFilterPage;