import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "../../components/container";

const Movie = () => {
    const { id } = useParams();
    const imagePath = "https://image.tmdb.org/t/p/w500";

    const [movie, setMovie] = useState([]);
    const KEY = process.env.REACT_APP_KEY;
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`)
            .then((response) => response.json())
            .then((data) => {
                const res = data.results;
                let filme = res.find((key) => {
                    // eslint-disable-next-line
                    return key.id == id;
                });
                setMovie(filme);
            }); // eslint-disable-next-line
    }, []);

    return (
        <Container className="flex justify-between gap-10 flex-col">
            <nav className="mt-10 flex justify-between sm:flex-row flex-col gap-5">
                <h1 className="text-5xl font-bold">{movie.title}</h1>
                <Link to="/">
                    <button className="rounded-md bg-[#383838] py-1 px-12 text-3xl w-full sm:w-auto">Catálogo</button>
                </Link>
            </nav>
            <div className="flex justify-between gap-10 flex-col sm:flex-row">
                <img className="rounded-md" src={`${imagePath}${movie.poster_path}`} alt={movie.title} />
                <div className="flex-1 sm:m-0 mb-10">
                    <h3 className="text-3xl font-medium mb-8">
                        Título original: <span className="font-normal">{movie.original_title}</span>
                    </h3>

                    <h3 className="text-3xl font-medium mb-8">
                        Data de lançamento: <span className="font-normal">{movie.release_date}</span>
                    </h3>

                    <h3 className="text-3xl font-medium mb-8">
                        Nota média: <span className="font-normal">{movie.vote_average}</span>
                    </h3>

                    {movie.overview ? (
                        <div className="descricao flex flex-col gap-3">
                            <h3 className="text-3xl font-medium">Descrição: </h3>
                            <p className="text-2xl">{movie.overview}</p>
                        </div>
                    ) : null}
                </div>
            </div>
        </Container>
    );
};

export default Movie;
