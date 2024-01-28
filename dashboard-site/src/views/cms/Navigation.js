import React, { useEffect } from 'react'
import { CCol, CRow, CButton, CTable } from '@coreui/react'
import { getCities } from 'src/api/getData'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilSettings } from '@coreui/icons'
import 'reactjs-popup/dist/index.css';
import PopupNavigation from './components/PopupNavigation'
import { putCity } from 'src/api/putData'
import PopupAddNavigation from './components/PopupAddNavigation'
import { postCity } from 'src/api/postData'
import { deleteCity } from 'src/api/deleteData'
import { ReactSession } from 'react-client-session';
import { Navigate } from 'react-router-dom'

const Cities = () => {
  const [rows, setRows] = React.useState([]);
  const [popupInfo, setPopupInfo] = React.useState({ id: '', name: '' });
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [popupAddOpen, setPopupAddOpen] = React.useState(false);

  const handleRowEdit = (id, name, visible) => {
    setPopupInfo({ id, name, visible })
    console.log(id, name)
    setPopupOpen(true)
  }

  const handleChangeCity = (name, visible) => {
    console.log(popupInfo.id, name, visible)
    putCity(popupInfo.id, name, visible).then(() => {
      loadData();
      setPopupOpen(false);
    })
  }

  const handlePostCity = (name, visible) => {
    console.log(name, visible)
    postCity(name, visible).then(() => {
      loadData();
      setPopupAddOpen(false);
    })
  }

  const handleRowDelete = (id, name) => {
    console.log(id, name)
    deleteCity(id).then(() => {
      loadData();
    })
  }

  const loadData = () => {
    getCities().then((data) => {
      setRows(data.map((city) => {
        return {
          _id: city._id,
          name: city.name,
          order:"123",
          visible: city.visible ? 'tak' : 'nie',
          parent_id:"123",
          _cellProps: { id: { scope: 'row' } },
          edit: (
            <div
              style={
                {
                  cursor: 'pointer'
                }
              }
              onClick={() => {
                handleRowEdit(city._id, city.name, city.visible)
              }}
            >
              <CIcon icon={cilSettings} size="xl" />
            </div>
          ),
          delete: (
            <div
              style={
                {
                  cursor: 'pointer'
                }
              }
              onClick={() => {
                handleRowDelete(city._id, city.name, city.visible)
              }}
            >
              <CIcon icon={cilDelete} size="xl" />
            </div>
          )
        }
      })
      )
    })
  }

  useEffect(() => {
    console.log('cities')
    loadData()
  }, [])

  const columns = [
    { key: 'name', label: 'Nazwa', _props: { scope: 'col' }, _style: { width: '40%' } },
    { key: 'order', label: 'Kolejność', _props: { scope: 'col' }},
    {key: 'visible', label: 'Widoczność', _props: { scope: 'col' } },
    {key: 'parent_id', label: 'ID Rodzica', _props: { scope: 'col' }, _style: { width: '40%' } },
    { key: 'edit', label: ' ', _props: { scope: 'col' }, _style: { width: '1%' } },
    { key: 'delete', label: ' ', _props: { scope: 'col' }, _style: { width: '1%' } },
  ]

  const closePopup = () => {
    setPopupOpen(false)
  }

  return (
    <>    {
      ReactSession.get("loggedIn") ? <CCol>
        {popupAddOpen ? <PopupAddNavigation closePopup={() => setPopupAddOpen(false)} postData={handlePostCity} /> : <></>}
        {popupOpen ? <PopupNavigation name={popupInfo.name} visible={popupInfo.visible} closePopup={closePopup} changeData={handleChangeCity} /> : <></>}
        <CRow>
          <CCol md={9}>
            <h1>Nawigacja</h1>
            <h4>Lista pozycji w menu nawigacji</h4>
          </CCol>
          <CCol xs={2}>
            <CButton color="primary" onClick={() => setPopupAddOpen(true)}>Dodaj miasto</CButton>
          </CCol>
        </CRow>
        <CTable columns={columns} items={rows} />
      </CCol> : <Navigate to="/login" />
    }
    </>

  )
}

export default Cities
