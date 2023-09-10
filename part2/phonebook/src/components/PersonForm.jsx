function PersonForm({ onAdd, newName, setNewName, phoneNum, setPhoneNum }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        onAdd(); // Call onAdd when the form is submitted
      }}
    >
      <div>
        name:
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        <div>
          number:
          <input
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;
