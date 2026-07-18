import { useState } from "react";

const Display = (props) => {
  return <div>{props.counter}</div>;
};
const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};
const App = () => {
  const [counter, setCounter] = useState(0);

  console.log("rendering with counter value ", counter);
  const incrementOnClick = () => {
    console.log("increasing, value before ", counter);
    setCounter(counter + 1);
  };

  const resetOnClick = () => {
    console.log("resetting to zero, value before ", counter);
    setCounter(0);
  };

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={incrementOnClick} text="increment" />
      <Button onClick={resetOnClick} text="reset" />
    </div>
  );
};

export default App;
