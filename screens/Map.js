import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location'

export default function Map(props) {

  const [marker, setMarker] = useState(null)

  //UseEffect
  /*useEffect(() => {
    (async() => {
      getUserPosition()
    })()
  }, [])*/

  //Make a marker
  const showMarker = (e) => {
    const coords = e.nativeEvent.coordinate
    setMarker(coords)
  }

  //Return
  return (
    <MapView 
      style={styles.map}
      region={props.location}
      mapType="satellite"
      onLongPress={showMarker}
    >
      {marker &&
        <Marker 
          title="My marker" 
          coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
        />
      }
    </MapView>
  )
}

//Stylesheet
const styles = StyleSheet.create({
  map:{
    height: '100%',
    width: '100%',
  },
})