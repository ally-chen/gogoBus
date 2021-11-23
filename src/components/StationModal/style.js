import styled from 'styled-components';
import { colors, desktopMedia } from '@/const';

export const Overlay = styled.div`
position: fixed;
left: 0;
top: 0;
right: 0;
bottom: 0;
background: #486ae880;
z-index: 1000;
`;

export const ModalWrapper = styled.div`
overflow-y: scroll;
height: 100vh;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
&::-webkit-scrollbar {
  width: 0;
}
`;

export const Modal = styled.div`
border-radius: 16px;
background: #fff;
padding: 20px;
margin: 20px;
width: 600px;
${desktopMedia(`
padding: 24px 36px;
`)}
`;

export const MapContainer = styled.div`
height: 360px;
border-radius: 16px;
margin-top: 20px;
`;