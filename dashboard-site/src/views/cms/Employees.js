import React from 'react'
import { CCol, CRow, CButton } from '@coreui/react'
import { DocsExample } from 'src/components'

const Employees = () => {
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
