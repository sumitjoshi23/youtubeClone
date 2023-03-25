import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { commentsData } from "../utils/constants";

const Comment = ({ data }) => {
  return (
    <div className="flex shadow-sm bg-gray-100 p-2 rounded-lg m-2">
      <FaUserAlt className="w-8 h-8 mt-2 mr-1" />
      <div>
        <p>{data.comment}</p>
        <p className="font-bold px-3">{data.author}</p>
      </div>
    </div>
  );
};
function CommentsList({ comments }) {
  return comments.map((c, index) => (
    <div key={index}>
      <Comment data={c} />
      <div className="border border-l-black pl-5 ml-5">
        <CommentsList comments={c.replies} />
      </div>
    </div>
  ));
}
const CommentsContainer = () => {
  return (
    <div className="m-5 p-2">
      <h1 className="font-bold text-2xl">Comments:</h1>
      <CommentsList comments={commentsData} />
    </div>
  );
};

export default CommentsContainer;
