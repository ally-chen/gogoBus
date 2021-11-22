/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Link} from 'react-router-dom';
import {PageTitle, TitleSplit, SecondTitle, Board, StripedList, ItemTitle} from '@/components/CommonStyle';
import {useAxios, useCurrentPosition} from '@/common';
import {apiRoot} from '@/const';

const Nearby = () => {
  const [data, setData] = React.useState([]);
  const { locationData, getPosition } = useCurrentPosition();

  const getNearStations = ({lat, lng}) => {
    useAxios({
      url: `${apiRoot}/v2/Bus/Station/NearBy?$spatialFilter=nearby(${lat},${lng},500)`,
    }).then((res) => {
      setData(res);
    });
  };

  React.useEffect(() => {
    getPosition();
  }, []);

  React.useEffect(() => {
    if (locationData) {
      console.log('current:', locationData);
      getNearStations(locationData);
    }
  }, [locationData]);

  return (
    <>
      <PageTitle>Bus Stop <TitleSplit /> 附近站牌</PageTitle>
      <Board style={{padding: '50px 70px'}}>
        <SecondTitle>附近的站牌</SecondTitle>
        <StripedList>
          {data.map((n, i) => (
            <li key={n.StationUID}>
              <Link to="/search">
                <ItemTitle>{n.StationName?.Zh_tw}</ItemTitle>
                {n?.Stops.map((s) => s?.RouteName?.Zh_tw).join(', ')}
              </Link>
            </li>
          ))}
        </StripedList>
      </Board>
    </>
  );
};

export default Nearby;