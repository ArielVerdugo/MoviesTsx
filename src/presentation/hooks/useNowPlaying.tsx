import { useInfiniteQuery } from "@tanstack/react-query";
import { movieDBFetcher } from "../../config/adapters/moviesDB.adapter";

import * as UseCases from "../../core/use-cases/index";
import { Movie } from "../../core/entities/movie.entity";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export const useNowPlaying = () => {

    let movies: Movie[] | undefined;
   
    const fetchNowPlaying = async ({ pageParam = 1 }) => {
        console.log('se llamo');
        return UseCases.moviesNowPlayingPaginatedUseCase(movieDBFetcher, {page: pageParam})
    }
  
    const {
        isLoading, data, hasNextPage, fetchNextPage, refetch
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

    // refetch when windos focus
    useFocusEffect(
        useCallback(() => {
          refetch();
        }, [])
    );
      
    

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

function useAppState() {
    throw new Error("Function not implemented.");
}
