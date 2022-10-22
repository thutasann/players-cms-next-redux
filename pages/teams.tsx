import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ConfirmModal from '../components/ConfimDialog';
import DetailModal from '../components/detailModal';
import Modal from '../components/Modal';
import { selectUser } from '../slices/userSlice';

interface state{
    team: any
}

const Teams = ({ teams, players }) => {


    const user = useSelector(selectUser);
    const [ openModal, setOpenModal ] = useState(false);
    const [ openDetailModal, setOpenDetailModal ] = useState(false);
    const [ openConfirmModal, setOpenConfirmModal ] = useState(false);
    const [ selectedTeam, setSelectedTeam ] = useState(null);
    const dispatch = useDispatch();


    const teamsFromRedux = useSelector((state: state) => state?.team);


    // View Detail
    const viewDetail = (team: any) => {
        setOpenDetailModal(true);
        setSelectedTeam(team);
    }

    // Open Confirm Modal box
    const confirmModalOpen = (team : any) => {
        setOpenConfirmModal(true);
        setSelectedTeam(team);
    }
    
    return (
        <div>

            <Head>
                <title>Teams | Player CMS</title>
                <link rel="icon" type="image/png" href="/logo.jpeg" sizes="16x16" />
            </Head>
            
            {
                user ? (
                    <div
                        style={{
                            marginLeft: '30px',
                            marginTop: "20px",
                            marginBottom: "30px"
                        }}
                        className="flexBox"
                    >
                        <Link 
                            href='/'
                        >
                            🔙 Back To Players
                        </Link>
                        <button
                            onClick={() => setOpenModal(true)}
                            style={{
                                marginLeft: "30px",
                                marginTop: "20px",
                                marginRight: '30px'
                            }}
                        >
                            Add Team
                        </button>
                        
                    </div>
                ) : (
                    <div
                        style={{
                            marginLeft: "30px",
                            marginTop: "40px"
                        }}
                    >
                    <Link href="/login">
                        🔓 Login
                    </Link>
                    </div>
                    
                )
            }
            

            {/* Teams list */}

            {
                !user? (
                    <div
                        style={{
                            marginLeft: '30px'
                        }}
                    >
                        <h1 className='info' style={{ textAlign: "left"}}>Login to manage Teams and Players</h1>
                        <Image
                            src="/ronaldo.jpeg"
                            width={850}
                            height={490}
                            alt="Ronaldo Bicycle Kick"
                            placeholder='blur'
                            blurDataURL='/ronaldo.jpeg'
                            loading="lazy"
                        />
                    </div>
                ) : (
                    <>
                    
                    <h3>Teams ({teams.length + teamsFromRedux?.team?.length})</h3>

                    {/* Teams from Redux */}
                    <div className='textFromRedux' style={{ marginBottom: "60px"}}>
                        <h3 className='textLeft'>Newly Added Teams</h3>
                        <div className='container'>
                            {
                                teamsFromRedux.team?.length > 0 ? ( teamsFromRedux.team.map((team, i) => {
                                    return (
                                        <div className="card" key={i}>
                                            <h4>
                                                <b>{team.name}</b>
                                                <span 
                                                    onClick={() => confirmModalOpen(team.name)}
                                                    className='danger'
                                                >Delete</span>
                                            </h4>
                                            <p>Player Count : {team.player.length}</p>
                                            <p>Region: {team.region}</p>
                                            <p>Country: {team.country}</p>
                                            <button
                                                onClick={() => viewDetail(team)}
                                            >
                                                View Detail
                                            </button>
                                        </div>

                                    )
                                })): (
                                    <p className='info'>There is not currenlty added Teams!</p>
                                )
                            }
                        </div>
                    </div>

                    {/* Teams From API */}
                    <div className='teamFromAPI'>
                        <h3 className='textLeft'>Teams from API</h3>
                        <div className='container'>
                            {
                                teams.map((team, i) => {
                                    return (
                                        <div className="card" key={i}>
                                            <h4>
                                                <b>{team.full_name}</b>
                                            </h4>
                                            <p>City : {team.city}</p>
                                            <p>Divistion: {team.division}</p>
                                        </div>

                                    )
                                })
                            }
                        </div>
                    </div>

                    </>
                )
            }

            {
                openModal && (
                    <Modal setOpenModal={setOpenModal} players={players}/>
                )
            }

            {
                openDetailModal && (
                    <DetailModal 
                        setOpenModal={setOpenDetailModal} 
                        selectedTeam={selectedTeam}
                        players={players}
                    />
                )
            }

            {
                openConfirmModal && (
                    <ConfirmModal
                        setOpenModal={setOpenConfirmModal}
                        selectedTeam={selectedTeam}
                    />
                )
            }

        </div>
    )
}

export default Teams


export async function getStaticProps(){
    const res = await fetch("https://www.balldontlie.io/api/v1/teams");
    const data = await res.json();

    const resp = await fetch("https://www.balldontlie.io/api/v1/players");
    const datap = await resp.json();

    return {
        props:{
            teams: data?.data,
            players: datap?.data
        },
        revalidate: 60
    }
}