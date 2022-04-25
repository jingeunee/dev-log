import { Route, Switch } from 'react-router-dom';

import OauthCallbackKakao from './callback/Kakao';

function OauthRouter() {
  return (
    <Switch>
      <Route path="/oauth/callback/kakao" component={OauthCallbackKakao} />
    </Switch>
  );
}

export default OauthRouter;
