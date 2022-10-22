import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTeam } from '../slices/teamSlice';


const Modal = ({ setOpenModal, players }) => {

    const dispatch = useDispatch();
    const [ name, setName ] = useState('');
    const [ playerCount, setPlayerCount ] = useState('');
    const [ region, setRegion ] = useState('');
    const [ country, setCountry ] = useState('');
    const [ player, setPlayer ] = useState('');

    // const validation = () => {
    //     players.filter(player => name.includes(player.team.name) ? setExisted(true): setExisted(false))
    // }

    const addTeamSubmit = (e) => {
        e.preventDefault();
        const values = { name, playerCount, region, country, player};
        dispatch(addTeam(values));
        setOpenModal(false);
    }


    return (
        <div className="modalBackground">
                <div className="modalContainer">
                <div className="titleCloseBtn">
                </div>
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

                    <label style={{marginTop: '30px', color: 'black'}}>Player Count</label>
                    <input
                        type="text"
                        value={playerCount}
                        placeholder="Enter Player Count"
                        onChange={(e) => setPlayerCount(e.target.value)}
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

                    <label style={{marginTop: '30px', color: 'black'}}>Picke Player</label>
                    <select value={player} onChange={(e) => setPlayer(e.target.value)}>
                        {
                            players.map((player , i) => (
                                <option 
                                    key={i}
                                    value={player.first_name}
                                >
                                    {player.first_name}
                                </option>
                            ))
                        }
                    </select>

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