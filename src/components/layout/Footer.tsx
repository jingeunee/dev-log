import { ReactNode } from 'react';
import styled from 'styled-components';

interface IProps {
  children?: ReactNode;
}
const Footer = ({ children }: IProps) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  flex: 0 0 auto;
`;

export default Footer;
