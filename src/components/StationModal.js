import React from 'react';
import L from 'leaflet';
import { useLocationStore } from '@/store/locationStore';
import { auth, directionText, cityCodeMap, statusMap } from "@/const";
import userMarker from "@/images/user-marker-point.svg";
import icClose from "@/images/ic-close.svg";
import mapMarker from "@/images/ic-map-marker-main.svg";
import {commonAxios} from "@/common";
import {ItemTitle, Overlay, ModalWrapper, Modal, MapContainer, IconBtn,
  SearchWrapper, SearchCol1, SearchCol2, StopsStripedList, StopStatus, BusPlate} from '@/style';

let map;

const StationModal = ({data, close, showUserPopup}) => {
  const ref = React.useRef(null);
  const modalRef = React.useRef(null);
  const {locationData} = useLocationStore();
  const [routeData, setRouteData] = React.useState([]);

  const getRouteData = () => {
    const city = cityCodeMap[data.LocationCityCode];

    Promise.all([
      commonAxios({
        url: `/v2/Bus/EstimatedTimeOfArrival/City/${city}/PassThrough/Station/${data.StationID}?`,
      }),
      commonAxios({
        url: `/v2/Bus/RealTimeNearStop/City/${city}/PassThrough/Station/${data.StationID}?`,
      })
    ]).then((results) => {
      const [routes, realBusData] = results;
      if (realBusData.length > 0) {
        realBusData.forEach((bus) => {
          const routeIndex = routes.findIndex((n) => n.Direction === bus.Direction && n.SubRouteUID === bus.SubRouteUID);
          if (routeIndex > -1) {
            routes[routeIndex].BusPlate = bus.PlateNumb;
          }
        });
      }
      setRouteData(routes.map((n) => {
        const estimateTime = n.EstimateTime ? parseInt(n.EstimateTime/60) : 0;
        if (!n.StopStatus || n.BusPlate) {
          return {...n, status: `${estimateTime > 1 ? `約${estimateTime}分` : '進站中'}`}
        }
        return {...n, status: statusMap[n.StopStatus]};
      }));
    });
  };
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
      const current = L.marker([locationData.lat, locationData.lng], {
        icon: L.icon({
          iconUrl: userMarker,
          iconAnchor: [7, 8],
          popupAnchor: [0, -6]
        })
      }).addTo(mymap);
      if (showUserPopup) {
        current.bindPopup('目前位置').openPopup();
      }
    }
  
    return mymap;
  };
  React.useEffect(() => {
    map = initMap(data.StationPosition, ref.current);
    getRouteData();
    return () => {
      map.remove();
    }
  }, []);
  return (
    <Overlay onClick={close}>
      <ModalWrapper style={{alignItems: modalRef.current?.offsetHeight < window.innerHeight ? 'center' : 'baseline'}}>
        <Modal ref={modalRef} onClick={(e) => e.stopPropagation()}>
          <IconBtn onClick={close} type="button"><img src={icClose} alt="x" width="20" /></IconBtn>
          <SearchWrapper style={{height: 'auto', minHeight: 'auto'}}>
            <SearchCol1>
              <ItemTitle>{data.StationName.Zh_tw} - {directionText[data.Bearing]}</ItemTitle>
              <small style={{marginBottom: 12}}>{data.StationAddress}</small>
              <StopsStripedList>
                {routeData.map((route) => (
                  <li key={route.RouteUID}>
                    <span>{route.RouteName.Zh_tw}</span>
                    <StopStatus>{route.status}</StopStatus>
                    {route.BusPlate && <BusPlate>{route.BusPlate}</BusPlate>}
                  </li>
                ))}
              </StopsStripedList>
            </SearchCol1>
            <SearchCol2>
              <MapContainer ref={ref} />
            </SearchCol2>
          </SearchWrapper>
        </Modal>
      </ModalWrapper>
    </Overlay>
  );
};

export default StationModal;