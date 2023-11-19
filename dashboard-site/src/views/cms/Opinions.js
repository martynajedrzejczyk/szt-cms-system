import React from 'react'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButton,
  CButtonGroup,
  CCol,
  CRow,
  CTable,
} from '@coreui/react'
import { DocsExample } from 'src/components'
// import { ButtonGroups } from '../buttons'

const Opinions = () => {
  const columns = [
    {
      key: 'id',
      label: ' ',
      _props: { scope: 'col' },
    },
    { key: 'autror_nick', label: 'Autor', _props: { scope: 'col' } },
    { key: 'stars', label: 'Ocena', _props: { scope: 'col' } },
    { key: 'status', label: 'Stan', _props: { scope: 'col' } },
    {
      key: 'description',
      label: 'Treść opinii',
      _props: { scope: 'col' },
      _style: { width: '40%' },
    },
    { key: 'created_at', label: 'Data dodania', _props: { scope: 'col' } },
    { key: 'moderated_at', label: 'Data moderacji', _props: { scope: 'col' } },
    { key: 'moderated_by', label: 'Zmoderowane przez', _props: { scope: 'col' } },
    { key: 'reason', label: 'Powód moderacji', _props: { scope: 'col' } },
    { key: 'edit', label: ' ', _props: { scope: 'col' }, _style: { width: '1%' } },
  ]

  return (
    <CCol>
      <CRow>
        <CCol>
          <h1>Opinie</h1>
        </CCol>
      </CRow>
      <CCol xs={8}>
        <CRow>
          <CButtonGroup role="group" aria-label="Basic outline example">
            <CButton color="primary" variant="outline" active={false}>
              Nowe opinie
            </CButton>
            <CButton color="primary" variant="outline">
              Odrzucone opinie
            </CButton>
            <CButton color="primary" variant="outline">
              Przyjęte opinie
            </CButton>
          </CButtonGroup>
        </CRow>
      </CCol>
      <CTable columns={columns} responsive />
    </CCol>
  )
}

export default Opinions
