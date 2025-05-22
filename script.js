const students = [];

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
    students.push(student);
    addStudentToTable(student);
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

function addStudentToTable(student) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${student.name}</td>
    <td>${student.lastName}</td>
    <td>${student.grade}</td>
    <td> <button class= "btn" > Eliminar </ button ></td>
  `;
    row.querySelector(".btn").addEventListener("click", function(){
        borrarEstudiante(student, row);
    })
    tableBody.appendChild(row);
}

function borrarEstudiante(student, row){
    const index = students.indexOf(student);
    if(index > -1){
        students.splice(index, 1);
        row.remove();
        calcularPromedio();
    }  
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

