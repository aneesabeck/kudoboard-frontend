import React, { useState, useEffect } from 'react';
import './SearchForm.css'

function SearchForm({ setBoards }) {
    const [inputText, setText] = useState("")
    const handleInput = (event) => {
        var input = event.target.value.toLowerCase();
        setText(input)

    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (inputText === '') {
            fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards`, 
            {
              method: "GET",
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
              setBoards(data)
            })
            .catch(error => {
              console.error('error fetching board:', error)
            })

        } else {
            fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/search?title=${inputText}`, 
            {
              method: "GET",
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
              setBoards(data)
            })
            .catch(error => {
              console.error('error fetching board:', error)
            })
        }
       
    }


    return (
        <form className="search-bar">
            <input className="search-input" type="text" value={inputText} onChange={handleInput} placeholder="Enter a board title" input={inputText}/>
            <button className="search-button" type="submit" onClick={handleSubmit}>Search</button>
        </form>
    )
}

export default SearchForm