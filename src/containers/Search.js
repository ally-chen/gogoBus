import React from 'react';
import L from 'leaflet';
import parseWKT from 'wellknown';
import { useParams, useNavigate } from 'react-router';
import icPoint from '@/images/ic-point.svg';
import icMapMarker from '@/images/ic-map-marker.svg';
import QuickSearch from '@/components/QuickSearch';
import SearchSelect from '@/components/SearchSelect';
import Empty from "@/components/Empty";
import {PageTitle, TitleSplit, TitleWithSearch, Board, SecondTitle, RouteMap,
  SearchWrapper, SearchCol1, SearchCol2, ClockText, TabList, StopsStripedList, StopStatus, BusPlate, SearchBtn} from '@/style';
import {commonAxios, useIsMobile} from '@/common';
import {auth, colors, cities} from '@/const';
import moment from 'moment';

const statusMap = {0:'正常',1:'尚未發車',2:'交管不停靠',3:'末班車已過',4:'今日未營運'};

L.NumberedIcon = L.Icon.extend({
	options: {
    number: '',
    className: 'icon-number',
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
	},

	createIcon: function () {
		var div = document.createElement('div');
		div.innerHTML = this.options['number'] || '';
		this._setIconStyles(div, 'icon');
		return div;
	},
});

let map;

const initMap = (ele, wkt, stops = []) => {
  const lineData = L.GeoJSON.coordsToLatLngs(parseWKT(wkt).coordinates);
  const l = L.polyline(lineData, {color: colors.light});
  const bounds = l.getBounds();
  const center = bounds.getCenter();
  const mymap = L.map(ele, {zoomControl: false}).setView([center.lat, center.lng], 15);
  const layerGroup = L.layerGroup().addTo(mymap);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'allychen/ckw5waap41dl514o4rcpa1nsn',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: auth.mapBoxToken
  }).addTo(mymap);
  l.addTo(mymap);

  stops.forEach((s, i) => {
    const { PositionLat, PositionLon } = s.StopPosition;
    const marker = L.marker([PositionLat, PositionLon], {
      icon: new L.NumberedIcon({number: s.StopSequence})
    }).addTo(layerGroup);
    marker.bindPopup(s.StopName.Zh_tw);
  });

  mymap.fitBounds(bounds);
  return mymap;
};

