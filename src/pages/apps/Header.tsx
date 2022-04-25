import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useFetchMe } from 'hooks/header/useFetchMe';

const { REACT_APP_CLIENT_ID = '', REACT_APP_REDIRECT_URI = '' } = process.env;

const Header = () => {
  const { isFetchedMe, username } = useFetchMe();

  const onKakaoLogin = () => {
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URI}&response_type=code`;
    window.location.href = url;
  };

  return (
    <HeaderWrap maxWidth={false}>
      <HeaderContainer maxWidth="lg">
        <TitleWrap>
          <Button
            variant="text"
            color="inherit"
            onClick={() => (window.location.href = '/dev-log/')}
          >
            <h1>정진근의 Dev Log</h1>
          </Button>
        </TitleWrap>

        <HeaderRightMenuWrap>
          <NavigationWrap>
            <Link to="/" color="inherit">
              <h3>Blogs</h3>
            </Link>
            <Link to="/todos" color="inherit">
              <h3>Todos</h3>
            </Link>
          </NavigationWrap>

          {isFetchedMe ? (
            username
          ) : (
            <Button
              variant="contained"
              style={{
                backgroundColor: '#FEE500',
                color: '#000000',
                borderRadius: '12px',
                width: '120px',
                marginLeft: 'auto',
              }}
              onClick={onKakaoLogin}
            >
              카카오 로그인
            </Button>
          )}
        </HeaderRightMenuWrap>
      </HeaderContainer>
    </HeaderWrap>
  );
};

const HeaderWrap = styled(Container)`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  background-color: #212529;

  color: white;
  padding: 0;
`;
const HeaderContainer = styled(Container)`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-flow: column nowrap;
  }
`;
const TitleWrap = styled.div`
  flex: 0 0 auto;
`;
const HeaderRightMenuWrap = styled.div`
  margin-left: auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  @media screen and (max-width: 768px) {
    margin-left: unset;
    width: 100%;
  }
`;
const NavigationWrap = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-right: 20px;

  & > * {
    margin: 0 10px;
    text-decoration: none;
    color: inherit;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Header;
