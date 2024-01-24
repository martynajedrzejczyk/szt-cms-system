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
                <CRow>
                    <CCol xs={8}>
                        {mode === "add" ? <h1>Nowa strona</h1> : <h1>Edytuj stronę</h1>}
                    </CCol>
                    <CCol xs={2}>
                        <CButton color="primary">Zapisz</CButton>
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
                        <CButton color="primary">Dodaj komponent</CButton>
                    </CCol>
                </CRow>
                {/* Początek komponentów */}
                <CRow>
                    <CCol xs={1}></CCol>
                    <CCol xs={9}>
                        <Slider text50="XD" />
                        <Title text="XD" />
                        <Header1 text="XD" />
                        <Header2 text="XD" />
                        <Header3 text="XD" />
                        <Title text="XD" />
                        <Title text="XD" />
                        <Title text="XD" />
                        <Title text="XD" />
                    </CCol>
                </CRow>
                {/* Koniec komponentów */}
                <CListGroup>
                    {components.map((component) => {
                        return (
                            <CListGroup.Item key={component._id}>
                                <CRow>
                                    <CCol xs={8}>
                                        <CFormSelect id="inputtext" value={component.type} onChange={(e) => setNavigation_id(e.target.value)} options={componentTypes} />
                                    </CCol>
                                    <CCol xs={4}>
                                        <CButton color="primary">Usuń</CButton>
                                    </CCol>
                                </CRow>
                            </CListGroup.Item>)
                    })}
                </CListGroup>
            </CCol>
            : <Navigate to="/login" />}</>
    )
}

export default PageCreator;