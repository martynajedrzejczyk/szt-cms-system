
import React, { useEffect, useState } from 'react';
import './styles.css';
import { getServices } from 'api/getData';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";
const ServicesComponent = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        getServices().then((services) => {
            setServices(services);
        }),
            []
    });

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
                    <Grid item xs={12} md={12} sx={{ mb: 6 }}>
                        <MKTypography variant="h3" color="black">
                            Poznaj nasze usługi
                        </MKTypography>
                        <div className="services-container">
                            {services.map(service => (
                                <div key={service._id} className="services-tile">
                                    <h2 className="service-name">{service.name}</h2>
                                    <div className="details-container">
                                        <p className="service-description">{service.description}</p>
                                        <p className="service-price">cena: {service.price} zł</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </MKBox>
    );
};

export default ServicesComponent;
