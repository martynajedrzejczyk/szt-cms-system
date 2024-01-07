import React, { useEffect } from 'react'
import { CCol, CRow, CButton, CTable } from '@coreui/react'
import { DocsExample } from 'src/components'
import { getCities } from 'src/api/getData'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilSettings } from '@coreui/icons'
import 'reactjs-popup/dist/index.css';
import PopupCity from './components/PopupCity'
import { putCity } from 'src/api/putData'
import PopupAddCity from './components/PopupAddCity'
import { postCity } from 'src/api/postData'
import { deleteCity } from 'src/api/deleteData'

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
    deleteCity(name).then(() => {
      loadData();
    })
  }

  const loadData = () => {
    getCities().then((data) => {
      setRows(data.map((city) => {
        return {
          _id: city._id,
          name: city.name,
          visible: city.visible ? 'tak' : 'nie',
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
    {
      key: 'visible',
      label: 'Widoczność',
      _props: { scope: 'col' },
    },
    { key: 'edit', label: ' ', _props: { scope: 'col' }, _style: { width: '1%' } },
    { key: 'delete', label: ' ', _props: { scope: 'col' }, _style: { width: '1%' } },
  ]

  const closePopup = () => {
    setPopupOpen(false)
  }

  return (
    <CCol>
      {popupAddOpen ? <PopupAddCity closePopup={() => setPopupAddOpen(false)} postData={handlePostCity} /> : <></>}
      {popupOpen ? <PopupCity name={popupInfo.name} visible={popupInfo.visible} closePopup={closePopup} changeData={handleChangeCity} /> : <></>}
      <CRow>
        <CCol md={9}>
          <h1>Miasta</h1>
          <h4>Lista miast, w których świadczone są usługi:</h4>
        </CCol>
        <CCol xs={2}>
          <CButton color="primary" onClick={() => setPopupAddOpen(true)}>Dodaj miasto</CButton>
        </CCol>
      </CRow>
      <CTable columns={columns} items={rows} />
    </CCol>
  )
}

export default Cities
