import React , { useState } from 'react'
import './App.css';
import Player from './components/player'

function App() {
  const [bg , setBg] = useState("")

  const updateBackground = (url) => {
    setBg(url)
  }
  return (
    <div className="App" >
      <div className="bg-image" style = {{backgroundImage: `url(${bg})`}}></div>
      <Player updateBackground = {updateBackground}/>
     
    </div>
  );
}

export default App;
