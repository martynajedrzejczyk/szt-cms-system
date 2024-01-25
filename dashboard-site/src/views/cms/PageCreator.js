import React from 'react'
import { CCol, CRow, CButton, CTable, CFormSwitch, CFormLabel, CFormInput, CFormCheck, CFormSelect, CListGroup } from '@coreui/react'
import { ReactSession } from 'react-client-session';
import { Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import "./PageCreator.css"
import { getComponentTypes, getNavigations } from 'src/api/getData';
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
import { postPage } from 'src/api/postData';

const PageCreator = () => {
    let location = useLocation();
    const locationState = useLocation().state;
    const locationPath = useLocation().pathname;
    const pageId = locationPath.split("/")[3]; //todo do sprawdzenia czy dobre pokazuje id strony
    const [mode, setMode] = React.useState(null);

    const [name, setName] = React.useState("");
    const [endpoint, setEndpoint] = React.useState("");
    const [visible, setVisible] = React.useState(false);
    const [navigation_id, setNavigation_id] = React.useState("");
    const [navigation_order, setNavigation_order] = React.useState("null");
    const [components, setComponents] = React.useState([]);

    const [componentTypes, setComponentTypes] = React.useState([]);
    const [navigations, setNavigations] = React.useState([]);
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
        getNavigations().then((response) => {
            console.log(response)
            setNavigations(response);
        })
    }, []);

    const addPage = () => {
        console.log(name, endpoint, visible, navigation_id, navigation_order)
        if (name === "" || endpoint === "" || navigation_id === "null" || navigation_order === "null") {
            alert("Wypełnij wszystkie pola")
            return;
        }
        const dump_navigation_id = "65b2a33c0a71b6e0ecdb6584";
        const dump_navigation_order = 0;
        postPage(name, endpoint, visible, dump_navigation_id, dump_navigation_order).then((response) => {
            console.log(response)
            if (response.status === "success") {
                alert("Dodano stronę")
                setMode("edit")
            } else {
                alert("Błąd podczas dodawania strony")
            }
        })
    }

    const addComponent = () => {
        if (mode === "add") {
            alert("Przed dodaniem komponentu zapisz stronę")
            return;
        }
        setIfAddComponent(true);
        console.log(components)
    }

    const addNewComponent = (type) => {
        console.log("dodaje komponent")
        const newPageIg = mode === "add" ? null : pageId;
        const newComponent = {
            type: componentTypes.find((componentType) => componentType._id === type).name,
            data: {
                propTextShort: "",
                propTextMid: "",
                propTextLong: "",
                images: [],
                visible: true,
                order_number: components.length + 1,
                page_id: newPageIg,
                component_type: type,
            }
        }
        console.log(newComponent)
        const oldComponents = components;
        setComponents([...oldComponents, newComponent]);
        setIfAddComponent(false);
    }

    const saveComponent = (exportedData) => {
        console.log(exportedData)
    }

    const navOptions = navigations.map((navigation) => {
        return { value: navigation._id, label: navigation.name }
    })

    return (
        <>{ReactSession.get("loggedIn") ?
            <CCol>
                {ifAddComponent ? <PopupAddComponent addComponent={addNewComponent} closePopup={() => setIfAddComponent(false)} /> : <></>}
                <CRow>
                    <CCol xs={8}>
                        {mode === "add" ? <h1>Nowa strona</h1> : <h1>Edytuj stronę</h1>}
                    </CCol>
                    <CCol xs={2}>
                        {mode === "add" ? <CButton color="primary" onClick={addPage} >Dodaj stronę</CButton> : <CButton color="primary">Zapisz</CButton>}
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
                        <CFormSelect id="inputwtext" value={navigation_id} onChange={(e) => setNavigation_id(e.target.value)} options={navOptions} />
                    </CCol>
                </CRow>
                <CRow className="mb-3 popup-line">
                    <CFormLabel htmlFor="inputtext" className="col-sm-2 col-form-label">
                        Navigation order
                    </CFormLabel>
                    <CCol sm={8}>
                        {/* <CFormSelect id="inputtext" value={navigation_order} onChange={(e) => setNavigation_order(e.target.value)} options={navOptions} /> */}
                    </CCol>
                </CRow>
                {mode === "edit" ? <>
                    <CRow className="mb-3">
                        <CCol xs={8}>
                            <h2>Komponenty</h2>
                        </CCol>
                        <CCol xs={4}>
                            <CButton color="primary" onClick={addComponent}>Dodaj komponent</CButton>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs={9}>
                            {components.map((component, index) => {
                                console.log(component)
                                if (component.type === "Tytuł") {
                                    return <Title key={index} data={component.data} saveComponent={saveComponent} />
                                } else if (component.type === "Nagłówek 1") {
                                    return <Header1 key={index} data={component.data} />
                                } else if (component.type === "Nagłówek 2") {
                                    return <Header2 key={index} data={component.data} />
                                } else if (component.type === "Nagłówek 3") {
                                    return <Header3 key={index} data={component.data} />
                                } else if (component.type === "Slider") {
                                    return <Slider key={index} data={component.data} />
                                } else if (component.type === "HeroBanner") {
                                    return <HeroBanner key={index} data={component.data} />
                                } else if (component.type === "Pracownicy") {
                                    return <EmployeesComponent key={index} data={component.data} />
                                } else if (component.type === "Usługi") {
                                    return <ServicesComponent key={index} data={component.data} />
                                } else if (component.type === "Formularz kontaktowy") {
                                    return <ContactForm key={index} data={component.data} />
                                } else if (component.type === "Akapit") {
                                    return <Paragraph key={index} data={component.data} />
                                } else if (component.type === "Zdjęcie") {
                                    return <Photo key={index} data={component.data} />
                                } else {
                                    return <></>
                                }
                            })}
                        </CCol>
                    </CRow></> : <></>}
                <CListGroup>

                </CListGroup>
            </CCol>
            : <Navigate to="/login" />}</>
    )
}

export default PageCreator;