var pkWeAreUpTo = 1;
var listItems = [

];

function bodyDidLoad() {
	const inputElement = document.getElementById("fileUploader");
	inputElement.addEventListener("change", handleFiles, false);
	function handleFiles() {
		file0 =  this.files[0];
		var myFileReader = new FileReader();
		myFileReader.onload = function(fileLoadedEvent){
			var textFromFileLoaded = fileLoadedEvent.target.result;
			fileDidFinishGettingRead(textFromFileLoaded);
		};
		myFileReader.readAsText(file0);
	}
}

function fileDidFinishGettingRead(textFromFileLoaded) {
	console.log(textFromFileLoaded);
	myNewList = JSON.parse(textFromFileLoaded);
	redrawTableFromList(myNewList);
}

function redrawTableFromList(myNewList) {
	$("tbodyForDays").html("");
	myNewList.forEach(element => addItemToTable(element));
}

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
function downloadJSON() {
	download("data.json", JSON.stringify(listItems, null, '\t'));
}

// Adapted from:
// https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}
