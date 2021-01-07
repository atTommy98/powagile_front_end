import React, { useState } from "react";

function DateFilter() {
  const [date, setDate] = useState("");
  const [isDateFilter, setIsDateFilter] = useState(false);
  const [dateFilter, setDateFilter] = useState(null);

  function filterHistoryDate(date) {
    setIsDateFilter(true);
    setDateFilter(date);
  }
  console.log(date);
  console.log(isDateFilter);
  console.log(dateFilter);

  return (
    <div className="input-container">
      <div className="notes inner2">
        <h2>Filter by Date</h2>
        <br></br>
        <span>
          <input
            style={{ width: "175px", align: "center", display: "inline-block" }}
            className="form-control-homepage"
            type="date"
            onChange={(event) => setDate(event.target.value)}
            placeholder="filter"
            name="filter-date"
          ></input>
          <button
            style={{
              display: "inline-block",
              fontSize: "10px",
              width: "60px",
              height: "37px",
              margin: "5px",
              backgroundColor: "rgb(120, 130, 134)",
            }}
            onClick={() => filterHistoryDate(date)}
          >
            Filter
          </button>
        </span>
      </div>
    </div>
  );
}

export default DateFilter;
