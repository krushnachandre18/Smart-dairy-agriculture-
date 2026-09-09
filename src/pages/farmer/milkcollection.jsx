function MilkCollection() {
  return (
    <div>
      <h1>Milk Collection 🥛</h1>

      <label>Milk Quantity (Litres)</label>
      <br />
      <input
        type="number"
        placeholder="Enter quantity"
      />

      <br />
      <br />

      <label>Fat (%)</label>
      <br />
      <input
        type="number"
        step="0.1"
        placeholder="Enter fat"
      />

      <br />
      <br />

      <label>SNF (%)</label>
      <br />
      <input
        type="number"
        step="0.1"
        placeholder="Enter SNF"
      />

      <br />
      <br />

      <button>Add Milk</button>
    </div>
  );
}

export default MilkCollection;