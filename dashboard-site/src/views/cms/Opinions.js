import React from 'react'
import './Opinions.css'
import {
  CButton,
  CButtonGroup,
  CCol,
  CFormSelect,
  CRow,
  CTable,
} from '@coreui/react'
import { getOpinions, getUsers } from 'src/api/getData';
import CIcon from '@coreui/icons-react';
import { cilBan, cilCheckCircle, cilDelete, cilSettings } from '@coreui/icons';
import { putOpinion } from 'src/api/putData';
import { formatDate } from 'src/utils/FormatData';
import { ReactSession } from 'react-client-session';
import { Navigate } from 'react-router-dom'

const Opinions = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [opinions, setOpinions] = React.useState([]);

  const columns = [
    { key: 'author_nick', label: 'Autor', _props: { scope: 'col' } },
    { key: 'stars', label: 'Ocena', _props: { scope: 'col' } },
    { key: 'status', label: 'Stan', _props: { scope: 'col' } },
    { key: 'moderate_opinion', label: 'Moderuj', _props: { scope: 'col' } },
    {
      key: 'description',
      label: 'Treść opinii',
      _props: { scope: 'col' },
      _style: { width: '40%' },
    },
    { key: 'created_at', label: 'Data dodania', _props: { scope: 'col' } },
    { key: 'moderated_at', label: 'Data moderacji', _props: { scope: 'col' } },
    { key: 'moderated_by_name', label: 'Zmoderowane przez', _props: { scope: 'col' } },
    { key: 'reason', label: 'Powód moderacji', _props: { scope: 'col' } }
  ]

  const handleRowEdit = () => {
    console.log('edit');
  }

  const handleRowDelete = () => {
    console.log('delete');
  }

  const editStatus = (id, status) => {
    console.log('edit status', id, status);
    if (status === 'Odrzucona') {
      const reason = prompt('Podaj powód odrzucenia opinii');
      if (reason) {
        putOpinion(id, status, reason).then(() => {
          loadData();
        })
      }
    } else {
      putOpinion(id, status, "").then(() => {
        loadData();
      })
    }
  }

  const loadData = () => {
    getUsers().then((users) => {
      console.log(users);
      getOpinions().then((data) => {
        console.log(data);
        const states = ['Oczekujące', 'Odrzucona', 'Przyjęta'];
        const options = states.map((state) => {
          return {
            value: state,
            label: state
          }
        })
        const opinionList = data.map((opinion) => {
          return {
            _id: opinion._id,
            author_nick: opinion.author_nick,
            stars: opinion.stars,
            status: opinion.status,
            moderate_opinion: (
              opinion.status === 'Oczekujące' ?
                <div className='opinions-moderate'><CButton color="success" onClick={() => editStatus(opinion._id, 'Przyjęta')}>Przyjmij</CButton><CButton color="danger" onClick={() => editStatus(opinion._id, 'Odrzucona')}>Odrzuć</CButton></div> : opinion.status === 'Odrzucona' ?
                  <CButton color="success" onClick={() => editStatus(opinion._id, 'Przyjęta')}>Przyjmij</CButton> :
                  <CButton color="danger" onClick={() => editStatus(opinion._id, 'Odrzucona')}>Odrzuć</CButton>
            ),
            description: opinion.description,
            created_at: formatDate(opinion.created_at),
            moderated_at: opinion.moderated_at ? formatDate(opinion.moderated_at) : "-",
            moderated_by_name: opinion.moderated_by ? users.find((user) => user._id === opinion.moderated_by).name + ' ' + users.find((user) => user._id === opinion.moderated_by).surname : "-",
            reason: opinion.reason ? opinion.reason : '-',
          }
        })
        console.log(opinionList)
        if (activeTab === 0) setOpinions(opinionList.filter((opinion) => opinion.status === 'Oczekujące'));
        if (activeTab === 1) setOpinions(opinionList.filter((opinion) => opinion.status === 'Odrzucona'));
        if (activeTab === 2) setOpinions(opinionList.filter((opinion) => opinion.status === 'Przyjęta'));
      })
    })
  }

  React.useEffect(() => {
    loadData();
  }, [activeTab])

  return (
    <>{ReactSession.get("loggedIn") ?
      <CCol>
        <CRow>
          <CCol>
            <h1>Opinie</h1>
          </CCol>
        </CRow>
        <div className="d-flex p-2 docs-highlight justify-content-center">
          <CCol xs={8}>
            <CRow>
              <CButtonGroup role="group" aria-label="Basic outline example">
                <CButton color="primary" variant="outline" active={activeTab === 0} onClick={() => setActiveTab(0)}>
                  Oczekujące opinie
                </CButton>
                <CButton color="primary" variant="outline" active={activeTab === 1} onClick={() => setActiveTab(1)}>
                  Odrzucone opinie
                </CButton>
                <CButton color="primary" variant="outline" active={activeTab === 2} onClick={() => setActiveTab(2)}>
                  Przyjęte opinie
                </CButton>
              </CButtonGroup>
            </CRow>
          </CCol>
        </div>
        <CTable columns={columns} items={opinions} responsive />
      </CCol> : <Navigate to="/login" />}</>
  )
}

export default Opinions
