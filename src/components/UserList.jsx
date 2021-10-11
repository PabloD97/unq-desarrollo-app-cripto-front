import React, {  useState, useEffect } from "react";
import { getUsers } from "../api/users.api"

const UserList = () => {


    const [user, setUsers] = useState([]);

  useEffect(() => {
    console.log('alive')
    getUsersList();
  }, []);

  const getUsersList = () => {
    getUsers().then((result) => {

        setUsers(result.data);
      })
      .catch(console.log);
  };

    return (
        <>
        <h2>Listado de usarios</h2>
        <div>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>LastName</th>
              <th>Email</th>

            </tr>
          </thead>
          <tbody>
            {user.map(crypto => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.cvu}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      </>
    )
}

export default UserList ;