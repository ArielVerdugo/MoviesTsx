import { useInfiniteQuery } from "@tanstack/react-query";
import { movieDBFetcher } from "../../config/adapters/moviesDB.adapter";

import * as UseCases from "../../core/use-cases/index";

export const useNowPlaying = () => {

    let movies;
   
    const fetchProjects = async ({ pageParam = 1 }) => {
        return UseCases.moviesNowPlayingPageUseCase(movieDBFetcher, {page: pageParam})
    }
  
    const {
        isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage
      } = useInfiniteQuery({
        queryKey: ['nowPlaying'],
        queryFn: fetchProjects,
        initialPageParam: 1,
        getNextPageParam(lastPage) {
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