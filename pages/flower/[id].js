import Link from 'next/link';
import Head from 'next/head';
// import Layout


export async function getServerSideProps({params}) {
    // fetch flower details.
    console.log(params.id)
    const response = await fetch(`https://flowers-mock-data.firebaseio.com/flowers/${params.id}.json`)
    const flowerDetail = await response.json()

    //fetch comment list 
    const commentsResponse = await fetch(`https://flowers-mock-data.firebaseio.com/comments/${params.id}.json`)
    const comments = await commentsResponse.json()
    console.log('HEJ', comments);
    flowerDetail.comment = comments;
    console.log(flowerDetail);
    return {
        props: { flowerDetail } 
    }
}

//Render flower details

export default function Flower({flowerDetail}) {
    console.log("flowerDetaiol", flowerDetail)

    return (
        <main>
            <Head>
                <title>{ flowerDetail.common_name }</title>
            </Head>

            <p>{ flowerDetail.common_name }</p>
            <p>{ flowerDetail.blooming_season }</p>
            <p>{ flowerDetail.comment}</p>
           

            <Link href='/'>
                <a>Go back to home</a>
            </Link>
        </main>

    )
};
