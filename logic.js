var pkWeAreUpTo = 1;
var listItems = [

];

function userDidClickCreate() {
    var userEnteredData = captureUserData();
    var newItemDictionary= {
        "id": pkWeAreUpTo,
        "date": userEnteredData[0],
        "minTemp": userEnteredData[1],
        "maxTemp": userEnteredData[2],
        "condition": userEnteredData[3]
    };
    listItems.push(newItemDictionary);
    pkWeAreUpTo++;
    redrawTable(newItemDictionary);
}

function captureUserData() {
    var userEnteredDate = document.getElementById("date").value;
    var userEnteredMinTemp = document.getElementById("minTemp").value;
    var userEnteredMaxTemp = document.getElementById("maxTemp").value;
    var userEnteredCondition = document.getElementById("condition").value;

    var userData = [userEnteredDate, userEnteredMinTemp, userEnteredMaxTemp, userEnteredCondition];

    return userData;
}

function redrawTable(newItemDictionary) {
    var tbodyForDays = document.getElementById("tbodyForDays");
    var  myAction = "<input type='button' onclick='deleteItem(" + newItemDictionary["id"] + ")' value = 'Delete'></input>";
    var preparedRowHTML = "<tr id='rowForItem_" + newItemDictionary["id"] + "'>";
    preparedRowHTML += "<td class='contents'>" + newItemDictionary["date"] + "</td>";
    preparedRowHTML += "<td class='contents'>" + newItemDictionary["minTemp"] + "</td>";
    preparedRowHTML += "<td class='contents'>" + newItemDictionary["maxTemp"] + "</td>";
    preparedRowHTML += "<td class='contents'>" + newItemDictionary["condition"] + "</td>";
    preparedRowHTML += "<td>" + myAction + "</td>";
    preparedRowHTML += "</tr>";

    tbodyForDays.innerHTML += preparedRowHTML;
}

function deleteItem(rowToDelete) {
    document.getElementById("rowForItem_" + rowToDelete).innerHTML = "";
}