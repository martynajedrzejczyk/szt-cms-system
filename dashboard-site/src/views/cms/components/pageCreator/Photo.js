import React, { useEffect } from "react"
import "./styles.css"
const { CRow, CFormLabel, CCol, CFormInput, CFormCheck, CButton, CFormTextarea } = require("@coreui/react")

const Photo = ({ data, saveComponent, deleteComponent }) => {
    const [text, setText] = React.useState(data.propTextShort);
    const [order, setOrder] = React.useState(data.order_number);
    const [visibility, setVisibility] = React.useState(data.visible);
    const [image, setImage] = React.useState(null);
    const [imgToSend, setImgToSend] = React.useState(data.propImages);
    const [ifImgSend, setIfImgSend] = React.useState(data.propImages.length > 0);
    console.log(data)

    const validateText200 = (e) => {
        if (e.target.value.length <= 200) {
            setText(e.target.value)
        } else {
            alert("Maksymalna długość tekstu wynosi 200 znaków")
        }
    }
    const DoDeleteComponent = () => {
        deleteComponent(data._id, data.order_number, data.page_id)
    }

    const DoSaveComponent = () => {
        console.log({ page_id: data.page_id, component_type: "Title", text50: text, order_number: order, visible: visibility })
        saveComponent({ _id: data._id, page_id: data.page_id, component_type: data.component_type, propTextShort: text, order_number: order, visible: visibility, propTextMid: "", propTextLong: "", propImages: imgToSend });
    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            setImgToSend(event.target.files[0]);
        }
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
                        {/* <CCol sm={9}> */}
                        <CFormInput type="file" onChange={onImageChange} id="formFile" accept=".jpg, .jpeg, .png" />
                        {/* </CCol> */}
                        {/* <CCol sm={3}>
                            <CButton color="primary" onClick={saveImage}>Dodaj zdjęcie</CButton>
                        </CCol> */}
                    </CRow>
                    {/* {image !== undefined ? <div className="image-box-hero-banner">
                        <img src={URL.createObjectURL(image)} alt="Przesłane zdjęcie" className="image-hero-banner" />
                    </div> : <></>} */}
                    {image !== undefined && ifImgSend === false ? <div className="image-box-hero-banner">
                        <img src={image} alt="preview image" className="image-hero-banner" />
                    </div> : <></>}
                    {ifImgSend === true ? <div className="image-box-hero-banner">
                        <img src={`http://localhost:5000/image?name=${data.propImages}`} alt="preview image" className="image-hero-banner" />

                    </div> : <></>}
                </CRow>
                <div className="component-box-footer">
                    <CButton color="danger" onClick={DoDeleteComponent}>Usuń komponent</CButton>
                    <CButton color="primary" onClick={DoSaveComponent}>Zapisz zmiany</CButton>
                </div>
            </div>
        </CRow>
    )
}

export default Photo;