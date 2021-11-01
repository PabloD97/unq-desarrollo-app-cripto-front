import React, {  useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { getQuotes } from "../api/cryptoactive.api"
import {Form,Button,Modal} from 'react-bootstrap';
import  Navbar  from "./NavBar";
import { useTranslation } from "react-i18next";
import { getTransaction,getTransactionUser } from "../api/transaction";
import { getUser} from "../api/users.api";


const Transaction = () => {

    const [transaction, setTransaction] = useState([]);

    useEffect(() => {
        getTransactions();
    }, []);

    const getTransactions = () => {


        getTransactionUser({email:"nes@gmail.com"})
            .then((result) => {
                console.log(result)

                setTransaction(result.data);
            })
            .catch(console.log);
    };



    return (
        <>
            <Navbar/>
            <h2>"Transaction"</h2>
            <div>
                <table className="table">
                    <thead>

                    <tr>
                        <th>"id"</th>
                        <th>"hour"</th>
                        <th>"cryptoactive"</th>
                        <th>"amount"</th>
                        <th>"Buyer Full Name User " </th>
                        <th>"Seller Full Name User"</th>
                        <th>"is Finalished"</th>
                        <th>"To accept"</th>
                        <th>"To cancell"</th>


                    </tr>
                    </thead>
                    <tbody>


                    {transaction.map((transaction) => {
                        return (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>

                                <td>{transaction.hour}</td>
                                <td>
                                    {transaction.cryptoactive}
                                </td>
                                <td>
                                    {
                                       transaction.cantidad
                                    }
                                </td>
                                <td> {
                                    transaction.usuarioComprador
                                }</td>
                                <td>{
                                    transaction.usuarioVendedor
                                }</td>

                                <td>{transaction.finalished.toString()}</td>
                            </tr>
                        );
                    })}

                    </tbody>
                </table>
            </div>

        </>
    )
}

export default Transaction;