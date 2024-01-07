import { CButton, CCol, CFormCheck, CFormInput, CFormLabel, CRow } from "@coreui/react";
import "./Popup.css"
import React from 'react';

const PopupAddCity = ({ name, visible, closePopup, postData }) => {
    const [newName, setNewName] = React.useState("");
    const [newVisibility, setNewVisibility] = React.useState(true);
    return (
        <div className="popup-container">
            <div className="popup-header">
                <h3 className="popup-title">Dodawanie miasta</h3>
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
                    Widoczność
                </CFormLabel>
                <CCol sm={8}>
                    <CFormCheck checked={newVisibility} className="col-sm-4" id="inputtext" onChange={(e) => { setNewVisibility(e.target.checked) }} />
                </CCol>
            </CRow>
            <CRow className="mb-3 popup-buttons">
                <CButton color="primary" className="col-sm-2" onClick={() => postData(newName, newVisibility)}>Dodaj</CButton>
                <CButton color="primary" className="col-sm-2" onClick={closePopup}>Anuluj</CButton>
            </CRow>

        </div>
    )
};

export default PopupAddCity;