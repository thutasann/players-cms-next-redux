import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../slices/userSlice';

const Teams = ({ teams }) => {

    const router = useRouter();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    
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
            >
                <Link 
                    href='/'
                    
                >
                    Back Home
                </Link>
                <h3>Teams</h3>
            </div>

            {/* Teams list */}
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
                    <ol>
                        {
                            teams.map((team, i) => {
                                return (
                                    <li key={i}>
                                        {team.full_name}
                                    </li>
                                )
                            })
                        }
                    </ol>
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