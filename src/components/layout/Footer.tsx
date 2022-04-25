import Container from '@mui/material/Container';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface IProps {
  children?: ReactNode;
}
const Footer = ({ children }: IProps) => {
  return <ContainerWrap maxWidth={false}>{children}</ContainerWrap>;
};

const ContainerWrap = styled(Container)`
  flex: 0 0 auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  min-height: 40px;
`;

export default Footer;
