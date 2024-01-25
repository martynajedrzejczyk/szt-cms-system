import React, { useEffect } from 'react';
import "./Popup.css"
import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react';
import { getComponentTypes } from 'src/api/getData';

const PopupAddComponent = ({ closePopup, addComponent }) => {

    const [componentTypes, setComponentTypes] = React.useState([]);
    const [type, setType] = React.useState("");

    useEffect(() => {
        getComponentTypes().then((response) => {
            setComponentTypes(response);
            setType(response[0]._id)
        })
    }, []);

    const options = componentTypes.map((type) => {
        return {
            value: type._id,
            label: type.name
        }
    })

    return (
        <div className="popup-new-component">
            <div className="popup-header">
                <h3 className="popup-title">Dodawanie komponentu</h3>
                <button className="popup-close" onClick={closePopup}>X</button>
            </div>
            <CRow className="mb-3 popup-line">
                <h2 htmlFor="inputtext" className="col-sm-10 col-form-label">
                    Wybierz typ komponentu
                </h2>
            </CRow>
            <CCol sm={12}>
                <CFormSelect id="inputtext" value={type} onChange={(e) => setType(e.target.value)} options={options} />
            </CCol>

            <CRow className="mb-3 popup-buttons">
                <CButton color="primary" className="col-sm-2" onClick={() => addComponent(type)}>Dodaj</CButton>
                <CButton color="primary" className="col-sm-2" onClick={closePopup}>Anuluj</CButton>
            </CRow>
        </div>
    )
}

export default PopupAddComponent;