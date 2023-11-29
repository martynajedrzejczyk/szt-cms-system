import React from 'react'
import { CCol, CRow, CButton, CFormLabel, CFormInput, CFormSwitch } from '@coreui/react'
import { IMaskMixin } from 'react-imask'

const CFormInputWithMask = IMaskMixin(({ inputRef, ...props }) => (
  <CFormInput {...props} ref={inputRef} />
))

const SocialMedia = () => {
  return (
    <CCol>
      <CCol xs={9}>
        <h1>Dane firmy</h1>
      </CCol>
      <CRow className="mb-3">
        <CFormLabel htmlFor="inputtext" className="col-sm-2 col-form-label">
          Nazwa firmy
        </CFormLabel>
        <CCol sm={8}>
          <CFormInput type="text" id="inputtext" />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CFormLabel htmlFor="inputtext" className="col-sm-2 col-form-label">
          E-mail
        </CFormLabel>
        <CCol sm={8}>
          <CFormInput type="email" placeholder="name@example.com" id="inputtext" />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CFormLabel htmlFor="inputtext" className="col-sm-2 col-form-label">
          Numer kontaktowy
        </CFormLabel>
        <CCol sm={8}>
          <CFormInputWithMask mask="000 000 000" placeholder="000 000 000" id="inputtext" />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CFormLabel htmlFor="inputtext" className="col-sm-2 col-form-label">
          Adres firmy
        </CFormLabel>
        <CCol sm={8}>
          <CFormInput type="text" id="inputtext" />
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={9}>
          <h1>Social Media</h1>
        </CCol>
        <CRow className="mb-3">
          <CCol sm={2}>
            <CFormSwitch label="Facebook" id="formSwitchCheckDefault" />
          </CCol>
          <CCol sm={8}>
            <CFormInput type="text" id="inputtext" />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol sm={2}>
            <CFormSwitch label="Instagram" id="formSwitchCheckDefault" />
          </CCol>
          <CCol sm={8}>
            <CFormInput type="text" id="inputtext" />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol sm={2}>
            <CFormSwitch label="Twitter" id="formSwitchCheckDefault" />
          </CCol>
          <CCol sm={8}>
            <CFormInput type="text" id="inputtext" />
          </CCol>
        </CRow>
      </CRow>
    </CCol>
  )
}

export default SocialMedia
