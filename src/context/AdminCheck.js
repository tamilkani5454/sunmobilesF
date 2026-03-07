import { useContext, useEffect, useState } from "react";
import { appContext } from "./Context";

const useAdminCheck = () => {

  const { URL } = useContext(appContext);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {

    const check = async () => {
      try {

        const res = await fetch(URL + "/auth/admin/check", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log(data)
        if (data.success) {
          setIsAdmin(true);
        }

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    check();

  }, []);

  return { loading, isAdmin };
};

export default useAdminCheck;