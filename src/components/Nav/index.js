import React from 'react'
import styled from 'styled-components'
import Navbar from './Navbar'
import MobileNavbar from './MobileNavbar'
import useScroll from '../../utils/useScroll'

const StyledNav = styled.div`
  position: ${({isScrolled}) => (isScrolled ? 'fixed' : 'absolute')};
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  transition: position 0.8s;
`
const Nav = () => {
  const isScrolled = useScroll()
  return (
    <StyledNav isScrolled={isScrolled}>
      <Navbar isScrolled={isScrolled} />
      <MobileNavbar isScrolled={isScrolled} />
    </StyledNav>
  )
}

export default Nav
