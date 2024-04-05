import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface Props {
    text: string
}


export const Loader = ({text}: Props) => {
    return (
        <View style={styles.indicatorWrapper}>
          <ActivityIndicator size="large"/>
          <Text style={styles.indicatorText}>Loading {text}...</Text>
        </View>
      );
}

const styles = StyleSheet.create({
    indicatorWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      indicatorText: {
        fontSize: 18,
        marginTop: 12,
      }
});