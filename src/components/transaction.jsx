import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { getQuotes } from "../api/cryptoactive.api";
import { Form, Button, Modal, Table } from "react-bootstrap";
import Navbar from "./NavBar";
import { useTranslation } from "react-i18next";
import {
  confirmTransaction,
  getTransactionUser,
  transactionCanceled,
} from "../api/transaction";
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

  const cancelTransaction = (id) => {
    transactionCanceled(id)
        .then((result) => {
          console.log(result)
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
        <Table className="table" responsive>
          <thead>
            <tr>
              <th>Id</th>
              <th>{t("hour")}</th>
              <th>{t("cryptoactive")}</th>
              <th>{t("amount")}</th>
              <th>{t("buyerUser")}</th>
              <th>{t("sellerUser")}</th>
              <th>{t("shippingAddress")}</th>
              <th>{t("reputation")}</th>
              <th>{t("isFinalished")}</th>
              <th>{t("accept")}</th>
              <th>{t("canceled")}</th>
            </tr>
          </thead>
          <tbody>
            {transaction.map((transaction) => {
              console.log(transaction)
              return (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>

                  <td>{transaction.hour}</td>
                  <td>{transaction.cryptoactive}</td>
                  <td>{transaction.cantidad}</td>
                  <td> {transaction.usuarioComprador}</td>
                  <td>{transaction.usuarioVendedor}</td>
                  <td>{transaction.shippingAddress}</td>
                  <td>{transaction.reputation}</td>
                  <td>{transaction.finalished.toString()}</td>
                  <td>
                    {transaction.finalished ? null : (
                      <Button
                        variant="secondary"
                        type="submit"
                        onClick={() => transactionOk(transaction.id)}
                      >
                        confirm
                      </Button>
                    )}
                  </td>
                  <td>
                    {transaction.finalished ? null : (
                      <Button
                        variant="secondary"
                        type="submit"
                        onClick={() => cancelTransaction(transaction.id)}
                      >
                        cancell
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Transaction;
