import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({ data: [] });
  const [change1, setChange1] = useState("2019-11-28");
  const [change2, setChange2] = useState("2019-12-13");
  const [url, setUrl] = useState(
    `https://api.coindesk.com/v1/bpi/historical/close.json?currency=EUR&start=2019-12-01&end=2019-12-13`
  );
  //`https://api.coindesk.com/v1/bpi/historical/close.json?currency=EUR&start=${chages}&end=2019-12-13`
  const [isError, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const response = await axios(url);

        setData(response);
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, [url]);

  const handleTable = items => {
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Date</th>
            <th> Bitcoins Courses</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(items)
            .reverse()
            .map(item => {
              return (
                <tr>
                  <td key={item}>{item}</td>{" "}
                  <td key={items[item]}>
                    {"\u20AC"}
                    {items[item]}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1 className="ui block header">
        Enter the Date you want to render from -> to{" "}
      </h1>
      <Fragment>
        <form
          className={isError ? "ui input focus error" : "ui input focus"}
          style={{ marginBottom: "20px" }}
          onSubmit={event => {
            setUrl(
              `https://api.coindesk.com/v1/bpi/historical/close.json?currency=EUR&start=${change1}&end=${change2}`
            );
            event.preventDefault();
          }}
        >
          <input
            type="text"
            value={change1}
            onChange={event => setChange1(event.target.value)}
          />

          <input
            type="text"
            value={change2}
            onChange={event => setChange2(event.target.value)}
          />
          <button className="ui button" type="submit">
            Submit
          </button>
        </form>
        {isError && (
          <p className="ui red message">
            opps ☹ somting went wrong please make sure the format is
            Year-month-day ex: 2001-01-01
          </p>
        )}
        <div>{!!data.data.bpi && handleTable(data.data.bpi)}</div>
      </Fragment>
    </div>
  );
}

export default App;
