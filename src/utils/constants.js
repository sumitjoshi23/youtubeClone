import { generateRandomMessage, generateRandomName } from "./helper";

export const YOUTUBE_API_KEY = "AIzaSyB1PCJm_8EU2QvFGC1mCRhP9pOL6-kNkaI";
export const YOUTUBE_API_LINK = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=50&chart=mostPopular&regionCode=IN&key=${YOUTUBE_API_KEY}`;
export const YOUTUBE_AUTO_SUGGESTIONS_API_LINK =
  "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const LIVECHAT_OFFSET = 12;
export const commentsData = [
  {
    author: generateRandomName(),
    comment: generateRandomMessage(),
    replies: [
      {
        author: generateRandomName(),
        comment: generateRandomMessage(),
        replies: [
          {
            author: generateRandomName(),
            comment: generateRandomMessage(),
            replies: [
              {
                author: generateRandomName(),
                comment: generateRandomMessage(),
                replies: [],
              },
              {
                author: generateRandomName(),
                comment: generateRandomMessage(),
                replies: [],
              },
            ],
          },
        ],
      },
      {
        author: "Sam j",
        comment: "This is soothing",
        replies: [],
      },
    ],
  },
  {
    author: generateRandomName(),
    comment: generateRandomMessage(),
    replies: [],
  },
  {
    author: generateRandomName(),
    comment: generateRandomMessage(),
    replies: [],
  },
];
