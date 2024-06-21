import React, { useState, useEffect } from 'react';
import "./ModalBoard.css";

const ModalBoard = ({ closeModal, fetchBoards }) => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        author: '',
      })

    const handleChange = (e) => {
        const { name, value } = e.target
    
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }))
      }

      const handleSubmit = (e) => {
        e.preventDefault()
        closeModal()
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imgUrl: `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 100)}`,
            title: formData.title,
            category: formData.category,
            author: formData.author
          }),
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
    
          throw new Error('Failed to add board.')
        })
        .then(data => {
          fetchBoards()
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
                    <div className='modal-content'>
                    <form className="board-form" onSubmit={handleSubmit}>
                        <label>
                            Title: <input type="text" name="title" value={formData.title} onChange={handleChange} required/>
                        </label>
                        <label>
                            Category:
                            <select name="category" value={formData.category} onChange={handleChange} required>
                                <option >Select One:</option>
                                <option value="CELEBRATION">Celebration</option>
                                <option value="INSPIRATION">Inspiration</option>
                                <option value="THANK YOU">Thank you</option>
                            </select>
                        </label>
                        <label>
                            Author:
                            <input type="text" name="author" value={formData.author} onChange={handleChange} />
                        </label>

                        <div className="form-buttons">
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



export default ModalBoard;