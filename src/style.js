import styled from 'styled-components';
import {desktopMedia} from '@/const';

export const Container = styled.div`
min-height: 100vh;
${desktopMedia(`
display: flex;
`)}
`;

export const PageWrapper = styled.div`
padding: 25px 26px 40px;
flex: 1;
${desktopMedia(`
padding: 46px 82px 67px;
`)}
`;