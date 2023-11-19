import React from 'react'
import { CCol, CRow, CButton } from '@coreui/react'
import { DocsExample } from 'src/components'

const Cities = () => {
  return (
    <CCol>
      <CRow>
        <CCol xs={9}>
          <h1>Miasta</h1>
          <h4>Lista miast, w których świadczone są usługi:</h4>
        </CCol>
        <CCol xs={3}>
          <CButton color="primary">Edytuj</CButton>
        </CCol>
      </CRow>
      <CRow xs={12}>lalala</CRow>
    </CCol>
  )
}

export default Cities
