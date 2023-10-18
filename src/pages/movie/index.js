import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "../../components/container";

const Movie = () => {
    const { id } = useParams();
    const imagePath = "https://image.tmdb.org/t/p/w500";

    const [movie, setMovie] = useState([]);
    const KEY = process.env.REACT_APP_KEY;
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=pt-BR`)
            .then((response) => response.json())
            .then((data) => {
                fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=pt-BR`)
                .then((response) => response.json())
                .then((result) => {
                    const videoUrl = result.results.find((e) => e.site.toLowerCase() === "youtube")?.key;

                    const filme = { ...data, youtube: videoUrl }

                    console.log(filme)
                    setMovie(filme);
                })
            });
    }, []);

    return (
        <Container className="flex justify-between gap-10 flex-col mb-10">
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
                        <div className="flex flex-col gap-3 mb-8">
                            <h3 className="text-3xl font-medium">Descrição: </h3>
                            <p className="text-2xl">{movie.overview}</p>
                        </div>
                    ) : null}

                    {movie.youtube ? (
                        <div className="flex flex-col gap-3">
                            <h3 className="text-3xl font-medium">Trailer: </h3>
                            <iframe className="h-60 sm:h-[400px] sm:w-[700px]" src={`https://www.youtube.com/embed/${movie.youtube}`} />
                        </div>
                    ) : null}
                </div>
            </div>
        </Container>
    );
};

export default Movie;
