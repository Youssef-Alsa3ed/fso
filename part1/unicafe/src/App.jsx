import { useState } from "react";
const StatisticLine = ({ name, value }) => {
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{value}</td>
      </tr>
    </>
  );
};
const Statistics = ({ good, bad, neutral }) => {
  const total = good + bad + neutral;
  const average = (good - bad) / total;
  const positive = (good / total) * 100.0 + "%";

  if (total == 0) {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    );
  }

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine name="good" value={good} />
          <StatisticLine name="neutral" value={neutral} />
          <StatisticLine name="bad" value={bad} />
          <StatisticLine name="total" value={total} />
          <StatisticLine name="average" value={average} />
          <StatisticLine name="positive" value={positive} />
        </tbody>
      </table>
    </>
  );
};
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
