import { Movie } from "../../core/entities/movie.entity";
import { Result } from "../interfaces/movie-db.responses";
import { MovieMapper } from "./movie.mapper";


export class MovieListMapper {

    static fromDBListMovieToEntity( results: Result[]): Movie[] {
        return results.map(result => MovieMapper.fromDBMovieToEntity(result));
    }
}