"use client";

import { addEvent } from "@/lib/action/events";
import { imgUpload } from "@/lib/imageUpload";
import { FieldError, Form, Input, Label, TextField, Select, ListBox, Button, Fieldset, TextArea } from "@heroui/react";
import { CalendarDays, Clock3, MapPin, Ticket, Users } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";
import toast from "react-hot-toast";

const AddEvent = ({ user }: { user: any }) => {
    const [features, setFeatures] = React.useState<string[]>([]);
    
    const [preview, setPreview] = React.useState("");
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const imageFile = formData.get("image") as File;

        const uploadedImage = await imgUpload(imageFile);
        const eventData = {
            title: formData.get("title"),
            category: formData.get("category"),
            venue: formData.get("venue"),
            date: formData.get("date"),
            time: formData.get("time"),
            price: Number(formData.get("price")),
            capacity: Number(formData.get("capacity")),
            description: formData.get("description"),
            features,
            organizer: user?.name,
            email: user?.email,
            image: uploadedImage?.url,
        };
        const result = await addEvent(eventData);
        console.log(result);
        if(!result){
            toast.error('Try again!');
            return;
        }
        if(result){
            toast.success('Ticket added successfully!');
            router.push('/dashboard/organizer/my_event')
        }

        console.log(eventData);
    };

    return (
        // <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white py-6 md:py-10 px-3 md:px-4">

        //     <div className="max-w-3xl mx-auto bg-white dark:bg-[#0b0b0c] border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 md:p-6">
        //         {user?.isFraud && (
        //         <div className="mb-4 rounded-lg border border-red-500 bg-red-100 p-4 text-red-700">
        //             Fraud Organizer. You cannot add tickets.
        //         </div>
        //         )}
        //         {/* HEADER */}
        //         <div className="mb-8">
        //             <h1 className="text-4xl font-bold">
        //                 Add New Event
        //             </h1>

        //             <p className="text-default-500 mt-2">
        //                 Create and publish your event effortlessly.
        //             </p>
        //         </div>
        //         <Form onSubmit={onSubmit} className="space-y-6">

        //             {/* EVENT TITLE */}
        //             <TextField name="title" isRequired>
        //                 <Label>Event Title</Label>
        //                 <Input placeholder="Royal Wedding Ceremony" />
        //                 <FieldError />
        //             </TextField>

        //             {/* CATEGORY + EVENT TYPE */}
        //             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

        //                 <Select name="category" isRequired>
        //                     <Label>Category</Label>

        //                     <Select.Trigger >
        //                         <Select.Value  />
        //                     </Select.Trigger>

        //                     <Select.Popover>
        //                         <ListBox>
        //                             <ListBox.Item id="Wedding">Wedding</ListBox.Item>
        //                             <ListBox.Item id="Corporate">Corporate</ListBox.Item>
        //                             <ListBox.Item id="Birthday">Birthday</ListBox.Item>
        //                             <ListBox.Item id="Festival">Festival</ListBox.Item>
        //                             <ListBox.Item id="Conference">Conference</ListBox.Item>
        //                         </ListBox>
        //                     </Select.Popover>
        //                 </Select>

        //                 <TextField name="venue" isRequired>
        //                     <Label>Venue</Label>
        //                     <Input placeholder="Dhaka Convention Hall" />
        //                 </TextField>

        //             </div>

        //             {/* DATE + TIME */}
        //             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

        //                 <TextField name="date" isRequired>
        //                     <Label>Event Date</Label>
        //                     <Input type="date" />
        //                 </TextField>

        //                 <TextField name="time" isRequired>
        //                     <Label>Event Time</Label>
        //                     <Input type="time" />
        //                 </TextField>

        //             </div>

        //             {/* PRICE + GUEST */}
        //             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

        //                 <TextField name="price" isRequired>
        //                     <Label>Ticket Price</Label>
        //                     <Input type="number" />
        //                 </TextField>

        //                 <TextField name="capacity" isRequired>
        //                     <Label>Maximum Guests</Label>
        //                     <Input type="number" />
        //                 </TextField>

        //             </div>

        //             {/* FULL DESCRIPTION */}
        //             <TextField name="description" isRequired>
        //                 <Label>Event Description</Label>
        //                 <Input placeholder="Describe your event..." />
        //             </TextField>

        //             {/* FEATURES */}
        //             <div>

        //                 <Label>Event Features</Label>

        //                 {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">

        //                     {[
        //                         "Free Parking",
        //                         "VIP Access",
        //                         "Live Music",
        //                         "Food Included",
        //                         "Photography",
        //                         "Air Condition",
        //                     ].map((feature) => (

        //                         <label
        //                             key={feature}
        //                             className="flex items-center gap-3 rounded-lg border border-gray-300 px-3 py-2 cursor-pointer hover:bg-gray-100 transition"
        //                         >
        //                             <input
        //                                 type="checkbox"
        //                                 checked={features.includes(feature)}
        //                                 onChange={() => handleFeatureToggle(feature)}
        //                             />

        //                             <span>{feature}</span>

        //                         </label>

        //                     ))}

        //                 </div> */}

        //             </div>

        //             {/* IMAGE */}
        //             <div className="w-full">
        //                 <Label>Image Upload</Label>
        //                 <Input
        //                     type="file"
        //                     name="image"
        //                     accept="image/*"
        //                     className="w-full"
        //                 />
        //             </div>

        //             {/* ORGANIZER */}
        //             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

        //                 <TextField>

        //                     <Label>Organizer</Label>

        //                     <Input
        //                         value={user?.name}
        //                         readOnly
        //                     />

        //                 </TextField>

        //                 <TextField>

        //                     <Label>Email</Label>

        //                     <Input
        //                         value={user?.email}
        //                         readOnly
        //                     />

        //                 </TextField>

        //             </div>

        //             {/* SUBMIT */}

        //             <Button
        //                 type="submit"
        //                 className="w-full bg-orange-500 text-white"
        //             >
        //                 Add Event
        //             </Button>

        //         </Form>
        //     </div>
        // </div>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 dark:from-black dark:via-zinc-950 dark:to-zinc-900 py-10 px-4">

      <div className="max-w-3xl mx-auto">

        <div className="rounded-3xl border border-default-200 bg-white dark:bg-zinc-900 shadow-xl p-8">

          {/* Header */}

          <div className="mb-10">

            <span className="inline-flex rounded-full bg-orange-100 text-orange-600 px-4 py-1 text-sm font-semibold">
              Create Event
            </span>

            <h1 className="mt-4 text-4xl font-bold">
              Add New Event
            </h1>

            <p className="mt-2 text-default-500">
              Create and publish your event in minutes.
            </p>

          </div>

          <Form onSubmit={onSubmit} className="space-y-8">

            {/* Event Details */}

            <Fieldset className="rounded-2xl border border-default-200 p-6">

              <Fieldset.Legend className="text-lg font-semibold">
                Event Details
              </Fieldset.Legend>

              <Fieldset.Group className="space-y-6">

                {/* Title */}

                <div className="flex flex-col gap-1">

                  <Label htmlFor="title">
                    Event Title
                  </Label>

                  <Input
                    id="title"
                    name="title"
                    className="rounded-xl"
                    placeholder="Royal Wedding Ceremony"
                  />

                </div>

                {/* Category + Venue */}

                <div className="grid md:grid-cols-2 gap-5">

                  <div className="flex flex-col gap-1">

                    <Label>
                      Category
                    </Label>

                    <Select className="rounded-xl" name="category">

                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>

                      <Select.Popover>

                        <ListBox>

                          <ListBox.Item id="Wedding">
                            Wedding
                          </ListBox.Item>

                          <ListBox.Item id="Corporate">
                            Corporate
                          </ListBox.Item>

                          <ListBox.Item id="Birthday">
                            Birthday
                          </ListBox.Item>

                          <ListBox.Item id="Festival">
                            Festival
                          </ListBox.Item>

                          <ListBox.Item id="Conference">
                            Conference
                          </ListBox.Item>

                        </ListBox>

                      </Select.Popover>

                    </Select>

                  </div>

                  <div className="flex flex-col gap-1">

                    <Label>
                      Venue
                    </Label>

                    <Input
                      name="venue"
                      className="rounded-xl"
                      placeholder="Dhaka Convention Hall"
                    />

                  </div>

                </div>

                {/* Date + Time */}

                <div className="grid md:grid-cols-2 gap-5">

                  <div className="flex flex-col gap-1">

                    <Label>
                      Event Date
                    </Label>

                    <Input
                      type="date"
                      name="date"
                      className="rounded-xl"
                    />

                  </div>

                  <div className="flex flex-col gap-1">

                    <Label>
                      Event Time
                    </Label>

                    <Input
                      type="time"
                      name="time"
                      className="rounded-xl"
                    />

                  </div>

                </div>

                {/* Price + Capacity */}

                <div className="grid md:grid-cols-2 gap-5">

                  <div className="flex flex-col gap-1">

                    <Label>
                      Ticket Price
                    </Label>

                    <Input
                      type="number"
                      name="price"
                      className="rounded-xl"
                      placeholder="500"
                    />

                  </div>

                  <div className="flex flex-col gap-1">

                    <Label>
                      Maximum Guests
                    </Label>

                    <Input
                      type="number"
                      name="capacity"
                      className="rounded-xl"
                      placeholder="200"
                    />

                  </div>

                </div>

                {/* Description */}

                <div className="flex flex-col gap-1">

                  <Label>
                    Event Description
                  </Label>

                  <TextArea
                    name="description"
                    // minRows={5}
                    // radius="lg"
                    placeholder="Describe your event..."
                    className="rounded-xl"
                  />

                </div>

              </Fieldset.Group>

            </Fieldset>
                    {/* Features */}

            <Fieldset className="rounded-2xl border border-default-200 p-6">

              <Fieldset.Legend className="text-lg font-semibold">
                Event Features
              </Fieldset.Legend>

              <Fieldset.Group>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

                  {[
                    "Free Parking",
                    "VIP Access",
                    "Live Music",
                    "Food Included",
                    "Photography",
                    "Air Condition",
                  ].map((feature) => (

                    <button
                      type="button"
                      key={feature}
                      onClick={() =>
                        setFeatures((prev) =>
                          prev.includes(feature)
                            ? prev.filter((f) => f !== feature)
                            : [...prev, feature]
                        )
                      }
                      className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all
                      ${
                        features.includes(feature)
                          ? "bg-orange-500 text-white border-orange-500"
                          : "bg-white border-default-300 hover:border-orange-400"
                      }`}
                    >
                      {feature}
                    </button>

                  ))}

                </div>

              </Fieldset.Group>

            </Fieldset>

            {/* Cover Image */}

            <Fieldset className="rounded-2xl border border-default-200 p-6">

              <Fieldset.Legend className="text-lg font-semibold">
                Cover Image
              </Fieldset.Legend>

              <Fieldset.Group>

                <label
                  htmlFor="image"
                  className="flex h-60 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-default-300 hover:border-orange-500 transition"
                >

                  {preview ? (
                    <img
                      src={preview}
                      className="h-full w-full rounded-2xl object-cover"
                    />
                  ) : (
                    <>
                      <div className="text-5xl">📷</div>

                      <h3 className="mt-4 text-lg font-semibold">
                        Upload Cover Image
                      </h3>

                      <p className="text-sm text-default-500">
                        Click to browse your image
                      </p>
                    </>
                  )}

                </label>

                <input
                  hidden
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />

              </Fieldset.Group>

            </Fieldset>

            {/* Organizer */}

            <Fieldset className="rounded-2xl border border-default-200 p-6">

              <Fieldset.Legend className="text-lg font-semibold">
                Organizer
              </Fieldset.Legend>

              <Fieldset.Group>

                <div className="grid md:grid-cols-2 gap-5">

                  <div className="flex flex-col gap-1">

                    <Label>Name</Label>

                    <Input
                      value={user?.name}
                      readOnly
                    //   size="lg"
                    //   radius="lg"
                    />

                  </div>

                  <div className="flex flex-col gap-1">

                    <Label>Email</Label>

                    <Input
                      value={user?.email}
                      readOnly
                    //   size="lg"
                    //   radius="lg"
                    />

                  </div>

                </div>

              </Fieldset.Group>

            </Fieldset>

            {/* Submit */}

            <Button
              type="submit"
              size="lg"
              className="w-full bg-orange-500 text-white font-semibold text-base hover:bg-orange-600"
            >
              Publish Event
            </Button>

          </Form>

        </div>

      </div>

    </div>
    );
};

export default AddEvent;