import { Movie } from "../../core/entities/movie.entity";
import { Result } from "../interfaces/movie-db.responses";
import { MovieMapper } from "./movie.mapper";


export class MovieListMapper {

    static fromMovieDBResultListToEntity( results: Result[]): Movie[] {
        const movies: Movie[] = results.map(result => MovieMapper.fromMovieDBResultToEntity(result));
        return movies;
    }
}