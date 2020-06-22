import Head from 'next/head';
import Flower from '../components/flower';
// I flower-component alla flower items som importeras 

export async function getStaticProps() {
  //fetch all flowers
  const response = await fetch('https://flowers-mock-data.firebaseio.com/flowers.json'
  )
  const allFlowerData = await response.json()
      return {
        props: {
          allFlowerData,
        },
      }
  
}

export default function Home( { allFlowerData}) {
  return (
    <main>
      <Head>
        <title>Home page</title>
      </Head>

      <h1>List of flowers</h1>

      <section>
        {allFlowerData.map((flowers) => (
            <Flower {...flowers} key={flowers.flowerId} />
        ))}
      </section>
    </main>
  )
}

//Flower componenten med items visas här på Home 