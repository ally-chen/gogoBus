import {
  HashRouter as Router,
  Routes,
  Route,
  Outlet
} from "react-router-dom";
import Menu from "@/components/Menu/Menu";

const Layout = () => (
  <div>
    <Menu />
    <Outlet />
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route path="search" element={<Search />} />
          <Route path="nearby" element={<Nearby />} />
          <Route path="news" element={<News />} />
          <Route index element={<Search />} /> */}
        </Route>
        {/* <Route path="/*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
