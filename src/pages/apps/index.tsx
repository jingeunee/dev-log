import { Route, Switch } from 'react-router-dom';

import HeaderWrapper from 'components/layout/Header';
import ContentsWrapper from 'components/layout/Contents';
import FooterWrapper from 'components/layout/Footer';
import Footer from 'components/Footer';

import Todos from 'pages/apps/Todos';
import Header from 'pages/apps/Header';

function AppRouter() {
  return (
    <>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>

      <ContentsWrapper>
        <Switch>
          <Route path="/todos" component={Todos} />
        </Switch>
      </ContentsWrapper>

      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </>
  );
}

export default AppRouter;
