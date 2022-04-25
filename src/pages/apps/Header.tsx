import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const { REACT_APP_CLIENT_ID = '', REACT_APP_REDIRECT_URI = '' } = process.env;

const Header = () => {
  const onKakaoLogin = () => {
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URI}&response_type=code`;
    window.location.href = url;
  };

  return (
    <HeaderWrap>
      <Link to="/">Home</Link>
      <Link to="/todos">Todo</Link>
      <Button
        variant="contained"
        color="warning"
        style={{ marginLeft: 'auto' }}
        onClick={onKakaoLogin}
      >
        카카오 로그인
      </Button>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  height: 50px;
  border-bottom: solid 1px #eee;
  box-shadow: 0 0 2px 0 #eee;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  a,
  button {
    margin: 0 10px;
  }
`;

export default Header;
