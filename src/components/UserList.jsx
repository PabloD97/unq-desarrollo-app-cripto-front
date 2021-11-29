import React, { useState, useEffect } from "react";
import { getUsers } from "../api/users.api";
import Navbar from "./NavBar";
import { useTranslation } from "react-i18next";

const UserList = () => {
  const { t } = useTranslation();

  const [user, setUsers] = useState([]);

  useEffect(() => {
    getUsersList();
  }, []);

  const getUsersList = () => {
    getUsers()
      .then((result) => {
        console.log(result)
        setUsers(result.data);
      })
      .catch(console.log);
  };

  return (
    <>
      <Navbar />
      <h2>Listado de usarios</h2>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>{t("name")}</th>
              <th>{t("lastname")}</th>
              <th>{t("numberOfOperations")}</th>
              <th>{t("reputation")} Points</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.lastName}</td>
                  <td>{user.numberOfOperations}</td>
                  <td>{user.reputation}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserList;
