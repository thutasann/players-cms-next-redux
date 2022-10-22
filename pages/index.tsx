import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, logout } from '../slices/userSlice';
import usePagination from '../components/usePagination';

export default function Home({players}) {

  // Load More
  const { next, currentPage, currentData, maxPage } = usePagination(
    players,
    10
  );
  const currentPlayers = currentData();
  const [element, setElement] = useState(null);
  const observer = useRef<IntersectionObserver>();
  const prevY = useRef(0);

  useEffect(() => {
      observer.current = new IntersectionObserver(
      (entries) => {
          const firstEntry = entries[0];
          const y = firstEntry.boundingClientRect.y;

          if (prevY.current > y) {
          next();
          }
          prevY.current = y;
      },
      { threshold: 0.5 }
      );
  }, []);

  useEffect(() => {
      const currentElement = element;
      const currentObserver = observer.current;

      if (currentElement) {
      currentObserver.observe(currentElement);
      }

      return () => {
      if (currentElement) {
          currentObserver.unobserve(currentElement);
      }
      };
  }, [element]);

  // users
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  

  const logoutSubmit = () => {
    dispatch(logout());
    if (typeof window !== 'undefined') { 
        window.localStorage.removeItem("user");
    }
  }

  return (
    <div className='relative'>

      <Head>
        <title>Home | Player CMS</title>
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
              
              <div>
                <Link 
                    href='/teams'
                  >
                  ⚽ View Teams
                </Link>
              </div>

              <p> 
                🙋🏼‍♂️ {user.displayName}
                <span 
                  onClick={logoutSubmit}
                  className='underline'
                >
                  Logout
                </span>
              </p>
              
              
            </div>

          ) : (
            <Link href="/login">
              🔓 Login
            </Link>
          )
        }

      </div>

      {/* Players list */}
      {
        !user ? (
          <div
            style={{
              marginLeft: '30px',
              marginTop:  "30px"
            }}
          >
            <h1 className='info' style={{ textAlign: 'left'}}>Login to manage Teams and Players</h1>
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
          <div style={{ marginLeft: "30px", marginTop: "30px"}}>
            <h3>Players ({players?.length})</h3>
            <div className='container' style={{ margin: 0}}>
              {
                currentPlayers.map((player, i) => {
                  return(
                    <div className='card' key={i}>
                      <h4>
                        <b>{player.first_name + player.last_name}</b>
                      </h4>
                      <p>Team : {player.team.full_name}</p>
                    </div>
                  )
                })
              }
            </div>
            <button
                onClick={() => next()}
              >
              More...
            </button>

          </div>

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
      players: data?.data,
      meta: data?.meta
    },
    revalidate: 60
  }
}