import React from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../components/Player'
import { useSong } from '../hooks/useSong'
import './home.scss'

const Home = () => {

    const { handleGetSong } = useSong()

    return (
        <div className="home">
            <div className="home__content">
                <h1 className="home__title">
                    <span className="home__title-accent">Moodify</span>
                </h1>
                <p className="home__subtitle">Detect your mood. Get your song.</p>

                <div className="home__camera-card">
                    <FaceExpression
                        onClick={(expression) => { handleGetSong({ mood: expression }) }}
                    />
                </div>
            </div>
            <Player />
        </div>
    )
}

export default Home