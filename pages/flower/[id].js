import Link from 'next/link';
import Head from 'next/head';
// import Layout

export async function getStaticPaths() {
    
    const response = await fetch('https://flowers-mock-data.firebaseio.com/flowers.json'
    )  
    const allFlowerData = await response.json()
    return {
        paths: allFlowerData.map((flower) => {
            return {
                params: {
                    id: `${flower.flowerId}`,
                },
            }
        }),
        fallback: false,
    }
}

export async function getStaticProps( { params }) {
    // fetch flower details.
    const response = await fetch('https://flowers-mock-data.firebaseio.com/flowers/{flowerId}.json'
    )
    const flower = await response
    return {
        props: params
    }
}

//getAllflowersDetails()

export default function Flower({ common_name, blooming_season  }) {
        return (
            <main>
                <Head>
                    <title>{ common_name }</title>
                </Head>
                    <p>{ blooming_season }</p>

                    <Link href='/'>
                        <a>Go back to home</a>
                    </Link>
            </main>

        )
}
