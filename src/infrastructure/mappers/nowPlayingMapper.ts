import { NowPlaying } from "../../core/entities/nowPlaying.entity";
import {  NowPlayingResponse } from '../interfaces/movie-db.responses';
import { MovieMapper } from "./movie.mapper";
import { MovieListMapper } from "./movieList.mapper";


export class NowPlayingMapper {

    static fromMovieDBResultToEntity( nowPlayingResponse: NowPlayingResponse): NowPlaying {
        return {
            page: nowPlayingResponse.page,
            results:  MovieListMapper.fromMovieDBResultListToEntity(nowPlayingResponse.results) ,
            totalPages: nowPlayingResponse.total_pages,
            totalResults: nowPlayingResponse.total_results,
        }
    }
}