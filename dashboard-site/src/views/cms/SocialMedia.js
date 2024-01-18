import React from 'react'
import { CCol, CRow, CButton, CFormLabel, CFormInput, CFormSwitch } from '@coreui/react'
import { IMaskMixin } from 'react-imask'
import { getContact, getSocialMedia, getUsers } from 'src/api/getData'

const CFormInputWithMask = IMaskMixin(({ inputRef, ...props }) => (
  <CFormInput {...props} ref={inputRef} />
))

const SocialMedia = () => {
  const [contact, setContact] = React.useState([])
  const [socialMedia, setSocialMedia] = React.useState([])

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [address, setAddress] = React.useState('')

  const loadData = () => {
    getUsers().then((users) => {
      console.log(users);
      getContact().then((data) => {
        if (data.modified_by !== null) {
          data[0].modified_by_name = users.find((user) => user._id === data[0].modified_by).name + ' ' + users.find((user) => user._id === data[0].modified_by).surname;
        }
        setContact(data[0])
        console.log(data[0])
        if (data[0].company_name) {
          setName(data[0].name)
          console.log("name")
        }
        if (data[0].email) setEmail(data[0].email)
        if (data[0].phone_number) setPhone(data[0].phone)
        if (data[0].street) setAddress(data[0].address)
      })
    })
    // getSocialMedia().then((data) => {
    //   setSocialMedia(data)
    // })
  }

  React.useEffect(() => {
    loadData();
  }, [])

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
          <CFormInput type="text" id="inputtext" value={name} onChange={(e) => setName(e.target.value)} />
        </CCol>
      </CRow>
      {/* <CRow className="mb-3">
        <CFormLabel htmlFor="inputtext" className="col-sm-2 col-form-label">
          E-mail
        </CFormLabel>
        <CCol sm={8}>
          <CFormInput type="email" placeholder="name@example.com" id="inputtext" value={email} onChange={(e) => setEmail(e.target.value)} />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CFormLabel htmlFor="inputtext" className="col-sm-2 col-form-label">
          Numer kontaktowy
        </CFormLabel>
        <CCol sm={8}>
          <CFormInputWithMask mask="000 000 000" placeholder="000 000 000" id="inputtext" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CFormLabel htmlFor="inputtext" className="col-sm-2 col-form-label">
          Adres firmy
        </CFormLabel>
        <CCol sm={8}>
          <CFormInput type="text" id="inputtext" value={address} onChange={(e) => setAddress(e.target.value)} />
        </CCol>
      </CRow> */}
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
