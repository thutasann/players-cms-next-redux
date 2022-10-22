import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../components/Modal';
import { selectUser } from '../slices/userSlice';

interface state{
    team: any
}

const Teams = ({ teams, players }) => {


    const user = useSelector(selectUser);
    const [ openModal, setOpenModal ] = useState(false);

    // Teams Items from Redux Store
    const teamsFromRedux = useSelector((state: state) => state?.team);
    console.log(teamsFromRedux)
    
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
                    
                    <h3>Teams ({teams.length})</h3>

                    <div className='textFromRedux' style={{ marginBottom: "60px"}}>
                        <h3 className='textLeft'>Newly Added Teams</h3>
                        <div className='container'>
                            {
                                teamsFromRedux.team.length > 0 ? ( teamsFromRedux.team.map((team, i) => {
                                    return (
                                        <div className="card" key={i}>
                                            <h4>
                                                <b>{team.name}</b>
                                                <span className='danger'>🗑️ Delete</span>
                                            </h4>
                                            <p>Player Count : {team.playerCount}</p>
                                            <p>Region: {team.region}</p>
                                            <p>Country: {team.country}</p>
                                            <p>Player: {team.player? team.player : "---"}</p>
                                            <button>
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

                    <div className='teamFromAPI'>
                        <h3 className='textLeft'>Teams from API</h3>
                        <div className='container'>
                            {
                                teams.map((team, i) => {
                                    return (
                                        <div className="card" key={i}>
                                            <h4>
                                                <b>{team.full_name}</b>
                                                <span className='danger'>🗑️ Delete</span>
                                            </h4>
                                            <p>City : {team.city}</p>
                                            <p>Divistion: {team.division}</p>
                                            <button>
                                                View Detail
                                            </button>
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