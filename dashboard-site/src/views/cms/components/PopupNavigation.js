import { CButton, CCol, CFormCheck, CFormInput, CFormLabel, CRow, CFormSelect } from "@coreui/react";
import "./Popup.css"
import React from 'react';
import PropTypes from 'prop-types';

const PopupNavigation = ({ name, visible, parentId, closePopup, changeData, navigationToChoose }) => {
    const [newName, setNewName] = React.useState(name);
    const [newVisibility, setNewVisibility] = React.useState(visible);
    const [newOrder, setNewOrder] = React.useState("1");
    const [newParentId, setNewParentId] = React.useState(navigationToChoose.find((navigation) => navigation.id === parentId)._id);

    const options = [
        { value: null, label: "Brak" }, // Adjust the label accordingly
        ...navigationToChoose.map((navigation) => ({
            value: navigation._id,
            label: navigation.name
        }))
    ];

    return (
        <div className="popup-container">
            <div className="popup-header">
                <h3 className="popup-title">Edycja nawigacji {name}</h3>
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
            <CRow className="mb-3">
                <CFormLabel htmlFor="inputtext" className="col-sm-3 col-form-label">
                    Kolejność
                </CFormLabel>
                <CCol sm={8}>
                    <CFormInput type="number" id="inputtext" value={newOrder} onChange={(e) => setNewOrder(e.target.value)} />
                </CCol>
            </CRow>
            <CRow className="mb-3 popup-line">
                <CFormLabel htmlFor="inputtext" className="col-sm-3 col-form-label">
                    Sekcja nadrzędna
                </CFormLabel>
                <CCol sm={8}>
                    <CFormSelect id="inputtext" value={newParentId} onChange={(e) => setNewParentId(e.target.value)} options={options} />
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
                <CButton color="primary" className="col-sm-2" onClick={() => changeData(newName,newOrder, newParentId, newVisibility)}>Zapisz</CButton>
                <CButton color="primary" className="col-sm-2" onClick={closePopup}>Anuluj</CButton>
            </CRow>

        </div>
    )
};

PopupNavigation.propTypes = {
    closePopup: PropTypes.func.isRequired,
    name: PropTypes.func.isRequired,
    visible: PropTypes.func.isRequired,
    changeData: PropTypes.func.isRequired,
}

export default PopupNavigation;