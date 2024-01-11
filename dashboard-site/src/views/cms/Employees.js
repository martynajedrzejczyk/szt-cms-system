import React, { useEffect } from 'react'
import { CCol, CRow, CButton } from '@coreui/react'
import { DocsExample } from 'src/components'
import { getEmployees } from 'src/api/getData'

const Employees = () => {

  const [employees, setEmployees] = React.useState([])
  const [popupInfo, setPopupInfo] = React.useState({ id: '', name: '' });
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [popupAddOpen, setPopupAddOpen] = React.useState(false);

  useEffect(() => {
    getEmployees().then((data) => {
      console.log(data)
    })
    // getEmployees().then((data) => {
    //   setEmployees(data.map((employee) => {
    //     return {
    //       _id: employee._id,
    //       name: employee.name,
    //       visible: employee.visible ? 'tak' : 'nie',
    //       _cellProps: { id: { scope: 'row' } },
    //       edit: (
    //         <div
    //           style={
    //             {
    //               cursor: 'pointer'
    //             }
    //           }
    //           onClick={() => {
    //             handleRowEdit(employee._id, employee.name, employee.visible)
    //           }}
    //         >
    //           <CIcon icon={cilSettings} size="xl" />
    //         </div>
    //       ),
    //       delete: (
    //         <div
    //           style={
    //             {
    //               cursor: 'pointer'
    //             }
    //           }
    //           onClick={() => {
    //             handleRowDelete(employee._id, employee.name)
    //           }}
    //         >
    //           <CIcon icon={cilTrash} size="xl" />
    //         </div>
    //       )
    //     }
    //   }))
    // })
  }, [])

  return (
    <CCol>
      <CRow>
        <CCol xs={9}>
          <h1>Pracownicy</h1>
          <h4>Lista pracowników:</h4>
        </CCol>
        <CCol xs={3}>
          <CButton color="primary">Dodaj nowego pracownika</CButton>
        </CCol>
      </CRow>
      <CRow xs={12}>lalala</CRow>
    </CCol>
  )
}

export default Employees
