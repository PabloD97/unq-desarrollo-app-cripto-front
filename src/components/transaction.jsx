import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { getQuotes } from "../api/cryptoactive.api";
import { Form, Button, Modal } from "react-bootstrap";
import Navbar from "./NavBar";
import { useTranslation } from "react-i18next";
import { confirmTransaction, getTransactionUser } from "../api/transaction";
import { getUser } from "../api/users.api";
import { Link, useHistory } from "react-router-dom";


const Transaction = () => {
  const { t } = useTranslation();
  const [transaction, setTransaction] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = () => {
    getTransactionUser({ email: localStorage.getItem("email") })
      .then((result) => {
        setTransaction(result.data);
      })
      .catch(console.log);
  };
  const transactionOk = (id) => {
    confirmTransaction(id)
        .then((result) => {
        })
        .catch(console.log);
    history.push("/transaction");
    window.location.reload()
  };
  return (
    <>
      <Navbar />
      <h2>{t("transactions")}</h2>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>{t("hour")}</th>
              <th>{t("cryptoactive")}</th>
              <th>{t("amount")}</th>
              <th>{t("buyerUser")}</th>
              <th>{t("sellerUser")}</th>
              <th>{t("isFinalished")}</th>
              <th>{t("accept")}</th>
              <th>{t("canceled")}</th>
            </tr>
          </thead>
          <tbody>
            {transaction.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>

                  <td>{transaction.hour}</td>
                  <td>{transaction.cryptoactive}</td>
                  <td>{transaction.cantidad}</td>
                  <td> {transaction.usuarioComprador}</td>
                  <td>{transaction.usuarioVendedor}</td>

                  <td>{transaction.finalished.toString()}</td>

                  <td >
                    { transaction.finalished ? null: <Button variant="secondary" type="submit" onClick={()=>transactionOk(transaction.id)} >
                      confirm
                    </Button>  }
                  </td>
                  <td> { transaction.finalished ? null:<Button variant="secondary" type="submit" >
                    cancell
                  </Button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Transaction;
