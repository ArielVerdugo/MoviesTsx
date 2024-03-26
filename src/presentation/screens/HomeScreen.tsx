import { ScrollView, View } from "react-native";
import { useMovies } from "../hooks/useMovies"
import { PosterCarousel } from '../components/movies/PosterCarousel';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HorizontalCarousel } from "../components/movies/HorizontalCarousel";
import { useNowPlaying } from "../hooks/useNowPlaying";

export const HomeScreen = () => {

    const {top} = useSafeAreaInsets();
    const {topRated, upcoming, popular} = useMovies();
    const{ movies, loadMore } = useNowPlaying();

    return(
        <ScrollView>
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