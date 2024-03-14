import React, { useEffect, useRef, useState } from "react";
import "./Cart.scss";
import NavStore from "../../components/layout/navStore/NavStore.jsx";
export default function Cart() {

  return (
    <>
      <NavStore></NavStore>
      <div className="Cart">
        <div className="Cart__render">
          <table className="Cart__render--table">
            <thead>
              <th>Stt</th>
              <th>Date</th>
              <th>Price Ticket</th>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>T2,T3,T4,T5,T6</td>
                <td>45,000 đ</td>
              </tr>
              <tr>
                <td>2</td>
                <td>T7,CN , and holiday</td>
                <td>55,000 đ</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
