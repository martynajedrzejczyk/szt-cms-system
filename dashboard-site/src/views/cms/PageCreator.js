import React from 'react'
import { CCol, CRow, CButton, CTable, CFormSwitch, CFormLabel, CFormInput, CFormCheck, CFormSelect, CListGroup } from '@coreui/react'
import { ReactSession } from 'react-client-session';
import { Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import "./PageCreator.css"
import { getComponentTypes } from 'src/api/getData';
import Title from './components/pageCreator/Title';
import Header1 from './components/pageCreator/Header1';
import Header2 from './components/pageCreator/Header2';
import Header3 from './components/pageCreator/Header3';
import Slider from './components/pageCreator/Slider';
import HeroBanner from './components/pageCreator/HeroBanner';
import Employees from './Employees';
import EmployeesComponent from './components/pageCreator/EmployeesComponent';
import ServicesComponent from './components/pageCreator/ServicesComponent';
import ContactForm from './components/pageCreator/ContactForm';
import Paragraph from './components/pageCreator/Paragraph';
import Photo from './components/pageCreator/Photo';
import PopupAddComponent from './components/PopupAddComponent';

const PageCreator = () => {
    let location = useLocation();
    const locationState = useLocation().state;
    const locationPath = useLocation().pathname;
    const pageId = locationPath.split("/")[3]; //todo do sprawdzenia czy dobre pokazuje id strony
    const [mode, setMode] = React.useState(null);

    const [name, setName] = React.useState("");
    const [endpoint, setEndpoint] = React.useState("");
    const [visible, setVisible] = React.useState(false);
    const [navigation_id, setNavigation_id] = React.useState(null);
    const [navigation_order, setNavigation_order] = React.useState(null);
    const [components, setComponents] = React.useState([]);

    const [componentTypes, setComponentTypes] = React.useState([]);
    const [ifAddComponent, setIfAddComponent] = React.useState(false);

    React.useEffect(() => {
        if (locationState["mode"] === "add") {
            setMode("add")
        } else {
            setMode("edit")
        }
    }, [locationState]);

    React.useEffect(() => {
        getComponentTypes().then((response) => {
            setComponentTypes(response);
            console.log(response)
        })
    }, []);

    const addComponent = () => {
        setIfAddComponent(true);
    }

    const addNewComponent = (type) => {
        const newComponent = {
            type: type,
            data: {
                text50: "",
                text200: "",
                text1500: "",
                images: [],
                visible: true,
                order_number: components.length + 1
            }
        }
        setComponents([...components, newComponent]);
    }

    const navOptions = [
        {
            value: '1',
            label: 'Menu główne XD todo'
        },
        {
            value: '2',
            label: 'Menu stopki'
        }
    ]

    return (
        <>{ReactSession.get("loggedIn") ?
            <CCol>
                {ifAddComponent ? <PopupAddComponent addComponent={addNewComponent} closePopup={() => setIfAddComponent(false)} /> : <></>}
                <CRow>
                    <CCol xs={8}>
                        {mode === "add" ? <h1>Nowa strona</h1> : <h1>Edytuj stronę</h1>}
                    </CCol>
                    <CCol xs={2}>
                        {mode === "add" ? <CButton color="primary">Dodaj stronę</CButton> : <CButton color="primary">Zapisz</CButton>}
                    </CCol>
                </CRow>
                <h2>Właściwości</h2>
                <CRow className="mb-3">
                    <CFormLabel htmlFor="inputtext" className="col-sm-2 col-form-label">
                        Nazwa strony
                    </CFormLabel>
                    <CCol sm={8}>
                        <CFormInput type="text" id="pageNameText" value={name} onChange={(e) => setName(e.target.value)} />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel htmlFor="inputtext" className="col-sm-2 col-form-label">
                        Endpoint
                    </CFormLabel>
                    <CCol sm={8}>
                        <CFormInput type="text" id="pageEndpoint" value={endpoint} onChange={(e) => setEndpoint(e.target.value)} />
                    </CCol>
                </CRow>
                <CRow className="mb-3 popup-line">
                    <CFormLabel htmlFor="inputtext" className="col-sm-2 col-form-label">
                        Widoczność
                    </CFormLabel>
                    <CCol sm={8}>
                        <CFormCheck checked={visible} id="pageVisibility" onChange={(e) => { setVisible(e.target.checked) }} />
                    </CCol>
                </CRow>
                <CRow className="mb-3 popup-line">
                    <CFormLabel htmlFor="inputtext" className="col-sm-2 col-form-label">
                        Navigation Id
                    </CFormLabel>
                    <CCol sm={8}>
                        <CFormSelect id="inputtext" value={navigation_id} onChange={(e) => setNavigation_id(e.target.value)} options={navOptions} />
                    </CCol>
                </CRow>
                <CRow className="mb-3 popup-line">
                    <CFormLabel htmlFor="inputtext" className="col-sm-2 col-form-label">
                        Navigation order
                    </CFormLabel>
                    <CCol sm={8}>
                        <CFormSelect id="inputtext" value={navigation_order} onChange={(e) => setNavigation_order(e.target.value)} options={navOptions} />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CCol xs={8}>
                        <h2>Komponenty</h2>
                    </CCol>
                    <CCol xs={4}>
                        <CButton color="primary" onClick={addComponent}>Dodaj komponent</CButton>
                    </CCol>
                </CRow>
                {/* Początek komponentów */}
                <CRow>
                    <CCol xs={1}></CCol>
                    <CCol xs={9}>
                        {components.map((component) => {
                            if (component.type === "title") {
                                return <Title key={component.data.order_number} data={component.data} />
                            } else if (component.type === "header1") {
                                return <Header1 key={component.data.order_number} data={component.data} />
                            } else if (component.type === "header2") {
                                return <Header2 key={component.data.order_number} data={component.data} />
                            } else if (component.type === "header3") {
                                return <Header3 key={component.data.order_number} data={component.data} />
                            } else if (component.type === "slider") {
                                return <Slider key={component.data.order_number} data={component.data} />
                            } else if (component.type === "heroBanner") {
                                return <HeroBanner key={component.data.order_number} data={component.data} />
                            } else if (component.type === "employees") {
                                return <EmployeesComponent key={component.data.order_number} data={component.data} />
                            } else if (component.type === "services") {
                                return <ServicesComponent key={component.data.order_number} data={component.data} />
                            } else if (component.type === "contactForm") {
                                return <ContactForm key={component.data.order_number} data={component.data} />
                            } else if (component.type === "paragraph") {
                                return <Paragraph key={component.data.order_number} data={component.data} />
                            } else if (component.type === "photo") {
                                return <Photo key={component.data.order_number} data={component.data} />
                            } else {
                                return <></>
                            }
                        })}
                        {/* <Photo />
                        <Paragraph />
                        <ContactForm />
                        <ServicesComponent />
                        <EmployeesComponent />
                        <HeroBanner />
                        <Slider text50="XD" />
                        <Title text="XD" />
                        <Header1 text="XD" />
                        <Header2 text="XD" />
                        <Header3 text="XD" />
                        <Title text="XD" />
                        <Title text="XD" />
                        <Title text="XD" />
                        <Title text="XD" /> */}
                    </CCol>
                </CRow>
                {/* Koniec komponentów */}
                <CListGroup>

                </CListGroup>
            </CCol>
            : <Navigate to="/login" />}</>
    )
}

export default PageCreator;