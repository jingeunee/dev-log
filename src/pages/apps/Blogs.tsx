import Container from '@mui/material/Container';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import BlogListTemplate from 'components/blogs/list/Template';
import BlogRegisterTemplate from 'components/blogs/register/Template';

const Blogs = () => {
  return (
    <SectionContainerWrap maxWidth={false}>
      <ContainerWrap maxWidth="lg">
        <h1>Blogs</h1>

        <Switch>
          <Route path="/register" component={BlogRegisterTemplate} />
          <Route path="/" component={BlogListTemplate} />
        </Switch>
      </ContainerWrap>
    </SectionContainerWrap>
  );
};

const SectionContainerWrap = styled(Container)`
  /* background-color: #eee; */
  flex: 1 1 auto;
`;

const ContainerWrap = styled(Container)``;

export default Blogs;
