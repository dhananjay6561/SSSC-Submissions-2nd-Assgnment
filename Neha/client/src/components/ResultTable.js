import React, { useState, useEffect } from "react";
import { getserverdata } from "../helper";

export default function ResultTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getserverdata(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`,
      (res) => {
        setData(res);
      }
    );
  }, []);

  return (
    <div className="result-table">
      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Attempts</th>
            <th>Score</th>
            <th>Result</th>
          </tr>
        </thead>

        <tbody>
          {
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.username}</td>
                <td>{item.attempts}</td>
                <td>{item.score}</td>
                <td>{item.result}</td>
              </tr>
            ))
          }
        </tbody>

      </table>
    </div>
  );
}