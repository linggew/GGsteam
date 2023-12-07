import { useState } from "react";
import Axios from "axios";
import config from "../config";

const CommentEditForm = ({ review_id, review_content }) => {
  const [text, setText] = useState(review_content);
  const isTextareaDisabled = text.length === 0;

  const editComment = async (e) => {
    try {
      const res = await Axios.put(
        config.apiUrl + "/api/comment/updatecomment",
        { review_id, text }
      );
      console.log(res);
      if (res.status === 200 && window.confirm("Edit Comment Successfully!")) {
        window.location.reload(false);
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    editComment(text);
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

export default CommentEditForm;
