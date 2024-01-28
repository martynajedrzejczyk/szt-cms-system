/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";
import AboutUs from "layouts/pages/aboutus";

// Material Kit 2 React routes
// import routes from "routes";
import { getNavigations } from "api/getData";
import { getPages } from "api/getData";
// import { formatRoutes } from "utils/formatRoutes";
import { createRoutes } from "utils/formatRoutes";

export default function App() {
  const { pathname } = useLocation();
  const [routes, setRoutes] = useState([]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    getNavigations().then((navs) => {
      getPages().then((pags) => {
        setRoutes(createRoutes(navs, pags));
      })
    }
    );
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        <Route path="/presentation" element={<Presentation />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="*" element={<Navigate to="/presentation" />} />
      </Routes>
    </ThemeProvider>
  );
}


// nav1
//   nav2
//     page1
//     page2
//   nav3
//     page3
//     page4
//     nav4
//       page5
//       page6
//   nav6
// nav10
//   page7
