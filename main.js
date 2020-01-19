//const baseURL = "https://swapi.co/api/";

function  getData (url, cb) { // callback
    var xhr = new XMLHttpRequest();
    //var data; // sotre object in a variable to manipulate the response text
    
    xhr.open("GET", url);
    xhr.send();
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }   
    };
}

//build a table with javascript
function getTableHeaders(obj) { //new function that takes a single object
    var tableHeaders = []; // new array
    
    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`); // td table cell
    });
    
    return `<tr>${tableHeaders}</tr>`; //table row
    // using this backtick, or back quote, formation here. Those are not standard single quotes. soemthing called template literal
}

function generatePaginationButtons(next, prev) {
    if (next && prev) {
        return  `<button onclick="writeToDocument('${prev}')">Previous</button>
                 <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) { 
        return  `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }  
} 

//option 3
function writeToDocument(url) {
    var tableRows = []; // tableRows will house each row of data for us
    var el = document.getElementById("data"); //to store our data ID in VAR el
    el.innerHTML = ""; // this code will clear the code everytime the button gets clicked
    getData(url, function(data) {
        //unpacking data dir = directory
        //console.dir(data); //CHECK WHEN THIS IS REMOVED
        //unpacking a bit further
       
       var pagination;
       if (data.next || data.previous) { //pagination buttons
            pagination = generatePaginationButtons(data.next, data.previous)
       }    
       
       data = data.results;
        var tableHeaders = getTableHeaders(data[0]);
        
        data.forEach(function(item) {
            var dataRow = [];
            
            Object.keys(item).forEach(function(key) {
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15) //take first 15 characters
                dataRow.push(`<td>${truncatedData}</td>`); // show truncated data instead of rowdata
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
            
            //Object.keys(item).forEach(function(key) { //use this kind of approach to iterate over the keys to build ourselves a table full of data without actually explicitly specifying a property.
            //    console.log(key);
            //});
            //el.innerHTML += "<p>"+ item.name + "</p>";
        });
        
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g, "");//use backtick is IMPORTANT!!!
    });
}

/////////////////////////////////////////////////////////////////
//option 2
//function printDataToConsole(data) {
//    console.log(data);
//}

//getData(printDataToConsole);

//option 1
//getData(function (data) { //we get data as an argument
//    console.log(data)
//})

/*setTimeout(function() {
    console.log(data);
}, 1000); */


//document.getElementById("data").innerHTML = this.responseText;
//console.log(typeof(this.responseText)); to find out if is an object or not
//console.log(typeof(JSON.parse(this.responseText))); it tells us the data is an objectt
//console.log(JSON.parse(this.responseText)); let's actually see the data contained in that object.

//If we want to manipulate it so that we can display it in a pleasant format for our users, then we need to put it into JSON.

//the problem with putting console log in line 10 is that all of the work
//we need to do with data would have to be done inside the "xhr.onreadystatechange" function,
//which could make things really messy and complicated because all of the code 
//for our application could potentially end up inside this function.
// WE NEED TO GET THE DATA OUT OF THERE FOR EXAMPLE BY CREATING A NEW FUNCTION

//function setData(jsonData) {
//    data = jsonData;
    //console.log(data); //also called deserializing our JSON.
//}   // this can be removed when adding timeout