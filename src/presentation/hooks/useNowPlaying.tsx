import { useInfiniteQuery } from "@tanstack/react-query";
import { movieDBFetcher } from "../../config/adapters/moviesDB.adapter";

import * as UseCases from "../../core/use-cases/index";
import { Movie } from "../../core/entities/movie.entity";
import { useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import NetInfo from '@react-native-community/netinfo';
import { Alert } from "react-native";
import RNRestart from "react-native-restart";

export const useNowPlaying = () => {

    let movies: Movie[] | undefined;
   
    const fetchNowPlaying = async ({ pageParam = 1 }) => {
        console.log('llamo al serivico fetch');
        return UseCases.moviesNowPlayingPaginatedUseCase(movieDBFetcher, {page: pageParam})
    }
  
    const {
        isLoading, isError, isSuccess, data, error, hasNextPage, fetchNextPage, refetch
      } = useInfiniteQuery({
        queryKey: ['nowPlaying'],
        queryFn: fetchNowPlaying,
        initialPageParam: 1,
        enabled: false,
        getNextPageParam(lastPage) {
            if(lastPage.page === lastPage.totalPages){
                return;
            }
            return lastPage.page + 1;
        },
    })

    /*useEffect(() => {
        unsubscribe();
    })

    const unsubscribe = NetInfo.addEventListener( (state) => {
        if(state.isConnected === false) {
            Alert.alert("No internet", "Reconnect", [
                {
                    text: "Reload app", 
                    onPress: () => refetch()
                }
        ])
        } else if (state.isConnected === true){
            console.log("connected");
        }
    });*/

    // refetch when windos focus
    useFocusEffect(
        useCallback(() => {
            console.log('entro aca')
          refetch();
        }, [])
    );
      
    if (isError){
        //console.log(error.message)
    }
    

    if (!isLoading) {
        movies = data?.pages.flatMap((page) => page.results);
    }
    
    const loadMore = () => {
        if (hasNextPage) {
          fetchNextPage();
        }
    };

    return {
        isError,
        isSuccess,
        movies,
        loadMore,
        refetch
    };
}
