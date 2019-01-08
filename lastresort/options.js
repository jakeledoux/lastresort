// Jake Ledoux, 2019
// dev@jakeledoux.com
// fight me on github

'use strict';

// Define and load options array
var options;
chrome.storage.sync.get("imgreplace", function (details) { options = details["imgreplace"]; ConstructRows();});

// idx isn't used yet, but it lets you specify where in the table you
// want your row to be.
function AddRow(name="", url="", color="#ff0000", idx=-1) {
  let table = document.getElementById('optionsTable');
  let row = table.insertRow(idx);
  row.setAttribute("class", "option", 0);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);

  cell1.innerHTML = '<input type="text" value="' + name + '">';
  cell2.innerHTML = '<input type="url" value="' + url + '">';
  cell3.innerHTML = '<input type="color" value="' + color + '" style="width:25px;">';
  cell4.innerHTML = '<button id="'+row.rowIndex+'">X</button>';

  document.getElementById(row.rowIndex).addEventListener("click", function () { document.getElementById('optionsTable').deleteRow(this.id); });
}

// Collect rows into an array of dictionaries and write it to disk
function SaveOptions(tempOptions = []) {

  // If no options provided
  if (tempOptions.length == 0) {
    let table = document.getElementById('optionsTable');
    let rows = table.rows;

    for (var i = 0; i < rows.length; i++) {
      // Check that the row isn't a header. Technically you could just start i at 1 but
      // this is less fragile to potential changes to page structure.
      if (rows[i].className == "option") { 
        let name = rows[i].cells[0].firstChild.value.trim();
        let url = rows[i].cells[1].firstChild.value.trim();
        let color = rows[i].cells[2].firstChild.value;
        // Make sure both inputs have text in them!
        if (name != "" && url != "") {
          tempOptions.push({"name": name, "url": url, "color": color});
        }
      }
    }
  }
  
  // Perhaps I could just write each artist as an item in this dictionary, but
  // until someone shows me why what I've done is terrible, I like the simplicity
  // of writing/reading one array object. Might change later.
  chrome.storage.sync.set({"imgreplace": tempOptions}, function(){});
}

// Inject row HTML for each artist the user has saved in their options
function ConstructRows() {
  try {
    console.log(options);
    for (var i = 0; i < options.length; i++) {
      AddRow(options[i]["name"], options[i]["url"], options[i]["color"]);
    }
  }
  // This happens when the user has no options saved
  catch (TypeError) {
    // Add blank row so the user can start adding artists
    AddRow();
  }
}

// Chrome wipes the options every time I unload this damn unpacked extension
// and I'm tired of adding them back manually. Feel free to add your own
// options in here too. (Right click the Add Row button to load)
function LoadDeveloperOptions() {
  options = [
    {
      "name": "Grant",
      "url": "https://pbs.twimg.com/media/DIQZwu8VwAEgJW1.jpg",
      "color": "#5b5ea4" 
    },
    {
      "name": "Glacier",
      "url": "https://pbs.twimg.com/profile_banners/133099806/1533914835/1500x500",
      "color": "#52411b"
    }
  ];

  SaveOptions(options);
  location.reload();
}

// Create "save" button
document.getElementById("save-button").addEventListener("click", function() { SaveOptions(); });
// Create "add row" button
document.getElementById("add-row").addEventListener("click", function () { AddRow(); });
document.getElementById("add-row").addEventListener("contextmenu", function () { LoadDeveloperOptions(); });