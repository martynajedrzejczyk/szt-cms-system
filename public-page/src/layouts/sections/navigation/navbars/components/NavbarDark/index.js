/* eslint-disable no-param-reassign */
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

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
// Routes
// import routes from "routes";
import { getNavigations } from "api/getData";
import { getPages } from "api/getData";
// import { formatRoutes } from "utils/formatRoutes";
import { createRoutes } from "utils/formatRoutes";
import { useEffect, useState } from "react";

function NavbarDark() {
  const [routes, setRoutes] = useState([]);
  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    getNavigations().then((navs) => {
      setRoutes(navs);
      getPages().then((pags) => {
        setRoutes(createRoutes(navs, pags));
      })
    }
    );
  }, []);
  return (
    <MKBox variant="gradient" bgColor="dark" shadow="sm" py={0.25}>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://www.creative-tim.com/product/material-kit-react",
          label: "free download",
          color: "info",
        }}
        transparent
        relative
        light
        center
      />
    </MKBox>
  );
}

export default NavbarDark;
