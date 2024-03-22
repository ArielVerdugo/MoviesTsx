import { createStackNavigator } from "@react-navigation/stack";
import { Movie } from "../../core/entities/movie.entity"
import { HomeScreen } from "../screens/HomeScreen";
import { DetailScreen } from "../screens/DetailScreen";

export type RootStackParams = {
    Home: undefined,
    Details: Movie
}

const Stack = createStackNavigator<RootStackParams>();


export const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={
          {
            headerShown: true,
            headerStyle: {
              elevation: 0,
              shadowColor: 'transparent'
            }
          }
        }>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailScreen} />
        </Stack.Navigator>
      );

}