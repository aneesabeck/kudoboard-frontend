import React, { useState, useEffect } from 'react';
import './NavBar.css'

function NavBar({ setBoards, fetchBoards }) {
    const handleClearFilter = () => {
        fetchBoards()
    }

    const handleFilter = (event) => {
        // event.preventDefault()
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/search?category=${event.target.value}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
          })
          .then(data => {
            setBoards(data)
          })
          .catch((error) => {
            console.error('Error:', error)
          })
    }

    const handleRecent = async () => {
      fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/sort`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        setBoards(data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
    }


    return (
        <nav>
            <button onClick={handleClearFilter}>All</button>
            <button value="RECENT" onClick={handleRecent}>Recent</button>
            <button value="CELEBRATION" onClick={handleFilter}>Celebration</button>
            <button value="INSPIRATION" onClick={handleFilter}>Inspiration</button>
            <button value="THANK YOU" onClick={handleFilter}>Thank you</button>
        </nav>
    )
}


export default NavBar