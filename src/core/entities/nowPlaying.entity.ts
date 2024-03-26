import { Result } from "../../infrastructure/interfaces/movie-db.responses";
import { Movie } from "./movie.entity";
import { MovieList } from "./movieList.entity";

export interface NowPlaying {
    page:         number;
    results:      Movie[];
    totalPages:   number;
    totalResults: number;
}