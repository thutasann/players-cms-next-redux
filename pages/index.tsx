import Head from 'next/head'
import Image from 'next/image'

export default function Home({players}) {

  return (
    <div>
      <Head>
        <title>Home | Players</title>
        <link rel="icon" type="image/png" href="/logo.jpeg" sizes="16x16" />
      </Head>
      <ul>
        {
          players.map((player, i) => {
            return(
              <li key={i}>
                {player.first_name}
              </li>
            )
          })
        }
      </ul>
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