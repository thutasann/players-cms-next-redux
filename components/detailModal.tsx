import React from 'react'
import { useDispatch } from 'react-redux'

const DetailModal = ({ setOpenModal, selectedTeam }) => {

    const dispatch = useDispatch();

    console.log(selectedTeam);

    return (
        <div className='modalBackground'>
            <div className="modalContainer">
                <div className="title">
                    <h1>Team Detail</h1>
                </div>

                <div className='body'>
                    <div className="card" style={{ color: "black", border: "1px solid #000", width: "100%", cursor: "auto"}}>
                        <h3 style={{ textAlign: 'left'}}>
                            <b>{selectedTeam.name}</b>
                        </h3>
                        <div style={{ fontSize: "20px", textAlign: 'left'}}>
                            <p>Player Count : {selectedTeam.playerCount}</p>
                            <p>Region: {selectedTeam.region}</p>
                            <p>Country: {selectedTeam.country}</p>
                        </div>
                        <hr />
                        <div style={{ fontSize: "20px"}}>
                            <h4 style={{ textAlign: 'left', }}>Players</h4>
                            <ol style={{ textAlign: 'left', marginLeft: "-20px"}}>
                                {
                                    selectedTeam.player.map((player, i) => (
                                        <li key={i}>
                                            {player.label}
                                        </li>
                                    ))
                                }
                            </ol>
                        </div>
                    </div>
                </div>


                <div className="footer">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                        id="cancelBtn"
                    >
                    Hide
                    </button>
                    <button
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DetailModal