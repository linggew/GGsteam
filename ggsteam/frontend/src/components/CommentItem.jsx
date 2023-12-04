import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "../config";
import "./CommentComponents.css";

const CommentItem = (props) => {
  const comment = props.item;
  const creator = props.creator;
  const reviewId = props.reviewId;

  const [commentUserName, setcommentUserName] = useState();

  const confirmDeleteHandler = async () => {
    try {
      if (window.confirm("Are you sure you want to remove comment?")) {
        const res = await Axios.delete(
          config.apiUrl + `/api/comment/removecomment/${reviewId}`
        );
        if (
          res.status === 200 &&
          window.confirm("Comment Removed Successfully!")
        ) {
          window.location.reload(false);
        }
      }
    } catch (err) {
      console.error("Error deleting comment: ", err);
    }
  };

  useEffect(() => {
    const getUserName = async () => {
      try {
        const res = await Axios.get(
          config.apiUrl + `/api/username/${creator}`,
          {}
        );
        setcommentUserName(res.data[0].user_name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getUserName();
  }, []);

  return (
    <React.Fragment>
      <div className='comment'>
        <div className='comment-right-part'>
          {commentUserName && (
            <div className='comment-author'>{commentUserName}</div>
          )}
        </div>
        <div className='comment-text'>{comment}</div>
        <div>
          {creator.toString() === props.curUserId && (
            <button onClick={confirmDeleteHandler}>Delete</button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
export default CommentItem;
