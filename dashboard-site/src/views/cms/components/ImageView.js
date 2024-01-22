import React, { useEffect } from 'react'
import { CCol, CRow, CButton, CTable } from '@coreui/react'
import { DocsExample } from 'src/components'
import { getCities, getEmployees, getUsers } from 'src/api/getData'
import CIcon from '@coreui/icons-react'
import { cilSettings, cilTrash } from '@coreui/icons'
import { formatDate } from 'src/utils/FormatData'
import PopupAddEmployee from './components/PopupAddEmployee'
import { postEmployee } from 'src/api/postData'
import PopupEmployee from './components/PopupEmployee'
import { putEmployee } from 'src/api/putData'
import { deleteEmployee } from 'src/api/deleteData'
import { ReactSession } from 'react-client-session';
import { Navigate } from 'react-router-dom'

const ImageView = ({ src, alt, ...rest }) => {
    const [image, setImage] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);



    return <img src={image} alt={alt} {...rest} />;
}