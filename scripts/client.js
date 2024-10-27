const StudentsPage = document.getElementById('studentsPage')

let studentSignals = {}

function CreateStudentsPage(students) {
    const template = `
     <td class="studentName">
        <i class="fa-solid fa-user fa-xl"></i>
        <h2></h2>
        <h3></h3>
    </td>
    <td class="txt status"></td>
    <td class="txt nfc"></td>
    <td class="txt date"></td>
`;
    Object.values(students).forEach((data) => {
        if (!data.nfcId) return;
        let student = document.createElement('tr');
        student.innerHTML = template;

        student.querySelector('.studentName h2').innerHTML = `${data.firstName} ${data.lastName}`
        student.querySelector('.studentName h3').innerHTML = data.id

        student.querySelector('.nfc').innerHTML = data.nfcId

        student.querySelector('.status').innerHTML = data.currentPunchout ? 'OUT' : 'IN'
        student.querySelector('.status').className += data.currentPunchout ? ' out' : ' in'

        student.querySelector('.date').innerHTML += "DD/MM/YYYY HH:MM:SS"

        StudentsPage.querySelector('tbody').appendChild(student)
    })
    console.log(students)
}

fetch('https://student-tracker-api.azurewebsites.net/api/student/getall', {
    method: 'GET',
    headers: { ApiKey: 'NFJejnqGdi' }
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        CreateStudentsPage(data)
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

const { ipcRenderer } = require("electron");

document.getElementById('minimizeBtn').onclick = function () {
    ipcRenderer.send('minimize')
}
document.getElementById('closeBtn').onclick = function () {
    ipcRenderer.send('close')
}