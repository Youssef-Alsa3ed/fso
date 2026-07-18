import { useState } from "react";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Votes = ({ votes, selected }) => {
  if (!votes.has(selected)) {
    return <></>;
  }

  return (
    <>
      <p>has {votes.get(selected)} votes</p>
    </>
  );
};

const Statistics = ({ anecdotes, votes }) => {
  let keyOfMax = 0;

  votes.forEach((value, key) => {
    keyOfMax =
      (votes.get(key) ?? 0) > (votes.get(keyOfMax) ?? 0) ? key : keyOfMax;
  });

  return (
    <>
      <h1>anecdote with the highest votes</h1>
      <p>{anecdotes[keyOfMax]}</p>
      <Votes votes={votes} selected={keyOfMax} />
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const count = anecdotes.length;

  const [selected, setSelected] = useState(getRandomInt(count));
  const [votes, setVotes] = useState(new Map());
  const randomize = () => {
    let next = getRandomInt(count);
    while (next == selected) {
      next = getRandomInt(count);
    }

    return next;
  };

  const UpdateVotes = () => {
    const newVotes = new Map(votes);
    if (!newVotes.has(selected)) {
      newVotes.set(selected, 0);
    }
    newVotes.set(selected, newVotes.get(selected) + 1);
    setVotes(newVotes);
  };
  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <Votes votes={votes} selected={selected} />
      <Button text="next" onClick={() => setSelected(randomize)} />
      <Button text="vote" onClick={UpdateVotes} />

      <Statistics anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

export default App;
