import { ReactNode } from 'react';
import styled from 'styled-components';

interface IProps {
  children?: ReactNode;
}
const Header = ({ children }: IProps) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  flex: 0 0 50px;
`;

export default Header;
