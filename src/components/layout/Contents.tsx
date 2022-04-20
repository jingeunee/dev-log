import { ReactNode } from 'react';
import styled from 'styled-components';

interface IProps {
  children?: ReactNode;
}
const Contents = ({ children }: IProps) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  flex: 1 1 auto;
`;

export default Contents;
