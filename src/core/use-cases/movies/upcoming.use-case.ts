import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MoviesDbResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";

export const moviesUpcomingUseCase = async (fetcher: HttpAdapter): Promise<Movie[]> => {
    try{
        const upcoming = await fetcher.get<MoviesDbResponse>('/upcoming');

        return upcoming.results.map( result => MovieMapper.fromMovieDBResultToEntity(result) );

    } catch (error) {
        console.log(error);
        throw new Error('Error fetching');
    }
}