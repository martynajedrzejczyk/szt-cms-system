import { CButton, CCol, CFormCheck, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from "@coreui/react";
import "./Popup.css"
import React from 'react';

const PopupAddEmployee = ({ cities, closePopup, postData }) => {
    const [newName, setNewName] = React.useState("");
    const [newSurname, setNewSurname] = React.useState("");
    const [newCity, setNewCity] = React.useState("");
    const [newDescription, setNewDescription] = React.useState("");
    const [newVisibility, setNewVisibility] = React.useState(true);
    const [newImage, setNewImage] = React.useState("tupowinnobyczdjecie");

    const options = cities.map((city) => {
        return {
            value: city._id,
            label: city.name
        }
    })
    // add 'Open this select menu', to the first option
    options.unshift({ value: '', label: 'Wybierz miasto', disabled: true, hidden: true })

    const uploadImage = (e) => {
        const file = e.target.files[0];
        setNewImage(file);
    }

    return (
        <div className="popup-container">
            <div className="popup-header">
                <h3 className="popup-title">Dodawanie pracownika</h3>
                <button className="popup-close" onClick={closePopup}>X</button>
            </div>
            <CRow className="mb-3">
                <CFormLabel htmlFor="inputtext" className="col-sm-3 col-form-label">
                    Imię
                </CFormLabel>
                <CCol sm={8}>
                    <CFormInput type="text" id="inputtext" value={newName} onChange={(e) => setNewName(e.target.value)} />
                </CCol>
            </CRow>
            <CRow className="mb-3">
                <CFormLabel htmlFor="inputtext" className="col-sm-3 col-form-label">
                    Nazwisko
                </CFormLabel>
                <CCol sm={8}>
                    <CFormInput type="text" id="inputtext" value={newSurname} onChange={(e) => setNewSurname(e.target.value)} />
                </CCol>
            </CRow>
            <CRow className="mb-3 popup-line">
                <CFormLabel htmlFor="inputtext" className="col-sm-3 col-form-label">
                    Miasto
                </CFormLabel>
                <CCol sm={8}>
                    <CFormSelect id="inputtext" value={newCity} onChange={(e) => setNewCity(e.target.value)} options={options} />
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
                    Zdjęcie
                </CFormLabel>
                <CCol sm={8}>
                    <CFormInput type="file" onChange={uploadImage} id="formFile" accept=".jpg, .jpeg, .png" />
                </CCol>
            </CRow>
            <CRow className="mb-3 popup-buttons">
                <CButton color="primary" className="col-sm-2" onClick={() => postData(newName, newSurname, newCity, newDescription, newVisibility, newImage)}>Dodaj</CButton>
                <CButton color="primary" className="col-sm-2" onClick={closePopup}>Anuluj</CButton>
                <CButton color="primary" className="col-sm-2" onClick={console.log(newImage)}>poka</CButton>
            </CRow>

        </div>
    )
};

export default PopupAddEmployee;