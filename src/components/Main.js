import React, { useState } from "react";
import "./Main.css";

const Main = () => {
  const [userValue, setUserValue] = useState({
    amount: "",
    interest: "",
    years: "",
  });

  const [results, setResults] = useState(null);

  const changeHandler = (event) => {
    setUserValue({ ...userValue, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setResults(calculateResults(userValue));
  };

  const calculateResults = ({ amount, interest, years }) => {
    const userAmount = Number(amount);
    const calculatedInterest = Number(interest) / 100 / 12;
    const calculatedPayments = Number(years) * 12;
    const n = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (userAmount * n * calculatedInterest) / (n - 1);

    return monthly.toFixed(2);
  };

  return (
    <div>
      <h1>Mortgage Calculator</h1>
      <form onSubmit={submitHandler}>
        <label>
          Loan Amount:
          <input
            type="number"
            name="amount"
            placeholder="Enter Loan Amount"
            min="0"
            max="1000000000"
            value={userValue.amount}
            onChange={changeHandler}
          />
        </label>
        <br />
        <label>
          Years:
          <input
            type="number"
            name="years"
            placeholder="How Many Years is your Term?"
            value={userValue.years}
            onChange={changeHandler}
          />
        </label>
        <label>
          Interest Rate:
          <input
            type="number"
            name="interest"
            placeholder="Enter Interest Rate"
            value={userValue.interest}
            onChange={changeHandler}
          />
        </label>{" "}
        <br />
        <input type="submit" value="submit" />
      </form>
      <div>
        <p>Monthly Payment: ${results}</p>
      </div>
    </div>
  );
};

export default Main;
