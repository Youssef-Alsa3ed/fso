import { useEffect, useState } from "react";

import { remove, getAll, create, update } from "./services/persons";

import { Filter, PersonForm, PersonList } from "./components/persons";
import { Notification } from "./components/notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("notification");
  useEffect(() => {
    getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const notify = (text, type = "green") => {
    setNotificationType(type);
    setNotification(text);

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  const handleDeletion = (id) => {
    const deletedPerson = persons.find((person) => person.id === id);
    remove(id)
      .then(() => {
        setPersons((currentPersons) =>
          currentPersons.filter((person) => person.id !== id),
        );
      })
      .catch(() => notify("the person doesn't exist", "red"));

    notify(`${deletedPerson.name} has been deleted from the phonebook`, "red");
  };

  const handleCreation = (newPerson) => {
    for (let person of persons) {
      if (newPerson.name === person.name) {
        let isDuplicate = newPerson.number === person.number;
        if (isDuplicate) {
          notify(`${person.name} is already added to phonebook`);
          return;
        } else {
          let id = person.id;
          update(id, newPerson)
            .then((data) =>
              setPersons(persons.map((p) => (p.id === id ? data : p))),
            )
            .catch(() =>
              notify(
                `information of ${person.name} has been already removed from the server.`,
                "red",
              ),
            );
          notify(`${person.name}'s number has been updated.`);
          return;
        }
      }
    }
    create(newPerson)
      .then((data) => {
        setPersons(persons.concat(data));
        notify(`${data.name} has been added to the phonebook.`);
      })
      .catch((data) => {
        console.log("form submit failed!");
        console.log(data);
      });
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType} />
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
