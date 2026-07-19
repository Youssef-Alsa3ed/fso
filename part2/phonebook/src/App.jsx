import { useState } from "react";

const Person = ({ person }) => {
  return <p>{person.name}</p>;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    for (let person of persons) {
      if (newName === person.name) {
        alert(`${newName} is already added to phonebook`);
        return;
      }
    }
    const newObject = {
      name: newName,
    };
    setPersons(persons.concat(newObject));
    setNewName("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <Person key={index} person={person} />
      ))}
    </div>
  );
};

export default App;
