import { CButton } from '@coreui/react';
import React, { useEffect } from 'react'
import { getImage } from 'src/api/getData';

const ImageView = ({ employee_id, image_name, name, surname, closePopup }) => {
    const [image, setImage] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    console.log(name, surname, image_name)

    return (
        <div className="popup-container">
            <div className="popup-header">
                <h3 className="popup-title">{name} {surname}</h3>
                <button className="popup-close" onClick={closePopup}>X</button>
            </div>
            <div className='img-container'>
                <img src={`http://localhost:5000/image?name=${image_name}`} className='employee-image' alt="Zdjecie pracownika" />
                <CButton>Zmień</CButton>
            </div>
        </div>
    )
}

export default ImageView;