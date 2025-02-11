import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location'

export default function Map(props) {

  const [markers, setMarkers] = useState([])

  //UseEffect
  /*useEffect(() => {
    (async() => {
      getUserPosition()
    })()
  }, [])*/

  //Make a marker
  const showMarker = (e) => {
    const coords = e.nativeEvent.coordinate
    var newMarkers = markers.slice()
    newMarkers.push(coords)
    setMarkers(newMarkers)
  }

  //Return
  return (
    <MapView 
      style={styles.map}
      region={props.location}
      mapType="satellite"
      onLongPress={showMarker}
    >
      {
        markers.map((marker, index) => (
          <Marker 
            key={index}
            title="marker"
            coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
          />
        ))
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