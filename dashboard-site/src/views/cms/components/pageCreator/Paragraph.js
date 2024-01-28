import React from "react"
import "./styles.css"
const { CRow, CFormLabel, CCol, CFormInput, CFormCheck, CButton, CFormTextarea } = require("@coreui/react")

const Paragraph = ({ data, saveComponent, deleteComponent }) => {
    const [text1500, setText1500] = React.useState(data.propTextLong);
    const [order, setOrder] = React.useState(data.order_number);
    const [visibility, setVisibility] = React.useState(data.visible);

    const validateText1500 = (e) => {
        if (e.target.value.length <= 1500) {
            setText1500(e.target.value)
        } else {
            alert("Maksymalna długość tekstu wynosi 50 znaków")
        }
    }
    const DoDeleteComponent = () => {
        deleteComponent(data._id, data.order_number, data.page_id)
    }
    const DoSaveComponent = () => {
        saveComponent({ _id: data._id, page_id: data.page_id, component_type: data.component_type, propTextShort: "", order_number: order, visible: visibility, propTextMid: "", propTextLong: text1500, propImages: "" });
    }                              //id, page_id, propTextShort, propTextMid, propTextLong, propImages, order_number, visible
    return (
        <CRow className="mb-8">
            <div className="component-box">
                <div className="component-box-header">
                    <h4>Akapit</h4>
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
                            Treść
                        </CFormLabel>
                        <CCol sm={8}>
                            <CFormTextarea id="exampleFormControlTextarea1" className="textarea-input" value={text1500} onChange={validateText1500} rows={3}></CFormTextarea>
                        </CCol>
                    </CRow>
                </CRow>
                <div className="component-box-footer">
                    <CButton color="danger" onClick={DoDeleteComponent}>Usuń komponent</CButton>
                    <CButton color="primary" onClick={DoSaveComponent}>Zapisz zmiany</CButton>
                </div>
            </div>
        </CRow>
    )
}

export default Paragraph;