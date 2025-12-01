import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Button } from "@/components/ui/button";
import UploadVideoModal from "./UploadVideoModal";
import { TimeAgo } from "@/lib/utils";

const AdminVidoes = () => {
  const [category, setCategory] = useState("YouTube");
  const [videos, setVideos] = useState([]);
  const [uploadvideos, setUploadVideos] = useState(false);
  const [youtubeSubTab, setYoutubeSubTab] = useState("Videos");

  const API_KEY = "AIzaSyCdjSk7Is1rPrfHcCJtf-021AMmSGmHCCE";
  const CHANNEL_ID = "UCkV9O8IPqTPYQ-I5TC-yPSw";

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=100`
        );
        const data = await res.json();
        console.log(data);
        setVideos(data.items);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const TabButton = ({ label, active, onClick }) => (
    <div
      onClick={onClick}
      className={`px-4 py-2 rounded-t-md text-sm font-medium transition-all duration-200 ${
        active ? "bg-red-500 text-white" : " text-black hover:bg-red-100"
      }`}
    >
      {label}
    </div>
  );

  const SubTab = ({ label, active, onClick }) => {
    return (
      <div
        onClick={onClick}
        className={`cursor-pointer px-4 py-2 rounded-t-lg border-b-2 ${
          active
            ? "bg-white  border-white text-red-600 text-lg"
            : " text-gray-600 border-transparent hover:bg-gray-50"
        }`}
      >
        {label}
      </div>
    );
  };

  return (
    <div className="lg:p-5">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h1 className="lg:text-2xl font-semibold">Your Video Collection!</h1>
        <Button
          onClick={() => setUploadVideos(true)}
          className="flex items-center gap-2"
        >
          <IoMdAdd /> Upload Video
        </Button>
      </div>

      <div className="mt-3 flex gap-2 ">
        <TabButton
          label="YouTube"
          active={category === "YouTube"}
          onClick={() => setCategory("YouTube")}
        />
        <TabButton
          label="General"
          active={category === "General"}
          onClick={() => setCategory("General")}
        />
      </div>

      {category === "YouTube" && (
        <div className="flex  overflow-x-auto sm:overflow-visible  hide-scrollbar lg:gap-3 mt-2  ">
          <SubTab
            label="Videos"
            active={youtubeSubTab === "Videos"}
            onClick={() => setYoutubeSubTab("Videos")}
          />
          <SubTab
            label="Shorts"
            active={youtubeSubTab === "Shorts"}
            onClick={() => setYoutubeSubTab("Shorts")}
          />
          <SubTab
            label="Playlists"
            active={youtubeSubTab === "playlist"}
            onClick={() => setYoutubeSubTab("playlist")}
          />
          <SubTab
            label="Live"
            active={youtubeSubTab === "live"}
            onClick={() => setYoutubeSubTab("live")}
          />
          <SubTab
            label="Posts"
            active={youtubeSubTab === "post"}
            onClick={() => setYoutubeSubTab("post")}
          />
        </div>
      )}

      <div className=" lg:bg-white lg:p-1">
        {category === "YouTube" && youtubeSubTab === "Videos" && (
          <div className="w-screen sm:w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:h-[62vh] lg:overflow-y-scroll hide-scrollbar mt-1">
            {videos.map(
              (video) =>
                video.id.videoId && (
                  <div
                    key={video.id.videoId}
                    className="rounded-lg bg-white w-full"
                  >
                    <div className="flex flex-col w-full">
                      <div className="flex flex-col lg:flex-row w-full">
                        <div className="w-full aspect-video">
                          <iframe
                            className="rounded-lg w-full h-full"
                            src={`https://www.youtube.com/embed/${video.id.videoId}`}
                            title={`YouTube video player: ${video.snippet.title}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>

                        <div className="lg:hidden p-2 flex flex-col justify-between">
                          <h2 className="text-black font-semibold text-sm sm:text-base line-clamp-2">
                            {video.snippet.title}
                          </h2>
                          <p className="text-gray-800 text-xs sm:text-sm">
                            <span>30k views • </span>
                            {TimeAgo(video.snippet.publishedAt)}
                          </p>
                        </div>
                      </div>

                      <div className="hidden lg:block px-2 py-1">
                        <h2 className="mt-1 text-black font-semibold text-lg">
                          {video.snippet.title}
                        </h2>
                        <p className="text-gray-800 text-sm pb-2">
                          <span>30k views • </span>
                          {TimeAgo(video.snippet.publishedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        )}
        {category === "YouTube" && youtubeSubTab === "Shorts" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-1 h-[62vh] overflow-y-scroll hide-scrollbar">
            <h1>Shorts</h1>
          </div>
        )}
        {category === "YouTube" && youtubeSubTab === "playlist" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-1 h-[62vh] overflow-y-scroll hide-scrollbar">
            <h1>Playlist</h1>
          </div>
        )}
        {category === "YouTube" && youtubeSubTab === "live" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-1 h-[62vh] overflow-y-scroll hide-scrollbar">
            <h1>Live</h1>
          </div>
        )}
        {category === "YouTube" && youtubeSubTab === "post" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-1 h-[62vh] overflow-y-scroll hide-scrollbar">
            <h1>post</h1>
          </div>
        )}

        {category === "General" && (
          <div className="w-screen sm:w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:h-[69vh] lg:overflow-y-scroll hide-scrollbar mt-1">
            General category content
          </div>
        )}
      </div>

      <UploadVideoModal
        isOpen={uploadvideos}
        onClose={() => setUploadVideos(false)}
      />
    </div>
  );
};

export default AdminVidoes;
