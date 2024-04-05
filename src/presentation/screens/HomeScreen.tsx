import { View, RefreshControl, ScrollView } from "react-native";
import { useMovies } from "../hooks/useMovies"
import { PosterCarousel } from '../components/movies/PosterCarousel';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HorizontalCarousel } from "../components/movies/HorizontalCarousel";
import { useNowPlaying } from "../hooks/useNowPlaying";
import { useCallback, useState } from "react";
import { Loader } from "../components/movies/Loader";

export const HomeScreen = () => {

    const {top} = useSafeAreaInsets();
    const {topRated, upcoming, popular} = useMovies();
    const{isLoading, movies, loadMore, refetch} = useNowPlaying();
    const [refreshing, setRefreshing] = useState(false);


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, []);

    if (isLoading) {
        return (
            <Loader text="movies"/>
        )
    }

    return(
        <ScrollView 
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <View style={{marginTop: top + 20, marginBottom: 30}}>
    
                    <PosterCarousel
                    movies={movies}
                    loadMore={loadMore}
                    />

                    {/* Populares */}
                    <HorizontalCarousel 
                    movies={popular} 
                    title="Populares" 
                    />

                    {/* Top Rated */}
                    <HorizontalCarousel 
                    movies={topRated} 
                    title="Mejor calificadas" />

                    {/* Próximamente */}
                    <HorizontalCarousel 
                    movies={upcoming} 
                    title="Próximamente" />   

                </View>
        </ScrollView>
    )
}