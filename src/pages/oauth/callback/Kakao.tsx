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

    const url = `http://localhost:8080/oauth/kakao`;

    axios
      .post(url, { code })
      .then((res) => {
        // Access Token 저장
        Cookie.set('token', res.data.access_token || '');

        // 화면 돌아가기
        window.location.replace('/');
      })
      .catch((err) => console.log(err));
  }, [code]);

  return null;
};

export default OauthCallbackKakao;
