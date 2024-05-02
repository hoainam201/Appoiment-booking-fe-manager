import {useState} from "react";
import {Marker, Popup, useMapEvents} from "react-leaflet";
import {iconPerson} from "./icon";

export function Fly({lat, lng}) {
    const map = useMapEvents({
        click() {
            map.flyTo([lat, lng]);
        }
    });
}