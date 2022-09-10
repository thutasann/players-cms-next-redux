import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { login, selectUser, logout } from '../slices/userSlice';

export default function Home({players}) {

  const router = useRouter();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if(!user){
  //     router.push("/login")
  //   } 
  // }, [user]);

  const logoutSubmit = () => {
    dispatch(logout());
  }

  return (
    <div>
      <Head>
        <title>Home | Players</title>
        <link rel="icon" type="image/png" href="/logo.jpeg" sizes="16x16" />
      </Head>

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
              <button 
                onClick={logoutSubmit}
                className='logoutBtn'
              >
                Logout
              </button>
            </div>

          ) : (
            <Link href="/login">
              🔓 Login
            </Link>
          )
        }

      </div>

      {
        !user ? (
          <div
            style={{
              marginLeft: '30px'
            }}
          >
            <h1 className='info'>Login to view Players List</h1>
            <Image
              src="/bicycle-kick.gif"
              width={850}
              height={550}
              alt="Ronaldo Bicycle Kick"
              placeholder='blur'
              blurDataURL='/bicycle-kick.gif'
              loading="lazy"
            />
          </div>
        ) : (
          <ul>
            {
              players.map((player, i) => {
                return(
                  <li key={i} className="text-red-500">
                    {player.first_name}
                  </li>
                )
              })
            }
          </ul>
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