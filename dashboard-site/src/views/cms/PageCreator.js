import React from 'react'
import { CCol, CRow, CButton, CTable, CFormSwitch } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { ReactSession } from 'react-client-session';
import { Navigate } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom'

const PageCreator = ({ route, navigation }) => {
    const [mode, setMode] = React.useState(route.params)
    console.log(route.params)

    return (
        <>{ReactSession.get("loggedIn") ?
            <CCol>
                <CRow>
                    <CCol xs={10}>
                        <h1>Edytor strony</h1>
                    </CCol>
                    <CCol xs={2}>
                        <CButton color="primary">Zapisz</CButton>
                    </CCol>
                </CRow>
            </CCol>
            : <Navigate to="/login" />}</>
    )
}

export default PageCreator;