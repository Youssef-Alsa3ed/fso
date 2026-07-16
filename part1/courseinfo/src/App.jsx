import { useState } from "react";

const Header = () => {
  const course = "Half Stack application development";
  return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, index) => {
        return (
          <p key={index}>
            {part.name} {part.exercise}
          </p>
        );
      })}
    </>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercise, 0);

  return (
    <>
      <p>Number of exercises: {total}</p>
    </>
  );
};

const App = () => {
  const parts = [
    { name: "Fundamentals of React", exercise: 10 },
    { name: "Using props to pass data", exercise: 7 },
    { name: "State of a component", exercise: 14 },
  ];
  return (
    <div>
      <Header />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};
export default App;
