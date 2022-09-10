import React, { useState } from 'react'


const Modal = ({ setOpenModal, players }) => {

    const [ existed, setExisted ] = useState(false);
    const [ name, setName ] = useState('');
    const [ playerCount, setPlayerCount ] = useState('');
    const [ region, setRegion ] = useState('');
    const [ country, setCountry ] = useState('');

    const validation = () => {
        players.filter(player => name.includes(player.team.name) ? setExisted(true): setExisted(false))
    }

    const addTeam = (e) => {
        e.preventDefault();
        console.log(existed);
        alert("Sill in Beta Version xD")
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

                    <label style={{marginTop: '30px', color: 'black'}}>Player Count</label>
                    <input
                        type="text"
                        value={country}
                        placeholder="Enter Player Count"
                        onChange={(e) => setCountry(e.target.value)}
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
                        onClick={addTeam}
                    >
                        Add Team
                    </button>
                </div>
            </div>
        </div> 
    )
}

export default Modal