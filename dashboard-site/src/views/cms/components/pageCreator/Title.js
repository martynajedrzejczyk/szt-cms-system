import React from "react"
import "./styles.css"
const { CRow, CFormLabel, CCol, CFormInput, CFormCheck, CButton } = require("@coreui/react")

const Title = ({ text50, order_number, visible }) => {
    const [text, setText] = React.useState(text50);
    const [order, setOrder] = React.useState(order_number);
    const [visibility, setVisibility] = React.useState(visible);
    const validateText50 = (e) => {
        if (e.target.value.length <= 50) {
            setText(e.target.value)
        } else {
            alert("Maksymalna długość tekstu wynosi 50 znaków")
        }
    }
    return (
        <CRow className="mb-8">
            <div className="component-box">
                <div className="component-box-header">
                    <h4>Tytuł</h4>
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
                </CRow>
                <div className="component-box-footer">
                    <CButton color="danger">Usuń komponent</CButton>
                    <CButton color="primary">Zapisz zmiany</CButton>
                </div>
            </div>
        </CRow>
    )
}

export default Title;