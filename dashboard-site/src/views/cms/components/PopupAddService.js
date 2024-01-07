import { CButton, CCol, CFormCheck, CFormInput, CFormLabel, CFormTextarea, CRow } from "@coreui/react";
import "./Popup.css"
import React from 'react';

const PopupAddService = ({ closePopup, postData }) => {
    const [newName, setNewName] = React.useState("");
    const [newVisibility, setNewVisibility] = React.useState(true);
    const [newDescription, setNewDescription] = React.useState("");
    const [newPrice, setNewPrice] = React.useState(0);

    return (
        <div className="popup-container-large">
            <div className="popup-header">
                <h3 className="popup-title">Dodawanie usługi</h3>
                <button className="popup-close" onClick={closePopup}>X</button>
            </div>
            <CRow className="mb-3">
                <CFormLabel htmlFor="inputtext" className="col-sm-3 col-form-label">
                    Nazwa
                </CFormLabel>
                <CCol sm={8}>
                    <CFormInput type="text" id="inputtext" value={newName} onChange={(e) => setNewName(e.target.value)} />
                </CCol>
            </CRow>
            <CRow className="mb-3 popup-line">
                <CFormLabel htmlFor="inputtext" className="col-sm-3 col-form-label">
                    Opis
                </CFormLabel>
                <CCol sm={8}>
                    <CFormTextarea id="exampleFormControlTextarea1" className="textarea-input" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} rows={3}></CFormTextarea>
                </CCol>
            </CRow>
            <CRow className="mb-3 popup-line">
                <CFormLabel htmlFor="inputtext" className="col-sm-3 col-form-label">
                    Widoczność
                </CFormLabel>
                <CCol sm={8}>
                    <CFormCheck checked={newVisibility} className="col-sm-4" id="inputtext" onChange={(e) => { setNewVisibility(e.target.checked) }} />
                </CCol>
            </CRow>
            <CRow className="mb-3 popup-line">
                <CFormLabel htmlFor="inputtext" className="col-sm-3 col-form-label">
                    Cena
                </CFormLabel>
                <CCol sm={8}>
                    <CFormInput type="number" id="inputprice" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
                </CCol>
            </CRow>
            <CRow className="mb-3 popup-buttons">
                <CButton color="primary" className="col-sm-2" onClick={() => postData(newName, newVisibility, newDescription, newPrice)}>Dodaj</CButton>
                <CButton color="primary" className="col-sm-2" onClick={closePopup}>Anuluj</CButton>
            </CRow>

        </div>
    )
};

export default PopupAddService;