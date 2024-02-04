import { useState } from "react";
const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};
const StatisticLine = ({ text, value }) => {
  if (text === "positive") {
    return (
      <tr>
        <td>
          {text} {value} %
        </td>
      </tr>
    );
  }
  return (
    <tr>
      <td>
        {text} {value}
      </td>
    </tr>
  );
};
const Statistics = ({ clicks }) => {
  const total = clicks.good + clicks.bad + clicks.neutral;
  const average = (clicks.good - clicks.bad) / total;
  const positive = clicks.good * (100 / total);
  if (total === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={clicks.good} />
          <StatisticLine text="neutral" value={clicks.neutral} />
          <StatisticLine text="bad" value={clicks.bad} />
          <StatisticLine text="total" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  );
};
const App = () => {
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  const handleGood = () => {
    setClicks({ ...clicks, good: clicks.good + 1 });
  };
  const handleNeutral = () => {
    setClicks({ ...clicks, neutral: clicks.neutral + 1 });
  };
  const handleBad = () => {
    setClicks({ ...clicks, bad: clicks.bad + 1 });
  };
  return (
    <div>
      <Header name="give Feedback" />
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Header name="statistics" />
      <Statistics clicks={clicks} />
    </div>
  );
};

export default App;
