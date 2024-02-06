import PersonInfo from "./PersonInfo";
const Persons = ({ persons, removePerson }) => {
  return (
    <table>
      <tbody>
        {persons.map((person) => (
          <PersonInfo
            key={person.name}
            person={person}
            removePerson={removePerson}
          />
        ))}
      </tbody>
    </table>
  );
};
export default Persons;
