import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

export default function Map() {
  return (
    <MapView 
      style={styles.map}
    />
  )
}

const styles = StyleSheet.create({
  map:{
    height: '100%',
    width: '100%',
  },
})