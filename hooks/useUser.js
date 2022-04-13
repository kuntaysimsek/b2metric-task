import { useState, useEffect } from "react";

export default function useUser() {
  const [user, setUser] = useState();

  useEffect(() => {
    const userString = window.localStorage.getItem("user");
    const user = JSON.parse(userString);
    setUser(user?.data)
  }, [])
  

  const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify({ data: user }));
    setUser(user);
  };

  return [user, saveUser];
}
