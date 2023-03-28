
import { useState, useEffect } from "react"
import SpotifyGetPlaylists from "./components/SpotifyGetPlaylists"
import axios from "axios"
const CLIENT_ID = "1d5ff11cd3b84c7d91841319d37e0573"
const LINK = "https://accounts.spotify.com/authorize"
const REDIRECT_URI = "http://localhost:3000"
const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search'


function App() {
  const [track, setTrack] = useState('')
  const [artist, setArtist] = useState('')

  useEffect(() => {
    if (window.location.hash) {
      const { access_token } = getAuthParams(window.location.hash)
      localStorage.setItem('loginParams', access_token)
    }
  })


  const searchSongs = () => {
    const token = localStorage.getItem('loginParams')
    const params = new URLSearchParams([
      ["track", track],
      ["artist", artist],
      ["type", 'track'],
    ])
    console.log(params.toString())
    axios.get(`${SEARCH_ENDPOINT}?query=${params.toString()}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'baseline', flexDirection: 'column' }}>
      <label>
        Track name:
        <input value={track} onChange={e => setTrack(e.target.value)}></input>
      </label>
      <label>
        Artist:
        <input value={artist} onChange={e => setArtist(e.target.value)}></input>
      </label>
      <button onClick={searchSongs}>Search</button>
      <SpotifyGetPlaylists />
      <button onClick={handleLogIn}>Log In To Spotify</button>
    </div>
  );
}

const getAuthParams = (hash) => {
  const paramsArray = hash.substring(1).split('&')
  const loginParams = paramsArray.reduce((acc, curVal) => {
    const [key, val] = curVal.split("=")
    acc[key] = val
    return acc
  }, {})

  console.log(loginParams)
  return loginParams
}




const handleLogIn = () => {
  window.location = `${LINK}?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
}

export default App;
