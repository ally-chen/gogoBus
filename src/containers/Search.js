import React from 'react';
import { useParams } from 'react-router';
import QuickSearch from '@/components/QuickSearch';
import Empty from "@/components/Empty";
import {PageTitle, TitleSplit, TitleWithSearch, Board, SecondTitle,
  SearchWrapper, SearchCol1, SearchCol2, ClockText, TabList, StopsStripedList} from '@/style';
import {commonAxios} from '@/common';
import moment from 'moment';

const stopStatus = {0:'正常',1:'尚未發車',2:'交管不停靠',3:'末班車已過',4:'今日未營運'};

const Search = () => {
  const {city: urlCity, route: urlRoute} = useParams();
  const [clock, setClock] = React.useState('');
  const [stopsList, setStopsList] = React.useState([]);
  const [activeList, setActiveList] = React.useState(0);

  const getStops = (city, route) => {
    Promise.all([
      commonAxios({
        url: `/v2/Bus/Route/City/${city}/${route}?`,
      }),
      commonAxios({
        url: `/v2/Bus/DisplayStopOfRoute/City/${city}/${route}?`,
      }),
      commonAxios({
        url: `/v2/Bus/RealTimeByFrequency/City/${city}/${route}?`,
      }),
      commonAxios({
        url: `/v2/Bus/RealTimeNearStop/City/${city}/${route}?`,
      }),
    ]).then((results) => {
      const [routeInfo, routeStops, routeRealPoint, routeRealNearStop] = results;

      routeStops[0].destination = routeInfo[0].DestinationStopNameZh;
      if (routeInfo[0].SubRoutes?.length === 2) {
        routeStops[1].destination = routeInfo[0].DepartureStopNameZh;
      }
      if (routeRealNearStop.length > 0) {
        routeRealNearStop.forEach((bus) => {
          routeStops[bus.Direction].Stops[bus.StopSequence - 1].BusPlate = bus.PlateNumb;
        });
      }
      setStopsList(routeStops);
      console.log('routeInfo', routeInfo);
      console.log('routeStops', routeStops);
      console.log('routeRealNearStop', routeRealNearStop);
      console.log('routeRealPoint', routeRealPoint);
    });
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setClock(moment(new Date()).format('HH:mm'));
    }, 2000);
    return () => {
      clearInterval(timer);
    }
  }, [clock]);

  React.useEffect(() => {
    if (urlCity && urlRoute) {
      getStops(urlCity, urlRoute);
    }
  }, [urlCity, urlRoute]);

  return (
    <>
      <TitleWithSearch>
        <PageTitle>Route Search <TitleSplit /> 路線搜尋</PageTitle>
        <QuickSearch />
      </TitleWithSearch>
      <SearchWrapper>
        <SearchCol1>
          <div>
            <Board style={{padding: '40px 30px'}}>
              <SecondTitle style={{fontFamily: 'DM Sans, Roboto, sans-serif'}}>Where are you going?</SecondTitle>
            </Board>
          </div>
          <div>
            {urlCity && urlRoute ? (
              <div>
                <TabList>
                  {stopsList.map((list, i) => (
                    <li key={list.Direction} className={activeList === i ? 'active' : ''} onClick={() => setActiveList(i)}>
                      往 {list?.destination}
                    </li>
                  ))}
                </TabList>
                <StopsStripedList>
                  {stopsList[activeList]?.Stops.map((stop) => (
                    <li key={stop.StopID}>
                      <span>{stop.StopName.Zh_tw}</span>
                      <span>status</span>
                      <span>{stop.BusPlate}</span>
                    </li>
                  ))}
                </StopsStripedList>
              </div>
            ) : (
              <Board>
                <Empty text="您還沒輸入路線資訊喔！" />
                <ClockText>{clock}</ClockText>
              </Board>
            )}
          </div>
        </SearchCol1>
        <SearchCol2>

        </SearchCol2>
      </SearchWrapper>
    </>
  );
};

export default Search;