const Search = () => {
  const ref = React.useRef();
  const navigate = useNavigate();
  const {city: urlCity, route: urlRoute} = useParams();
  const [clock, setClock] = React.useState('');
  const [mapInitialized, setMapInitialized] = React.useState(false);
  const [filterConfig, setFilterConfig] = React.useState(null);
  const [currentRoute, setCurrentRoute] = React.useState(null);
  const [routeOptions, setRouteOptions] = React.useState([]);
  const [stopsList, setStopsList] = React.useState([]);
  const [activeList, setActiveList] = React.useState(0);
  const [routeShape, setRouteShape] = React.useState('');
  const isMobile = useIsMobile();

  const getStops = (city, route) => {
    Promise.all([
      commonAxios({
        url: `/v2/Bus/Route/City/${city}?$filter=RouteUID eq '${route}'`,
      }),
      commonAxios({
        url: `/v2/Bus/StopOfRoute/City/${city}?$filter=RouteUID eq '${route}'`,
      }),
      commonAxios({
        url: `/v2/Bus/RealTimeByFrequency/City/${city}?$filter=RouteUID eq '${route}'`,
      }),
      commonAxios({
        url: `/v2/Bus/RealTimeNearStop/City/${city}?$filter=RouteUID eq '${route}'`,
      }),
      commonAxios({
        url: `/v2/Bus/EstimatedTimeOfArrival/City/${city}?$filter=RouteUID eq '${route}'`,
      }),
      commonAxios({
        url: `/v2/Bus/Shape/City/${city}?$filter=RouteUID eq '${route}'`,
      }),
    ]).then((results) => {
      const [routeInfos, routeStops, routeRealPoint, routeRealNearStop, estimatedArrival, shapes] = results;

      const routeInfo = routeInfos[0];
      setCurrentRoute(routeInfo);

      const subRoutes = routeStops.map((n) => ({
        ...n,
        destination: n.Direction === 0 ? routeInfo.DestinationStopNameZh : routeInfo.DepartureStopNameZh
      }));

      if (routeRealNearStop.length > 0) {
        routeRealNearStop.forEach((bus) => {
          const subRouteIndex = subRoutes.findIndex((n) => n.Direction === bus.Direction && n.SubRouteUID === bus.SubRouteUID);
          if (subRouteIndex > -1) {
            subRoutes[subRouteIndex].Stops[bus.StopSequence - 1].BusPlate = bus.PlateNumb;
            subRoutes[subRouteIndex].Stops[bus.StopSequence - 1].busStatus = bus.DutyStatus;
          }
        });
      }
      estimatedArrival.forEach((stop) => {
        const estimateTime = stop.EstimateTime ? parseInt(stop.EstimateTime/60) : 0;
        const subRouteIndex = subRoutes.findIndex((n) => (stop.Direction === 255 && n.SubRouteUID === stop.SubRouteUID) ||
        (n.Direction === stop.Direction && n.RouteUID === stop.RouteUID));

        const stopIndex = subRoutes[subRouteIndex]?.Stops.findIndex((n) => n.StopUID === stop.StopUID);
        if (stopIndex > -1) {
          subRoutes[subRouteIndex].Stops[stopIndex].status = stop.StopStatus ? statusMap[stop.StopStatus]
          : `${estimateTime > 1 ? `約${estimateTime}分` : '進站中'}`;
        }
        if (subRoutes[subRouteIndex]?.Stops[stopIndex]?.busStatus === 1) {
          subRoutes[subRouteIndex].Stops[stopIndex].status = '進站中';
        }
      });
      if (!routeShape) {
        setRouteShape(shapes[0].Geometry);
      }
      setStopsList(subRoutes.filter((n, i) => i < 2));
      // console.log('routeInfo', routeInfo);
      // console.log('routeStops', routeStops);
      // console.log('routeRealNearStop', routeRealNearStop);
      // console.log('routeRealPoint', routeRealPoint);
      // console.log('estimatedArrival', estimatedArrival);
    });
  };

  const onSearch = () => {
    const {city, route} = filterConfig;
    navigate(`/search/${city}/${route}`);
  };

  const onSelectCity = (city) => {
    setFilterConfig({...filterConfig, city});
    commonAxios({
      url: `/v2/Bus/Route/City/${city}?`,
    }).then((res) => {
      setRouteOptions(res?.map((n) => ({value: n.RouteUID, label: n.RouteName.Zh_tw})).sort((a, b) => a.label.localeCompare(b.label)));
    });
  };

  const OnTabClick = (key) => {
    setActiveList(key);
    // map.remove();
    // map = initMap(ref.current, routeShape, stopsList[key].Stops);
  };

  React.useEffect(() => {
    if (!clock) {
      setClock(moment(new Date()).format('HH:mm'));
    }
    const timer = setInterval(() => {
      setClock(moment(new Date()).format('HH:mm'));
    }, 2000);
    return () => {
      clearInterval(timer);
    }
  }, [clock]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (urlCity && urlRoute) {
        getStops(urlCity, urlRoute);
      }
    }, 10000);
    return () => {
      clearInterval(timer);
    }
  }, [clock, urlCity, urlRoute]);

  
  React.useEffect(() => {
    if (!mapInitialized && stopsList.length > 0 && routeShape) {
      map = initMap(ref.current, routeShape, stopsList[activeList].Stops);
      setMapInitialized(true);
      console.log('gogo');
    }
  }, [routeShape, stopsList]);

  React.useEffect(() => {
    if (mapInitialized) {
      map = initMap(ref.current, routeShape, stopsList[activeList].Stops);
    }
    return () => {
      if (map) {
        map.remove();
      }
    }
  }, [activeList]);

  React.useEffect(() => {
    return () => {
      if (map) {
        map.remove();
      }
    }
  }, []);

  React.useEffect(() => {
    if (urlCity && urlRoute) {
      getStops(urlCity, urlRoute);
      setRouteShape('');
    } else {
      setCurrentRoute(null)
    }
  }, [urlCity, urlRoute]);

  const currentCity = cities.find((n) => n.key === currentRoute?.City)?.name;

  return (
    <>
      <TitleWithSearch>
        <QuickSearch />
        <PageTitle>Route Search <TitleSplit /> {currentRoute ? `${currentCity} - ${currentRoute.RouteName.Zh_tw}` : ' 路線搜尋 '}</PageTitle>
      </TitleWithSearch>
      <SearchWrapper>
        <SearchCol1>
          <div>
            <Board style={{padding: isMobile ? '30px 30px 20px' : '40px 30px 30px', overflow: 'visible'}}>
              <SecondTitle style={{fontFamily: 'DM Sans, Roboto, sans-serif', fontSize: 24, marginBottom: '0.5em'}}>Where are you going?</SecondTitle>
              <SearchSelect
                options={cities.map((n) => ({label: n.name, value: n.key}))}
                placeholder="選擇 縣市"
                onSelect={(v) => onSelectCity(v)}
                icon={icPoint}
              />
              <SearchSelect
                options={routeOptions}
                placeholder="選擇 路線"
                onSelect={(v) => setFilterConfig({...filterConfig, route: v})}
                icon={icMapMarker}
              />
              <SearchBtn onClick={onSearch} type="button">搜尋</SearchBtn>
            </Board>
          </div>
          <div>
            {urlCity && urlRoute ? (
              <Board>
                <TabList size="small">
                  {stopsList.map((list, i) => (
                    <li key={`${list.Direction}-${list.SubRouteUID}`} className={activeList === i ? 'active' : ''} onClick={() => OnTabClick(i)}>
                      往 {list?.destination}
                    </li>
                  ))}
                </TabList>
                <StopsStripedList>
                  {stopsList[activeList]?.Stops.map((stop) => (
                    <li key={stop.StopID}>
                      <span>{stop.StopName.Zh_tw}</span>
                      <StopStatus>{stop.status}</StopStatus>
                      {stop.BusPlate && <BusPlate>{stop.BusPlate}</BusPlate>}
                    </li>
                  ))}
                </StopsStripedList>
              </Board>
            ) : (
              <Board>
                <Empty text="您還沒輸入路線資訊喔！" />
                <ClockText>{clock}</ClockText>
              </Board>
            )}
          </div>
        </SearchCol1>
        <SearchCol2>
          <RouteMap ref={ref} />
        </SearchCol2>
      </SearchWrapper>
    </>
  );
};

export default Search;