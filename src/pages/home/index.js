import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
    const imagePath = "https://image.tmdb.org/t/p/w500";

    const KEY = process.env.REACT_APP_KEY;

    const [title, setTitle] = useState("");
    const [writing, setWriting] = useState(true);
    const [current, setCurrent] = useState(0);
    const [wait, setWait] = useState(false);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const TITLES = ["Filmes em Alta", "Veja a nossa seleção!", "Lista atualizada!!!"];

        if (wait) {
            const intervalId = setInterval(() => {
                setWait(false);
            }, 5000);

            return () => clearInterval(intervalId);
        }

        const intervalId = setInterval(
            () => {
                if (title.length + 1 >= TITLES[current].length && writing) {
                    setWait(true);
                    setWriting(false);
                }
                if (title.length - 1 === 0 && !writing) {
                    setWriting(true);
                    setCurrent(current === TITLES.length - 1 ? 0 : current + 1);
                }

                if (writing) setTitle(title + TITLES[current][title.length]);
                else setTitle(title.substring(0, title.length - 1));
            },
            writing ? 80 : 30
        );

        if (!movies.length)
            fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`)
                .then((response) => response.json())
                .then((data) => {
                    setMovies(data.results);
                });

        return () => clearInterval(intervalId);
    }, [title, wait, KEY, current, movies.length, writing]);

    return (
        <div className="max-w-[95%] mx-auto">
            <h1 className="text-5xl sm:text-7xl font-bold text-center my-10 uppercase h-20 flex items-center px-3 justify-center">
                {title}
            </h1>
            <ul className="lg:grid-cols-5 gap-5 my-10 flex flex-col sm:grid sm:grid-cols-3">
                {movies.map((movie) => {
                    return (
                        <li
                            className="group sm:hover:scale-105 hover:scale-110 transition-all duration-500 relative rounded-md overflow-hidden flex justify-center items-center"
                            key={movie.id}
                        >
                            <img
                                className="group-hover:opacity-30 transition-all duration-300"
                                src={`${imagePath}${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <div className="group-hover:opacity-100 w-full px-3 opacity-0 transition-all duration-300 absolute flex flex-col gap-5 items-center">
                                <span className="text-2xl font-semibold text-center">{movie.title}</span>

                                <Link to={`/${movie.id}`}>
                                    <button className="underline">Detalhes</button>
                                </Link>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Home;
