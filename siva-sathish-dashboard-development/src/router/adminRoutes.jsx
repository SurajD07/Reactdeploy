import AdminDashboard from "@/pages/role/admin/dashboard/AdminDashboard";
import AdminEvent from "@/pages/role/admin/events/AdminEvent";
import AdminGallery from "@/pages/role/admin/gallery/AdminGallery";
import AdminMember from "@/pages/role/admin/member/AdminMember";
import AdminVidoes from "@/pages/role/admin/vidoes/AdminVidoes";
import AdminProfile from "@/pages/role/admin/profile/AdminProfile";
import EventDetails from "@/pages/role/admin/events/EventView";
import SingleView from "@/pages/role/admin/gallery/SingleView";
import CreateEvent from "@/pages/role/admin/events/CreateEvent";

export const adminRoutes = [
  {
    path: "/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/event",
    element: <AdminEvent />,
  },
  {
    path: "/event/eventdetails",
    element: <EventDetails />,
  },
  {
    path: "/event/createevent",
    element: <CreateEvent />,
  },
  {
    path: "/member",
    element: <AdminMember />,
  },
  {
    path: "/gallery",
    element: <AdminGallery />,
  },
  {
    path: "/gallery/gallerydetails",
    element: <SingleView />,
  },
  {
    path: "/video",
    element: <AdminVidoes />,
  },
  {
    path: "/profile",
    element: <AdminProfile />,
  },
];
