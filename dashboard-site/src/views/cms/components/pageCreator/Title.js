import React from "react"
import "./styles.css"
const { CRow, CFormLabel, CCol, CFormInput, CFormCheck, CButton } = require("@coreui/react")

const Title = ({ data, saveComponent, deleteComponent }) => {
    const [text, setText] = React.useState(data.propTextShort);
    const [order, setOrder] = React.useState(data.order_number);
    const [visibility, setVisibility] = React.useState(data.visible);
    const validateText50 = (e) => {
        if (e.target.value.length <= 50) {
            setText(e.target.value)
        } else {
            alert("Maksymalna długość tekstu wynosi 50 znaków")
        }
    }

    const DoSaveComponent = () => {
        console.log({ page_id: data.page_id, component_type: "Title", text50: text, order_number: order, visible: visibility })
        saveComponent({ _id: data._id, page_id: data.page_id, component_type: data.component_type, propTextShort: text, order_number: order, visible: visibility, propTextMid: "", propTextLong: "", propImages: "" });
    }
    // _id: update_data['_id'],
    // 'page_id': update_data['page_id'],
    // 'order_number': update_data['order_number'],
    // 'component_type': update_data['component_type'],
    // 'propTextShort': update_data['propTextShort'],
    // 'propTextMid': update_data['propTextMid'],
    // 'propTextLong': update_data['propTextLong'],
    // 'propImages': update_data['propImages'],
    // 'visible': update_data['visible']

    const DoDeleteComponent = () => {
        deleteComponent(data._id, data.order_number, data.page_id)
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
                    <CButton color="danger" onClick={DoDeleteComponent} >Usuń komponent</CButton>
                    <CButton color="primary" onClick={DoSaveComponent}>Zapisz zmiany</CButton>
                </div>
            </div>
        </CRow>
    )
}

export default Title;