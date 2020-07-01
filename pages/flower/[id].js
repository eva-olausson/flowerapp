import Link from 'next/link';
import Head from 'next/head';
import { Form, Divider, Image } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

// import Layout

export async function getServerSideProps({ params }) {

    // fetch flower details.
    const response = await fetch(`https://flowers-mock-data.firebaseio.com/flowers/${params.id}.json`)
    const flowerDetail = await response.json()

    //fetch my comments
    const commentsResponse = await fetch(`https://flowers-mock-data.firebaseio.com/comments/eva-olausson/${params.id}.json`)
    const comments = await commentsResponse.json()
    flowerDetail.comments = comments;

    return {
        props: { flowerDetail }
    }
}

export default function Flower({ flowerDetail }) {

    //get current path to know which flower to send the comment to.

    const router = useRouter()
    const { id } = router.query

    const [comment, setComment] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const payload = {
            comment: comment,
            name: name
        };

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
            <Image height="120" src={flowerDetail.cover_image} alt={flowerDetail.cover_image} size="massive" />
                
                <div className="ui hidden divider"></div>
                <div className="flower-details">
                    <h1>{flowerDetail.common_name}</h1>
                    <div className="ui hidden divider"></div>
                    <h3>Soil: {flowerDetail.soil}</h3>
                    <h3>Latin name: {flowerDetail.latin_name}</h3>
                    <h3>Notes: "{flowerDetail.notes}"</h3>
                    <h3>Blooming season: {flowerDetail.blooming_season}</h3>
                </div>
                <div className="ui hidden divider"></div>

                <h2>Comment</h2>

                <div className="comment-form">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Input
                                placeholder='Name'
                                name="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                size="large"
                                  />
                        </Form.Group>
                        <Form.TextArea
                            placeholder='Comment'
                            name='comment'
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            size="large" 
                            
                            />
                            <Form.Button content='Submit' color="black" size="big" />
                    </Form>

                </div>
                <Divider />
                <div className="comments">
                    <h2>Comments</h2>
                    <ul>
                    {
                        flowerDetail.comments ?
                            Object.values(flowerDetail.comments).map((comment) => {
                                return <p>{comment.name} {comment.comment} </p>
                            }) : 
                            "No Comments"
                    }</ul>
                </div>

            <Link href='/'>
                <a>Go back to home</a>
            </Link>
            <div className="ui hidden divider"></div>

            </div>
        </main>

    )
};
