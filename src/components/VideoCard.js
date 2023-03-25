import React from "react";

const VideoCard = ({ video }) => {
  let { snippet, statistics } = video;

  return (
    <div className="h-[270px] my-4 mx-3 p-2 w-48 shadow-lg hover:bg-gray-200 hover:scale-105 duration-300 rounded-lg">
      <img
        className="rounded-lg "
        alt="videoImg"
        src={snippet.thumbnails.medium.url}
      />
      <ul className="m-2">
        <li className="font-semibold max-h-[76px] overflow-hidden ">
          {snippet.title}
        </li>
        <li className="text-gray-500 text-xs my-1">{snippet.channelTitle}</li>
        {statistics?.viewCount && (
          <li className="text-gray-500 text-xs">
            {statistics.viewCount} views
          </li>
        )}
      </ul>
    </div>
  );
};

export default VideoCard;
