import React from "react"
import "./styles.css"
const { CRow, CFormLabel, CCol, CFormInput, CFormCheck, CButton, CFormTextarea } = require("@coreui/react")

const HeroBanner = ({ data, saveComponent, deleteComponent }) => {
    const [text, setText] = React.useState(data.propTextShort);
    const [description, setDescription] = React.useState(data.propTextMid);
    const [order, setOrder] = React.useState(data.order_number);
    const [visibility, setVisibility] = React.useState(data.visible);
    const [imgToSend, setImgToSend] = React.useState(data.propImages);

    //zrobic osobno images i nowe images bo inne src trzeba alboo 

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const oldImages = imgToSend;
            if (oldImages === undefined) {
                setImgToSend([event.target.files[0]]);
            } else
                setImgToSend([...oldImages, event.target.files[0]]);
        }
    }

    const DoDeleteComponent = () => {
        deleteComponent(data._id, data.order_number, data.page_id)
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
    const DoSaveComponent = () => {
        console.log(imgToSend)
        saveComponent({ _id: data._id, page_id: data.page_id, component_type: data.component_type, propTextShort: text, order_number: order, visible: visibility, propTextMid: description, propTextLong: "", propImages: imgToSend });
    }

    const removeChanges = () => {
        setText(data.propTextShort);
        setDescription(data.propTextMid);
        setOrder(data.order_number);
        setVisibility(data.visible);
        setImgToSend(data.propImages);
    }

    const removeImage = (img) => {
        const index = imgToSend.indexOf(img);
        // console.log("remove", img, index, imgToSend)
        if (index > -1) {
            imgToSend.splice(index, 1);
            setImgToSend(imgToSend);
            saveComponent({ _id: data._id, page_id: data.page_id, component_type: data.component_type, propTextShort: text, order_number: order, visible: visibility, propTextMid: description, propTextLong: "", propImages: imgToSend });
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
                        <CFormInput type="file" onChange={onImageChange} id="formFile" accept=".jpg, .jpeg, .png" />
                    </CRow>
                    {/* <h4>Przesłane z</h4>
                    {image !== undefined && ifImgSend === false ? <div className="image-box-hero-banner"> Podgląd zdjęcia
                        <img src={image} alt="preview image" className="image-hero-banner" />
                    </div> : <></>} */}
                    {imgToSend ? imgToSend.map((img, index) => {
                        return (
                            <div key={index} className="image-box-hero-banner">
                                {typeof (img) === "string" ? <img src={`http://localhost:5000/image?name=${img}`} alt="preview image" className="image-hero-banner" /> :
                                    <img src={URL.createObjectURL(img)} alt="preview image" className="image-hero-banner" />}

                                <CButton onClick={() => removeImage(img)} color="danger">Usuń zdjęcie</CButton>
                            </div>)
                    }) : <></>}
                </CRow>
                <div className="component-box-footer">
                    <CButton color="danger" onClick={DoDeleteComponent}>Usuń komponent</CButton>
                    <CButton color="warning" onClick={removeChanges}>Odrzuć zmiany</CButton>
                    <CButton color="primary" onClick={DoSaveComponent}>Zapisz zmiany</CButton>
                </div>
            </div>
        </CRow>
    )
}

export default HeroBanner;