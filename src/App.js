
import { useState, useEffect } from "react"
import SpotifyGetPlaylists from "./components/SpotifyGetPlaylists"
import axios from "axios"
import { SongList } from "./components/SongList"

const CLIENT_ID = "1d5ff11cd3b84c7d91841319d37e0573"
const LINK = "https://accounts.spotify.com/authorize"
const REDIRECT_URI = "http://localhost:3000"
const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search'


function App() {
  const [track, setTrack] = useState('')
  const [tokenExpiration, setTokenExpiration] = useState(null)
  const [searchedSongs, setSearchedSongs] = useState([])

  useEffect(() => {
    const tokenExp = localStorage.getItem("expiresAt")

    const tokenExpiry = tokenExp != null ? new Date(tokenExp) : null

    if (tokenExpiry !== null && tokenExpiry < Date.now()) {
      handleLogOut()
    } else if (tokenExpiry > Date.now()) {
      setTokenExpiration(tokenExpiry)
    }
    else if (window.location.hash) {
      const { access_token, expires_in } = getAuthParams(window.location.hash)
      const tokenExpiration = new Date(Date.now() + expires_in * 1000)
      setTokenExpiration(tokenExpiration)
      localStorage.setItem('accessToken', access_token)
      localStorage.setItem('expiresAt', tokenExpiration)
    }
  }, [])


  const searchSongs = () => {
    const token = localStorage.getItem('accessToken')
    const params = new URLSearchParams([
      ["track", track],
      ["type", 'track'],
      ["limit", '5']
    ])
    console.log(params.toString())
    axios.get(`${SEARCH_ENDPOINT}?query=${params.toString()}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(res => {
      setSearchedSongs(res.data.tracks.items)
    }).catch(err => {
      console.log(err)
    })
  }
  const handleLogOut = () => {
    window.location = "http://localhost:3000/"
    localStorage.removeItem('accessToken')
    localStorage.removeItem('expiresAt')
    setTokenExpiration(null)
  }

  return (
    <>
      {tokenExpiration != null && tokenExpiration > Date.now() &&
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '10vh', gap: '10px' }}>
          <SongList searchedSongs={searchedSongs} />
          <input placeholder="Track name..." value={track} onChange={e => setTrack(e.target.value)}></input>
          <button onClick={searchSongs}>Search</button>
          <SpotifyGetPlaylists />
        </div>}
      {tokenExpiration == null || tokenExpiration < Date.now() ? <button style={{
        position: "fixed",
        top: "5%",
        right: "5%"
      }} onClick={handleLogIn}>Log In To Spotify</button> :
        <button style={{
          position: "fixed",
          top: "5%",
          right: "5%"
        }} onClick={handleLogOut}>Logout</button>}
    </>
  );
}

const getAuthParams = (hash) => {
  const paramsArray = hash.substring(1).split('&')
  const accessToken = paramsArray.reduce((acc, curVal) => {
    const [key, val] = curVal.split("=")
    acc[key] = val
    return acc
  }, {})
  return accessToken
}




const handleLogIn = () => {
  window.location = `${LINK}?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
}



export default App;
