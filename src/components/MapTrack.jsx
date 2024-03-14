import React, { useEffect, useState } from "react";
import L from 'leaflet';
import 'leaflet-gpx'; // Importa Leaflet-GPX
import logo from "../assets/IMG_2670.PNG";
import 'leaflet/dist/leaflet.css'; // Assicurati di importare i file CSS di Leaflet
import markIcon from "../assets/map_marker_base-512.webp"
import opacity00 from "../assets/opacity-0.0.png"
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MapTrack = ({ file }) => {

    const currentHike = useSelector(state => state.currentHike)

    const [mapExist, setMapExist] = useState(false);

    const [currentMap, setCurrentMap] = useState(null)

    function toggleFullScreen() {
        const mapContainer = document.getElementById('map');

        if (mapContainer.requestFullscreen) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                mapContainer.requestFullscreen();
                setTimeout(() => { // ricalcolo la dimensione della mappa per visualizzarla correttamente a schermo
                    currentMap.invalidateSize();
                }, 500);
            }
        }
    }





    useEffect(() => {
        if (mapExist === false) {

            const map = L.map('map').setView([45.311693897633354, 11.697940649618522], 12);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

            const customIcon = new L.Icon({
                iconUrl: logo,
                iconSize: [80, 60],
                iconAnchor: [16, 32],
            });

            L.marker([45.311693897633354, 11.697940649618522], { icon: customIcon }).addTo(map)
                .bindPopup("Parco regionale dei Colli Euganei");

            const gpxFile = file;

            // Carica il file GPX e gestisci l'evento 'loaded'
            new L.GPX(gpxFile, {
                async: true,
                marker_options: {
                    //iconSize: [20, 20],
                    //iconAnchor: [0, 0],
                    shadowAnchor: [15, 30],
                    shadowSize: [30, 30],
                    startIconUrl: "",
                    endIconUrl: "",
                    shadowUrl: markIcon,
                    wptIconUrls: {
                        '': opacity00,
                        'Geocache Found': "",
                        'Park': ""
                    }
                }
            }).on('loaded', function (e) {
                // Imposta i limiti della mappa per adattarsi al percorso GPX
                map.fitBounds(e.target.getBounds());
                console.log(e.target.get_distance())
                console.log(e.target)

            }).addTo(map);

            setMapExist(true)
            setCurrentMap(map)
        } else {

            setCurrentMap(currentMap.remove())

            const map = L.map('map').setView([45.311693897633354, 11.697940649618522], 12);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

            const customIcon = new L.Icon({
                iconUrl: logo,
                iconSize: [80, 60],
                iconAnchor: [16, 32],
            });

            L.marker([45.311693897633354, 11.697940649618522], { icon: customIcon }).addTo(map)
                .bindPopup("Parco regionale dei Colli Euganei");

            const gpxFile = file;

            // Carica il file GPX e gestisci l'evento 'loaded'
            new L.GPX(gpxFile, {
                async: true,
                marker_options: {
                    //iconSize: [20, 20],
                    //iconAnchor: [0, 0],
                    shadowAnchor: [15, 30],
                    shadowSize: [30, 30],
                    startIconUrl: "",
                    endIconUrl: "",
                    shadowUrl: markIcon,
                    wptIconUrls: {
                        '': opacity00,
                        'Geocache Found': "",
                        'Park': ""
                    }
                }
            }).on('loaded', function (e) {
                // Imposta i limiti della mappa per adattarsi al percorso GPX
                map.fitBounds(e.target.getBounds());
                console.log(e.target.get_distance())
                console.log(e.target)

            }).addTo(map);

            setMapExist(true)
            setCurrentMap(map)


        }


        /*const gpxFile = file;

        // Carica il file GPX e gestisci l'evento 'loaded'
        new L.GPX(gpxFile, {
            async: true,
            marker_options: {
                //iconSize: [20, 20],
                //iconAnchor: [0, 0],
                shadowAnchor: [15, 30],
                shadowSize: [30, 30],
                startIconUrl: "",
                endIconUrl: "",
                shadowUrl: markIcon,
                wptIconUrls: {
                    '': opacity00,
                    'Geocache Found': "",
                    'Park': ""
                }
            }
        }).on('loaded', function (e) {
            // Imposta i limiti della mappa per adattarsi al percorso GPX
            map.fitBounds(e.target.getBounds());
            console.log(e.target.get_distance())
            console.log(e.target)

        }).addTo(map);*/

    }, [currentHike.gpxUrlFile]);

    return (
        <div className="mt-5">

            <h2>Mappa Percorso <Link to={currentHike.gpxUrlFile} className="btn btn-success ms-2 py-1 ">Scarica .gpx</Link></h2>

            <div id="map" className="mt-2 px-0 position-relative rounded-3">
                <Button className="full-screen-map-button py-1"
                    onClick={toggleFullScreen}>Schermo intero</Button>
            </div>
        </div>
    );
};

export default MapTrack;
