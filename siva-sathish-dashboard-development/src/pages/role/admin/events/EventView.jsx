import { eventGetApi } from "@/api/admin/Event";
import { Button } from "@/components/ui/button";
import { formatDateNew, formatYearMoDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useLocation } from "react-router-dom";

const EventDetails = () => {
  const location = useLocation();
  const id = location.state?.event || [];
  // console.log(id);

  const eventGet = useQuery({
    queryKey: ["eventGET", id],
    queryFn: () => eventGetApi(`/${id}`),
  });

  console.log(eventGet);
  const event = eventGet?.data?.data?.result;

  return (
    <>
      <div>
        {event && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-12 text-center">
              Event Details
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-16 text-base sm:text-lg">
              <div>
                <p className="text-gray-600 font-medium mb-1">Host</p>
                <p className="text-gray-900 text-xl font-semibold">
                  {event.host}
                </p>
              </div>

              {/* Date */}
              <div>
                <p className="text-gray-600 font-medium mb-1">Date</p>
                <p className="text-gray-900 text-lg">
                  {formatDateNew(new Date(event.date))}
                </p>
              </div>

              <div>
                <p className="text-gray-600 font-medium mb-1">Time</p>
                <p className="text-gray-900 text-xl font-semibold">
                  {event.fromTime} - {event.toTime}
                </p>
              </div>

              <div>
                <p className="text-gray-600 font-medium mb-1">Duration</p>
                <p className="text-gray-900 text-xl font-semibold">
                  {event.duration}
                </p>
              </div>

              <div>
                <p className="text-gray-600 font-medium mb-1">Created On</p>
                <p className="text-gray-900 text-xl font-semibold">
                  {formatDateNew(new Date(event.createdAt))}
                </p>
              </div>

              <div>
                <p className="text-gray-600 font-medium mb-1">Status</p>
                <p className="text-gray-900 text-xl font-semibold">
                  {event.status}
                </p>
              </div>

              <div>
                <p className="text-gray-600 font-medium mb-1">Type</p>
                <p className="text-gray-900 text-xl font-semibold">
                  {event.event_type}
                </p>
              </div>

              <div>
                <p className="text-gray-600 font-medium mb-1">Strength</p>
                <p className="text-gray-900 text-xl font-semibold">
                  {event.strength || "-"}
                </p>
              </div>

              <div className="md:col-span-2">
                <p className="text-gray-600 font-medium mb-1">Description</p>
                <p className="text-gray-900 text-lg">{event.description}</p>
              </div>

              <div className="md:col-span-2">
                <p className="text-gray-600 font-medium mb-1">Participants</p>
                <div className="space-y-1">
                  {event.participants.map((participant) => (
                    <p
                      key={participant._id}
                      className="text-gray-900 text-lg font-medium"
                    >
                      {participant.email}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md shadow-md"
                onClick={() => window.history.back()}
              >
                Back
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EventDetails;
