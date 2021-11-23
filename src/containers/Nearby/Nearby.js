/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Link} from 'react-router-dom';
import {PageTitle, TitleSplit, SecondTitle, Board, StripedList, ItemTitle, TabList} from '@/components/CommonStyle';
import {useAxios, useCurrentPosition} from '@/common';
import StationModal from "@/components/StationModal/StationModal";
import Empty from "@/components/Empty/Empty";
import {apiRoot} from '@/const';

const Nearby = () => {
  const [currentDistance, setCurrentDistance] = React.useState(300);
  const [data, setData] = React.useState([]);
  const [modalInfo, setModalInfo] = React.useState(null);
  const { locationData, getPosition } = useCurrentPosition();

  const getNearStations = ({lat, lng, distance}) => {
    useAxios({
      url: `${apiRoot}/v2/Bus/Station/NearBy?$spatialFilter=nearby(${lat},${lng},${distance})`,
    }).then((res) => {
      setData(res.filter((n, i, arr) => arr.findIndex((x) => x.StationID === n.StationID) === i));
    });
  };

  const showModal = (e, info) => {
    e.preventDefault();
    setModalInfo(info);
  };

  const closeModal = () => {
    setModalInfo(null);
  };

  React.useEffect(() => {
    getPosition();
  }, []);

  React.useEffect(() => {
    if (locationData && currentDistance) {
      getNearStations({...locationData, distance: currentDistance});
    }
  }, [locationData, currentDistance]);

  return (
    <>
      <PageTitle>Bus Stop <TitleSplit /> 附近站牌</PageTitle>
      <Board style={{padding: '50px 70px', marginTop: 20}}>
        <SecondTitle>附近的站牌</SecondTitle>
        <TabList>
          <li className={currentDistance === 300 ? 'active' : ''} onClick={() => setCurrentDistance(300)}>
            300 m
          </li>
          <li className={currentDistance === 10 ? 'active' : ''} onClick={() => setCurrentDistance(10)}>
            100 m
          </li>
        </TabList>
        {data.length > 0 ? (
          <StripedList>
            {data.map((n, i) => (
              <li key={n.StationUID}>
                <Link to="#" onClick={(e) => showModal(e, n)}>
                  <ItemTitle>{n.StationName?.Zh_tw} ({n.Bearing})</ItemTitle>
                  {n?.Stops?.map((s) => s?.RouteName?.Zh_tw).join(', ')}
                </Link>
              </li>
            ))}
          </StripedList>
          ) : <Empty text="附近沒有站牌" />}
      </Board>
      {modalInfo && (
        <StationModal data={modalInfo} close={closeModal} />
      )}
    </>
  );
};

export default Nearby;