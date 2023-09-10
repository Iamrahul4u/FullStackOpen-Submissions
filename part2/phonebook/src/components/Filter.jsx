function Filter({ query, setQuery, onSearch }) {
  return (
    <div>
      filter shown with:
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch(e);
        }}
      />
    </div>
  );
}

export default Filter;
