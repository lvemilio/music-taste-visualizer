import React, { useEffect, useState } from 'react'
import axios from 'axios'

const PLAYLIST_LINK = 'https://api.spotify.com/v1/me/playlists'

const SpotifyGetPlaylists = () => {
    const [token, setToken] = useState('')
    const [data, setData] = useState({})


    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            setToken(localStorage.getItem('accessToken'))
        }
    }, [])

    const getPlaylist = () => {
        axios.get(PLAYLIST_LINK, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(res => {
            console.log(res)
            setData(res)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <button onClick={getPlaylist}>Get My Playlists</button>
    )
}

export default SpotifyGetPlaylists