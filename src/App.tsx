import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import styled, { ThemeProvider } from 'styled-components';

import { theme } from 'settings/styled-components';
import store from 'store';

import 'react-toastify/dist/ReactToastify.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import AppRouter from 'pages/apps';
import OauthRouter from 'pages/oauth';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />

        <GlobalWrap>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
              <Route path="/oauth" component={OauthRouter} />
              <Route path="/" component={AppRouter} />
            </Switch>
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
