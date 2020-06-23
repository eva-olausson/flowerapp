import Link from 'next/link';
import Head from 'next/head';
import {useState} from 'react';

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
// <img src={flowerDetail.cover_image} alt={flowerDetail.cover_image} />


export default function Flower({flowerDetail}) {
    console.log("flowerDetaiol", flowerDetail)

    const [comment, setComment] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();

    const payload = {
        comment: comment, 
        name: name
        };

    const response = await fetch(`https://flowers-mock-data.firebaseio.com/comments/eva/" + flowerId`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify() 
    })
    
    return response.json(payload);
    
    }; 

    return (
        <main>
            <Head>
                <title>{ flowerDetail.common_name }</title>
            </Head>

            <p>{ flowerDetail.common_name }</p>
            <p>{ flowerDetail.comment}</p>

            <h3>Comment</h3>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="User name"/>
            <textarea type="text" name="comment" value={comment} onChange={e => setComment(e.target.value)} placeholder="Comment" />
            <input type="submit" value="Submit" />
        </form>

            <h3>Comments</h3>
            <li>Hej</li>

            <Link href='/'>
                <a>Go back to home</a>
            </Link>
        </main>

    )
};
