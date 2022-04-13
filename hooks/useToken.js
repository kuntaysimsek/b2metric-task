import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      const tokenString = localStorage.getItem('token');
      const userToken = JSON.parse(tokenString);
      return userToken?.token
    }

  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }
}
