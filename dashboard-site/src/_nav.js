import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cibInstagram,
  cifPl,
  cilBell,
  cilCalculator,
  cilChartPie,
  cilColumns,
  cilCursor,
  cilDescription,
  cilDog,
  cilDrop,
  cilHamburgerMenu,
  cilLocationPin,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilRunning,
  cilSettings,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Miasta',
    to: '/cms/cities',
    icon: <CIcon icon={cilLocationPin} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Pracownicy',
    to: '/cms/employees',
    icon: <CIcon icon={cilRunning} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Opinie',
    to: '/cms/opinions',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Usługi',
    to: '/cms/services',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Dane firmy',
    to: '/cms/social-media',
    icon: <CIcon icon={cilDog} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Strony',
    to: '/cms/pages',
    icon: <CIcon icon={cilColumns} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Pasek nawigacyjny',
    to: '/cms/navigation',
    icon: <CIcon icon={cilHamburgerMenu} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Wyloguj się',
    to: '/login',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
]

export default _nav
