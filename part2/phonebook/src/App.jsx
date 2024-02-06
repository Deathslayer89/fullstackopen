/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/person";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterIndex, setFilterIndex] = useState("");
  const [message, setMessage] = useState(null);
  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const handleFilterChange = (e) => {
    setFilterIndex(e.target.value);
  };

  const register = (e) => {
    e.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      const updatedPerson = { ...existingPerson, number: newNumber };
      if (
        window.confirm(
          `${newName} already in the phonebook, replace the old number with a new one`
        )
      ) {
        console.log(existingPerson, updatedPerson);
        personService
          .update(existingPerson.id, updatedPerson)
          .then((response) => {
            console.log(response);
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : updatedPerson
              )
            );
          }).catch((error)=>{
            console.log(error)
            setPersons(persons.filter(person => person.id !== updatedPerson.id))
            
            setMessage(
              `[ERROR] ${updatedPerson.name} was already deleted from server`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      const newRecord = { name: newName, number: newNumber };

      personService.create(newRecord).then((response) => {
        response;
        setPersons(persons.concat(response));
      });
    }
    setNewName("");
    setNewNumber("");
    setMessage(`${newName} was successfully updated`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const removePerson = (id) => {
    const person = persons.filter((person) => person.id === id)[0];
    console.log(id, person);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(id)
        .then((response) => {
          console.log(response);
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((err) => {
          console.log(err);
          setMessage(`[ERROR] ${err.response.data.error}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
  };
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterIndex.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={filterIndex} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={register}
        name={newName}
        onNameChange={(e) => setNewName(e.target.value)}
        number={newNumber}
        onNumberChange={(e) => setNewNumber(e.target.value)}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} removePerson={removePerson} />
    </div>
  );
};

export default App;
