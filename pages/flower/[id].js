import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useState } from 'react';

// import Layout

export async function getServerSideProps({ params }) {
    // fetch flower details.
    console.log(params.id)
    const response = await fetch(`https://flowers-mock-data.firebaseio.com/flowers/${params.id}.json`)
    const flowerDetail = await response.json()

    //fetch comment list 
    const commentsResponse = await fetch(`https://flowers-mock-data.firebaseio.com/comments/eva-olausson/${params.id}.json`)
    const comments = await commentsResponse.json()
    flowerDetail.comments = comments;
    console.log(flowerDetail);
    return {
        props: { flowerDetail }
    }
} 

export default function Flower({ flowerDetail }) {
    console.log("flowerDetaiol", flowerDetail)

    //get current path to know which flower to send the comment to.

    const router = useRouter()
    const { id } = router.query
    console.log(id)

    const [comment, setComment] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const payload = {
            comment: comment,
            name: name
        };
        console.log(payload);

        // Send post request to my api route

        const response = await fetch(`/api/flower/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            }
        )
    };

    return (
        <main>
            <Head>
                <title>{flowerDetail.common_name}</title>
            </Head>

            <div className="flower-card">
            
            <img src={flowerDetail.cover_image} alt={flowerDetail.cover_image} />
            
            <h1>{flowerDetail.common_name}</h1>

            <h3>Soil: {flowerDetail.soil}</h3>
            <h3>Latin name: {flowerDetail.latin_name}</h3>
            <h3>Notes: "{flowerDetail.notes}"</h3>
            <h3>Blooming season: {flowerDetail.blooming_season}</h3>
            
            
            <h2>Comment</h2>
            <form className="comment-form" onSubmit={handleSubmit}>
            <input type="text" name="comment" value={comment} onChange={e => setComment(e.target.value)} placeholder="Comment" />
            <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="User name" />
            <input type="submit" value="Submit" />
            </form>
            </div>
    

            <h3 className="comments">Comments</h3>
            <ol>{Object.values(flowerDetail.comments).map((comment) => {
                return <li>{comment.comment} {comment.name}</li>
            })}</ol>

            <Link href='/'>
                <a>Go back to home</a>
            </Link>
        </main>

    )
};
