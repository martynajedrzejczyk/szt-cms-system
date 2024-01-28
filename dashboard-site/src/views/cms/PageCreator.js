import React from 'react'
import { CCol, CRow, CButton, CTable, CFormSwitch, CFormLabel, CFormInput, CFormCheck, CFormSelect, CListGroup } from '@coreui/react'
import { ReactSession } from 'react-client-session';
import { Navigate, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import "./PageCreator.css"
import { getComponentTypes, getComponentsByPageId, getNavigations } from 'src/api/getData';
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
import { postComponent, postImage, postPage } from 'src/api/postData';
import { getPage } from 'src/api/getData';
import { putComponent, putPage } from 'src/api/putData';
import OpinionsComponent from './components/pageCreator/OpinionsComponent';
import OpinionsForm from './components/pageCreator/OpinionsForm';
import { deleteComponent } from 'src/api/deleteData';

const PageCreator = () => {
    let location = useLocation();
    const locationState = useLocation().state;
    const locationPath = useLocation().pathname;
    const [mode, setMode] = React.useState(null);

    const [name, setName] = React.useState("");
    const [endpoint, setEndpoint] = React.useState("");
    const [visible, setVisible] = React.useState(false);
    const [navigation_id, setNavigation_id] = React.useState("null");
    const [navigation_order, setNavigation_order] = React.useState("null");
    const [components, setComponents] = React.useState([]);

    const [componentTypes, setComponentTypes] = React.useState([]);
    const [navigations, setNavigations] = React.useState([]);
    const [navOptions, setNavOptions] = React.useState([]);
    const [ifAddComponent, setIfAddComponent] = React.useState(false);

    const [currPageId, setCurrPageId] = React.useState(locationPath.split("/")[2]);

    let navigate = useNavigate();

    React.useEffect(() => {
        if (locationState["mode"] === "add") {
            setMode("add")
        } else {
            setMode("edit")
            console.log(currPageId)
            loadData();
        }
    }, [locationState, currPageId]);

    const loadData = () => {
        getPage(currPageId).then((response) => {
            console.log(response[0])
            setName(response[0].name)
            setEndpoint(response[0].endpoint)
            setVisible(response[0].visible)
            setNavigation_id(response[0].navigation_id)
            setNavigation_order(response[0].navigation_order)
        })
        getComponentsByPageId(currPageId).then((response) => {
            console.log("komponenty tej strony", response)
            if (response?.status === "empty") {
                setComponents([])
                return;
            }
            response.sort((a, b) => a.order_number - b.order_number)
            setComponents(response)
        })
    }

    React.useEffect(() => {
        getComponentTypes().then((response) => {
            setComponentTypes(response);
            console.log(response)
        })
        getNavigations().then((response) => {
            setNavigations(response);
            console.log(response)
            // setNavigation_id(response[0]._id)
            setNavOptions(response.map((navigation) => {
                return {
                    value: navigation._id.$oid,
                    label: navigation.name
                }
            }))
            console.log(response.map((navigation) => {
                return {
                    value: navigation._id.$oid,
                    label: navigation.name
                }
            }))
        })
    }, []);

    const addPage = () => {
        console.log(name, endpoint, visible, navigation_id, navigation_order)
        if (name === "" || endpoint === "" || navigation_id === "null") {
            alert("Wypełnij wszystkie pola")
            return;
        }

        postPage(name, endpoint, visible, navigation_id, 0).then((response) => {
            console.log(response)
            if (response.status === "success") {
                alert("Dodano stronę")
                setMode("edit")
                setCurrPageId(response.page_id)
                navigate('/pageEditor/' + response.page_id, { state: { mode: 'edit' } });
            } else {
                alert("Błąd podczas dodawania strony")
            }
        })
    }

    // otwiera popupa do dodawania komponentu
    const addComponent = () => {
        if (mode === "add") {
            alert("Przed dodaniem komponentu zapisz stronę")
            return;
        }
        setIfAddComponent(true);
        console.log(components)
    }

    // dodaje komponent do strony
    const addNewComponent = (type) => {
        console.log("dodaje komponent")
        const newPageIg = mode === "add" ? null : currPageId;
        const newtype = componentTypes.find((componentType) => componentType._id === type).name;
        const newComponent = {
            propTextShort: "",
            propTextMid: "",
            propTextLong: "",
            propImages: [],
            visible: true,
            order_number: components.length + 1,
            page_id: newPageIg,
            component_type: type,
            component_type_name: newtype,
        }
        console.log(newComponent)
        postComponent(newComponent.page_id, newComponent.propTextShort, newComponent.propTextMid, newComponent.propTextLong, newComponent.propImages, newComponent.visible, newComponent.order_number, newComponent.component_type).then((response) => {
            console.log(response)
            if (response.status === "success") {
                loadData();
            } else {
                alert("Błąd podczas dodawania komponentu")
            }
        })
        setIfAddComponent(false);
    }

    // zapisuje komponent po zmianie - put
    const saveComponent = (exportedData) => {
        console.log(exportedData)
        putComponent(exportedData._id, exportedData.page_id, exportedData.propTextShort, exportedData.propTextMid, exportedData.propTextLong, exportedData.propImages, exportedData.order_number, exportedData.visible).then((response) => {
            console.log(response)
            if (response.status === "success") {
                alert("Zapisano komponent")
                loadData();
            } else {
                alert("Błąd podczas zapisywania komponentu")
            }
        })
    }

    const saveComponentWithImages = (exportedData) => {
        console.log(exportedData)
        const componentType = componentTypes.find((componentType) => componentType._id === exportedData.component_type)?.name;
        console.log(componentType)
        if (componentType === "Zdjęcie") {
            if (typeof (exportedData.propImages) === "string") {
                putComponent(exportedData._id, exportedData.page_id, exportedData.propTextShort, exportedData.propTextMid, exportedData.propTextLong, exportedData.propImages, exportedData.order_number, exportedData.visible).then((response) => {
                    console.log(response)
                    if (response.status === "success") {
                        alert("Zapisano komponent")
                        loadData();
                    } else {
                        alert("Błąd podczas zapisywania komponentu")
                    }
                })
            } else {
                postImage(exportedData.propImages).then((response) => {
                    console.log(response)
                    if (response.status === 200) {
                        putComponent(exportedData._id, exportedData.page_id, exportedData.propTextShort, exportedData.propTextMid, exportedData.propTextLong, response.data.name, exportedData.order_number, exportedData.visible).then((response) => {
                            console.log(response)
                            if (response.status === "success") {
                                alert("Zapisano komponent")
                                loadData();
                            } else {
                                alert("Błąd podczas zapisywania komponentu")
                            }
                        })
                    } else {
                        alert("Błąd podczas zapisywania zdjęcia")
                    }
                })
            }
        } else if (componentType === "Hero banner" || componentType === "Slider") {
            let imgCounter = 0;
            let newPropImages = [];
            console.log(exportedData)
            let images = exportedData.propImages;
            if (images.length === 0) {
                putComponent(exportedData._id, exportedData.page_id, exportedData.propTextShort, exportedData.propTextMid, exportedData.propTextLong, newPropImages, exportedData.order_number, exportedData.visible).then((response) => {
                    console.log(response)
                    if (response.status === "success") {
                        alert("Zapisano komponent")
                        loadData();
                    } else {
                        alert("Błąd podczas zapisywania komponentu")
                    }
                })
                return;
            }
            images.forEach((image, index) => {
                if (typeof (image) === "string") {
                    newPropImages.push(image);
                    imgCounter++;
                    console.log("string", image)
                    if (imgCounter === images.length) {
                        putComponent(exportedData._id, exportedData.page_id, exportedData.propTextShort, exportedData.propTextMid, exportedData.propTextLong, newPropImages, exportedData.order_number, exportedData.visible).then((response) => {
                            console.log(response)
                            if (response.status === "success") {
                                alert("Zapisano komponent")
                                loadData();
                            } else {
                                alert("Błąd podczas zapisywania komponentu")
                            }
                        })
                    }
                } else {
                    console.log("cosinnego", image)
                    postImage(image).then((response) => {
                        console.log("postImage", image, response)
                        if (response.status === 200) {
                            newPropImages.push(response.data.name);
                        } else {
                            alert("Błąd podczas zapisywania zdjęcia")
                        }
                        imgCounter++;
                        if (imgCounter === images.length) {
                            putComponent(exportedData._id, exportedData.page_id, exportedData.propTextShort, exportedData.propTextMid, exportedData.propTextLong, newPropImages, exportedData.order_number, exportedData.visible).then((response) => {
                                console.log(response)
                                if (response.status === "success") {
                                    alert("Zapisano komponent")
                                    loadData();
                                } else {
                                    alert("Błąd podczas zapisywania komponentu")
                                }
                            })
                        }
                    })
                }
            })


        } else if (componentType === "Slider") {
        }

        loadData();
    }

    const saveAttributes = () => {
        console.log(currPageId, name, endpoint, visible, navigation_id, navigation_order)
        // putPage(currPageId, name, endpoint, visible, navigation_id, navigation_order)
        putPage(currPageId, name, endpoint, visible, navigation_id, navigation_order).then((response) => {
            console.log(response)
            if (response.status === "success") {
                alert("Zapisano właściwości strony")
                loadData();
            } else {
                alert("Błąd podczas zapisywania właściwości strony")
            }
        })
    }

    const deleteComponentFromPage = (id, order_number, page_id) => {
        console.log(id, order_number)
        deleteComponent(id, order_number, page_id).then((response) => {
            console.log(response)
            if (response.status === "success") {
                alert("Usunięto komponent")
                loadData();
            } else {
                alert("Błąd podczas usuwania komponentu")
            }
        })
    }

    return (
        <>{ReactSession.get("loggedIn") ?
            <CCol>
                {ifAddComponent ? <PopupAddComponent addComponent={addNewComponent} closePopup={() => setIfAddComponent(false)} /> : <></>}
                <CRow>
                    <CCol xs={7}>
                        {mode === "add" ? <h1>Nowa strona</h1> : <h1>Edytuj stronę</h1>}
                    </CCol>
                    <CCol xs={3}>
                        {mode === "add" ? <CButton color="primary" onClick={addPage} >Dodaj stronę</CButton> : <CButton onClick={saveAttributes} color="primary">Zapisz właściwości</CButton>}
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
                        Sekcja w nawigacji
                    </CFormLabel>
                    <CCol sm={8}>
                        <CFormSelect id="inputwtext" value={navigation_id} onChange={(e) => setNavigation_id(e.target.value)} options={navOptions} />
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
                    <CRow key={3}>
                        <CCol xs={9} key={4}>
                            {components.map((component, index) => {
                                if (component.component_type === componentTypes.find((componentType) => componentType.name === "Tytuł")?._id) {
                                    return <Title key={index} data={component} saveComponent={saveComponent} deleteComponent={deleteComponentFromPage} />
                                } else if (component.component_type === componentTypes.find((componentType) => componentType.name === "Nagłówek 1")?._id) {
                                    return <Header1 key={index} data={component} saveComponent={saveComponent} deleteComponent={deleteComponentFromPage} />
                                } else if (component.component_type === componentTypes.find((componentType) => componentType.name === "Nagłówek 2")?._id) {
                                    return <Header2 key={index} data={component} saveComponent={saveComponent} deleteComponent={deleteComponentFromPage} />
                                } else if (component.component_type === componentTypes.find((componentType) => componentType.name === "Nagłówek 3")?._id) {
                                    return <Header3 key={index} data={component} saveComponent={saveComponent} deleteComponent={deleteComponentFromPage} />
                                } else if (component.component_type === componentTypes.find((componentType) => componentType.name === "Slider")?._id) {
                                    return <Slider key={index} data={component} saveComponent={saveComponentWithImages} deleteComponent={deleteComponentFromPage} />
                                } else if (component.component_type === componentTypes.find((componentType) => componentType.name === "Hero banner")?._id) {
                                    return <HeroBanner key={index} data={component} saveComponent={saveComponentWithImages} deleteComponent={deleteComponentFromPage} />
                                } else if (component.component_type === componentTypes.find((componentType) => componentType.name === "Pracownicy")?._id) {
                                    return <EmployeesComponent key={index} data={component} saveComponent={saveComponent} deleteComponent={deleteComponentFromPage} />
                                } else if (component.component_type === componentTypes.find((componentType) => componentType.name === "Usługi")?._id) {
                                    return <ServicesComponent key={index} data={component} saveComponent={saveComponent} deleteComponent={deleteComponentFromPage} />
                                } else if (component.component_type === componentTypes.find((componentType) => componentType.name === "Formularz kontaktowy")?._id) {
                                    return <ContactForm key={index} data={component} saveComponent={saveComponent} deleteComponent={deleteComponentFromPage} />
                                } else if (component.component_type === componentTypes.find((componentType) => componentType.name === "Akapit")?._id) {
                                    return <Paragraph key={index} data={component} saveComponent={saveComponent} deleteComponent={deleteComponentFromPage} />
                                } else if (component.component_type === componentTypes.find((componentType) => componentType.name === "Zdjęcie")?._id) {
                                    return <Photo key={index} data={component} saveComponent={saveComponentWithImages} deleteComponent={deleteComponentFromPage} />
                                } else if (component.component_type === componentTypes.find((componentType) => componentType.name === "Opinie")?._id) {
                                    return <OpinionsComponent key={index} data={component} saveComponent={saveComponent} deleteComponent={deleteComponentFromPage} />
                                } else if (component.component_type === componentTypes.find((componentType) => componentType.name === "Opinie - formularz")?._id) {
                                    return <OpinionsForm key={index} data={component} saveComponent={saveComponent} deleteComponent={deleteComponentFromPage} />
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