
"use strict";
var baseURL = "http://localhost:3000/horses/";

//När sidan laddas så körs funktion för att läsa ut kurser
document.addEventListener("DOMContentLoaded", function () {
    //url till vilket anropet görs
    let url = baseURL;
    //get-anrop 
    fetch(url, { method: 'GET' })
        .then(response => response.text())
        .then(data => {
            var jsonData = JSON.parse(data);

            var s = "<table><th>Namn</th><th>Ras</th><th>Ålder</th><th>Ägare</th>";
            //loop för att läsa ut kurser
            for (var i = 0; i < jsonData.length; i++) {
                s +=
                    "<tr>"
                    + "<td>" + jsonData[i].name
                    + "</td><td>" + jsonData[i].breed
                    + "</td><td>" + jsonData[i].age
                    + "</td><td>" + jsonData[i].owner
                    + "</td><td><button class=deletebutton id=" + jsonData[i]._id + ">Radera</button></td></tr><br>";
            }
            s += "</table>";
            document.getElementById("result").innerHTML = s;
        })
        .catch(error => {
            alert('there was an error ' + error);
        });
});
    
//funktion för att ta bort en kurs 
// lyssnar efter klick på radera och skickar med id
document.getElementById("result").addEventListener("click", function (e) {
    console.log("tryckt på delete")
    //url sparas med kursens id
    let url = baseURL + e.target.id;
    //delete anrop
    fetch(url, { method: 'DELETE' })
        .then(response => response.text())
        .then(data => {
            alert('Häst raderad');
            location.reload();
        })
        .catch(error => {
            alert('there was an error ' + error);
        });
})

//funktion för att lägga till en kurs
document.getElementById("addbutton").addEventListener("click", function (e) {
    let url = baseURL;
    //skapar ett objekt för att lägga in användarens inputs i formuläret

    var obj = {};  
    obj.name = document.getElementById("name").value;
    obj.breed = document.getElementById("breed").value;
    obj.age = document.getElementById("age").value;
    obj.owner = document.getElementById("owner").value;



// post anrop
    fetch(url, {
        method: 'POST',
        //skickar med objektet som body
        body: JSON.stringify(obj),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
        .then(response => response.text())
        .then(data => {
            alert('Häst tillagd');
            location.reload();
        })
        .catch(error => {
            alert('There was an error ' + error);
        });
});