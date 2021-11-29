import {
  HashRouter as Router,
  Routes,
  Route,
  Outlet
} from "react-router-dom";
import { LocationContextProvider } from '@/store/locationStore';
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import Search from "@/containers/Search";
import Nearby from "@/containers/Nearby";
import News from "@/containers/News";
import { Container, PageWrapper } from "./style";

const Layout = () => (
  <Container>
    <Menu />
    <PageWrapper>
      <Outlet />
      <Footer />
    </PageWrapper>
  </Container>
);

const App = () => {
  return (
    <LocationContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="search">
              <Route path=":city" element={<Search />} />
              <Route path=":city/:route" element={<Search />} />
              <Route index element={<Search />} />
            </Route>
            <Route path="nearby" element={<Nearby />} />
            <Route path="news" element={<News />} />
            <Route index element={<Search />} />
          </Route>
          {/* <Route path="/*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </LocationContextProvider>
  );
}

export default App;
