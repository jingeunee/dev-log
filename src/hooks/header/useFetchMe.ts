import axios from 'axios';
import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';

export const useFetchMe = () => {
  const [isFetchedMe, setFetchedMe] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = Cookie.get('token') || '';
    if (!token) {
      return;
    }

    axios
      .get(`${process.env.REACT_APP_API_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setFetchedMe(true);
        setUsername(res.data.name);
      })
      .catch((err) => console.log(err));
  }, []);

  return {
    isFetchedMe,
    username,
  };
};
