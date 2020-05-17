const locations = [
    {
        startDate: '2020.05.05 12:00:22',
        endDate: '2020.06.05 12:00:22',
        city: 'bney brak',
        location: 'school',
        patientId: '111'
    }, {
        startDate: '2020.05.05 12:00:22',
        endDate: '2020.06.05 12:00:22',
        city: 'jerusalem',
        location: 'library',
        patientId: '111'
    }, {
        startDate: '2020.05.05 12:00:22',
        endDate: '2020.06.05 12:00:22',
        city: 'elad',
        location: 'park',
        patientId: '111'
    },
    {
        startDate: '2020.05.05 12:00:22',
        endDate: '2020.06.05 12:00:22',
        city: 'jerusalem',
        location: 'school',
        patientId: '222'
    },
    {
        startDate: '2020.05.05 12:00:22',
        endDate: '2020.06.05 12:00:22',
        city: 'tel aviv',
        location: 'school',
        patientId: '333'
    }
];
let added = false;
const searchBottun = document.getElementById('search');
const patientLocations = [];
searchBottun.addEventListener("click", locationsForPatient);

const helloTitle = document.createElement('h1');
helloTitle.innerText = 'Epidemiology Report';

document.getElementById("title").appendChild(helloTitle);
function locationsForPatient() {
    cleanTable();
    patientId = document.getElementById('patientID').value;
    patientLocations.splice(0, patientLocations.length);
    patientLocations.push(...(locations.filter(function (location) {
        return location.patientId === patientId;
    })));
    if (patientLocations.length > 0)
        createPathTable(patientLocations);
    if (added === false)
        addAddingOption();
}
function createPathTable(patientLocations) {
    const table = document.getElementById("pathsTable");
    const row = table.insertRow(0);
    const colNames = Object.getOwnPropertyNames(locations[0]);
    for (let i = 0; i < 5; i++) {
        const cell = row.insertCell(i);
        if (i !== 4) {
            cell.innerHTML = colNames[i];
        }
        cell.setAttribute("class", "title");
    }
    for (let i = 0; i < patientLocations.length; i++) {
        const row = table.insertRow(i + 1);
        row.setAttribute("id", "row" + i);
        for (let j = 0; j < 4; j++) {
            const cellName = colNames[j];
            const cell = row.insertCell(j);
            const path = patientLocations[i];
            cell.innerHTML = path[cellName];
        }
        const cancle = row.insertCell(4);
        cancle.innerHTML = " X ";
        cancle.addEventListener('click', removePath);
    }
}
function addNewLocation() {
    const newPath = {
        startDate: document.getElementById("startDate").value,
        endDate: document.getElementById("endDate").value,
        city: document.getElementById("city").value,
        location: document.getElementById("location").value,
        patientId: document.getElementById('patientID').value
    };
    locations.push(newPath);
    locationsForPatient();
    cleanAddingOption();
}
function removePath(path) {
    const rowRemove = path.path[1].id.substr(3, 1);
    const patient = patientLocations[rowRemove];
    locations.splice(locations.indexOf(patient), 1);
    locationsForPatient();
}
function addAddingOption() {
    added = true;
    const AddStartDate = document.createElement("INPUT");
    AddStartDate.setAttribute("type", "date");
    AddStartDate.setAttribute("id", "startDate");
    document.getElementById("addLocation").appendChild(AddStartDate);

    const AddEndDate = document.createElement("INPUT");
    AddEndDate.setAttribute("type", "date");
    AddEndDate.setAttribute("id", "endDate");
    document.getElementById("addLocation").appendChild(AddEndDate);

    const AddCity = document.createElement("INPUT");
    AddCity.setAttribute("type", "text");
    AddCity.setAttribute("id", "city");
    document.getElementById("addLocation").appendChild(AddCity);

    const AddLocation = document.createElement("INPUT");
    AddLocation.setAttribute("type", "text");
    AddLocation.setAttribute("id", "location");
    document.getElementById("addLocation").appendChild(AddLocation);

    const addPath = document.createElement("INPUT");
    addPath.setAttribute("type", "button");
    addPath.setAttribute("id", "addPath");
    addPath.addEventListener("click", addNewLocation);
    addPath.value = "Add Location";
    document.getElementById("addLocation").appendChild(addPath);
}
function cleanTable() {
    const table = document.getElementById("pathsTable");
    table.innerHTML = "";
}
function cleanAddingOption() {
    document.getElementById('startDate').value = "";
    document.getElementById('endDate').value = "";
    document.getElementById('endDate').value = "";
    document.getElementById('city').value = "";
    document.getElementById('location').value = "";
}

//-------Batya Code---------
initList(locations);
document.getElementById('cityInput').addEventListener("change", filterCity);
document.getElementById('select').addEventListener("change", filterCity);
function initList(listToInit) {
    document.getElementById('list').innerHTML = '';
    let sorted = sortDates(listToInit);
    sorted.forEach(element => {

        let item = document.createElement("li", element);
        item.innerText = element.startDate + ' ' + element.endDate + ' | ' + element.city + ' | ' + element.location
        document.getElementById('list').appendChild(item);
    });
}
function filterCity() {
    let selected = this.value;
    console.log("selected city ", selected);
    let match = '';
    if (selected !== '' && selected !== 'All') {
        match = locations.filter(element => element.city === selected);
    }
    else
        match = locations;
    initList(match);
}
function compareDates(a, b) {
    return a.startDate > b.startDate ? 1 : -1;
}
function sortDates(listToSort) {
    return listToSort.sort(compareDates);
}
