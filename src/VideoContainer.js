import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import { YOUTUBE_API_LINK } from "./utils/constants";
import VideoCard from "./VideoCard";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);
  async function getVideos() {
    let data = await axios.get(YOUTUBE_API_LINK);
    setVideos(data.data.items);
  }
  let renderedVideos = videos.map((video) => (
    <Link key={video.id} to={"/watch?v=" + video.id}>
      <VideoCard video={video}></VideoCard>
    </Link>
  ));
  return renderedVideos.length === 0 ? (
    <Shimmer className="h-[270px] w-48" />
  ) : (
    <div className="flex flex-wrap">{renderedVideos}</div>
  );
};

export default VideoContainer;
