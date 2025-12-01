import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Timer } from "lucide-react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { IoChevronBackOutline } from "react-icons/io5";
import EventCreateSuccessModal from "./EventCreateSuccessModal";
import { Select, Textarea } from "@headlessui/react";
import { eventCreateApi } from "@/api/admin/Event";
import {
  formate12hrto24hr,
  formatTimeToHourMinute,
  formatYearMoDate,
} from "@/lib/utils";
import { Label } from "@radix-ui/react-dropdown-menu";
import { TagsInput } from "react-tag-input-component";
// import toast from "react-hot-toast";
const CreateEvent = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "",
    date: null,
    startTime: null,
    endTime: null,
    duration: "",
    host: "",
    participants: "",
    meetingIdOrVenue: "",
    payment: "",
    price: "",
  });
  console.log(form);

  const [errors, setErrors] = useState({});
  const [eventcreatesuccess, setEventCreatesuccess] = useState(false);
  const [customizeImageSize, setCustomizeImageSize] = useState([]);
  const [createResponce, setCreateResponce] = useState();
  const today = new Date();
  const navigate = useNavigate();
  const handleSizeChange = (ImageSize) => setCustomizeImageSize(ImageSize);
  console.log(customizeImageSize);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.title) newErrors.title = "Event title is required";
    if (!form.type) newErrors.type = "Event type is required";
    if (!form.description) newErrors.description = "Description is required";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.startTime) newErrors.startTime = "Start time is required";
    if (!form.endTime) newErrors.endTime = "End time is required";
    if (
      form.startTime &&
      form.endTime &&
      new Date(form.endTime) <= new Date(form.startTime)
    ) {
      newErrors.endTime = "End time must be after start time";
    }
    if (!form.duration || form.duration === "Invalid time range") {
      newErrors.duration = "Valid duration is required";
    }
    if (!form.host) {
      newErrors.host = "Host email is required";
    } else if (!emailRegex.test(form.host)) {
      newErrors.host = "Invalid email address";
    }
    if (!form.participants) {
      newErrors.participants = "Participants email is required";
    } else {
      const emails = form.participants.split(",");
      const invalidEmails = emails.filter(
        (email) => !emailRegex.test(email.trim())
      );
      if (invalidEmails.length > 0) {
        newErrors.participants = "Invalid email address(es)";
      }
    }

    if (!form.meetingIdOrVenue) {
      if (form.type === "offline") {
        newErrors.meetingIdOrVenue = "Venue details are required";
      }
    }

    if (!form.payment) {
      newErrors.payment = "Payment type is required";
    }
    if (form.payment === "false" && !form.price) {
      newErrors.price = "Price is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    let updatedForm = { ...form, [field]: value };

    if (field === "startTime" || field === "endTime") {
      const { startTime, endTime } = updatedForm;
      if (startTime && endTime) {
        const diffMs = new Date(endTime) - new Date(startTime);
        if (diffMs > 0) {
          const diffMins = Math.floor(diffMs / (1000 * 60));
          const hours = Math.floor(diffMins / 60);
          const minutes = diffMins % 60;
          updatedForm.duration = `${hours}h ${minutes}m`;
        } else {
          updatedForm.duration = "Invalid time range";
        }
      }
    }

    setForm(updatedForm);
    setErrors({ ...errors, [field]: "" });
  };
  const CreateEvent = async () => {
    const participant = customizeImageSize.map((e) => ({ email: e }));
    console.log(participant);
    const dataCreate = {
      name: form.title,
      description: form.description,
      event_type: form.type,
      date: formatYearMoDate(form.date),
      fromTime: formate12hrto24hr(form.startTime),
      toTime: formate12hrto24hr(form.endTime),
      host: form.host,
      location: form.meetingIdOrVenue,
      joiningFeeRequired: Boolean(form.payment),
      joiningFeeAmount: Number(form.price),
      participants: participant,
    };
    console.log(dataCreate);

    try {
      const response = await eventCreateApi(dataCreate);
      setCreateResponce(response);
      console.log("Event created successfully");
      setEventCreatesuccess(true);
    } catch (error) {
      console.error("Failed to Send Payload--------------", error);
      console.error(error);
    }
  };
  const handleSubmit = () => {
    try {
      if ((validateForm(), true)) {
        CreateEvent();
        // setEventCreatesuccess(true);
      } else {
        console.error("Event creation failed:");
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <>
      <div className="w-full  mx-auto  space-y-6">
        <div className="flex ">
          <h2 className="flex text-2xl font-bold text-gray-800">
            <IoChevronBackOutline
              className="mr-2 mt-1 cursor-pointer"
              onClick={() => navigate("/event")}
            />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Title
            </label>
            <Input
              type="text"
              placeholder="Enter your Event Name"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Host
            </label>
            <Input
              type="email"
              placeholder="Enter Host email id"
              value={form.host}
              onChange={(e) => handleChange("host", e.target.value)}
            />
            {errors.host && (
              <p className="text-red-500 text-sm mt-1">{errors.host}</p>
            )}
          </div>
        </div>
        <div className="col-span-12 md:col-span-12 lg:col-span-6 intro-y mt-4">
          <Label style={{ fontWeight: "500", color: "#262525" }}>Co-Host</Label>
          <div className="mt-1">
            <TagsInput
              placeHolder="Enter Particepent mails"
              onChange={(value) =>
                handleSizeChange(value.map((v) => v.toLocaleLowerCase()))
              }
              value={customizeImageSize}
            />
            <span className="text-gray-600">
              Please Press enter to add the emails
            </span>
            {errors.customizeImageSize && (
              <div className="mt-2 text-danger">{errors.participants}</div>
            )}
          </div>
        </div>

        <div>
          <div
            className={`grid ${
              form.type === "offline" ? "grid-cols-2 gap-4" : "grid-cols-1"
            } items-end`}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Type
              </label>
              <select
                className="w-full px-4 py-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
                value={form.type}
                onChange={(e) => handleChange("type", e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type}</p>
              )}
            </div>

            {form.type === "offline" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Venue Details
                </label>
                <Input
                  type="text"
                  placeholder="Enter Venue Details"
                  value={form.meetingIdOrVenue}
                  onChange={(e) =>
                    handleChange("meetingIdOrVenue", e.target.value)
                  }
                />
                {errors.meetingIdOrVenue && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.meetingIdOrVenue}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <div className="relative">
            <DatePicker
              selected={form.date}
              onChange={(date) => handleChange("date", date)}
              className=" border border-gray-300 rounded-lg p-2 pl-10 "
              placeholderText="Select date"
              dateFormat="MMM d, yyyy"
              minDate={today}
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 w-full ">
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Time
          </label>
          <div className=" flex relative">
            <DatePicker
              selected={form.startTime}
              onChange={(time) => handleChange("startTime", time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Start Time"
              dateFormat="h:mm aa"
              className="w-full border border-gray-300 rounded-lg p-2 pl-10 focus:ring-2 focus:ring-red-500"
              placeholderText="Select start time"
            />
            <Timer className="flex absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {errors.startTime && (
            <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>
          )}
        </div>

        <div className="flex flex-col w-full">
          <label className=" text-sm font-medium text-gray-700 mb-1">
            End Time
          </label>
          <div className="relative">
            <DatePicker
              selected={form.endTime}
              onChange={(time) => handleChange("endTime", time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="End Time"
              dateFormat="h:mm aa"
              className=" border border-gray-300 rounded-lg p-2 pl-10 "
              placeholderText="Select end time"
            />
            <Timer className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {errors.endTime && (
            <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration
          </label>
          <Input
            type="text"
            placeholder="Event Duration"
            value={form.duration}
            readOnly
            className={`bg-gray-100 cursor-not-allowed ${
              form.duration === "Invalid time range" ? "text-red-500" : ""
            }`}
          />
          {errors.duration && (
            <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
          )}
        </div>
      </div>
      <div>
        <div
          className={`mt-4 grid ${
            form.payment === "true" ? "grid-cols-2 gap-4" : "grid-cols-1"
          }`}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment
            </label>
            <Select
              className="w-full px-4 py-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
              value={form.payment}
              onChange={(e) => handleChange("payment", e.target.value)}
            >
              <option value="">Select Payment Type</option>
              <option value="false">Free</option>
              <option value="true">Paid</option>
            </Select>
            {errors.payment && (
              <p className="text-red-500 text-sm mt-1">{errors.payment}</p>
            )}
          </div>

          {form.payment === "true" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <Input
                type="number"
                placeholder="Enter price"
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>
          )}
        </div>
      </div>
      {/* <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Participants
        </label>
        <div className="relative">
          <Input
            type="text"
            placeholder="Enter participants' email ids, separated by commas"
            value={form.participants}
            onChange={(e) => handleChange("participants", e.target.value)}
            className="w-full px-4 py-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
          />
        </div>
        {errors.participants && (
          <p className="text-red-500 text-sm mt-1">{errors.participants}</p>
        )}
      </div> */}

      <div className="flex flex-col mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Event Description
        </label>
        <Textarea
          className="w-full px-4 py-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm resize-none"
          placeholder="Enter description"
          rows={4}
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <Button
          onClick={() => navigate("/event")}
          className="bg-gray-600 hover:bg-gray-700 text-white rounded-xl px-6 py-2"
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-6 py-2"
        >
          Create
        </Button>

        <EventCreateSuccessModal
          isOpen={eventcreatesuccess}
          createResponce={createResponce}
          onClose={() => setEventCreatesuccess(false)}
        />
      </div>
    </>
  );
};

export default CreateEvent;
