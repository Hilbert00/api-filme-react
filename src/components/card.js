import { Link } from "react-router-dom";

const imagePath = "https://image.tmdb.org/t/p/w500";

export default function Card(props) {
    return (
        <li className="group sm:hover:scale-105 transition-all duration-500 sm:relative rounded-md overflow-hidden flex justify-center items-center flex-col">
            <img
                className="sm:group-hover:opacity-30 transition-all duration-300"
                src={`${imagePath}${props.poster}`}
                alt={props.title}
            />
            <div className="group-hover:opacity-100 w-full sm:px-3 sm:opacity-0 transition-all duration-300 sm:absolute flex flex-col sm:gap-5 items-center">
                <span className="text-2xl font-semibold text-center">{props.title}</span>

                <Link className="w-full" to={`/${props.id}`}>
                    <button className="underline w-full">
                        Detalhes
                    </button>
                </Link>
            </div>
        </li>
    );
}
