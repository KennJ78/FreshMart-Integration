const employeeTableBody = document.getElementById('employeeList');
const successAlert = document.getElementById('successAlert');
const errorAlert = document.getElementById('errorAlert');

const API_URL = "http://localhost:3000/api/v1/employee"; // Update with your actual API URL

// Fetch all employees
const fetchEmployees = async () => {
    try {
        const response = await fetch(`${API_URL}/all`);
        const result = await response.json();

        console.log("API Response:", result); // Debugging

        // Ensure the response contains an array
        if (!Array.isArray(result.data)) {
            throw new Error("Invalid API response format.");
        }

        employeeTableBody.innerHTML = ''; // Clear table before adding new data
        result.data.forEach((employee, index) => {
            employeeTableBody.appendChild(createEmployeeRow(employee, index));
        });
    } catch (error) {
        console.error("Error fetching employees:", error);
        showAlert(false, "Failed to fetch employees.");
    }
};

// Create a row for each employee
const createEmployeeRow = (employee, index) => {
    

    const employeeId = employee.id || employee.ID || employee._id; 

    if (!employeeId) {
        console.error("Error: Employee ID is missing", employee);
        return; 
    }
    const tr = document.createElement('tr');

    tr.innerHTML = `
    
        <td>${employee.Full_Name}</td>
        <td>${employee.Date_of_Birth}</td>
        <td>${employee.Address}</td>
        <td>${employee.Contact_Number}</td>
        <td>${employee.Emergency_Contact_Number}</td>
        <td>
         <button class="btn btn-primary btn-sm" onclick="showUpdateModal(${employee.id}, '${employee.Full_Name}', '${employee.Date_of_Birth}', '${employee.Address}', '${employee.Contact_Number}', '${employee.Emergency_Contact_Number}')">
                <i class="bi bi-pencil-square"></i> Update
            </button>
           <button class="btn btn-danger btn-sm" onclick="deleteEmployee('${employeeId}')">
                <i class="bi bi-trash"></i> Delete
            </button>
        </td>
    `;

    return tr;
};


// Show success or error alerts
const showAlert = (isSuccess, message) => {
    if (isSuccess) {
        successAlert.textContent = message;
        successAlert.style.display = 'block';
        setTimeout(() => (successAlert.style.display = 'none'), 3000);
    } else {
        errorAlert.textContent = message;
        errorAlert.style.display = 'block';
        setTimeout(() => (errorAlert.style.display = 'none'), 3000);
    }
};

// Add new employee
document.getElementById('saveEmployee').addEventListener('click', async () => {
    const name = document.getElementById('name').value.trim();
    const birthDate = document.getElementById('birthDate').value;
    const address = document.getElementById('address').value.trim();
    const contactNumber = document.getElementById('contactNumber').value.trim();
    const emergencyContactNumber = document.getElementById('emergencyContactNumber').value.trim();

    if (!name || !birthDate || !address || !contactNumber || !emergencyContactNumber) {
        showAlert(false, "Please fill in all fields.");
        return;
    }

    // Convert birthDate to YYYY-MM-DD format
    const formattedBirthDate = new Date(birthDate).toISOString().split('T')[0];

    // Ensure field names match API expectations
    const newEmployee = {
        
        FULL_Name: name,
        Date_of_Birth: formattedBirthDate,
        Address: address,
        Contact_Number: contactNumber,
        Emergency_Contact_Number: emergencyContactNumber
    };

    try {
        const response = await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEmployee)
        });

        const result = await response.json();

        if (response.ok) {
            showAlert(true, "Employee added successfully!");
            document.getElementById('employeeForm').reset();
            fetchEmployees(); // Refresh table
            bootstrap.Modal.getInstance(document.getElementById('employeeModal')).hide(); // Hide modal
        } else {
            console.error("Server Response:", result);
            throw new Error(result.message || "Failed to add employee.");
        }
    } catch (error) {
        console.error("Error adding employee:", error);
        showAlert(false, error.message);
    }
});

// Show Update Modal and Populate Fields
const showUpdateModal = (id, name = "", birthDate = "", address = "", contactNumber = "", emergencyContactNumber = "") => {
    document.getElementById('updateId').value = id;
    document.getElementById('updateName').value = name || "";
    document.getElementById('updateBirthDate').value = birthDate || "";
    document.getElementById('updateAddress').value = address || "";
    document.getElementById('updateContactNumber').value = contactNumber || "";
    document.getElementById('updateEmergencyContactNumber').value = emergencyContactNumber || "";

    new bootstrap.Modal(document.getElementById('updateModal')).show();
};


// Update Employee
document.getElementById('updateEmployee').addEventListener('click', async () => {
    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value.trim();
    const birthDate = document.getElementById('updateBirthDate').value;
    const address = document.getElementById('updateAddress').value.trim();
    const contactNumber = document.getElementById('updateContactNumber').value.trim();
    const emergencyContactNumber = document.getElementById('updateEmergencyContactNumber').value.trim();

    if (!id || !name || !birthDate || !address || !contactNumber || !emergencyContactNumber) {
        showAlert(false, "Please fill in all fields.");
        return;
    }

    const formattedBirthDate = new Date(birthDate).toISOString().split('T')[0];

    const updatedEmployee = {
        FULL_Name: name,  
        Date_of_Birth: formattedBirthDate,
        Address: address,
        Contact_Number: contactNumber,
        Emergency_Contact_Number: emergencyContactNumber
    };

    try {
        const response = await fetch(`${API_URL}/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedEmployee)
        });

        const result = await response.json();

        if (response.ok) {
            showAlert(true, "Employee updated successfully!");
            fetchEmployees(); // Refresh table
            bootstrap.Modal.getInstance(document.getElementById('updateModal')).hide();
        } else {
            throw new Error(result.message || "Failed to update employee.");
        }
    } catch (error) {
        console.error("Error updating employee:", error);
        showAlert(false, error.message);
    }
});


// Delete an employee
const deleteEmployee = async (id) => {
    if (!id) {
        showAlert(false, "Error: Employee ID is missing.");
        return;
    }

    if (!confirm("Are you sure you want to delete this employee?")) return;

    try {
        const response = await fetch(`${API_URL}/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (response.ok) {
            showAlert(true, "Employee deleted successfully!");
            fetchEmployees(); // Refresh table
        } else {
            throw new Error(result.message || "Failed to delete employee.");
        }
    } catch (error) {
        console.error("Error deleting employee:", error);
        showAlert(false, error.message);
    }
};


// Fetch employees on page load
fetchEmployees();
