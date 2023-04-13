
import { useState, useEffect } from "react"
import SpotifyGetPlaylists from "./components/SpotifyGetPlaylists"
import axios from "axios"
import { SongList } from "./components/SongList"
import './styles/fonts.css';
import { Button } from "./components/components/Button";
import { StyledLine } from "./components/components/Line";

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
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '10vh', gap: '10px', fontFamily: "'Baloo 2', cursive" }}>
          <StyledLine text={"Track Analysis"} />
          <SongList searchedSongs={searchedSongs} />
          <input style={{
            backgroundColor: '#282828',
            color: '#FFFFFF',
            borderRadius: '4px',
            border: 'none',
            padding: '8px 12px',
            fontSize: '14px',
            outline: 'none',
            boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
            boxSizing: 'border-box'
          }} placeholder="Track name..." value={track} onChange={e => setTrack(e.target.value)}></input>
          <Button text={"Search"} onClick={searchSongs} color={"rgb(19 132 59)"} hoverColor={"#1ED760"} />
          <StyledLine text={"Playlist Analysis"} />
          <SpotifyGetPlaylists />
          <StyledLine text={"Definitions"} />
          <p>
            Danceability: Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.
          </p>

          <p>
            Energy: Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.
          </p>
          <p>
            Valence: A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
          </p>
          <p>
            Tempo: The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.
          </p>
          <p>
            Source: https://developer.spotify.com/documentation/web-api/reference/get-audio-features
          </p>
        </div>}
      {tokenExpiration == null || tokenExpiration < Date.now() ? <Button style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }} onClick={handleLogIn}
        color={"rgb(19 132 59)"} hoverColor={"#1ED760"} text={"Log In To Spotify"} /> :
        <Button style={{
          position: "fixed",
          top: "5%",
          right: "5%"
        }} onClick={handleLogOut}
          text={"Log out"}
          color={
            "rgb(99 113 104)"
          }
          hoverColor={"rgb(47 54 50)"}
        />}
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
