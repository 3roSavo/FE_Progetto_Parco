import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import logo from "../assets/IMG_2670.PNG"

function MapComponent() {

    const customIcon = new L.Icon({
        iconUrl: logo, // URL dell'icona personalizzata
        iconSize: [80, 60], // Dimensioni dell'icona in pixel
        iconAnchor: [16, 32], // Posizione dell'icona relativa al punto
    });

    return (
        <MapContainer className='maps-box' center={[45.311693897633354, 11.697940649618522]} zoom={12}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[45.311693897633354, 11.697940649618522]} icon={customIcon}>
                <Popup>
                    Parco regionale dei Colli Euganei
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default MapComponent;
