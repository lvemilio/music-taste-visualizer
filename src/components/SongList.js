import React from 'react'
import axios from "axios"
import {useEffect, useState} from 'react';
import HBarChart from '../charts/HBarChart.js';

const PROPERTY_ENDPOINT = "https://api.spotify.com/v1/audio-features"

let songData = {};

export const SongList = ({ searchedSongs }) => {
    const [isShown, setIsShown] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        changeData();
    }, []);


    const changeData = () => {
        setData(songData);
    }

    const getSongProperties = (songId) => {
        const token = localStorage.getItem('accessToken')
        axios.get(`${PROPERTY_ENDPOINT}/${songId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(res => {
            console.log(res.data)
            songData = {
            // res.data.danceability,
            // res.data.energy,
            // res.data.valence,
            // res.data.instrumentalness,
            "data" : [
                        {"name": "Danceability", "value" : res.data.danceability},
                        {"name": "Energy", "value" : res.data.energy},
                        {"name": "Valence", "value" : res.data.valence}
                    ],

            "tempo" : res.data.tempo
            }
        }).catch(err => {
            console.log(err)
        })

    
        setIsShown(current => songId);
    }
    return (
        <>
            {searchedSongs.map((song) => {
                return (
                    <div id={song.id} key={song.id} onClick={() => getSongProperties(song.id)} style={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center', margin: '10px 0', cursor: "pointer" }}>
                        <img alt={song.name} src={song.album.images[0].url} height={song.album.images[0].height / 8} style={{ marginRight: '10px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '250px' }}>
                            <p style={{ marginBottom: '5px', marginTop: 0 }}>Name: {song.name}</p>
                            <p style={{ marginTop: 0 }}>Artists: {song.artists[0].name}</p>
                        </div>
                        {(isShown === song.id) && <HBarChart data={songData.data}/>}
                    </div>
                )
            })}
        </>
    )
}