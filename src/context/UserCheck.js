import React from 'react'
import { useState, useContext, useEffect } from 'react';
import { appContext } from './Context';

const UserCheck = () => {
  const { URL } = useContext(appContext);
  const [loading, setLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {

    const check = async () => {
      try {

        const res = await fetch(URL + "/auth/user/check", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.success) {
          setIsUser(true);
          const user = data.user
          localStorage.setItem("user", JSON.stringify(user._id))
        }

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    check();

  }, []);

  return { loading, isUser };
};



export default UserCheck
