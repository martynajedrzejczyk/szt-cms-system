import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { getNavigations } from "api/getData";
import { getPages } from "api/getData";
import { createRoutes } from "utils/formatRoutes";
import "./style.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Testimonials from "pages/Presentation/sections/Testimonials";

// @mui material components
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKTypography from "components/MKTypography";
// import MKSocialButton from "components/MKSocialButton";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
// import DefaultFooter from "examples/Footers/DefaultFooter";
// import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";
import MKBox from "components/MKBox";

// Images
import bgImage from "assets/images/background.webp";
import { getComponentsByPageId } from "api/getData";
// import CenteredBlogCard from "examples/Cards/BlogCards/CenteredBlogCard";
import { getComponentTypes } from "api/getData";
// import Slider from "assets/theme/components/slider";
// import { ViewCarousel } from "@mui/icons-material";
// import Carousel from "./components/Carousel";
// import CarouselComponent from "./components/Carousel";
import HeroBanner from "./components/BasicSlider";
import OpinionForm from "./Presentation/components/OpinionForm";
import { postOpinion } from "api/postData";
// import Team from "./LandingPages/AboutUs/sections/Team";
import ContactUs from "./LandingPages/ContactUs";
import Team from "./LandingPages/AboutUs/sections/Team";
import ServicesComponent from "./components/ServicesComponent";

const ExportedPage = ({ page_id }) => {
    const { pathname } = useLocation();
    const [routes, setRoutes] = useState([]);
    const [components, setComponents] = useState([]);
    // const [componentTypes, setComponentTypes] = useState([]);
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
    }, [pathname]);

    useEffect(() => {
        getComponentsByPageId(page_id).then((comps) => {
            // comps.sort((a, b) => a.order_numer - b.order_numer);
            // setComponents(comps);
            getComponentTypes().then((types) => {
                comps.map((comp) => {
                    comp.component_type = types.find((type) => type._id === comp.component_type)?.name;
                    return comp;
                })
                setComponents(comps.sort((a, b) => a.order_number - b.order_number));
            })
        })

    }, [page_id]);

    const sendOpinion = (author, content, rating) => {
        return (e) => {
            e.preventDefault();
            console.log(author, content, rating);
            postOpinion(author, content, rating).then((res) => {
                console.log(res);
            }
            )
        }
    }

    return (
        <>
            <DefaultNavbar
                routes={routes}
                // action={{
                //     type: "external",
                //     route: "https://www.creative-tim.com/product/material-kit-react",
                //     label: "free download",
                //     color: "info",
                // }}
                sticky
            />
            <MKBox
                minHeight="25vh"
                width="100%"
                sx={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                    display: "grid",
                    placeItems: "center",
                }}
            ></MKBox>
            <Card
                sx={{
                    p: 2,
                    mx: { xs: 2, lg: 3 },
                    mt: 2,
                    mb: 4,
                    backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
                    backdropFilter: "saturate(200%) blur(30px)",
                    boxShadow: ({ boxShadows: { xxl } }) => xxl,
                    minWidth: "80%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    // margin: "10px"
                }}
            >
                {components.map((component, index) => {
                    console.log(component)
                    if (component.visible === true) {
                        if (component.component_type === "Tytuł") {
                            return (
                                <MKTypography key={index}
                                    variant="h1"
                                    // color="black"
                                    sx={{
                                        marginBottom: "20px"
                                    }}
                                >
                                    {component.propTextShort}
                                </MKTypography>
                            )
                        } else if (component.component_type === "Nagłówek 1") {
                            return (
                                <MKTypography key={index}
                                    variant="h2"
                                    // color="black"
                                    sx={{
                                        marginBottom: "10px",
                                    }}
                                >
                                    {component.propTextShort}
                                </MKTypography>
                            )
                        } else if (component.component_type === "Nagłówek 2") {
                            return (
                                <MKTypography key={index}
                                    variant="h3"
                                    // color="black"
                                    sx={{
                                        marginBottom: "10px",
                                    }}
                                >
                                    {component.propTextShort}
                                </MKTypography>
                            )
                        } else if (component.component_type === "Nagłówek 3") {
                            return (
                                <MKTypography key={index}
                                    variant="h4"
                                    // color="black"
                                    sx={{
                                        marginBottom: "10px",
                                    }}
                                >
                                    {component.propTextShort}
                                </MKTypography>
                            )
                        } else if (component.component_type === "Akapit") {
                            return (
                                <MKTypography key={index}
                                    variant="body1"
                                    fontWeight="light" color="text"
                                    sx={{
                                        marginBottom: "10px",
                                        width: "80%",
                                        textAlign: "justify",
                                        textJustify: "inter-word"
                                    }}
                                // color="black"
                                >
                                    {component.propTextLong}
                                </MKTypography>
                            )
                        } else if (component.component_type === "Zdjęcie") {
                            return (
                                <div className="image-container" key={index}>
                                    <img src={`http://localhost:5000/image?name=${component.propImages}`} alt="preview image" className="image-img" />
                                    <div className="image-overlay">
                                        <div className="image-text">{component.propTextShort}</div>
                                    </div>
                                </div>)
                        } else if (component.component_type === "Slider") {
                            return (
                                <div className="carousel-container" key={index}>
                                    <Carousel dynamicHeight={true} showArrows={true} key={index}>
                                        {component.propImages.map((image, image_index) => {
                                            return (
                                                <div key={image_index}>
                                                    <img src={`http://localhost:5000/image?name=${image}`} />
                                                </div>
                                            )
                                        })}
                                    </Carousel>
                                    <p>{component.propTextShort}</p>
                                </div>
                            )
                        } else if (component.component_type === "Hero banner") {
                            return (<HeroBanner key={index} images={component.propImages} title={component.propTextShort} description={component.propTextMid} />)
                        } else if (component.component_type === "Opinie") {
                            return (
                                <Testimonials key={index} />
                            )
                        } else if (component.component_type === "Opinie - formularz") {
                            return (<OpinionForm onSubmit={sendOpinion} key={index} />)
                        } else if (component.component_type === "Formularz kontaktowy") {
                            return (<ContactUs key={index} />)
                        } else if (component.component_type === "Pracownicy") {
                            return (<Team key={index} />)
                        } else if (component.component_type === "Usługi") {

                            return (
                                <ServicesComponent key={index} />
                                // <div className="services-container" key={index}>uslugi</div>
                            )
                        }
                    }
                })
                }
            </Card>



        </>
    );
}
export default ExportedPage;

ExportedPage.propTypes = {
    page_id: PropTypes.string.isRequired,
};