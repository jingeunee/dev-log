import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import styled, { ThemeProvider } from 'styled-components';

import { theme } from 'settings/styled-components';
import store from 'store';

import 'react-toastify/dist/ReactToastify.css';

import HeaderWrapper from 'components/layout/Header';
import ContentsWrapper from 'components/layout/Contents';
import FooterWrapper from 'components/layout/Footer';

import Todos from 'pages/Todos';
import Header from 'pages/Header';

import Footer from 'components/Footer';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />

        <GlobalWrap>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
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
          </BrowserRouter>
        </GlobalWrap>
      </ThemeProvider>
    </Provider>
  );
}

const GlobalWrap = styled.div`
  position: absolute;
  inset: 0px;
  display: flex;
  flex-flow: column nowrap;
`;

export default App;
