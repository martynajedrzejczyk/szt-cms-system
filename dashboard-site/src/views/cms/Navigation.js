import React, { useEffect } from 'react'
import { CCol, CRow, CButton, CTable } from '@coreui/react'
import { getCities, getNavigations } from 'src/api/getData'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilSettings } from '@coreui/icons'
import 'reactjs-popup/dist/index.css';
import PopupNavigation from './components/PopupNavigation'
import { putNavigation } from 'src/api/putData'
import PopupAddNavigation from './components/PopupAddNavigation'
import { postNavigation } from 'src/api/postData'
import { deleteNavigation } from 'src/api/deleteData'
import { ReactSession } from 'react-client-session';
import { Navigate } from 'react-router-dom'

const Navigations = () => {
  const [rows, setRows] = React.useState([]);
  const [popupInfo, setPopupInfo] = React.useState({ id: '', name: '' });
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [popupAddOpen, setPopupAddOpen] = React.useState(false);

  const handleRowEdit = (id, name, order, parent_id, visible) => {
    setPopupInfo({ id, name, order, parent_id, visible })
    console.log(id, name, order, parent_id, visible)
    setPopupOpen(true)
  }

  const handleChangeNavigation = (name, order, parent_id, visible) => {
    console.log(popupInfo.id, name, order, parent_id, visible)
    putNavigation(popupInfo.id, name, order, parent_id,  visible).then(() => {
      loadData();
      setPopupOpen(false);
    })
  }

  const handlePostNavigation = (name, order, parent_id, visible) => {
    console.log(name, order, parent_id, visible)
    postNavigation(name, order, parent_id, visible).then(() => {
      loadData();
      setPopupAddOpen(false);
    })
  }

  const handleRowDelete = (id, order, parent_id) => {
    console.log(id, order, parent_id)
    deleteNavigation(id, order, parent_id).then(() => {
      loadData();
    })
  }
  const loadData = () => {
    getNavigations().then((data) => {
      console.log(data)
      setRows(data.map((navigation) => {
        return {
          _id: navigation._id?.$oid,
          name: navigation.name, 
          order: navigation.order,
          visible: navigation.visible ? 'tak' : 'nie',
          parent_id: data.find((nav) => nav?._id?.$oid === navigation?.parent_id?.$oid)?.name || 'brak',
          _cellProps: { id: { scope: 'row' } },
          edit: (
            <div
              style={
                {
                  cursor: 'pointer'
                }
              }
              onClick={() => {
                handleRowEdit(navigation._id?.$oid, navigation.name, navigation.visible)
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
                handleRowDelete(navigation._id?.$oid, navigation.order, navigation?.parent_id?.$oid)
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
    console.log('navigations')
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
        {popupAddOpen ? <PopupAddNavigation closePopup={() => setPopupAddOpen(false)} postData={handlePostNavigation} navigationToChoose={rows} /> : <></>}
        {popupOpen ? <PopupNavigation _id={popupInfo.id} name={popupInfo.name} visible={popupInfo.visible} closePopup={closePopup} changeData={handleChangeNavigation} navigationToChoose={rows} /> : <></>}
        <CRow>
          <CCol md={9}>
            <h1>Nawigacja</h1>
            <h4>Lista pozycji w menu nawigacji</h4>
          </CCol>
          <CCol xs={2}>
            <CButton color="primary" onClick={() => setPopupAddOpen(true)}>Dodaj nawigację</CButton>
          </CCol>
        </CRow>
        <CTable columns={columns} items={rows} />
      </CCol> : <Navigate to="/login" />
    }
    </>

  )
}

export default Navigations
