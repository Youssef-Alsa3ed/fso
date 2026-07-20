import { useEffect, useState } from "react";

import { remove, getAll, create, update } from "./services/persons";

import { Filter, PersonForm, PersonList } from "./components/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const handleDeletion = (id) => {
    remove(id).then(() => {
      setPersons((currentPersons) =>
        currentPersons.filter((person) => person.id !== id),
      );
    });
  };

  const handleCreation = (newPerson) => {
    for (let person of persons) {
      if (newPerson.name === person.name) {
        let isDuplicate = newPerson.number === person.number;
        if (isDuplicate) {
          alert(`${person.name} is already added to phonebook`);
          return;
        } else {
          let id = person.id;
          update(id, newPerson).then((data) =>
            setPersons(persons.map((p) => (p.id === id ? data : p))),
          );
          return;
        }
      }
    }
    create(newPerson)
      .then((data) => {
        setPersons(persons.concat(data));
      })
      .catch((data) => {
        console.log("form submit failed!");
        console.log(data);
      });
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />
      <h2>Add a new</h2>
      <PersonForm persons={persons} handleCreation={handleCreation} />
      <h2>Numbers</h2>
      <PersonList
        persons={persons}
        search={search}
        handleDeletion={handleDeletion}
      />
    </div>
  );
};

export default App;
