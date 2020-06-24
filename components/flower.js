import Link from 'next/link';
import { Image } from 'semantic-ui-react';


export default function Flower({ common_name, id, cover_image }) {
    return (
        <article className="articles">
            <h2>{ common_name }</h2>
            <Image height="120" src={cover_image} alt={cover_image} size='large' href={`/flower/${id}`} as="a" />
            <Link href="/flower/[id]" as={`flower/${id}`}>
            <h3><a>Read more</a></h3>
            </Link>
        </article>
    )
}
