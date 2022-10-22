import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateTeam } from '../slices/teamSlice';

const DetailModal = ({ setOpenModal, selectedTeam }) => {

    const [ updateForm, setUpdateForm ] = useState<boolean>(false);
    const [ managePlayers, setManagePlayers ] = useState<boolean>(false);
    const dispatch = useDispatch();

    // Form Values
    const [ name, setName ] = useState(selectedTeam?.name);
    const [ region, setRegion ] = useState(selectedTeam?.region);
    const [ country, setCountry ] = useState(selectedTeam?.country);
    const [ player, setPlayer] = useState(selectedTeam?.player);
    const playerCount = selectedTeam?.player?.length;



    // Update Team submit
    const updateTeamSubmit = (e) =>{
        e.preventDefault();
        const values = { name, playerCount, region, country, player};
        if(
            values.name == '' || values.name == undefined ||
            values.region == '' || values.region == undefined ||
            values.country == '' || values.country == undefined
        ){
            alert("Please enter all Inqueries carefully!");
        }else {
            dispatch(updateTeam(values));
            setOpenModal(false);
        }
    }

    return (
        <div className='modalBackground'>
            <div className="modalContainer">
                <div className="title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    {
                        updateForm ? <h1>Update Team</h1> :  <h1>Team Details</h1>
                    }
                    <button
                        style={{ marginBottom: "30px", backgroundColor: 'red'}}
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        Close
                    </button>
                </div>


                {
                    updateForm ? (
                        <div className='body'>
                            <form
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    paddingLeft: "30px",
                                    marginBottom: "30px",
                                    paddingRight: "30px",
                                    width: "100%",
                                    fontSize: "20px",
                                    textAlign: 'left'
                                }}
                            >
                                <label style={{marginTop: '30px', color: 'black'}}>Team Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Enter name"
                                    onChange={(e) => setName(e.target.value)}
                                    readOnly
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
                            </form>
                        </div>
                    ) : (
                        <DetailContent
                            selectedTeam={selectedTeam}
                        />
                    )
                }


                <div className="footer">
                    {
                        updateForm && (
                            <button
                                onClick={() => {
                                    setUpdateForm(false);
                                }}
                                id="cancelBtn"
                            >
                                Cancel
                            </button>
                            
                        )
                    }

                    {
                        !updateForm ? (
                            <>
                                <button
                                    onClick={() => {
                                        setManagePlayers(true);
                                    }}
                                    id='cancelBtn'
                                >
                                    Manage Players
                                </button>
                                <button
                                    onClick={() => {
                                        setUpdateForm(true);
                                    }}
                                >
                                    Edit
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={updateTeamSubmit}
                            >
                                Update
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

const DetailContent = ({ selectedTeam }) => {
    return (
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
                            selectedTeam.player?.map((player, i) => (
                                <li key={i}>
                                    {player.label}
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default DetailModal