import React from 'react'
import { CCol, CRow, CButton, CTable } from '@coreui/react'
import { DocsExample } from 'src/components'
import CIcon from '@coreui/icons-react'
import { cilSettings } from '@coreui/icons'

const Services = () => {
  const handleRowEdit = (e) => {
    console.log(e)
  }
  const services = [
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
      <CRow>
        <CCol xs={10}>
          <h1>Usługi</h1>
        </CCol>
        <CCol xs={2}>
          <CButton color="primary">Dodaj usługę</CButton>
        </CCol>
      </CRow>
      <CTable columns={columns} items={services} hover dark striped bordered responsive />
    </CCol>
  )
}

export default Services
