import { useState } from "react";
import Axios from "axios";
import config from "../config";

const CommentForm = ({ user_id, query_id, initialText = "" }) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;

  const addComment = async (e) => {
    try {
      if (window.confirm("Are you sure you want to remove comment?")) {
        const response = await Axios.post(
          config.apiUrl + "/api/comment/addcomment",
          {
            user_id,
            query_id,
            text,
          }
        );
        if (response.status === 200) {
          window.location.reload(false);
        }
      }
    } catch (error) {}
  };

  const onSubmit = (event) => {
    event.preventDefault();
    addComment(text);
    setText("");
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        className='comment-form-textarea'
        value={text}
        placeholder='Leave your comments'
        onChange={(e) => setText(e.target.value)}
      />
      <button className='comment-form-button' disabled={isTextareaDisabled}>
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
