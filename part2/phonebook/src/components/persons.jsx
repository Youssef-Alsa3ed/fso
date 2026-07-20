import { useEffect, useState } from "react";
function isEmpty(str) {
  return !str || str.length === 0;
}
const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};
const Person = ({ person, onDelete }) => {
  return (
    <>
      <p>
        {person.name} {person.number}
        <Button
          text="delete"
          onClick={() => {
            if (window.confirm("Do you want to delete this entry?")) {
              onDelete(person.id);
            }
          }}
        />
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
      <form>
        <div>
          search: <input value={search} onChange={handleSearch} />
        </div>
      </form>
    </>
  );
};

const PersonForm = ({ handleCreation }) => {
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

    const newObject = {
      name: newName,
      number: newNumber,
    };

    handleCreation(newObject);
    setNewName("");
    setNewNumber("");
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

const PersonList = ({ persons, search, handleDeletion }) => {
  const personsToShow = isEmpty(search)
    ? persons
    : persons.filter((person) => {
        // had a bug where sometimes data returned from the server may be corrupt when i was testing putting objects in the db
        // so using optional chaining here
        return person.name?.toLowerCase().includes(search.toLowerCase());
      });

  return (
    <>
      {personsToShow.map((person) => (
        <Person key={person.id} person={person} onDelete={handleDeletion} />
      ))}
    </>
  );
};

export { Filter, PersonForm, PersonList };
