interface Office {
  name: string;
  offices?: Office[];
}

// Function to render a single node and its children recursively
function renderNode(office: Office): HTMLElement {
  const node = document.createElement("div");
  node.className = "node";
  const nameDiv = document.createElement("div");
  nameDiv.textContent = office.name;
  node.appendChild(nameDiv);

  if (office.offices && office.offices.length > 0) {
    const ul = document.createElement("ul");
    office.offices.forEach((child) => {
      const li = document.createElement("li");
      li.appendChild(renderNode(child));
      ul.appendChild(li);
    });
    node.appendChild(ul);
  }

  return node;
}

// Function to render the entire org chart
function renderOrgChart(jsonInput: string): void {
  const orgChartDiv = document.getElementById("orgChart") as HTMLDivElement;
  const errorDiv = document.getElementById("error") as HTMLDivElement;
  orgChartDiv.innerHTML = "";
  errorDiv.textContent = "";

  try {
    const data: Office = JSON.parse(jsonInput);
    if (!data.name) {
      throw new Error("Root office must have a 'name' property.");
    }
    const chart = renderNode(data);
    orgChartDiv.appendChild(chart);
  } catch (err) {
    errorDiv.textContent = `Error: ${err.message}`;
  }
}

// Initialize the app
function init(): void {
  const renderButton = document.getElementById("renderButton") as HTMLButtonElement;
  const jsonInput = document.getElementById("jsonInput") as HTMLTextAreaElement;

  renderButton.addEventListener("click", () => {
    renderOrgChart(jsonInput.value);
  });

  // Render the example JSON on load
  renderOrgChart(jsonInput.value);
}

// Run the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", init);