import React from 'react'
import './styles.css'
import { CCol, CRow, CButton, CNav, CNavItem, CNavLink, CDropdown, CDropdownItem, CDropdownToggle, CDropdownMenu } from '@coreui/react'

const Navigation = () => {
    return (
        <CCol>
            <CRow>
                <CCol xs={9}>
                    <h1>Ustawienia paska nawigacyjnego</h1>
                    <h2>Podgląd:</h2>
                </CCol>
            </CRow>
            <div className='nav-background'>
                <CNav variant="pills">
                    <CNavItem>
                    </CNavItem>
                    <CDropdown variant="nav-item">
                        <CDropdownToggle color="secondary">Dropdown button</CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem href="#">Action</CDropdownItem>
                            <CDropdownItem href="#">Another action</CDropdownItem>
                            <CDropdownItem href="#">Something else here</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                    <CNavItem>
                        <CNavLink href="#">Link</CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink href="#" disabled>
                            Disabled
                        </CNavLink>
                    </CNavItem>
                </CNav>
            </div>

        </CCol>
    )
}

export default Navigation
