import React , { useState } from 'react'
import Details from './details'
import background from '../utility/background'

function Player(props) {

    const [gifBg , setGifBg] = useState('https://media.giphy.com/media/KRw9s05Pq2Kk0/giphy.gif');

    const changeRandomBg = () => {
        const {urls} = background;
        const randomIndex = Math.floor(Math.random() * urls.length);
        setGifBg(urls[randomIndex]);
    }

    return (
        <div className="c-player" style = {{backgroundImage: `url(${gifBg})`}}>
            <Details changeRandomBg = {changeRandomBg} updateBackground = {props.updateBackground}/>
            
        </div>
    )
}

export default Player
