import { RefreshControl, ScrollView, View } from "react-native";
import { useMovies } from "../hooks/useMovies"
import { PosterCarousel } from '../components/movies/PosterCarousel';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HorizontalCarousel } from "../components/movies/HorizontalCarousel";
import { useNowPlaying } from "../hooks/useNowPlaying";
import { useCallback, useState } from "react";

export const HomeScreen = () => {

    const {top} = useSafeAreaInsets();
    const {topRated, upcoming, popular} = useMovies();
    const{movies, loadMore, refetch} = useNowPlaying();
    const [refreshing, setRefreshing] = useState(false);


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, []);

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
                    <HorizontalCarousel movies={topRated} title="Mejor calificadas" />

                    {/* Próximamente */}
                    <HorizontalCarousel movies={upcoming} title="Próximamente" />
                </View>
        </ScrollView>
    )
}