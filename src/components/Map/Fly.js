import {useEffect, useState} from "react";
import {Marker, Popup, useMapEvents} from "react-leaflet";
import {iconPerson} from "./icon";

export function Fly({lat, lng}) {
    const map = useMapEvents({
        click() {
            map.flyTo([lat, lng]);
        },
    });
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng]); // 13 là mức zoom, bạn có thể điều chỉnh
    }
  }, [lat, lng]);
}