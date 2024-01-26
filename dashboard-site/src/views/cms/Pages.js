import React, { useEffect } from 'react'
import { CCol, CRow, CButton, CTable, CFormSwitch } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilSettings } from '@coreui/icons'
import { ReactSession } from 'react-client-session';
import { Navigate } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom'
import { getPages } from 'src/api/getData';

const columns = [
    {
        name: 'Nazwa',
        selector: row => row.name,
    },
    {
        name: "Endpoint",
        selector: row => row.endpoint,
    },
    {
        name: 'Widoczność',
        selector: row => row.visibility,
    },
    {
        name: 'Edytuj',
        selector: row => row.edit,
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
    let navigate = useNavigate();

    const [pages, setPages] = React.useState([]);

    const addPage = () => {
        navigate('/cms/page-editor', { state: { mode: 'add' } });
    }

    const editPage = (id) => {
        navigate('/pageEditor/' + id, { state: { mode: 'edit' } });
    }

    useEffect(() => {
        getPages().then((res) => {
            console.log(res)
            setPages(res.map((page) => {
                return {
                    id: page._id,
                    name: page.name,
                    endpoint: page.endpoint,
                    visibility: page.visible ? "Tak" : "Nie",
                    edit: (
                        <div
                            onClick={() => {
                                editPage(page._id)
                            }}
                        >
                            <CIcon icon={cilPencil} size="xl" />
                        </div>
                    ),
                }
            }
            ))
        })
    }, [])

    return (
        <>{ReactSession.get("loggedIn") ?
            <CCol>
                <CRow>
                    <CCol xs={10}>
                        <h1>Strony</h1>
                    </CCol>
                    <CCol xs={2}>
                        <CButton color="primary" onClick={addPage}>Dodaj stronę</CButton>
                    </CCol>
                </CRow>
                <DataTable columns={columns} data={pages} />
            </CCol>
            : <Navigate to="/login" />}</>
    )
}

export default Pages
