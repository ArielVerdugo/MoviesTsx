import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { NowPlayingResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { NowPlayingMapper } from "../../../infrastructure/mappers/nowPlayingMapper";
import { Movie } from "../../entities/movie.entity";
import { NowPlaying } from "../../entities/nowPlaying.entity";


interface Options {
    page?: number,
    limit?: number
}

export const moviesNowPlayingUseCase = async (fetcher: HttpAdapter): Promise<Movie[]> => {
    try{
        const nowPlaying = await fetcher.get<NowPlayingResponse>('/now_playing');

        // nowPlaying.results.map( MovieMapper.fromMovieDBResultToEntity );
        return nowPlaying.results.map( result => MovieMapper.fromMovieDBResultToEntity(result) );

    } catch (error) {
        console.log(error);
        throw new Error('Error fetching');
    }

}

export const moviesNowPlayingPageUseCase = async (fetcher: HttpAdapter, options?: Options): Promise<NowPlaying> => {
    try{
        const nowPlaying = await fetcher.get<NowPlayingResponse>('/now_playing', {
            params: {
                page: options?.page ?? 1
            }
        });

        //console.log(NowPlayingMapper.fromMovieDBResultToEntity(nowPlaying));

        console.log(NowPlayingMapper.fromMovieDBResultToEntity(nowPlaying));

        return NowPlayingMapper.fromMovieDBResultToEntity(nowPlaying);

    } catch (error) {
        console.log(error);
        throw new Error('Error fetching');
    }

}