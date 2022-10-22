import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../components/Modal';
import { selectUser } from '../slices/userSlice';

const Teams = ({ teams }) => {

    console.log(teams);

    const user = useSelector(selectUser);
    const [ openModal, setOpenModal ] = useState(false);

    
    return (
        <div>

            <Head>
                <title>Teams | Player CMS</title>
                <link rel="icon" type="image/png" href="/logo.jpeg" sizes="16x16" />
            </Head>
            
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
                    🏃🏾 Back To Players
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

            {/* Teams list */}
            <h3>Teams ({teams.length})</h3>

            {
                !user? (
                    <div
                        style={{
                            marginLeft: '30px'
                        }}
                    >
                        <h1 className='info'>Login to manage Teams and Players</h1>
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
                )
            }

            {
                openModal && (
                    <Modal setOpenModal={setOpenModal}/>
                )
            }

        </div>
    )
}

export default Teams


export async function getStaticProps(){
    const res = await fetch("https://www.balldontlie.io/api/v1/teams");
    const data = await res.json();

    return {
        props:{
            teams: data?.data
        },
        revalidate: 60
    }
}