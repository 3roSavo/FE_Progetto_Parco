import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect } from 'react';

const GoogleMapsComponent = () => {

    const containerStyle = {
        width: '400px',
        height: '400px'
    };

    const center = {
        lat: 45.311693897633354,
        lng: 11.697940649618522
    };

    const markers = [
        { lat: 45.32169, lng: 11.697940649618522, title: 'Marker 1' },
        { lat: 45.33069, lng: 11.696940649618522, title: 'Marker 2' },
        // Aggiungi altri marker se necessario
    ];

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAjjekheFQJg2N6U8_9G-DPEQJUxmU3CN8"
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={11}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    title={marker.title}
                />
            ))}
            { /* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    ) : <></>

};

export default GoogleMapsComponent;
