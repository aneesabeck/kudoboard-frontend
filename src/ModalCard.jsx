import React, { useState, useEffect } from 'react';
import "./ModalCard.css";

const ModalCard = ({ closeModal, fetchCards, boardId }) => {
    const [gifQuery, setGifQuery] = useState('')
    const [gifs, setGifs] = useState([])
    const [newCard, setNewCard] = useState({
        title: '',
        description: '',
        gifUrl: '',
        author: '',
      })

    const handleChange = (e) => {
        const { name, value } = e.target
    
        setNewCard(prevState => ({
          ...prevState,
          [name]: value
        }))
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        closeModal()
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${boardId}/cards`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            gifUrl: newCard.gifUrl,
            title: newCard.title,
            description: newCard.description,
            author: newCard.author
          }),
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
    
          throw new Error('Failed to add card.')
        })
        .then(data => {
          fetchCards()
        })
        .catch((error) => {
          console.error('Error:', error)
        })
      }

    function handleCloseModal() {
        closeModal()
    }

    const searchGifs = async () => {
        
        try {
            const gifApiKey = import.meta.env.VITE_API_KEY
            const response = await fetch(`http://api.giphy.com/v1/gifs/search?api_key=${gifApiKey}&q=${gifQuery}&limit=8`)
            const { data } = await response.json()
            setGifs(data)
        } catch (error) {
            console.error('error searching gif', error)
        }
    }

    const handleSelectGif = (newGifUrl) => {
        setNewCard(prevState => ({
            ...prevState,
            gifUrl: newGifUrl
          }))
          setGifs([])
    }



    return (
        <>
      <div className="centered">
                <div className="modal">
                    <div className='modal-content'>
                    <form className="board-form" onSubmit={handleSubmit}>
                        <label>
                            Title: <input type="text" name="title" value={newCard.title} onChange={handleChange}/>
                        </label>
                        <label>
                            Description: <input type="text" name="description" value={newCard.description} onChange={handleChange}/>
                        </label>
                        <label>
                            Gif: <input type="text" name="description" value={gifQuery} onChange={(e)=> setGifQuery(e.target.value)}/>
                            <button type='button' onClick={ searchGifs} className='gif-search'>Search</button>
                            <div className='gif-results'>
                                {gifs.map((gif) => (
                                    <img 
                                    src={gif.images.fixed_height.url}
                                    onClick={() => handleSelectGif(gif.images.fixed_height.url)}
                                    style={{ cursor: 'pointer', margin: '10px'}}
                                    />
                                ))}
                            </div>
                        </label>
                        <label>
                            Author: <input type="text" name="author" value={newCard.author} onChange={handleChange} />
                        </label>

                        <div className="card-modal-submit">
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



export default ModalCard;