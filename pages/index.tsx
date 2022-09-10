import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { login, selectUser, logout } from '../slices/userSlice';
import Modal from '../components/Modal';

export default function Home({players}) {

  const router = useRouter();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [ openModal, setOpenModal ] = useState(false);
  

  const logoutSubmit = () => {
    dispatch(logout());
    if (typeof window !== 'undefined') { 
        window.localStorage.removeItem("user");
    }
  }

  return (
    <div className='relative'>

      <Head>
        <title>Home | Players</title>
        <link rel="icon" type="image/png" href="/logo.jpeg" sizes="16x16" />
      </Head>

      {/* user info / auth */}
      <div
        style={{
          marginLeft: "30px",
          marginTop: "40px"
        }}
      >
        {
          user ? (
            <div className='flexBox'>           
              <p> 🙋🏼‍♂️ {user.displayName}</p>
              <span 
                onClick={logoutSubmit}
                className='underline'
              >
                Logout
              </span>
            </div>

          ) : (
            <Link href="/login">
              🔓 Login
            </Link>
          )
        }

      </div>

      {/* add team modal button */}
      {
        user && (
          <div>
            <button
              onClick={() => setOpenModal(true)}
              style={{
                marginLeft: "30px",
                marginTop: "20px"
              }}
            >
              Add Team
            </button>
          </div>
        )
      }
      

      {/* Players list */}
      {
        !user ? (
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
              players.map((player, i) => {
                return(
                  <li key={i} className="text-red-500">
                    {player.first_name}
                  </li>
                )
              })
            }
          </ol>
        )
      }

      {
        openModal && (
          <Modal setOpenModal={setOpenModal} players={players} />
        )
      }


    </div>
  )
}


export async function getStaticProps(){
  const res = await fetch("https://www.balldontlie.io/api/v1/players");
  const data = await res.json();

  return{
    props:{
      players: data?.data
    },
    revalidate: 60
  }
}