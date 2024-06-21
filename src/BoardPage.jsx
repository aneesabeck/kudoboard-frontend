import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './BoardPage.css'
import ModalCard from './ModalCard'
import Cards from './Cards'

const BoardPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [currentBoard, setCurrentBoard] = useState(null)
    const [cards, setCards] = useState([])
    const [newCard, setNewCard] = useState({title: '', description: '', author: ''})
    const [isOpen, setIsOpen] = useState(false)


    useEffect(() => {
        fetchBoardPage()
        fetchCards()
    }, [id])

    const fetchBoardPage = async () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}`)
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
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}/cards`)
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


    function closeModal () {
        setIsOpen(false)
      }
    
    function openModal() {
        setIsOpen(true)
    }
    
    const allCards = cards.map(card => {
        return (
            <Cards boardId={card.boardId} cardId={card.id} title={card.title} gifUrl={card.gifUrl} description={card.description} upvotes={card.upvotes} setCards={setCards} setCurrentBoard={setCurrentBoard}/>
        )
    })

    if (!currentBoard) return <div>Loading...</div>
    return (
        <div className='card-page-btns'>
            <button onClick={()=> navigate('/')}>Back</button>
            <button onClick={openModal}>Create New Card</button>
            <h1>{currentBoard.title}</h1>
            <div className='all-cards'>
                {allCards}
                {isOpen && <ModalCard closeModal={closeModal} fetchCards={fetchCards} boardId={id}/>}   
            </div>
        </div>
    )
}

export default BoardPage
