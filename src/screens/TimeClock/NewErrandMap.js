import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {WebView} from 'react-native-webview';
import * as Location from 'expo-location';

let path = "";
const NewTimeClockErrandMap = () => {
    const [url, setUrl] = useState('https://khiyabun.ir/track');
    const [error, setError] = useState(false);
    const [locationHistory, setLocationHistory] = useState([]);
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const previousLocationRef = useRef({ latitude: null, longitude: null });
    const webViewRef = useRef(null);

    useEffect(() => {
        const watchLocation = async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            // console.log("status",status);
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            const subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 5000,
                    distanceInterval: 2,
                },
                (position) => {
                    const { latitude, longitude, accuracy, speed } = position.coords;
                    // بررسی دقت GPS و تغییر مختصات
                    if (accuracy <= 10 && (
                        latitude !== previousLocationRef.current.latitude ||
                        longitude !== previousLocationRef.current.longitude
                    )) {
                        setLocation({ latitude, longitude });
                        previousLocationRef.current = { latitude, longitude }; // به‌روزرسانی مختصات قبلی

                        setLocationHistory((prev) => [...prev, {latitude, longitude, accuracy, speed}]);
                    }
                }
            );

            return () => {
                subscription.remove();
            };
        };

        watchLocation();
    }, []);

    useEffect(() => {
        if (locationHistory.length > 0) {
            const {latitude, longitude} = locationHistory[locationHistory.length - 1];
            sendMapMatchingRequest(latitude,longitude);
            path += ";";
            sendMessageToWebView();
        }
    }, [locationHistory]);

    const handleMessage = (event) => {
        const data = event.nativeEvent.data;
        console.log("Data received from WebView:", data);
        // حالا می‌توانید داده را در state یا هر جا دیگری ذخیره کنید
    };
    const handleLoadEnd = () => {
        // Optional: You can send an initial message or log when the WebView is loaded
        console.log("WebView has finished loading");
    };
    const sendMessageToWebView = () => {
        const {latitude, longitude,accuracy,speed} = locationHistory[locationHistory.length - 1];
        const message = JSON.stringify({type: 'locationUpdate', latitude, longitude, accuracy,speed});
        if (webViewRef.current) {
            webViewRef.current.postMessage(message);
        }
    };
    const handleReload = () => {
        setError(false);
        setUrl('https://khiyabun.ir/track'); // URL را دوباره تنظیم کنید
    };

    async function sendMapMatchingRequest(lat , long) {
        path += long+","+lat;
        console.log("path",path);
        // let response = await get(`match/v1/walking/${path}?geometries=geojson`, "map");
        console.log("locationHistory.length",locationHistory.length);
        if(locationHistory.length > 0) {
            console.log("im here");
            let response = await fetch(`http://78.109.199.54/match/v1/walking/${path}?geometries=geojson`, {
                method: 'GET',
                headers: {
                    'Api-Key': "service.4c7af31b20c44b16920cce89483caa15",
                }
            });
            console.log(response)
            if (!response.ok) {
                throw new Error(`GET request failed: ${response.status}`);
            }
            response = response.json();
            let points = response.matchings[0].geometry.coordinates;
            console.log(points);
        }
        else {
            path += ";";
        }
        // setData(response.snappedPoints);
    }



    // useEffect(() => {
    //     generateMapHtml(locationHistory);
    // }, [locationHistory]);

    const generateMapHtml = (locations) => {
        const center = locations.length > 0 ? locations[locations.length - 1] : {latitude: 0, longitude: 0};
        const polyline = locations.map((loc) => [loc.latitude, loc.longitude]);
        const polylineString = JSON.stringify(polyline);

        // Define a static end location for routing (you can change this)
        const endLocation = {latitude: 37.7749, longitude: -122.4194}; // Example: San Francisco

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

    return (
        <View style={styles.container}>
            {error ? (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Button title="Reload" onPress={handleReload}/>
                </View>
            ) : (
                <WebView
                    ref={webViewRef}
                    originWhitelist={['*']}
                    cacheEnabled={false}
                    source={{uri: url}}
                    onHttpError={(syntheticEvent) => {
                        console.log(syntheticEvent);
                        const { nativeEvent } = syntheticEvent;
                        console.log('HTTP error: ', nativeEvent);
                    }}
                    onError={(syntheticEvent) => {
                        setError(true)
                        const { nativeEvent } = syntheticEvent;
                        console.log('WebView error: ', nativeEvent);
                    }}
                    style={{flex: 1}}
                    onMessage={handleMessage}
                    javaScriptEnabled={true}
                    onLoadEnd={handleLoadEnd} // Optional: Log when loading ends
                />
            )}

            {/*<WebView*/}
            {/*    ref={webViewRef}*/}
            {/*    originWhitelist={['*']}*/}
            {/*    source={{ html: mapHtml }}*/}
            {/*    style={{ flex: 1 }}*/}
            {/*    onMessage={(event) => {*/}
            {/*        console.log(event.nativeEvent.data);*/}
            {/*    }}*/}
            {/*    javaScriptEnabled={true}*/}
            {/*/>*/}
            {/*<Button title="Send Message" onPress={sendMessageToWebView} />*/}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default NewTimeClockErrandMap;
