import React from 'react';
import L from 'leaflet';
import { useLocationStore } from '@/store/locationStore';
import { auth, directionText } from "@/const";
import userMarker from "@/images/user-marker.svg";
import mapMarker from "@/images/ic-map-marker-main.svg";
import {ItemTitle, Overlay, ModalWrapper, Modal, MapContainer} from '@/style';

let map;

const StationModal = ({data, close}) => {
  const ref = React.useRef();
  const {locationData} = useLocationStore();
  const initMap = (config, ele) => {
    const { PositionLat: lat, PositionLon: lng } = config;
    const mymap = L.map(ele).setView([lat, lng], 15);
  
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'allychen/ckw5waap41dl514o4rcpa1nsn',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: auth.mapBoxToken
    }).addTo(mymap);

    L.marker([lat, lng], {
      icon: L.icon({
        iconUrl: mapMarker,
        iconAnchor: [10, 23],
        popupAnchor: [0, -23]
      })
    }).addTo(mymap);
    // L.marker([lat, lng]).addTo(mymap);
    if (locationData) {
      L.marker([locationData.lat, locationData.lng], {
        icon: L.icon({
          iconUrl: userMarker,
          iconAnchor: [15, 34],
          popupAnchor: [0, -34]
        })
      }).addTo(mymap);
    }
  
    return mymap;
  };
  React.useEffect(() => {
    map = initMap(data.StationPosition, ref.current);
    return () => {
      map.remove();
    }
  }, []);
  return (
    <Overlay onClick={close}>
      <ModalWrapper>
        <Modal onClick={(e) => e.stopPropagation()}>
          <ItemTitle>{data.StationName.Zh_tw} - {directionText[data.Bearing]}</ItemTitle>
          行經路線：{data.Stops.map((s) => s.RouteName.Zh_tw).join(', ')}
          <MapContainer ref={ref} />
        </Modal>
      </ModalWrapper>
    </Overlay>
  );
};

export default StationModal;