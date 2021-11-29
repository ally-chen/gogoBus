
import React from 'react';
import {Link} from 'react-router-dom';
import {commonAxios, useIsMobile} from '@/common';
import { cities } from '@/const';
import Empty from "@/components/Empty";
import SearchSelect from '@/components/SearchSelect';
import icMapMarker from '@/images/ic-map-marker.svg';
import moment from 'moment';
import icClose from "@/images/ic-close.svg";
import {PageTitle, TitleSplit, Board, StripedList, ItemTitle, SecondTitle,
  Overlay, ModalWrapper, Modal, IconBtn, TitleWithSearch} from '@/style';

const News = () => {
  const modalRef = React.useRef(null);
  const [data, setData] = React.useState([]);
  const [modalInfo, setModalInfo] = React.useState(null);
  const [targetCity, setTargetCity] = React.useState('Taipei');
  const isMobile = useIsMobile();

  const getNews = (city) => {
    commonAxios({
      url: `/v2/Bus/News/City/${city}?$top=10`,
    }).then((res) => {
      setData(res);
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
    getNews(targetCity);
  }, [targetCity]);

  return (
    <>
      <PageTitle>Latest News <TitleSplit /> 最新消息</PageTitle>
      <Board style={{padding: isMobile ? '40px 30px' : '50px 70px', marginTop: 20}}>
        <TitleWithSearch style={{justifyContent: 'space-between'}}>
          <SecondTitle>最新消息</SecondTitle>
          <SearchSelect
            options={cities.map((n) => ({label: n.name, value: n.key}))}
            placeholder="選擇縣市"
            defaultValue={targetCity}
            onSelect={(v) => setTargetCity(v)}
            icon={icMapMarker}
          />
        </TitleWithSearch>
        {data.length > 0 ? (
          <StripedList>
            {data.map((n, i) => (
              <li key={n.NewsID}>
                <Link to="#" onClick={(e) => showModal(e, n)}>
                  <ItemTitle>{moment(n.PublishTime).format('YYYY/MM/DD')}</ItemTitle>
                  {n.Title}
                </Link>
              </li>
            ))}
          </StripedList>
          ) : <Empty text="沒有最新消息" />}
      </Board>
      {modalInfo && (
        <Overlay onClick={closeModal}>
          <ModalWrapper style={{alignItems: modalRef.current?.offsetHeight < window.innerHeight ? 'center' : 'baseline'}}>
            <Modal ref={modalRef} onClick={(e) => e.stopPropagation()} style={{width: 750}}>
              <IconBtn onClick={closeModal} type="button"><img src={icClose} alt="x" width="20" /></IconBtn>
              <ItemTitle>{modalInfo.Title}</ItemTitle>
              <small>{moment(modalInfo.PublishTime).format('YYYY/MM/DD HH:mm:ss')} | {modalInfo.Department}</small>
              <hr />
              {modalInfo.Description}
            </Modal>
          </ModalWrapper>
        </Overlay>
      )}
    </>
  );
};

export default News;