import React from 'react'
import { CCol, CRow, CButton, CTable } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilSettings } from '@coreui/icons'
import { getServices, getUsers } from 'src/api/getData'
import PopupAddService from './components/PopupAddService'
import { postService } from 'src/api/postData'
import PopupService from './components/PopupService'
import { putService } from 'src/api/putData'
import { deleteService } from 'src/api/deleteData'

const Services = () => {
  const [services, setServices] = React.useState([])
  const [popupInfo, setPopupInfo] = React.useState({ id: '', name: '' });
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [popupAddOpen, setPopupAddOpen] = React.useState(false);

  const handleRowEdit = (id, name, visible, description, price) => {
    setPopupInfo({ id, name, visible, description, price })
    setPopupOpen(true);
  }

  const handleRowDelete = (e) => {
    deleteService(e).then(() => {
      loadData();
      console.log('usunięto usługę')
    })
  }

  const handlePostService = (name, visible, description, price) => {
    postService(name, visible, description, price).then(() => {
      loadData();
      setPopupAddOpen(false);
      console.log('dodano usługę')
    })
  }

  const handleChangeService = (id, name, visible, description, price) => {
    putService(id, name, visible, description, price).then(() => {
      loadData();
      setPopupOpen(false);
      console.log('zmieniono usługę')
    })
  }

  React.useEffect(() => {
    loadData();
  }, [])

  const loadData = () => {
    getServices().then((data) => {
      getUsers().then((users) => {
        setServices(data.map((service) => {
          return {
            _id: service._id,
            name: service.name,
            description: service.description,
            price: service.price,
            created_at: service.created_at,
            created_by: service.created_by,
            created_by_name: users.find((user) => user._id === service.created_by).name + ' ' + users.find((user) => user._id === service.created_by).surname,
            modified_at: service.modified_at,
            modified_by: service.modified_by,
            modified_by_name: users.find((user) => user._id === service.modified_by).name + ' ' + users.find((user) => user._id === service.modified_by).surname,
            _cellProps: { id: { scope: 'row' } },
            visible: service.visible ? 'Tak' : 'Nie',
            edit: (
              <div
                style={
                  {
                    cursor: 'pointer'
                  }
                }
                onClick={() => {
                  handleRowEdit(service._id, service.name, service.visible, service.description, service.price)
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
                  handleRowDelete(service._id)
                }}
              >
                <CIcon icon={cilDelete} size="xl" />
              </div>
            )
          }
        })
        )
      })
    })
  }

  const columns = [
    { key: 'name', label: 'Nazwa', _props: { scope: 'col' } },
    {
      key: 'description',
      label: 'Opis usługi',
      _props: { scope: 'col' },
      _style: { width: '70%' },
    },
    { key: 'price', label: 'Cena', _props: { scope: 'col' } },
    { key: 'visible', label: 'Widoczna', _props: { scope: 'col' } },
    { key: 'created_by_name', label: 'Utworzona przez', _props: { scope: 'col' } },
    { key: 'created_at', label: 'Utworzona', _props: { scope: 'col' } },
    { key: 'modified_by_name', label: 'Zmodyfikowana przez', _props: { scope: 'col' } },
    { key: 'modified_at', label: 'Zmodyfikowana', _props: { scope: 'col' } },
    { key: 'edit', label: ' ', _props: { scope: 'col' }, _style: { width: '1%' } },
    { key: 'delete', label: ' ', _props: { scope: 'col' }, _style: { width: '1%' } },
  ]
  return (
    <CCol>
      {popupAddOpen ? <PopupAddService closePopup={() => setPopupAddOpen(false)} postData={handlePostService} /> : <></>}
      {popupOpen ? <PopupService id={popupInfo.id} name={popupInfo.name} visible={popupInfo.visible} description={popupInfo.description} price={popupInfo.price} closePopup={() => setPopupOpen(false)} changeData={handleChangeService} /> : <></>}
      <CRow>
        <CCol xs={8}>
          <h1>Usługi</h1>
        </CCol>
        <CCol xs={4}>
          <CButton color="primary" onClick={() => setPopupAddOpen(true)}>Dodaj usługę</CButton>
        </CCol>
      </CRow>
      <CTable columns={columns} items={services} responsive />
    </CCol>
  )
}

export default Services;