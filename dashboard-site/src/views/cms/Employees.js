import React, { useEffect } from 'react'
import { CCol, CRow, CButton, CTable } from '@coreui/react'
import { DocsExample } from 'src/components'
import { getCities, getEmployees, getUsers } from 'src/api/getData'
import CIcon from '@coreui/icons-react'
import { cilSettings, cilTrash } from '@coreui/icons'
import { formatDate } from 'src/utils/FormatData'
import PopupAddEmployee from './components/PopupAddEmployee'
import { postEmployee } from 'src/api/postData'
import PopupEmployee from './components/PopupEmployee'
import { putEmployee } from 'src/api/putData'
import { deleteEmployee } from 'src/api/deleteData'

const Employees = () => {

  const [employees, setEmployees] = React.useState([])
  const [users, setUsers] = React.useState([])
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [popupAddOpen, setPopupAddOpen] = React.useState(false);
  const [popupInfo, setPopupInfo] = React.useState({ name: '', surname: '', city: '', description: '', visible: true, image: '' });
  const [cities, setCities] = React.useState([]);

  const handlePostEmployee = (name, surname, city, description, visible, image) => {
    console.log(name, surname, city, description, visible, image)
    postEmployee(name, surname, city, description, visible, image).then((data) => {
      console.log(data);
      loadData();
      setPopupAddOpen(false);
      //TODO - wyskakuje user error przy dodawaniu pracownika
    })
  }

  const handleRowEdit = (id, name, surname, city, description, visible, image) => {
    setPopupInfo(() => ({ id, name, surname, city, description, visible, image }))
    console.log(id, name)
    setPopupOpen(true)
  }

  const handleChangeEmployee = (id, name, surname, city, description, visible, image) => {
    putEmployee(id, name, surname, city, description, visible, image).then((data) => {
      loadData();
    })
    setPopupOpen(false)

  }

  const handleRowDelete = (id) => {
    deleteEmployee(id)
    loadData();
  }

  const columns = [
    { key: 'name', label: 'Imię', _props: { scope: 'col' } },
    { key: 'surname', label: 'Nazwisko', _props: { scope: 'col' } },
    { key: 'city_name', label: 'Miasto', _props: { scope: 'col' } },
    { key: 'description', label: 'Opis', _props: { scope: 'col' }, _style: { width: '40%' } },
    { key: 'visible', label: 'Widoczność', _props: { scope: 'col' } },
    { key: 'created_at', label: 'Utworzono', _props: { scope: 'col' } },
    { key: 'created_by_name', label: 'Utworzono przez', _props: { scope: 'col' } },
    { key: 'modified_at', label: 'Zmodyfikowano', _props: { scope: 'col' } },
    { key: 'modified_by_name', label: 'Zmodyfikowano przez', _props: { scope: 'col' } },
    { key: 'image', label: 'Zdjęcie', _props: { scope: 'col' } },
    { key: 'edit', label: ' ', _props: { scope: 'col' }, _style: { width: '1%' } },
    { key: 'delete', label: ' ', _props: { scope: 'col' }, _style: { width: '1%' } },
  ]

  const loadData = () => {
    getUsers().then((users) => {
      setUsers(users);
      getCities().then((cities) => {
        // console.log("users", users);
        // console.log("cities", cities);
        setCities(cities);
        getEmployees().then((data) => {
          setEmployees(data.map((employee) => {
            return {
              _id: employee._id,
              name: employee.name,
              surname: employee.surname,
              city: employee.city,
              city_name: cities.find((city) => city._id === employee.city).name,
              description: employee.description,
              visible: employee.visible ? 'tak' : 'nie',
              created_at: formatDate(employee.created_at),
              created_by: employee.created_by,
              created_by_name: users.find((user) => user._id === employee.created_by).name + ' ' + users.find((user) => user._id === employee.created_by).surname,
              modified_at: formatDate(employee.modified_at),
              modified_by: employee.modified_by,
              modified_by_name: users.find((user) => user._id === employee.modified_by).name + ' ' + users.find((user) => user._id === employee.modified_by).surname,
              image: employee.image,
              _cellProps: { id: { scope: 'row' } },
              edit: (
                <div
                  style={
                    {
                      cursor: 'pointer'
                    }
                  }
                  onClick={() => {
                    handleRowEdit(employee._id, employee.name, employee.surname, employee.city, employee.description, employee.visible, employee.image)
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
                    handleRowDelete(employee._id)
                  }}
                >
                  <CIcon icon={cilTrash} size="xl" />
                </div>
              )
            }
          }))
        })
      })
    })
  }

  useEffect(() => {
    loadData();
  }, [])

  const handlePopupAddOpen = () => {
    if (cities.length === 0) {
      getCities().then((data) => {
        setCities(data);
      })
    }
    console.log(cities);
    setPopupAddOpen(true);
  }

  return (
    <CCol>
      {popupAddOpen ? <PopupAddEmployee cities={cities} closePopup={() => setPopupAddOpen(false)} postData={handlePostEmployee} /> : <></>}
      {popupOpen ? <PopupEmployee id={popupInfo.id} name={popupInfo.name} cityId={popupInfo.city} surname={popupInfo.surname} description={popupInfo.description} visible={popupInfo.visible} image={popupInfo.image} users={users} cities={cities} closePopup={() => setPopupOpen(false)} changeData={handleChangeEmployee} /> : <></>}
      <CRow>
        <CCol md={9}>
          <h1>Pracownicy</h1>
          <h4>Lista pracowników:</h4>
        </CCol>
        <CCol xs={2}>
          <CButton color="primary" onClick={() => handlePopupAddOpen()}>Dodaj pracownika</CButton>
        </CCol>
      </CRow >
      <CTable responsive hover columns={columns} items={employees} />
    </CCol >
  )
}

export default Employees
