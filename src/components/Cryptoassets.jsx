import React, {  useState, useEffect } from "react";
import { getQuotes } from "../api/cryptoactive.api"

const Cryptoassets = () => {


    const [cryptoassets, setCryptoassets] = useState([]);

  useEffect(() => {
    console.log('alive')
    getCryptoassets();
  }, []);

  const getCryptoassets = () => {
    getQuotes().then((result) => {

        setCryptoassets(result.data);
      })
      .catch(console.log);
  };

    return (
        <>
        <h2>Listado de crypto activos</h2>
        <div>
        <table className="table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Price USD</th>
              <th>Price AR</th>
              <th>Quote Time</th>

            </tr>
          </thead>
          <tbody>
            {cryptoassets.map(crypto => {
              return (
                <tr key={crypto.id}>
                  <td>{crypto.symbol}</td>
                  <td>{crypto.price}</td>
                  <td>{crypto.priceAr}</td>
                  <td>{crypto.quoteTime}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      </>
    )
}

export default Cryptoassets;