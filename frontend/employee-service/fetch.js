const API_BASE_URL = 'http://localhost:3000/api/v1/employee';
let employeeModal;

document.addEventListener('DOMContentLoaded', function() {
    employeeModal = new bootstrap.Modal(document.getElementById('employeeModal'));
    initializeEventListeners();
    fetchEmployees();
});

function initializeEventListeners() {
    document.getElementById('sidebarToggle').addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('active');
        document.querySelector('.main-content').classList.toggle('active');
    });

    document.getElementById('saveEmployee').addEventListener('click', handleSaveEmployee);
}

function showAlert(isSuccess, message) {
    const successAlert = document.getElementById('successAlert');
    const errorAlert = document.getElementById('errorAlert');
    
    if (isSuccess) {
        successAlert.textContent = message;
        successAlert.style.display = 'block';
        setTimeout(() => successAlert.style.display = 'none', 3000);
    } else {
        errorAlert.textContent = message;
        errorAlert.style.display = 'block';
        setTimeout(() => errorAlert.style.display = 'none', 3000);
    }
}

async function fetchEmployees() {
    try {
        const response = await fetch(`${API_BASE_URL}/getemp`);
        if (!response.ok) throw new Error('Failed to fetch employees');
        const employees = await response.json();
        const tbody = document.getElementById('employeeList');
        tbody.innerHTML = '';
        employees.forEach(employee => addEmployeeToTable(employee));
    } catch (error) {
        showAlert(false, 'Failed to load employees: ' + error.message);
    }
}

async function handleSaveEmployee() {
    const form = document.getElementById('employeeForm');
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const employee = {
        name: document.getElementById('name').value,
        birthDate: document.getElementById('birthDate').value,
        address: document.getElementById('address').value,
        contactNumber: document.getElementById('contactNumber').value,
        emergencyContactNumber: document.getElementById('emergencyContactNumber').value
    };

    try {
        const response = await fetch(`${API_BASE_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee)
        });

        if (!response.ok) throw new Error('Failed to add employee');
        
        showAlert(true, 'Employee added successfully!');
        form.reset();
        employeeModal.hide();
        fetchEmployees();
    } catch (error) {
        showAlert(false, 'Failed to add employee: ' + error.message);
    }
}

function addEmployeeToTable(employee) {
    const tbody = document.getElementById('employeeList');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>${employee.name}</td>
        <td>${new Date(employee.birthDate).toLocaleDateString()}</td>
        <td>${employee.address}</td>
        <td>${employee.contactNumber}</td>
        <td>${employee.emergencyContactNumber}</td>
        <td>
            <button class="btn btn-sm btn-warning me-2" onclick="editEmployee('${employee.id}')">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteEmployee('${employee.id}')">Delete</button>
        </td>
    `;
    
    tbody.appendChild(row);
}

async function deleteEmployee(id) {
    if (!confirm('Are you sure you want to delete this employee?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/delete/${id}`, { method: 'DELETE' });

        if (!response.ok) throw new Error('Failed to delete employee');
        
        showAlert(true, 'Employee deleted successfully!');
        fetchEmployees();
    } catch (error) {
        showAlert(false, 'Failed to delete employee: ' + error.message);
    }
}

window.editEmployee = function(id) {
    console.log('Edit employee:', id);
};

window.deleteEmployee = deleteEmployee;
