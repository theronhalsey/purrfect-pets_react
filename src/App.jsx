import { useState, useEffect } from 'react'
import './App.css'
import logo from './assets/PetFinderLogo.png'
import NavBar from './components/navbar'

function App() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch("/getPets")
    .then((res) => res.json())
    .then((data) => setPets(data))
  }, []);

  return (
    <>
      <div>
        <a href="https://www.petfinder.com/" target="_blank">
          <img src={logo} className="logo" alt="PetFinder logo" />
        </a>
      </div>
      <h1>Find your Purrfect Pet</h1>
      <div className="card">
      </div>
      <ul style={{ listStyle: 'none' }}>
        {pets.filter(pet => pet.photos[0]?.medium).map(pet => (
          <li key={pet.id} className="pet-details">
            <div className="pet-image-container">
              <img
                src={pet.photos[0]?.medium}
                alt={pet.name}
                onError={(e) => {
                  e.target.style.display = 'none'; // Hide the image on error
                }} />
            </div>
            <div className="pet-info">
              <p><strong>Name: {pet.name}</strong></p>
              <p><strong>Type: {pet.type}</strong></p>
              <p><strong>Age: {pet.age}</strong></p>
              <a href={pet.url} target="_blank" rel="noopener noreferrer">Learn More</a>
            </div>
          </li>
        ))}
      </ul>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <footer>
        <a href="https://www.flaticon.com/free-icons/cats" title="cats icons">Cats icons created by Freepik - Flaticon</a>
      </footer>
    </>
  )
}

export default App
