import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PlaylistIcon from '../resources/playlist-icon.png'
import { PlaylistViz } from './PlaylistViz'
import { Button } from './components/Button'
const PLAYLIST_LINK = 'https://api.spotify.com/v1/me/playlists'
const PLAYLIST_TRACKS = "https://api.spotify.com/v1/playlists"
const PROPERTY_ENDPOINT = "https://api.spotify.com/v1/audio-features"

const SpotifyGetPlaylists = () => {
    const [token, setToken] = useState('')
    const [data, setData] = useState(null)
    const [playlistProperties, setPlaylistProperties] = useState([])
    const [currentPlaylist, setCurrentPlaylist] = useState(null)

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
            setData(res.data.items)
        }).catch(err => {
            console.log(err)
        })
    }

    const getPlaylistProperties = (playlistId) => {
        setCurrentPlaylist(playlistId)
        setPlaylistProperties([])
        axios.get(`${PLAYLIST_TRACKS}/${playlistId}/tracks`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(tracks => {
            console.log(tracks)
            tracks.data.items.forEach(async (track) => {
                console.log(track)
                await axios.get(`${PROPERTY_ENDPOINT}/${track.track.id}`, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }).then(res => {
                    console.log(res)
                    setPlaylistProperties(curr => [...curr, {
                        Danceability: res.data.danceability,
                        Energy: res.data.energy,
                        Valence: res.data.valence,
                        Title: track.track.name,
                        Artist: track.track.artists[0].name,
                        Tempo: res.data.tempo / 200
                    }])
                }).catch(err => {
                    console.log(err)
                })
            })

        }).catch(err => {
            console.log(err)
        })
    }

    return (<>
        {data != null &&
            data.map(playlist => {
                return (
                    <div id={playlist.id} key={playlist.id} onClick={() => getPlaylistProperties(playlist.id)} style={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center', margin: '10px 0', cursor: "pointer" }}>
                        <img alt={playlist.name} src={playlist.images.length !== 0 ? playlist.images[0].url : PlaylistIcon} height={80} style={{ marginRight: '10px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '250px' }}>
                            <p style={{ marginBottom: '5px', marginTop: 0 }}>Name: {playlist.name}</p>
                            <p style={{ marginTop: 0 }}>Owner: {playlist.owner.display_name}</p>
                        </div>
                        {playlist.id === currentPlaylist && <PlaylistViz playlistProps={playlistProperties} />}
                    </div>)
            })
        }
        <Button onClick={getPlaylist} text={"Get My Playlists"} color={"rgb(11 161 120)"} hoverColor={"rgb(15 200 149)"} />
    </>
    )
}

export default SpotifyGetPlaylists