import { useEffect, useState } from "react";
import Container from "../../components/container";
import Card from "../../components/card";

function Home() {
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
        <Container>
            <h1 className="text-5xl sm:text-7xl font-bold text-center my-10 uppercase h-20 flex items-center px-3 justify-center">
                {title}
            </h1>
            <ul className="lg:grid-cols-5 gap-5 my-10 flex flex-col sm:grid sm:grid-cols-3">
                {movies.map((movie) => (
                    <Card id={movie.id} poster={movie.poster_path} title={movie.title} key={movie.id}></Card>
                ))}
            </ul>
        </Container>
    );
}

export default Home;
