import L from 'leaflet';
import hi from '../../assets/images/hospital-location.svg';

const iconPerson = new L.Icon({
        iconUrl: hi,
        iconRetinaUrl: hi,
        iconAnchor: null,
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(40, 40),
        // className: 'leaflet-div-icon'
});

export { iconPerson };