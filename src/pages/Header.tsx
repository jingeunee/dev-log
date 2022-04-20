import styled from 'styled-components';

const Header = () => {
  return <HeaderWrap>Header</HeaderWrap>;
};

const HeaderWrap = styled.div`
  height: 50px;
  border-bottom: solid 1px #eee;
  box-shadow: 0 0 2px 0 #eee;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

export default Header;
