(async function () {
  // Fetch the data
  const response = await fetch("./data.json");
  let employees = await response.json();

  let selectedEmployeeId = employees[0].id;
  let selectedEmployee = employees[0];

  // NOTE - querySelector gives you a static node list while getElementsByClassName gives you a live node list
  const employeeListHTML = document.querySelector(".employee-name-list");
  const employeeInfoHTML = document.querySelector(".employee-details-list");

  // Render the employee to the UI
  const renderEmployees = () => {
    employeeListHTML.innerHTML = "";
    employees.forEach((employee) => {
      const employeeSPAN = document.createElement("span");
      employeeSPAN.classList.add("employee-name-list-items");

      // If the employee is selected
      if (parseInt(selectedEmployeeId, 10) === employee.id) {
        employeeSPAN.classList.add("selected");
        selectedEmployee = employee;
      }

      employeeSPAN.setAttribute("id", employee.id);
      employeeSPAN.innerHTML = `${employee.firstName} ${employee.lastName} <i class="delete-button">X</i>`;
      // employeeSPAN.innerHTML

      employeeListHTML.append(employeeSPAN);
    });
  };

  renderEmployees();

  // Add Employee Logic
  const createEmployeeButtonHTML = document.querySelector(".create-employee");
  const addEmployeeModalHTML = document.querySelector(".addEmployee-container");
  const addEmployeeFormHTML = document.querySelector(".addEmployee-create");
  const dobInputHTML = document.querySelector(".addEmployee-dob");
  // 18 Years of old is required
  dobInputHTML.max = `${new Date().getFullYear() - 18} - ${new Date()
    .toISOString()
    .slice(5, 10)}`;

  createEmployeeButtonHTML.addEventListener("click", () => {
    addEmployeeModalHTML.style.display = "flex";
  });

  addEmployeeModalHTML.addEventListener("click", (e) => {
    if (e.target.className === "addEmployee-container") {
      addEmployeeModalHTML.style.display = "none";
    }
  });

  addEmployeeFormHTML.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(addEmployeeFormHTML);
    const values = [...formData.entries()];

    let empData = {};

    values.forEach((value) => {
      empData[value[0]] = value[1];
    });

    empData.id = employees[employees.length - 1].id + 1;
    empData.age =
      new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
    empData.imageUrl =
      empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";

    employees.push(empData);
    renderEmployees();
    addEmployeeFormHTML.reset();
    addEmployeeModalHTML.style.display = "none";
  });

  // Select Employee Logic
  employeeListHTML.addEventListener("click", (e) => {
    // Delete Logic
    if (e.target.tagName === "I") {
      employees = employees.filter((emp) => {
        return String(emp.id) !== e.target.parentNode.id;
      });

      if (String(selectedEmployeeId) === e.target.parentNode.id) {
        selectedEmployeeId = employees[0]?.id || -1;
        selectedEmployee = employees[0] || {};
        renderSingleEmployee();
      }

      renderEmployees();
    }

    // As the selectable area is a span
    if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
      selectedEmployeeId = e.target.id;
      renderEmployees();
      renderSingleEmployee();
    }
  });

  // Render Selected Employee
  const renderSingleEmployee = () => {
    if (selectedEmployeeId === -1) {
      employeeInfo.innerHTML = "";
      return;
    }

    employeeInfoHTML.innerHTML = `
        <img src='${selectedEmployee.imageUrl}'/>
        <span class='employee-details-list-heading'>${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})</span>
        <span>${selectedEmployee.address}</span>
        <span>${selectedEmployee.email}</span>
        <span>${selectedEmployee.contactNumber}</span>
        <span>${selectedEmployee.dob}</span>
    `;
  };

  if (selectedEmployee) renderSingleEmployee();
})();
