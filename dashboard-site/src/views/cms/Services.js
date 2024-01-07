import React from 'react'
import { CCol, CRow, CButton, CTable } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSettings } from '@coreui/icons'
import { getServices } from 'src/api/getData'
import PopupAddService from './components/PopupAddService'
import { postService } from 'src/api/postData'

const Services = () => {
  const [services, setServices] = React.useState([])
  const [popupInfo, setPopupInfo] = React.useState({ id: '', name: '' });
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [popupAddOpen, setPopupAddOpen] = React.useState(false);

  const handleRowEdit = (e) => {
    console.log(e)
  }

  const handlePostService = (name, visible, description, price) => {
    console.log(name, visible, description, price)
    postService(name, visible, description, price).then(() => {
      // loadData();
      // setPopupAddOpen(false);
      console.log('dodano usługę')

    })
  }

  // getServices().then(() => {
  //   console.log(services)
  // })

  // const loadData = () => {
  //   getServices().then((data) => {
  //     setServices(data.map((city) => {
  //       return {
  //         _id: city._id,
  //         name: city.name,
  //         visible: city.visible ? 'tak' : 'nie',
  //         _cellProps: { id: { scope: 'row' } },
  //         edit: (
  //           <div
  //             style={
  //               {
  //                 cursor: 'pointer'
  //               }
  //             }
  //             onClick={() => {
  //               handleRowEdit(city._id, city.name, city.visible)
  //             }}
  //           >
  //             <CIcon icon={cilSettings} size="xl" />
  //           </div>
  //         ),
  //         delete: (
  //           <div
  //             style={
  //               {
  //                 cursor: 'pointer'
  //               }
  //             }
  //             onClick={() => {
  //               handleRowDelete(city._id, city.name, city.visible)
  //             }}
  //           >
  //             <CIcon icon={cilDelete} size="xl" />
  //           </div>
  //         )
  //       }
  //     })
  //     )
  //   })
  // }

  const servicesRows = [
    {
      id: 1,
      name: 'usługa 1',
      description: 'opis usługi 1',
      price: 100.34,
      _cellProps: { id: { scope: 'row' } },
      edit: (
        <div
          onClick={() => {
            handleRowEdit(2)
          }}
        >
          <CIcon icon={cilSettings} size="xl" />
        </div>
      ),
    },
    {
      id: 2,
      name: 'usługa 1',
      description: 'opis usługi 1',
      price: 100.34,
      _cellProps: { id: { scope: 'row' } },
      edit: (
        <div
          onClick={() => {
            handleRowEdit(2)
          }}
        >
          <CIcon icon={cilSettings} size="xl" />
        </div>
      ),
    },
    {
      id: 3,
      name: 'usługa 1',
      description: 'opis usługi 1',
      price: 100.34,
      _cellProps: { id: { scope: 'row' } },
      edit: (
        <div
          onClick={() => {
            handleRowEdit(2)
          }}
        >
          <CIcon icon={cilSettings} size="xl" />
        </div>
      ),
    },
  ]
  const columns = [
    {
      key: 'id',
      label: ' ',
      _props: { scope: 'col' },
      _style: { width: '5%' },
    },
    { key: 'name', label: 'Nazwa', _props: { scope: 'col' } },
    {
      key: 'description',
      label: 'Opis usługi',
      _props: { scope: 'col' },
      _style: { width: '70%' },
    },
    { key: 'price', label: 'Cena', _props: { scope: 'col' } },
    { key: 'edit', label: ' ', _props: { scope: 'col' }, _style: { width: '1%' } },
  ]
  return (
    <CCol>
      {popupAddOpen ? <PopupAddService closePopup={() => setPopupAddOpen(false)} postData={handlePostService} /> : <></>}
      {/* {popupOpen ? <PopupService name={popupInfo.name} visible={popupInfo.visible} closePopup={closePopup} changeData={handleChangeCity} /> : <></>} */}
      <CRow>
        <CCol xs={8}>
          <h1>Usługi</h1>
        </CCol>
        <CCol xs={4}>
          <CButton color="primary" onClick={() => setPopupAddOpen(true)}>Dodaj usługę</CButton>
        </CCol>
      </CRow>
      <CTable columns={columns} items={servicesRows} responsive />
    </CCol>
  )
}

export default Services;