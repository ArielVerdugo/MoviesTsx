import { NowPlaying } from "../../core/entities/nowPlaying.entity";
import {  NowPlayingResponse } from '../interfaces/movie-db.responses';
import { MovieListMapper } from "./movieList.mapper";


export class NowPlayingMapper {

    static fromDBNowPlayingToEntity( nowPlayingResponse: NowPlayingResponse): NowPlaying {
        return {
            page: nowPlayingResponse.page,
            results:  MovieListMapper.fromDBListMovieToEntity(nowPlayingResponse.results) ,
            totalPages: nowPlayingResponse.total_pages,
            totalResults: nowPlayingResponse.total_results,
        }
    }
}