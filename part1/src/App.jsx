import { useState } from "react";

function Button({ onClick, text }) {
  return <button onClick={onClick}>{text}</button>;
}

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  );
};
const Statistics = ({ sum, good, all, bad, neutral }) => {
  const positive = (good / all) * 100;
  const average = sum / all;
  if (all > 0) {
    return (
      <>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} />
            <StatisticLine text="total" value={all} />
          </tbody>
        </table>
      </>
    );
  }
  return <p>No feedback given</p>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [sum, setsum] = useState(0);
  const all = good + bad + neutral;
  console.log(all);
  function handleGood() {
    setGood((good) => good + 1);
    setsum((sum) => sum + 1);
  }
  function handleNeutral() {
    setNeutral((neutral) => neutral + 1);
  }
  function handleBad() {
    setBad((bad) => bad + 1);
    setsum((sum) => sum - 1);
  }

  return (
    <div>
      <h1>Give FeedBack</h1>
      <Button onClick={() => handleGood()} text="good" />
      <Button onClick={() => handleNeutral()} text="neutral" />
      <Button onClick={() => handleBad()} text="bad" />
      <h2>Statistics</h2>

      <Statistics sum={sum} good={good} bad={bad} neutral={neutral} all={all} />
    </div>
  );
};

export default App;
