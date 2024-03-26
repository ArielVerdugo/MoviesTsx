import { FlatList, View } from "react-native"
import { Movie } from '../../../core/entities/movie.entity';
import { MoviePoster } from "./MoviePoster";

interface Props {
    movies?: Movie[];
    height?: number;
    loadMore: () => void;
}

export const PosterCarousel = ({height = 440, movies, loadMore}: Props) => {

    return (
        /*<View style={{height}}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {
                    movies.map( movie => <MoviePoster key={movie.id} movie={movie} ></MoviePoster>)
                }
                </ScrollView>
        </View>*/

        <View style={{height}}>
            <FlatList
                horizontal={true}
                onEndReached={loadMore}
                data={movies}
                renderItem = {({item}) => <MoviePoster key={item.id} movie={item} />}
                style={
                    { 
                        marginTop: 10,
                        marginLeft: 35,
                    }
                }
            />   
        </View> 
    )
}

