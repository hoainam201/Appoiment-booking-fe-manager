import React, {useEffect} from 'react';
import 'leaflet/dist/leaflet.css';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {LocationMarker} from "./LocationMaker";
import {iconPerson} from "./icon";
import {Fly} from "./Fly";

const LeafletMap = ({lat, lng}) => {
    useEffect(()=>{
        console.log(lat, lng);
    },[lat, lng]);

    return (
        <MapContainer center={[lat, lng]} zoom={15} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lng]} draggable={false} icon={ iconPerson }/>
            <Fly lat={lat} lng={lng}/>
        </MapContainer>
    )
}

export default LeafletMap;