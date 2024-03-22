import { Pressable, ScrollView, Text, View } from "react-native"
import { Movie } from "../../../core/entities/movie.entity"
import { MoviePoster } from "./MoviePoster";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../routes/StackNavigator";

interface Props {
    movies: Movie[];
    height?: number;
}

export const PosterCarousel = ({height = 440, movies}: Props) => {

    return (
        <View style={{height}}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {
                    movies.map( movie => <MoviePoster key={movie.id} movie={movie} ></MoviePoster>)
                }
                </ScrollView>
        </View>
    )
}

