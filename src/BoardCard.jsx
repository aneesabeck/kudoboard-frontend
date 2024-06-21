import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './BoardCard.css'

function BoardCard({imgUrl, title, category, id, fetchBoards }) {

    const handleDeleteBoard = (id) => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}`, 
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
          fetchBoards()
        })
        .catch(error => {
          console.error('error fetching board:', error)
        })

    }


      

    return (
      <div className='board-card'>
        <img src={imgUrl}/>
        <h3>{title}</h3>
        <h4>{category}</h4>
        <div className='board-buttons'>
          <div>
          <Link to={`/boards/${id}`}>
                <button className='view'>View</button>
            </Link>
          </div>
          <div>
          <button onClick={() => {handleDeleteBoard(id)}} className='delete'>Delete</button>
          </div>
        </div>
      </div>
    )
  }
  
  export default BoardCard