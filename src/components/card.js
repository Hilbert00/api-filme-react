import { Link } from "react-router-dom";

const imagePath = "https://image.tmdb.org/t/p/w500";

export default function Card(props) {
    return (
        <li className="group sm:hover:scale-105 hover:scale-110 transition-all duration-500 relative rounded-md overflow-hidden flex justify-center items-center">
            <img
                className="group-hover:opacity-30 transition-all duration-300"
                src={`${imagePath}${props.poster}`}
                alt={props.title}
            />
            <div className="group-hover:opacity-100 w-full px-3 opacity-0 transition-all duration-300 absolute flex flex-col gap-5 items-center">
                <span className="text-2xl font-semibold text-center">{props.title}</span>

                <Link to={`/${props.id}`}>
                    <button className="underline">Detalhes</button>
                </Link>
            </div>
        </li>
    );
}
