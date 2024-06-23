import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './Cards.css'
import ModalComment from './ModalComment'

function Cards({boardId, cardId, title, gifUrl, description, upvotes, setCards, setCurrentBoard}) {
    const [currentUpvotes, setCurrentUpvotes] = useState(upvotes)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        fetchBoardPage()
        fetchCards()
    }, [boardId])

    const fetchBoardPage = async () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${boardId}`)
        .then(response => {
        if (!response.ok) {
            throw new Error(`status: ${response.status}`)
        }
        return response.json();
        })
        .then(data => {
        setCurrentBoard(data)
        })
        .catch(error => {
        console.error('error fetching boards:', error)
        })
    }

    const fetchCards = async () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${boardId}/cards`)
        .then(response => {
        if (!response.ok) {
            throw new Error(`status: ${response.status}`)
        }
        return response.json();
        })
        .then(data => {
        setCards(data)
        })
        .catch(error => {
        console.error('error fetching boards:', error)
        })

    }

    const handleDeleteCard = async (cardId) => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/cards/${cardId}`, 
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP Error status: ${response.status}`)
          }
          return response.json()
        })
        .then(data => {
          fetchCards()
        })
        .catch(error => {
          console.error('error fetching board:', error)
        })
    }

    const handleUpvoteCard = async (cardId) => {
      fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/cards/${cardId}/upvote`, 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP Error status: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        setCurrentUpvotes(data.upvotes)
        fetchCards()
      })
      .catch(error => {
        console.error('error fetching board:', error)
      })
    }


    function closeModal () {
      setIsOpen(false)
    }
  
    function openModal(cardId) {
        setIsOpen(true)
    }

    return (
        <div>
            <div className='card'>
                <h2>{title}</h2>
                <img src={gifUrl}/>
                <p>{description}</p>
                <button onClick={()=> handleUpvoteCard(cardId)}>Upvote: {currentUpvotes}</button>
                <button onClick={() => handleDeleteCard(cardId)}>Delete</button>
                <button onClick={() => openModal(cardId)}>Comments</button>
                {isOpen && <ModalComment closeModal={closeModal} fetchCards={fetchCards} cardId={cardId}/>}   
            </div>
        </div>
    )
}

export default Cards