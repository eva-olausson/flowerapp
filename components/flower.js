import Link from 'next/link';

export default function Flower({ common_name, id, cover_image }) {
    return (
        <article class="articles">
            <h2>{ common_name }</h2>
            <img src={cover_image} alt={cover_image} />
            <Link href="/flower/[id]" as={`flower/${id}`}>
            <h3><a>Read more</a></h3>
            </Link>
        </article>
    )
}
