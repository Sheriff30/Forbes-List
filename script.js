const sheetId = "1HdFs4zKrPda5f_oRhKXvblXH5iIuMF8EFsqtTZJxnyE";
const apiKey = "AIzaSyD45CByEMuGHfMukRO0H76m2WlqIsroNZQ";
const range = "Forbes List";

// Show loading indicator
const loadingDiv = document.getElementById("loading");
const tableContainer = document.getElementById("table-container");

fetch(
  `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
)
  .then((response) => response.json())
  .then((data) => {
    if (data.values && data.values.length > 0) {
      const table = document.createElement("table");
      const thead = document.createElement("thead");
      const tbody = document.createElement("tbody");

      // Create table header
      const headerRow = document.createElement("tr");
      data.values[0].forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      // Create table rows
      data.values.slice(1).forEach((row) => {
        const tr = document.createElement("tr");
        row.forEach((cell) => {
          const td = document.createElement("td");
          td.textContent = cell;
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);

      // Append table to the container
      tableContainer.appendChild(table);

      // Hide loading indicator and show table
      loadingDiv.style.display = "none";
      tableContainer.style.display = "block";
    } else {
      loadingDiv.innerHTML = "<p>No data found.</p>";
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    loadingDiv.innerHTML =
      "<p>Failed to load data. Please try again later.</p>";
  });
