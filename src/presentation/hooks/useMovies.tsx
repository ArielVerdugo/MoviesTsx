import { useEffect, useState } from "react"
import { Movie } from "../../core/entities/movie.entity";
import * as UseCases from "../../core/use-cases/index";
import { movieDBFetcher } from "../../config/adapters/moviesDB.adapter";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useMovies = () => {

    //const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [popular, setPopular] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);

    useEffect( () => {
        initialLoad();
    }, [])

    const initialLoad = async() => {

        //const nowPlayingPromise = await UseCases.moviesNowPlayingUseCase(movieDBFetcher);
        const popularPromise = await UseCases.moviesPopularUseCase(movieDBFetcher);
        const topRatedPromise = await UseCases.moviesTopRatedUseCase(movieDBFetcher);
        const upcomingdPromise = await UseCases.moviesUpcomingUseCase(movieDBFetcher);


        const [
            popularMovies,
            topRatedMovies,
        ] = await Promise.all([
            popularPromise,topRatedPromise,upcomingdPromise
        ]);

        //setNowPlaying(nowPlayingMovies);
        setPopular(popularMovies);
        setTopRated(topRatedMovies);
        setUpcoming(upcoming);


        //console.log({upcoming,popular,topRated});

    }

    return {
        upcoming,
        popular,
        topRated,
    };
}