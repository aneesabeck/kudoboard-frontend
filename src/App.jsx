import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import BoardCard from './BoardCard'
import SearchForm from './SearchForm'
import ModalBoard from './ModalBoard'
import NavBar from './NavBar'
import BoardPage from './BoardPage'

function App() {
  const [boards, setBoards] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  let location = useLocation()

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = () => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status: ${response.status}`)
        }
        return response.json();
      })
      .then(data => {
        setBoards(data)
      })
      .catch(error => {
        console.error('error fetching boards:', error)
      })
  }

  const cards = boards.map(board => {
    return (
      <BoardCard imgUrl={board.imgUrl} title={board.title} id={board.id} category={board.category} fetchBoards={fetchBoards} />
    )
  })


  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>

      <header className='kudo-header'> <h1>Kudoboard</h1></header>
      {location.pathname === '/' && (
        <>
          <SearchForm setBoards={setBoards} />
          <NavBar setBoards={setBoards} fetchBoards={fetchBoards} />
          <button onClick={openModal}>Create New Board</button>
        </>
      )}
      <Routes>
        <Route path="/" element={<div className='cards-array'>{cards}</div>} />
        <Route path="/boards/:id" element={<BoardPage />} />

      </Routes>
      {isOpen && <ModalBoard closeModal={closeModal} fetchBoards={fetchBoards} />}
    </> 
  )
}

export default App
