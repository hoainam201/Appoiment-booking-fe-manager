import {useState} from "react";
import {Marker, Popup, useMapEvents} from "react-leaflet";
import {iconPerson} from "./icon";

export function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    return position === null ? null : (
        <Marker position={position} >
            <Popup>Bạn đang ở đây</Popup>
        </Marker>
    )
}