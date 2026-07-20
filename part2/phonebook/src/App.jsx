import { useEffect, useState } from "react";

import { getAll, create } from "./services/persons";

function isEmpty(str) {
  return !str || str.length === 0;
}
const Person = ({ person }) => {
  return (
    <>
      <p>
        {person.name} {person.number}
      </p>
    </>
  );
};

const Filter = ({ search, setSearch }) => {
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      {" "}
      <form>
        <div>
          search: <input value={search} onChange={handleSearch} />
        </div>
      </form>
    </>
  );
};

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    for (let person of persons) {
      if (newName === person.name || newNumber === person.number) {
        let str = newName === person.name ? newName : newNumber;
        alert(`${str} is already added to phonebook`);
        return;
      }
    }
    const newObject = {
      name: newName,
      number: newNumber,
    };
    create(newObject).then((data) => {
      setPersons(persons.concat(newObject));
      setNewName("");
      setNewNumber("");
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>

        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const PersonList = ({ persons, search }) => {
  const personsToShow = isEmpty(search)
    ? persons
    : persons.filter((person) => {
        // had a bug where sometimes data returned from the server may be corrupt when i was testing putting objects in the db
        // so using optional chaining here
        return person.name?.toLowerCase().includes(search.toLowerCase());
      });

  return (
    <>
      {personsToShow.map((person, index) => (
        <Person key={index} person={person} />
      ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />
      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <PersonList persons={persons} search={search} />
    </div>
  );
};

export default App;
