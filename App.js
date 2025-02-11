import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import Map from './screens/Map';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location'
import { PaperProvider } from 'react-native-paper';
import MainAppBar from './components/MainAppBar';
import { SafeAreaView } from 'react-native';

const settings = {
  backgroundColor: '#00a484'
}

const icons = {
  location_not_known: 'crosshairs',
  location_searching: 'crosshairs-question',
  location_found: 'crosshairs-gps'
}

export default function App() {
  //Variable for icon
  const [icon, setIcon] = useState(icons.location_not_known)
  //Variable for location
  const [location, setLocation] = useState({
    latitude: 65.0800,
    longitude: 25.4800,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  //Ask for permission for location
  const getUserPosition = async () => {
    setIcon(icons.location_searching)
    let {status} = await Location.requestForegroundPermissionsAsync()

    try {
      if (status !== 'granted') {
        console.log('Geolocation failed')
        return
      }
      const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
      setLocation({...location, "latitude": position.coords.latitude, "longitude": position.coords.longitude})
      setIcon(icons.location_found)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    (async() => {
      getUserPosition()
    })()
  }, [])

  return (
    <PaperProvider>
      <MainAppBar 
        title="Map"
        backgroundColor={settings.backgroundColor}
        icon={icon}
        getUserPosition={getUserPosition}
      />
      <SafeAreaView style={styles.container}>
        <Map location={location} />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0
  },
  
});
