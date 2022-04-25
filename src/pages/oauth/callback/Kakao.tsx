import axios from 'axios';
import Cookie from 'js-cookie';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const OauthCallbackKakao = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get('code');

  useEffect(() => {
    if (!code) {
      return;
    }

    const url =
      process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_API_URL || ''
        : 'http://localhost:8080';

    axios
      .post(`${url}/oauth/kakao`, { code })
      .then((res) => {
        // Access Token 저장
        Cookie.set('token', res.data.access_token || '');

        // 화면 돌아가기
        window.location.replace('https://jingeunee.github.io/dev-log/');
      })
      .catch((err) => console.log(err));
  }, [code]);

  return null;
};

export default OauthCallbackKakao;
