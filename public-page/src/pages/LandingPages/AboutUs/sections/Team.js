/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import HorizontalTeamCard from "examples/Cards/TeamCards/HorizontalTeamCard";

// Images
import { useEffect, useState } from "react";
import { getEmployees } from "api/getData";
import { getCities } from "api/getData";

function Team() {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees().then((emps) => {
      getCities().then((cities) => {
        console.log(cities)
        emps.forEach((emp) => {
          emp.city = cities.find((city) => city._id === emp.city).name;
          setEmployees(emps);
        })
      })
      console.log(emps);
    })
  }, []
  );

  return (
    <MKBox
      component="section"
      variant="gradient"
      bgColor="white"
      position="relative"
      py={6}
      px={{ xs: 2, lg: 0 }}
      mx={-2}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} sx={{ mb: 6 }}>
            <MKTypography variant="h3" color="black">
              Poznaj nasz zespół
            </MKTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {employees.map((employee) => (employee.visible &&
            <Grid key={employee._id} item xs={12} lg={6}>
              <MKBox mb={1}>
                <HorizontalTeamCard
                  image={`http://localhost:5000/image?name=${employee.image}`}
                  name={employee.name + " " + employee.surname}
                  position={{ color: "info", label: employee.city }}
                  description={employee.description}
                />
              </MKBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Team;
