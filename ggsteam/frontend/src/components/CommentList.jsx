import React from 'react'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import config from '../config'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'
import './CommentComponents.css'

const CommentList = (props) => {
  const id = props.gameid
  const curUserId = props.curUserId
  const isUserOwned = props.isUserOwned
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(config.apiUrl + `/api/comment/${id}`, {})
        setComments(res.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <React.Fragment>
      <CommentForm user_id={curUserId} query_id={id} />
      <div className="comments">
        <h3 className="comments-title">Comments</h3>
        <div className="comments-container">
          {comments.map((comment) => (
            <CommentItem
              reviewId={comment.review_id}
              item={comment.review_content}
              creator={comment.user_id}
              curUserId={curUserId}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default CommentList
