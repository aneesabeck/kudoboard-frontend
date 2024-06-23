import React, { useState, useEffect } from 'react';
import "./ModalComment.css";

const ModalComment = ({ closeModal, fetchCards, cardId }) => {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    
    useEffect(() => {
        fetchCardComments()
    }, [cardId])

    const handleChange = (e) => {
        setNewComment(e.target.value)
      }
    

    const fetchCardComments = async () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/cards/${cardId}/comments`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`status: ${response.status}`)
          }
          return response.json();
        })
        .then(data => {
          setComments(data)
        })
        .catch(error => {
          console.error('error fetching boards:', error)
        })      
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/cards/${cardId}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ comment: newComment }),
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
    
          throw new Error('Failed to add comment.')
        })
        .then(data => {
          setComments(data)
          setNewComment('')
          fetchCardComments()
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }

    function handleCloseModal() {
        closeModal()
    }



    return (
        <>
      <div className="centered">
                <div className="modal">
                    <div className='comment-modal-content'>
                        <h1>Comments</h1>
                        <div>
                        { comments.length > 0 ? (
                            comments.map((comment, index) => (
                            <div key={index} className='ind-comment'>
                                <h4>User: {comment}</h4>
                            </div>
                        ))
                    ) : (
                        <p>No comments available</p>
                    )}
                    </div>
                    <form onSubmit={handleCommentSubmit}>
                        <label>
                            New Comment: <input type="text" value={newComment} onChange={handleChange} placeholder="Add a comment"/>
                        </label>
                        <div className='comment-modal-submit'>
                        <button type="submit">Submit</button>
                    </div>
                    </form>
        
                    </div>
                    <button className="closeBtn" onClick={handleCloseModal}>
                        Close
                    </button>
                    

                </div>
      </div>
        
        </>
    )

}



export default ModalComment;