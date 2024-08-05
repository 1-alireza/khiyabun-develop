import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';

const NewTimeClockErrandMap = () => {
    const [locationHistory, setLocationHistory] = useState([]);
    const [mapHtml, setMapHtml] = useState('');
    const webViewRef = useRef(null);

    useEffect(() => {
        const watchLocation = async () => {
            // Request permission to access the device location
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            // Watch the position
            const subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 5000, // minimum interval between updates
                    distanceInterval: 0.2, // minimum distance between updates in meters
                },
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocationHistory((prev) => [...prev, { latitude, longitude }]);
                }
            );

            return () => {
                subscription.remove(); // Cleanup subscription on unmount
            };
        };

        watchLocation();
    }, []);

    useEffect(() => {
        generateMapHtml(locationHistory);
    }, [locationHistory]);

    const generateMapHtml = (locations) => {
        const center = locations.length > 0 ? locations[locations.length - 1] : { latitude: 0, longitude: 0 };
        const polyline = locations.map((loc) => [loc.latitude, loc.longitude]);
        const polylineString = JSON.stringify(polyline);

        // Define a static end location for routing (you can change this)
        const endLocation = { latitude: 37.7749, longitude: -122.4194 }; // Example: San Francisco

        const html = `  
      <!DOCTYPE html>  
      <html>  
      <head>  
        <title>Map</title>  
        <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">  
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />  
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>  
        <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.css" />  
        <script src="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.js"></script>  
        <style>  
          #map {  
            height: 100vh;  
            width: 100%;  
          }  
        </style>  
      </head>  
      <body>  
        <div id="map"></div>  
        <script>  
          var map = L.map('map').setView([${center.latitude}, ${center.longitude}], 15);  
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {  
            maxZoom: 19,  
            attribution: '© OpenStreetMap'  
          }).addTo(map);  
          
          var polyline = L.polyline(${polylineString}, { color: 'red' }).addTo(map);  
          map.fitBounds(polyline.getBounds());  

           // Create a circle around the user's location  
           var circle = L.circle([${center.latitude}, ${center.longitude}], {  
                    color: 'blue',         // Circle color  
                    fillColor: '#30f',    // Fill color  
                    fillOpacity: 0.5,     // Fill opacity  
                    radius: 50            // Circle radius in meters  
           }).addTo(map);  


          var userMarker = L.marker([${center.latitude}, ${center.longitude}]).addTo(map);  

          // Initialize routing control  
          var routingControl = L.Routing.control({  
              waypoints: [  
                  L.latLng(${center.latitude}, ${center.longitude}),  
                  L.latLng(${endLocation.latitude}, ${endLocation.longitude})  
              ],  
              routeWhileDragging: true,  
              geocoder: L.Control.Geocoder.nominatim()  
          }).addTo(map);  

          function updateUserLocation(lat, lon) {  
            userMarker.setLatLng([lat, lon]);  
            map.setView([lat, lon]);  
            routingControl.spliceWaypoints(0, 1, L.latLng(lat, lon)); // Update the starting point of the route  
          }  

          window.ReactNativeWebView.onMessage = function(event) {  
            const data = JSON.parse(event.data);  
            if (data.type === 'locationUpdate') {  
              updateUserLocation(data.latitude, data.longitude);  
            }  
          };  
        </script>  
      </body>  
      </html>  
    `;

        setMapHtml(html);
    };

    useEffect(() => {
        if (locationHistory.length > 0) {
            const { latitude, longitude } = locationHistory[locationHistory.length - 1];
            const message = JSON.stringify({ type: 'locationUpdate', latitude, longitude });
            webViewRef.current?.postMessage(message);
        }
    }, [locationHistory]);

    return (
        <View style={styles.container}>
            <WebView
                ref={webViewRef}
                originWhitelist={['*']}
                source={{ html: mapHtml }}
                style={{ flex: 1 }}
                onMessage={(event) => {
                    console.log(event.nativeEvent.data);
                }}
                javaScriptEnabled={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default NewTimeClockErrandMap;