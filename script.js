const students = [];
let editingIndex = -1;

document.getElementById("studentform").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = parseFloat(document.getElementById("grade").value);

    if (grade > 7 || grade < 1 || !name || !lastName || isNaN(grade)) {
        alert("Error al ingresar los datos");
        return;
    }

    const student = { name, lastName, grade };

    if (editingIndex >= 0) {
        students[editingIndex] = student;
        updateTable();
        editingIndex = -1;
    } else {
        students.push(student);
        addStudentToTable(student);
    }

    calcularPromedio();
    this.reset();
});

function mostrarFecha() {
    const fecha = new Date();
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
    document.getElementById("currentDate").textContent = `Fecha: ${fechaFormateada}`;
}

mostrarFecha();

const tableBody = document.getElementById("studentTableBody");

function addStudentToTable(student, index = students.length - 1) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.grade}</td>
        <td>
                <button class="btn edit-btn">Editar</button>
                <button class="btn delete-btn">Eliminar</button>
        </td>
    `;

    row.querySelector(".delete-btn").addEventListener("click", function () {
        borrarEstudiante(index);
    });

    row.querySelector(".edit-btn").addEventListener("click", function () {
        document.getElementById("name").value = student.name;
        document.getElementById("lastName").value = student.lastName;
        document.getElementById("grade").value = student.grade;
        editingIndex = index;
    });

    tableBody.appendChild(row);
}

function borrarEstudiante(index) {
    students.splice(index, 1);
    updateTable();
    calcularPromedio();
}

function updateTable() {
    tableBody.innerHTML = "";
    students.forEach((student, index) => {
        addStudentToTable(student, index);
    });
}

const promDiv = document.getElementById("average");

function calcularPromedio() {
    if (students.length === 0) {
        promDiv.innerHTML = "Promedio General del Curso: N/A";
        return;
    }

    const total = students.reduce((acc, student) => acc + student.grade, 0);
    const average = total / students.length;
    promDiv.innerHTML = `Promedio General del Curso: ${average.toFixed(2)}`;
}
