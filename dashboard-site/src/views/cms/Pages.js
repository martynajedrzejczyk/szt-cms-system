import React from 'react'
import { CCol, CRow, CButton, CTable, CFormSwitch } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilSettings } from '@coreui/icons'
import { ReactSession } from 'react-client-session';
import { Navigate } from 'react-router-dom'
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'ID',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Nazwa',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Widoczność',
        selector: row => row.visibility,
        center: true
    },
    {
        name: 'Edytuj',
        selector: row => row.edit,
        button: true
    }
];

const data = [
    {
        id: 1,
        name: 'stronka1',
        visibility: (
            <CFormSwitch checked={true} />
        ),
        edit: (
            <div
                onClick={() => {
                    console.log('edit')
                }}
            >
                <CIcon icon={cilPencil} size="xl" />
            </div>
        ),
    },
    {
        id: 2,
        name: 'stronka2',
        visibility: (
            <CFormSwitch checked={true} />
        ),
        edit: (
            <div
                onClick={() => {
                    console.log('edit')
                }}
            >
                <CIcon icon={cilPencil} size="xl" />
            </div>
        ),
    },
]

const Pages = () => {
    return (
        <>{ReactSession.get("loggedIn") ?
            <CCol>
                <CRow>
                    <CCol xs={10}>
                        <h1>Strony</h1>
                    </CCol>
                    <CCol xs={2}>
                        <CButton color="primary">Dodaj stronę</CButton>
                    </CCol>
                </CRow>
                <DataTable columns={columns} data={data} />
            </CCol>
            : <Navigate to="/login" />}</>
    )
}

export default Pages
