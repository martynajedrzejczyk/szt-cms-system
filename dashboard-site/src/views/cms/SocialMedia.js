import React from 'react'
import { CCol, CRow, CButton, CFormLabel, CFormInput, CFormSwitch } from '@coreui/react'
import { IMaskMixin } from 'react-imask'
import { getContact, getSocialMedia, getUsers } from 'src/api/getData'
import { putContact, putSocialMedia } from 'src/api/putData'
import { ReactSession } from 'react-client-session';
import { Navigate } from 'react-router-dom'

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
  const [postalCode, setPostalCode] = React.useState('')
  const [city, setCity] = React.useState('')

  const [facebook, setFacebook] = React.useState(['', false])
  const [instagram, setInstagram] = React.useState(['', false])
  const [twitter, setTwitter] = React.useState(['', false])

  const loadData = () => {
    getUsers().then((users) => {
      console.log(users);
      getContact().then((data) => {
        console.log(data[0])
        if (data.modified_by !== null) {
          data[0].modified_by_name = users.find((user) => user._id === data[0].modified_by).name + ' ' + users.find((user) => user._id === data[0].modified_by).surname;
        }
        if (data[0].company_name) setName(data[0].company_name)
        if (data[0].mail) setEmail(data[0].mail)

        if (data[0].phone_number) setPhone(data[0].phone_number)
        if (data[0].street) setAddress(data[0].street)
        if (data[0].postal_code) setPostalCode(data[0].postal_code)
        if (data[0].city) setCity(data[0].city)
      })
    })
    getSocialMedia().then((data) => {
      console.log(data)
      setSocialMedia(data)
      const fb = data.find((item) => item.name === 'Facebook')
      const insta = data.find((item) => item.name === 'Instagram')
      const twit = data.find((item) => item.name === 'Twitter')
      console.log(fb, insta, twit)
      if (fb) {
        setFacebook([fb.link, fb.visible])
      }
      if (insta) {
        setInstagram([insta.link, insta.visible])
      }
      if (twit) {
        setTwitter([twit.link, twit.visible])
      }
    })
  }

  React.useEffect(() => {
    loadData();
  }, [])

  const saveContactChanges = () => {
    console.log('zapisano zmiany')
    putContact(contact._id, name, email, phone, address, postalCode, city).then(() => {
      loadData();
      console.log('zmieniono dane firmy')
    })
  }

  const saveSocialMediaChanges = () => {
    console.log('zapisano zmiany')
    putSocialMedia(socialMedia[0]._id, 'Facebook', facebook[0], facebook[1]).then(() => {
      putSocialMedia(socialMedia[1]._id, 'Instagram', instagram[0], instagram[1]).then(() => {
        putSocialMedia(socialMedia[2]._id, 'Twitter', twitter[0], twitter[1]).then(() => {
          loadData();
          console.log('zmieniono social media')
        })
      })
    })
  }

  const updateFbLink = (e) => {
    const visible = facebook[1]
    setFacebook([e.target.value, visible])
  }

  const updateFbVisible = (e) => {
    const link = facebook[0]
    setFacebook([link, e.target.checked])
  }

  const updateInstagramLink = (e) => {
    const visible = instagram[1]
    setInstagram([e.target.value, visible])
  }

  const updateInstagramVisible = (e) => {
    const link = instagram[0]
    setInstagram([link, e.target.checked])
  }

  const updateTwitterLink = (e) => {
    const visible = twitter[1]
    setTwitter([e.target.value, visible])
  }

  const updateTwitterVisible = (e) => {
    const link = twitter[0]
    setTwitter([link, e.target.checked])
  }

  return (
    <>{ReactSession.get("loggedIn") ?
      <CCol>
        <CRow>
          <CCol xs={9}>
            <h1>Dane firmy</h1>
          </CCol>
          <CCol xs={3}>
            <CButton color="primary" onClick={() => saveContactChanges()}>Zapisz</CButton>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputtext" className="col-sm-2 col-form-label">
            Nazwa firmy
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput type="text" id="inputtext" value={name} onChange={(e) => setName(e.target.value)} />
          </CCol>
        </CRow>
        <CRow className="mb-3">
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
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputtext" className="col-sm-2 col-form-label">
            Kod pocztowy
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput type="text" id="inputtext" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputtext" className="col-sm-2 col-form-label">
            Miasto
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput type="text" id="inputtext" value={city} onChange={(e) => setCity(e.target.value)} />
          </CCol>
        </CRow>
        <CRow>
          <CRow>
            <CCol xs={9}>
              <h1>Social Media</h1>
            </CCol>
            <CCol xs={3}>
              <CButton color="primary" onClick={() => saveSocialMediaChanges()}>Zapisz</CButton>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol sm={2}>
              <CFormSwitch label="Facebook" id="formSwitchCheckDefault" checked={facebook[1]} onChange={updateFbVisible} />
            </CCol>
            <CCol sm={8}>
              <CFormInput type="text" id="inputtext" value={facebook[0]} onChange={updateFbLink} />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol sm={2}>
              <CFormSwitch label="Instagram" id="formSwitchCheckDefault" checked={instagram[1]} onChange={updateInstagramVisible} />
            </CCol>
            <CCol sm={8}>
              <CFormInput type="text" id="inputtext" value={instagram[0]} onChange={updateInstagramLink} />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol sm={2}>
              <CFormSwitch label="Twitter" id="formSwitchCheckDefault" checked={twitter[1]} onChange={updateTwitterVisible} />
            </CCol>
            <CCol sm={8}>
              <CFormInput type="text" id="inputtext" value={twitter[0]} onChange={updateTwitterLink} />
            </CCol>
          </CRow>
        </CRow>
      </CCol>
      : <Navigate to="/login" />}</>
  )
}

export default SocialMedia
