import { useInfiniteQuery } from "@tanstack/react-query";
import { movieDBFetcher } from "../../config/adapters/moviesDB.adapter";

import * as UseCases from "../../core/use-cases/index";
import { Movie } from "../../core/entities/movie.entity";

export const useNowPlaying = () => {

    let movies: Movie[] | undefined;
   
    const fetchNowPlaying = async ({ pageParam = 1 }) => {
        return UseCases.moviesNowPlayingPaginatedUseCase(movieDBFetcher, {page: pageParam})
    }
  
    const {
        isLoading, data, hasNextPage, fetchNextPage
      } = useInfiniteQuery({
        queryKey: ['nowPlaying'],
        queryFn: fetchNowPlaying,
        initialPageParam: 1,
        getNextPageParam(lastPage) {
            if(lastPage.page === lastPage.totalPages){
                return;
            }
            return lastPage.page + 1;
        },
    })
    

    if (!isLoading) {
        movies = data?.pages.flatMap((page) => page.results);
    }
    
    const loadMore = () => {
        if (hasNextPage) {
          fetchNextPage();
        }
    };

    return {
        movies,
        loadMore,
    };
}