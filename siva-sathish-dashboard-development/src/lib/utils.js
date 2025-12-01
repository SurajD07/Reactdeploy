import { clsx } from "clsx";
import { formatDistanceToNow } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function TimeAgo(date) {
  const raw = formatDistanceToNow(new Date(date), { addSuffix: true });
  const timeAgo = raw.replace("about ", "");
  return `${timeAgo}`;
}

export const formatDateNew = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export const formatYearMoDate = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0"); // Ensures two digits
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export const formatTimeToHourMinute = (dateString) => {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  hours = hours % 12 || 12;

  return `${hours}:${formattedMinutes}`;
};

export function convertToAmPm(time24) {
  if (!time24 || typeof time24 !== "string" || !time24.includes(":")) {
    return "";
  }

  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;
  hour = hour ? hour : 12;

  return `${hour}:${minute} ${ampm}`;
}

export function formateMinsToHrs(minutes) {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hrs && mins) {
    return `${hrs}h ${mins}m`;
  } else if (hrs) {
    return `${hrs}h`;
  } else {
    return `${mins}m`;
  }
}

export const formate12hrto24hr = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours(); // 0–23 (24-hour format)
  const minutes = date.getMinutes();
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes}`; // "HH:MM"
};
// export const getUserRole = () => {
//   const roleValue = localStorage.getItem("role");
//   if (roleValue) {
//     return atob(roleValue);
//   }
//   return roleValue;
// };
