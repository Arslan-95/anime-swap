import React from 'react';
import styled from 'styled-components';
import logo from '@assets/logo.png';
import menuIcon from '@assets/header-menu.svg';
import Container from '@/components/ui/Container';

const SHeader = styled.header`
  width: 100%;
  padding: 15px 0;
`;

const SHeaderContent = styled.div`
  border-width: 0px 4px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.main};
`;

const CustomContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
`;

const SLogo = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-left: 15px;

    font-family: PocketMonk;
    font-size: ${(props) => props.theme.fontSizes.medium};
    color: ${(props) => props.theme.colors.light};
  }

  img {
    height: 41px;
  }
`;

const Header: React.FC = () => {
  return (
    <SHeader>
      <SHeaderContent>
        <CustomContainer>
          <SLogo>
            <img src={logo} alt="logo" />
            <span>Anime Swap</span>
          </SLogo>
          <img src={menuIcon} height="41px" alt="menu" loading="lazy" />
        </CustomContainer>
      </SHeaderContent>
    </SHeader>
  );
};

export default Header;
