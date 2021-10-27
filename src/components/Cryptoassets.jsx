import React, { useState, useEffect } from "react";
import Navbar from "./NavBar";
import { getQuotes } from "../api/cryptoactive.api";
import { useTranslation } from "react-i18next";

const Cryptoassets = () => {

  const { t } = useTranslation();

  const [cryptoassets, setCryptoassets] = useState([]);

  useEffect(() => {
    getCryptoassets();
  }, []);

  const getCryptoassets = () => {
    getQuotes()
      .then((result) => {
        setCryptoassets(result.data);
      })
      .catch(console.log);
  };

  const formatCurrency = (number, locale) => {
    let currencyLocale = "";

    if (locale === "es-AR") {
      currencyLocale = "ARS";
    } else {
      currencyLocale = "USD";
    }
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyLocale,
    }).format(number);
  };

  return (
    <>
      <Navbar />
      <h2>{t("listOfCryptoAssets")}</h2>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>{t("crypto")}</th>
              <th>{t("price") + "USD"}</th>
              <th>{t("price") + "AR"}</th>
              <th>{t("updated")}</th>
            </tr>
          </thead>
          <tbody>
            {cryptoassets.map((crypto) => {
              return (
                <tr key={crypto.id}>
                  <td>{crypto.symbol}</td>
                  <td>
                    {
                      formatCurrency(crypto.price, "en-US" )
                    }
                  </td>
                  <td>
                    {
                      formatCurrency(crypto.priceAr, "es-AR" )
                    }
                  </td>
                  <td>{crypto.quoteTime}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Cryptoassets;
