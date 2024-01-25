import React from "react"
import "./styles.css"
const { CRow, CFormLabel, CCol, CFormInput, CFormCheck, CButton, CFormTextarea } = require("@coreui/react")

const HeroBanner = ({ data }) => {
    const [text, setText] = React.useState(data.text50);
    const [description, setDescription] = React.useState(data.text200);
    const [order, setOrder] = React.useState(data.order_number);
    const [visibility, setVisibility] = React.useState(data.visible);
    const [image, setImage] = React.useState(null);
    const [imgBuffor, setImgBuffor] = React.useState(null);

    const uploadImage = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setImgBuffor(file);
    }

    const saveImage = () => {
        setImage(imgBuffor);
    }

    const validateText50 = (e) => {
        if (e.target.value.length <= 50) {
            setText(e.target.value)
        } else {
            alert("Maksymalna długość tekstu wynosi 50 znaków")
        }
    }

    const validateText200 = (e) => {
        if (e.target.value.length <= 200) {
            setDescription(e.target.value)
        } else {
            alert("Maksymalna długość tekstu wynosi 200 znaków")
        }
    }

    return (
        <CRow className="mb-8">
            <div className="component-box">
                <div className="component-box-header">
                    <h4>Hero banner</h4>
                    <div className="order-box">
                        <span className="order-label">Kolejność</span>
                        <CCol sm={4}>
                            <CFormInput type="number" id="inputprice" value={order} onChange={(e) => setOrder(e.target.value)} />
                        </CCol>
                    </div>
                </div>
                <CRow className="mb-8">
                    <CRow className="mb-3 popup-line">
                        <CFormLabel htmlFor="inputtext" className="col-sm-2 col-form-label">
                            Widoczność
                        </CFormLabel>
                        <CCol sm={8}>
                            <CFormCheck checked={visibility} className="col-sm-4" id="inputtext" onChange={(e) => { setVisibility(e.target.checked) }} />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3 popup-line">
                        <CFormLabel htmlFor="inputtext" className="col-sm-2 col-form-label">
                            Tytuł
                        </CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="pageNameText" value={text} onChange={validateText50} />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3 popup-line">
                        <CFormLabel htmlFor="inputtext" className="col-sm-2 col-form-label">
                            Opis
                        </CFormLabel>
                        <CCol sm={8}>
                            <CFormTextarea id="exampleFormControlTextarea1" className="textarea-input" value={description} onChange={validateText200} rows={3}></CFormTextarea>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3 popup-line">
                        <CCol sm={10}>
                            <CFormInput type="file" onChange={uploadImage} id="formFile" accept=".jpg, .jpeg, .png" />
                        </CCol>
                        <CCol sm={2}>
                            <CButton color="primary" onClick={saveImage}>Dodaj zdjęcie</CButton>
                        </CCol>
                    </CRow>
                    {image ? <div className="image-box-hero-banner">
                        <img src={URL.createObjectURL(image)} alt="Przesłane zdjęcie" className="image-hero-banner" />
                    </div> : <></>}
                </CRow>
                <div className="component-box-footer">
                    <CButton color="danger">Usuń komponent</CButton>
                    <CButton color="primary">Zapisz zmiany</CButton>
                </div>
            </div>
        </CRow>
    )
}

export default HeroBanner;