import React from 'react'
import {
  CButton,
  CButtonGroup,
  CCol,
  CRow,
  CTable,
} from '@coreui/react'
import { getOpinions, getUsers } from 'src/api/getData';
import CIcon from '@coreui/icons-react';

const Opinions = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [opinions, setOpinions] = React.useState([]);

  const columns = [
    {
      key: 'id',
      label: ' ',
      _props: { scope: 'col' },
    },
    { key: 'author_nick', label: 'Autor', _props: { scope: 'col' } },
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
    { key: 'moderated_by_name', label: 'Zmoderowane przez', _props: { scope: 'col' } },
    { key: 'reason', label: 'Powód moderacji', _props: { scope: 'col' } },
    { key: 'edit', label: ' ', _props: { scope: 'col' }, _style: { width: '1%' } },
  ]

  const handleRowEdit = () => {
    console.log('edit');
  }

  const handleRowDelete = () => {
    console.log('delete');
  }

  const loadData = () => {
    getUsers().then((users) => {
      console.log(users);
      getOpinions().then((data) => {
        console.log(data);
        setOpinions(data.map((opinion) => {
          return {
            _id: opinion._id,
            author_nick: opinion.author_nick,
            stars: opinion.stars,
            status: opinion.status,
            description: opinion.description,
            moderated_at: opinion.moderated_at,
            moderated_by_name: users.find((user) => user._id === opinion.moderated_by).nick,
            reason: opinion.reason ? opinion.reason : 'Brak',
            edit: (
              <CButtonGroup>
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => handleRowEdit()}
                >
                  <CIcon name="cil-settings" />
                </CButton>
                <CButton
                  color="danger"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => handleRowDelete()}
                >
                  <CIcon name="cil-delete" />
                </CButton>
              </CButtonGroup>
            ),
          }
        }))
      })
    })
  }

  React.useEffect(() => {
    loadData();
  }, [])

  return (
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
                Nowe opinie
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
      <CTable columns={columns} responsive />
    </CCol>
  )
}

export default Opinions
