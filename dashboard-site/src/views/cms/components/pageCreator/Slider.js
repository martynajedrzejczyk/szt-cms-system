import React from "react"
import "./styles.css"
import { array_move } from "src/utils/arrayOperations"
const { CRow, CFormLabel, CCol, CFormInput, CFormCheck, CButton } = require("@coreui/react")

const Slider = ({ text50, order_number, visible }) => {
    const [text, setText] = React.useState(text50);
    const [order, setOrder] = React.useState(order_number);
    const [visibility, setVisibility] = React.useState(visible);
    const [choosenImage, setChoosenImage] = React.useState([]); // [image, order
    const [images, setImages] = React.useState([]);
    const validateText50 = (e) => {
        if (e.target.value.length <= 50) {
            setText(e.target.value)
        } else {
            alert("Maksymalna długość tekstu wynosi 50 znaków")
        }
    }
    const saveImage = () => {
        const oldFiles = images;
        const fileOrder = oldFiles.length + 1;
        setImages([...oldFiles, [choosenImage, fileOrder]]);
    }
    const uploadImage = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setChoosenImage(file);
    }

    const deleteImage = (imageOrder) => {
        if (images.length === 1) {
            setImages([]);
            return;
        }
        const oldFiles = images;
        oldFiles.splice(imageOrder - 1, 1);
        console.log(oldFiles)
        oldFiles.forEach((file, index) => {
            console.log(index, imageOrder, file)
            if (index >= imageOrder - 1)
                file[1] = file[1] - 1;
        })
        setImages([...oldFiles]);
    }

    const changeImageOrder = (newOrder, image) => {
        const oldFiles = images;
        const oldOrder = image[1];
        const newOrderInt = parseInt(newOrder);
        console.log("przed", images)
        if (newOrderInt - 1 > oldFiles.length || newOrderInt < 1) {
            alert("Nieprawidłowa wartość");
            return;
        }
        const newFiles = array_move(oldFiles, oldOrder - 1, newOrderInt - 1);
        console.log("po", newFiles)
        setImages([...newFiles]);
    }

    return (
        <CRow className="mb-8">
            <div className="component-box">
                <div className="component-box-header">
                    <h4>Slider</h4>
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
                            Tytuł (opcjonalnie)
                        </CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="pageNameText" value={text} onChange={validateText50} />
                        </CCol>
                    </CRow>
                    <h6>Zdjęcia</h6>
                    <CRow className="mb-3 popup-line">
                        <CCol sm={10}>
                            <CFormInput type="file" onChange={uploadImage} id="formFile" accept=".jpg, .jpeg, .png" />
                        </CCol>
                        <CCol sm={2}>
                            <CButton color="primary" onClick={saveImage}>Dodaj zdjęcie</CButton>
                        </CCol>
                    </CRow>
                    {images.map((image, index) => {
                        console.log(images)
                        const img = image[0];
                        const imageOrder = image[1];
                        console.log(image)
                        return (
                            <div className="image-box-slider" key={index}>
                                <div>Zdjęcie {imageOrder}</div>
                                <img src={URL.createObjectURL(img)} alt="Przesłane zdjęcie" />
                                <div className="order-box">
                                    <span className="order-label">Kolejność</span>
                                    <CCol sm={4}>
                                        <CFormInput type="number" id="inputprice" value={imageOrder} onChange={(e) => changeImageOrder(e.target.value, image)} />
                                    </CCol>
                                </div>
                                <CButton color="danger" onClick={() => deleteImage(imageOrder)}>Usuń zdjęcie</CButton>
                            </div>
                        )
                    })
                    }
                </CRow>
                <div className="component-box-footer">
                    <CButton color="danger">Usuń komponent</CButton>
                    <CButton color="primary">Zapisz zmiany</CButton>
                </div>
            </div>
        </CRow>
    )
}

export default Slider;