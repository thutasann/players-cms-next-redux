import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTeam } from '../slices/teamSlice';
import { MultiSelect } from "react-multi-select-component";

interface state{
    team: any,
    player: any
}

// Players -> Players From API
// PlayersFromRedux -> Players from Redux

const Modal = ({ setOpenModal, players }) => {

    const dispatch = useDispatch();
    const [ name, setName ] = useState('');
    const [ region, setRegion ] = useState('');
    const [ country, setCountry ] = useState('');

    // To Get Players Items from Redux Store
    const teamsFromRedux = useSelector((state: state) => state?.team);
    const playersFromRedux = teamsFromRedux.players.map((t) => t);
    const combinedPlayersFromRedux = playersFromRedux.flat(1);

    /**
     * Validation
     */
    const filteredPlayers = players.filter((elem) => !combinedPlayersFromRedux.find(({ value }) => elem.first_name === value) && elem.first_name);
    

    // Select Box Options
    const options = filteredPlayers.map((player) => {
        return{
            label: player.first_name,
            value: player.first_name
        }
    });

    const [ player, setPlayer] = useState([]); // playload Player
    const playerCount: any = player.length;

    const addTeamSubmit = (e) => {
        e.preventDefault();
        console.log("Payload player", player);
        const values = { name, playerCount, region, country, player};
        if(
            values.name == '' || values.name == undefined ||
            values.playerCount == '' || values.playerCount == undefined ||
            values.region == '' || values.region == undefined ||
            values.country == '' || values.country == undefined
        ){
            alert("Please enter all Inqueries carefully!");
        }else {
            dispatch(addTeam(values));
            setOpenModal(false);
        }
        
    }


    return (
        <div className="modalBackground">
                <div className="modalContainer">
                <div className="title">
                    <h1>Add Team</h1>
                </div>

                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        paddingLeft: "30px",
                        marginBottom: "30px",
                        paddingRight: "30px"
                    }}
                >
                    <label style={{marginTop: '30px', color: 'black'}}>Team Name</label>
                    <input
                        type="text"
                        value={name}
                        placeholder="Enter name"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label style={{marginTop: '30px', color: 'black'}}>Region</label>
                    <input
                        type="text"
                        value={region}
                        placeholder="Enter Region"
                        onChange={(e) => setRegion(e.target.value)}
                    />

                    <label style={{marginTop: '30px', color: 'black'}}>Country</label>
                    <input
                        type="text"
                        value={country}
                        placeholder="Enter Country"
                        onChange={(e) => setCountry(e.target.value)}
                    />

                    <label style={{marginTop: '30px', color: 'black'}}>Pick Players</label>
                    <MultiSelect
                        options={options}
                        value={player}
                        onChange={setPlayer}
                        labelledBy="Select"
                    />


                </form>


                <div className="footer">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                        id="cancelBtn"
                    >
                    Cancel
                    </button>
                    <button
                        onClick={addTeamSubmit}
                    >
                        Add Team
                    </button>
                </div>
            </div>
        </div> 
    )
}

export default Modal