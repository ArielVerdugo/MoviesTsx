import { useEffect, useState } from "react"
import { Movie } from "../../core/entities/movie.entity";
import * as UseCases from "../../core/use-cases/index";
import { movieDBFetcher } from "../../config/adapters/moviesDB.adapter";

export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true);

    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [popular, setPopular] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);


    useEffect( () => {
        initialLoad();
    }, [])

    const initialLoad = async() => {

        const nowPlayingPromise = await UseCases.moviesNowPlayingUseCase(movieDBFetcher);
        const popularPromise = await UseCases.moviesPopularUseCase(movieDBFetcher);
        const topRatedPromise = await UseCases.moviesTopRatedUseCase(movieDBFetcher);
        const upcomingdPromise = await UseCases.moviesUpcomingUseCase(movieDBFetcher);


        const [
            nowPlayingMovies,
            popularMovies,
            topRatedMovies,
            upcomingMovies
        ] = await Promise.all([
            nowPlayingPromise,popularPromise,topRatedPromise,upcomingdPromise
        ]);

        setNowPlaying(nowPlayingMovies);
        setPopular(popularMovies);
        setTopRated(topRatedMovies);
        setUpcoming(upcomingMovies);

        setIsLoading(false);

        console.log({nowPlaying,popular,topRated,upcoming});

    }

    return {
        isLoading,
        nowPlaying,
        popular,
        topRated,
        upcoming
    };
}