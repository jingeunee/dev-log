import Container from '@mui/material/Container';
import styled from 'styled-components';

const AboutMe = () => {
  return (
    <SectionContainerWrap maxWidth={false}>
      <ContainerWrap maxWidth="lg">
        <h1>Blogs</h1>
      </ContainerWrap>
    </SectionContainerWrap>
  );
};

const SectionContainerWrap = styled(Container)`
  /* background-color: #eee; */
  flex: 1 1 auto;
`;

const ContainerWrap = styled(Container)``;

export default AboutMe;
