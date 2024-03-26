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
        return nowPlaying.results.map( result => MovieMapper.fromDBMovieToEntity(result) );

    } catch (error) {
        console.log(error);
        throw new Error('Error fetching');
    }

}

export const moviesNowPlayingPaginatedUseCase = async (fetcher: HttpAdapter, options?: Options): Promise<NowPlaying> => {
    try{
        const nowPlaying = await fetcher.get<NowPlayingResponse>('/now_playing', {
            params: {
                page: options?.page ?? 1
            }
        });

        return NowPlayingMapper.fromDBNowPlayingToEntity(nowPlaying);

    } catch (error) {
        console.log(error);
        throw new Error('Error fetching');
    }

}