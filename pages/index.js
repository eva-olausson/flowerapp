import Head from 'next/head';
import Flower from '../components/flower';

export async function getServerSideProps() {
  //fetch all flowers
  const response = await fetch('https://flowers-mock-data.firebaseio.com/flowers.json')
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
      
      <div className="top">
      <h1>All about flowers</h1>
      </div>

      <section className="flower-container">
        {allFlowerData.map((flower, index) => (
            <Flower {...flower} id={index} key={index} />
        ))}
      </section>
    </main>
  )
}

//Flower componenten med items visas här på Home 
