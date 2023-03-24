import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import { setVideos } from "./store/slices/videoSlice";
import { YOUTUBE_API_LINK } from "./utils/constants";
import VideoCard from "./VideoCard";

const VideoContainer = () => {
  const dispatch = useDispatch();

  const videos = useSelector((store) => store.video.videos);
  const getVideos = useCallback(async () => {
    let data = await axios.get(YOUTUBE_API_LINK);
    dispatch(setVideos(data.data.items));
  }, [dispatch]);
  useEffect(() => {
    getVideos();
  }, [getVideos]);

  let renderedVideos = videos?.map((video) => (
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
