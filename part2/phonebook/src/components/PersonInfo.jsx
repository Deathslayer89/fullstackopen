const PersonInfo = ({ person, removePerson }) => (
  <tr>
    <td style={{ paddingRight: "10px" }}>{person.name}</td>
    <td>{person.number}</td>
    <td>
      <button onClick={() => removePerson(person.id)}> delete </button>
    </td>
  </tr>
);
export default PersonInfo;
