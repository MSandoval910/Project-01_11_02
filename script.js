/*  Project 01_11_02

    Author: Mario Sandoval
    Date:   08.31.2018

    Filename: script.js
*/

"use strict";
// global variables
var httpRequest = false;
var entry = "MSFT";

// function for getRequestObject()
function getRequestObject() {
    try {
        httpRequest = new XMLHttpRequest();
    } catch (requestError) {
        return false;
    }
    //    alert(httpRequest);
    return httpRequest;
}
// function to stop the default submission from executing
function stopSubmission(evt) {
    // alert("stopSubmission()");
    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
    getQuote();
}
// function that will request stock quote data from the server 
function getQuote() {
    if (document.getElementsByTagName("input")[0].value) {
        entry = document.getElementsByTagName("input")[0].value;
    } else {
        document.getElementsByTagName("input")[0].value = entry;

    }
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }
    // preparing our function to generate our AJAX request
    httpRequest.abort();
    httpRequest.open("get", "StockCheck.php?t=" + entry, true);
    httpRequest.send(null);
    httpRequest.onreadystatechange = displayData;
    clearTimeout(updateQuote);
    var updateQuote = setTimeout('getQuote()', 10000);
}

// function to display the data
function displayData() {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        var stockResults = httpRequest.responseText;
        var stockItems = JSON.parse(stockResults);
        // code to place data into the page in the DOM
        console.log(stockItems);
          document.getElementById("ticker").innerHTML = stockItems.symbol;
      document.getElementById("openingPrice").innerHTML = stockItems.open;
       document.getElementById("lastTrade").innerHTML = stockItems.latestPrice;
        var date = new Date(stockItems.latestUpdate);
      document.getElementById("lastTradeDT").innerHTML = date.toDateString() + "<br>" + date.toLocaleString();
      document.getElementById("change").innerHTML = (stockItems.latestPrice - stockItems.open).toFixed(2);
        document.getElementById("range").innerHTML = "low " + (stockItems.low * 1).toFixed(2) + "<br>High " + (stockItems.high * 1).toFixed(2);
        document.getElementById("volume").innerHTML = (stockItems.latestVolume * 1).toLocaleString();

        //console.log(stockItems);
    }
}
// function to get a little better style into the stock data
function formatTable() {
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i = i + 2) {
        rows[i].style.background = "#9FE098";
    }
}

// event handler to to call that functino as an event handler on submit event
var form = document.getElementsByTagName("form")[0];
if (form.addEventListener) {
    form.addEventListener("submit", stopSubmission, false);
    window.addEventListener("load", formatTable, false);
    window.addEventListener("load", getQuote, false);
} else if (form.attachEvent) {
    form.attachEvent("onsubmit", stopSubmission);
    window.attachEvent("onload", formatTable);
    window.attachEvent("onload", getQuote);
}