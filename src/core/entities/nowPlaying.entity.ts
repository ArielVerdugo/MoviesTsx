import { Movie } from "./movie.entity";

export interface NowPlaying {
    page:         number;
    results:      Movie[];
    totalPages:   number;
    totalResults: number;
}