import React from "react"
import "./styles.css"
const { CRow, CFormLabel, CCol, CFormInput, CFormCheck, CButton, CFormTextarea } = require("@coreui/react")

const Photo = ({ text50, img, order_number, visible }) => {
    const [text, setText] = React.useState(text50);
    const [order, setOrder] = React.useState(order_number);
    const [visibility, setVisibility] = React.useState(visible);
    const [image, setImage] = React.useState(img);
    const [imgBuffor, setImgBuffor] = React.useState(null);

    const validateText200 = (e) => {
        if (e.target.value.length <= 200) {
            setText(e.target.value)
        } else {
            alert("Maksymalna długość tekstu wynosi 200 znaków")
        }
    }

    const uploadImage = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setImgBuffor(file);
    }

    const saveImage = () => {
        setImage(imgBuffor);
    }

    return (
        <CRow className="mb-8">
            <div className="component-box">
                <div className="component-box-header">
                    <h4>Zdjęcie</h4>
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
                            Podpis
                        </CFormLabel>
                        <CCol sm={8}>
                            <CFormTextarea id="exampleFormControlTextarea1" className="textarea-input" value={text} onChange={validateText200} rows={3}></CFormTextarea>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3 popup-line">
                        <CCol sm={9}>
                            <CFormInput type="file" onChange={uploadImage} id="formFile" accept=".jpg, .jpeg, .png" />
                        </CCol>
                        <CCol sm={3}>
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

export default Photo;