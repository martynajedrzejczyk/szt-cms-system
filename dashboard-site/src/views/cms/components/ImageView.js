import { CButton, CCol, CFormInput, CFormLabel, CRow } from '@coreui/react';
import React, { useEffect } from 'react'
import { getImage } from 'src/api/getData';

const ImageView = ({ employee_id, image_name, name, surname, closePopup, save }) => {
    const [image, setImage] = React.useState(null);

    const uploadImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const saveImage = () => {
        if (image === null) {
            alert("Nie wybrano zdjęcia");
            return;
        }
        save(image);
        console.log(image)
    }

    return (
        <div className="popup-container">
            <div className="popup-box">
                <div className="popup-header">
                    <h3 className="popup-title">{name} {surname}</h3>
                    <button className="popup-close" onClick={closePopup}>X</button>
                </div>
                <div className='img-container'>
                    <img src={`http://localhost:5000/image?name=${image_name}`} className='employee-image' alt="Zdjecie pracownika" />
                    <CRow className="mb-3 popup-line">
                        <CFormLabel htmlFor="inputtext" className="col-sm-3 col-form-label">
                            Wybierz nowe zdjęcie
                        </CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="file" className='input-image' onChange={uploadImage} id="formFile" accept=".jpg, .jpeg, .png" />
                        </CCol>
                    </CRow>
                    <CButton onClick={saveImage}>Zmień</CButton>
                </div>
            </div>
        </div>
    )
}

export default ImageView;