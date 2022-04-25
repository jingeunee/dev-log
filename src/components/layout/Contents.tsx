import Container from '@mui/material/Container';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface IProps {
  children?: ReactNode;
}
const Contents = ({ children }: IProps) => {
  return <ContainerWrap maxWidth={false}>{children}</ContainerWrap>;
};

const ContainerWrap = styled(Container)`
  flex: 1 1 auto;
  display: flex;
  flex-flow: column nowrap;
`;

export default Contents;
