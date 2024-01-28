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
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Image
// import bgImage from "assets/images/illustrations/illustration-reset.jpg";

function ContactUs() {

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("Message sent!");
    alert("Wiadomość wysłana!");
  }
  // Setting page scroll to 0 when changing the route

  return (
    <>
      <MKBox
        bgColor="white"
        borderRadius="xl"
        shadow="lg"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        mt={{ xs: 10, sm: 10, md: 10 }}
        mb={{ xs: 10, sm: 10, md: 10 }}
        mx={3}
      >
        <MKBox
          variant="gradient"
          bgColor="info"
          coloredShadow="info"
          borderRadius="lg"
          p={2}
          mx={2}
          mt={-3}
        >
          <MKTypography variant="h3" color="white">
            Napisz do nas!
          </MKTypography>
        </MKBox>
        <MKBox p={3}>
          <MKTypography variant="body2" color="text" mb={3}>
            Jeśli chcesz się umówić na spacer, lub masz jakieś pytania, wyślij do nas wiadomość!
          </MKTypography>
          <MKBox width="100%" component="form" method="post" autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <MKInput
                  variant="standard"
                  label="Imię i nazwisko"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MKInput
                  type="email"
                  variant="standard"
                  label="Email"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <MKInput
                  variant="standard"
                  label="W czym możemy Ci pomóc?"
                  placeholder=""
                  InputLabelProps={{ shrink: true }}
                  multiline
                  fullWidth
                  rows={6}
                />
              </Grid>
            </Grid>
            <Grid container item justifyContent="center" xs={12} mt={5} mb={2}>
              <MKButton onClick={sendMessage} type="submit" variant="gradient" color="info">
                Wyślij wiadomość
              </MKButton>
            </Grid>
          </MKBox>
        </MKBox>
      </MKBox>
    </>
  );
}

export default ContactUs;
