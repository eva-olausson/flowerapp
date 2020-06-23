import Link from 'next/link';

export default function Flower({ common_name, blooming_season, id }) {
    return (
        <article>
            <h2>{ common_name }</h2>
            <p>{ blooming_season }</p>
            <Link href="/flower/[id]" as={`flower/${id}`}>
            <a>Read more...</a>
            </Link>
        </article>
    )
}

