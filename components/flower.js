import Link from 'next/link';

export default function Flower({ common_name, blooming_season, flowerId }) {
    return (
        <article>
            <h2>{ common_name }</h2>
            <p>{ blooming_season }</p>
            <Link href="/flower/[id]" as={`flower/${flowerId}`}>
            <a>Read more...</a>
            </Link>
        </article>
    )
}

