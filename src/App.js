import {
  HashRouter as Router,
  Routes,
  Route,
  Outlet
} from "react-router-dom";
import { LocationContextProvider } from '@/store/locationStore';
import Menu from "@/components/Menu/Menu";
import Search from "@/containers/Search/Search";
import Nearby from "@/containers/Nearby/Nearby";
import News from "@/containers/News/News";
import {Container, PageWrapper} from "./style";

const Layout = () => (
  <Container>
    <Menu />
    <PageWrapper>
      <Outlet />
    </PageWrapper>
  </Container>
);

const App = () => {
  return (
    <LocationContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="search" element={<Search />} />
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
