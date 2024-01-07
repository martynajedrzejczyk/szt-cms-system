import React from 'react';
import "./Popup.css";
import PropTypes from 'prop-types';
import { CButton, CCol, CFormCheck, CFormInput, CFormLabel, CRow } from '@coreui/react';

const PopupCity = ({ name, visible, closePopup, changeData }) => {
    const [newName, setNewName] = React.useState(name);
    const [newVisibility, setNewVisibility] = React.useState(visible);
    return (
        <div className="popup-container">
            <div className="popup-header">
                <h3 className="popup-title">Edycja miasta {name}</h3>
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
                <CFormCheck checked={newVisibility} className="col-sm-4" id="inputtext" onChange={(e) => { setNewVisibility(e.target.checked) }} />
            </CRow>
            <CRow className="mb-3 popup-buttons">
                <CButton color="primary" className="col-sm-2" onClick={() => changeData(newName, newVisibility)}>Zapisz</CButton>
                <CButton color="primary" className="col-sm-2" onClick={closePopup}>Anuluj</CButton>
            </CRow>

        </div>
    )
}

PopupCity.propTypes = {
    closePopup: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    changeData: PropTypes.func.isRequired,
};

export default PopupCity;