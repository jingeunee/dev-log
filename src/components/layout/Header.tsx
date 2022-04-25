import Container from '@mui/material/Container';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface IProps {
  children?: ReactNode;
}
const Header = ({ children }: IProps) => {
  return <ContainerWrap maxWidth={false}>{children}</ContainerWrap>;
};

const ContainerWrap = styled(Container)`
  flex: 0 0 90px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

export default Header;
