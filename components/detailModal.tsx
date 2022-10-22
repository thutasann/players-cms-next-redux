import React, { useState } from 'react'
import { MultiSelect } from 'react-multi-select-component';
import { useDispatch, useSelector } from 'react-redux'
import { removePlayer, updateTeam } from '../slices/teamSlice';


interface state{
    team: any,
    player: any
}

// players -> Players From API

const DetailModal = ({ setOpenModal, selectedTeam, players }) => {

    const [ updateForm, setUpdateForm ] = useState<boolean>(false);
    const dispatch = useDispatch();

    // To Get Players from Redux Store and Validate
    const teamsFromRedux = useSelector((state: state) => state?.team);
    const playersFromRedux = teamsFromRedux?.team?.map((t) => t.player.map((z) => z));
    const combinedPlayersFromRedux = playersFromRedux.flat(1);
    const filteredPlayers = players.filter((elem) => !combinedPlayersFromRedux?.find(({ value }) => elem.id === value) && elem.id);


    // Select Box Options
    const options = filteredPlayers.map((player) => {
        return{
            label: player.first_name,
            value: player.id
        }
    });


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


    // Remove Player From Team
    const removePlayerFromTeam = (value: any) => {
        dispatch(removePlayer(value));
        setOpenModal(false);
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
                                className='card'
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    paddingLeft: "30px",
                                    marginBottom: "30px",
                                    paddingRight: "30px",
                                    width: "100%",
                                    fontSize: "20px",
                                    border: "1px solid #000",
                                    textAlign: 'left',
                                    paddingBottom: "50px"
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

                                <label style={{marginTop: '30px', color: 'black'}}>Pick Players</label>
                                <MultiSelect
                                    options={options}
                                    value={player}
                                    onChange={setPlayer}
                                    labelledBy="Select"
                                />

                            </form>
                        </div>
                    ) : (
                        <DetailContent
                            selectedTeam={selectedTeam}
                            removePlayerFromTeam={removePlayerFromTeam}
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

const DetailContent = ({ selectedTeam, removePlayerFromTeam }) => {
    return (
        <div className='body'>
            <div className="card" style={{ color: "black", border: "1px solid #000", width: "100%", cursor: "auto"}}>
                <h3 style={{ textAlign: 'left'}}>
                    <b>{selectedTeam.name}</b>
                </h3>
                <div style={{ fontSize: "20px", textAlign: 'left'}}>
                    <p>Player Count : {selectedTeam?.player?.length}</p>
                    <p>Region: {selectedTeam.region}</p>
                    <p>Country: {selectedTeam.country}</p>
                </div>
                <hr />
                <div style={{ fontSize: "20px"}}>
                    <h4 style={{ textAlign: 'left', }}>Players</h4>
                    <ol style={{ textAlign: 'left', marginLeft: "-20px"}}>
                        {
                            selectedTeam.player?.map((player, i) => (
                                <li key={i} style={{display:'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: "-15px"}}>
                                    {player.label}

                                    <span
                                        className='danger'
                                        style={{ cursor: "pointer" }}
                                        onClick={() => removePlayerFromTeam(player.value)}
                                    >Remove</span>
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