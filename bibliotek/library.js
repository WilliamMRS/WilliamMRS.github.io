/*jslint devel: true */

/*
FUNKSJONER SOM MANGLER:
	Sektordiagram og stolpediagram.
	HTML Tabell.
	Animasjonsbibliotek.
	Objektorienterte eksempler på classes og constructors.

 - Noen funksjoner er skrevet med et objekt som argument istedenfor mange argumenter.
 - litt norsk-engelsk, gjerne skriv guidene om til norsk og lag en pull-request. 
 - Om du ser noe som kan forbedres gjerne lag en request på GitHub eller skriv om det i gruppechatten
 */

/*
    - - - - - - - - - - - - - - - - - - - - - - - -    - - - - - - - - - - - - - - - - - - - - - - - -
    - - - - - - - - - - - - - - - - - - - - - - - -    - - - - - - - - - - - - - - - - - - - - - - - -
    General maths, data and variable manipulation functions
    - - - - - - - - - - - - - - - - - - - - - - - -    - - - - - - - - - - - - - - - - - - - - - - - -
    - - - - - - - - - - - - - - - - - - - - - - - -    - - - - - - - - - - - - - - - - - - - - - - - -
*/

/*
setArray DOC:
	a: Input an array where all numbers are to be set to a certain number.
	v: Input desired number to replace all numbers in array.
*/
function setArray(a, v) {
    "use strict";
    var i, n = 0;
	n = a.length;
    for (i = 0; i < n; i += 1) {
        a[i] = v;
    }
}

//Returns maximum value of an array.
function findMaxValue(array) {
	let max, i;
	max = array[0];
	for (i = 1; i < array.length; i += 1) {
		if (array[i] > max) {
			max = array[i];
		}
	}
	console.log("Max value = " + max);
	return max;
}
/*
Gir et tilfeldig tall innenfor en gitt rekkevidde.
	maxNumber: max antall .
	a: Resultatet av et kast.
*/
function randomNumber(maxNumber) {
    let a = Math.floor(Math.random() * maxNumber);
    return a;
}

/*
	- - - - - - - - - - - - - - - - - - - - - - - -    - - - - - - - - - - - - - - - - - - - - - - - -    
	JSON Functions, get json directly from .txt files or reference them in a new data.js file in html and access it as a variable.

	Create a new data.js file and reference it in html head tag like so <script src = "data.js"> </script>
	then assign the data to a variable and you can access it using "yourVariable".data

	ExampleData:
		var jsonData = 
	{
		"uname":"admin",
		"email":"admin@email.com",
		"psw":"password",
		"myData":[1,2,3,4,5,1,13,19,"Hi","Text", 1.0231]
	}

	Accessing json data from .txt files is a bit different. Here we use AJAX requests to GET the data and parse it to json.
	COMING SOON
	*
	- - - - - - - - - - - - - - - - - - - - - - - -    - - - - - - - - - - - - - - - - - - - - - - - -    
*/


/*
    HTML Manipulative Funksjoner
*/

/*
lagHtmlTabell DOC:
	Trenger innerHTML til et objekt, f.eks en div eller <p> document.getElementById("someElement").innerHTML
	array1, array2 og array3 er bare eksempeldata for tabellen.
	Husk å forandre på hvor stor i skal være i for loopen for å  bestemme hvor mange kolonner du ønsker.
	Flere rader kan lages ved å legge til ' "<td>" + array4[i] + "</td>"+ '
*/

drawHtmlTable = function(){
	let data;
	let array1 = ["Ap", "FrP", "Høyre", "KrF", "Miljøpartiet", "Piratpartiet", "Rødt", "Senterpartiet", "SV", "Venstre"];
	let array2 = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
	let array3 = [23.0, 15.6, 28.2, 2.8, 3.8, 4.3, 3.7, 4.2, 5, 6.7];
	data = "<table><tr><th>Partinavn</th><th>Oppslutning 2017</th> <th>Oppslutning 2013</th></tr>";
	for(i = 0; i <= 9; i += 1){
	data += "<tr>"+
				"<td>" + array1[i] + "</td>"+
				"<td>" + array2[i] + "</td>"+
				"<td>" + array3[i] + "</td>"+
			"</tr>";
	}
	data += "</table>";
	return data;
}

showDIV = function(htmlObject){
	htmlObject.style.display = "block";
}

 hideDIV = function(htmlObject){
	htmlObject.style.display = "none";
}

function changeVisiblePage(frontPage, otherPage, otherPage2) {
	frontPage.style.visibility = "visible";
	otherPage.style.visibility = "hidden";
	otherPage2.style.visibility = "hidden";
	
	frontPage.style.display = "inline";
	otherPage.style.display = "none";
	otherPage2.style.display = "none";
}

/*
    Canvas Drawing Functions
*/

/*options = {
    ctx: ctx,
    text: "Hi",
    x: 100,
    y: 100,
    fillstyle: "Red",
    font: "18px Arial"
}*/
function drawText(options){
	"use strict";
	options.ctx.font = options.font;//18px Arial
	options.ctx.fillStyle = options.fillstyle; //"black"
	options.ctx.textAlign = "middle";
	options.ctx.fillText(options.text, options.x, options.y);
}

/*options = {
    ctx: ctx,
    xCentre: 100,
    yCentre: 100,
    radius: 10,
    color: "Black",
}*/
function drawCircle(options) {
	"use strict";
	options.ctx.beginPath();
	options.ctx.strokeStyle = options.color;
	ctx.arc(options.xCentre, options.yCentre, options.radius, 0, 2 * Math.PI);
	ctx.stroke();
}

/*options = {
    ctx: ctx,
    x: 100,
    y: 100,
    size: 10,
    color: "Black",
}*/
function drawFilledCircle(options) {
	"use strict";
	options.ctx.beginPath();
	options.ctx.strokeStyle = options.color;
	options.ctx.fillStyle = options.color;
	options.ctx.moveTo(options.x, options.y);
	options.ctx.arc(options.x, options.y, options.size, 0, 2 * Math.PI);
	options.ctx.fill();
}

/*options = {
    ctx: ctx,
    x: 100,
    y: 100,
	height: 10,
	width: 10,
    color: "Black",
}*/
function drawSquare(options) {
    "use strict";
    options.ctx.beginPath();
	options.ctx.strokeStyle = options.color;
	options.ctx.lineWidth = 2;
    options.ctx.moveTo(options.x, options.y);
    options.ctx.lineTo(options.x + options.width, options.y);
    options.ctx.lineTo(options.x + options.width, options.y + options.height);
    options.ctx.lineTo(options.x, options.y + options.height);
    options.ctx.lineTo(options.x, options.y);
    options.ctx.stroke();
}

/*options = {
    ctx: ctx,
    x: 100,
    y: 100,
	height: 10,
	width: 10,
    color: "Black",
}*/
function drawFilledSquare(options) {
    "use strict";
    options.ctx.beginPath();
	options.ctx.fillStyle = options.color;
    options.ctx.moveTo(options.x, options.y);
    options.ctx.lineTo(options.x + options.width, options.y);
    options.ctx.lineTo(options.x + options.width, options.y - options.height);
    options.ctx.lineTo(options.x, options.y - options.height);
    options.ctx.lineTo(options.x, options.y);
    options.ctx.fill();
}

/*options = {
    ctx: ctx,
    x: 100,
    y: 100,
	height: 10,
	width: 10,
	color: "Black",
	linewidth: 2,
}*/
function drawTriangle(options) {
    "use strict";
    options.ctx.beginPath();
	options.ctx.strokeStyle = options.color;
	options.ctx.lineWidth = options.linewidth;
    options.ctx.moveTo(options.x, options.y);
    options.ctx.lineTo(options.x + options.width, options.y);
    options.ctx.lineTo(options.x + options.width, options.y - options.height);
    options.ctx.lineTo(options.x, options.y);
    options.ctx.stroke();
}

/*options = {
    ctx: ctx,
    x: 100,
    y: 100,
	height: 10,
	width: 10,
	color: "Black",
}*/
function drawFilledTriangle(options) {
    "use strict";
	options.ctx.beginPath();
	options.ctx.fillStyle = options.color;
    options.ctx.moveTo(options.x, options.y);
    options.ctx.lineTo(options.x + options.width, options.y);
    options.ctx.lineTo(options.x + options.width, options.y + options.height);
    options.ctx.lineTo(options.x, options.y);
    options.ctx.fill();
}

/*options = {
    ctx: ctx,
    x: 100,
    y: 100,
	radius: 5,
	color: "Black",
	linewidth: 2,
	count: 5,
}*/
function drawFilledPoly(options) {
	ctx.beginPath();
	ctx.moveTo(options.x + options.radius * Math.cos(0), options.y + options.radius * Math.sin(0));
	ctx.strokeStyle = options.color;
	ctx.lineWidth = options.linewidth;
	for (i = 1; i <= options.count; i += 1) {
		ctx.lineTo(options.x + options.radius * Math.cos(i * 2 * Math.PI / options.count), options.y + options.radius * Math.sin(i * 2 * Math.PI / options.count));
	}
	ctx.stroke();
}

/*
     - - - - - - - - - - - - - - - - - - - - - - - -
     More Canvas Functions for displaying Data
     - - - - - - - - - - - - - - - - - - - - - - - -
*/

/*
drawColumnChart DOC:
{
	ctx: ctx,
    xData: [1,2,3,4,5,6],
    yData: [10,30,20,10,20,30],
    cvx: "the spacing between the columns" 25,
    cvy: "Bottom left corner y coord" 250,
    number: "how many columns to display" 6,
    widthPx: "the width of the columns" 1,
	yScale: "scaling of the height of the columns" 1,
	barColor: "DarkBlue",
	textColor: "Red"
}
*/
function drawColumnChart(options) {
    "use strict";
    var i, yPixel;
    options.number = options.number - 1;
    
    for (i = 0; i <= options.number; i = i + 1) {
        yPixel = options.yData[i] * options.yScale;
		drawFilledSquare({
			ctx: options.ctx,
			x: 10 + options.cvx * i,
			y: options.cvy,
			height: yPixel,
			width: options.widthPx,
			color: options.barColor,
		});
		drawText({
			ctx: options.ctx,
			text: options.yData[i],
			x: 10 + options.cvx * i,
			y: options.cvy - 15 - yPixel,
			fillstyle: options.textColor,
			font: "18px Arial"
		});
    }
} //Math.max.apply(null.yStolpe)// finne max verdi av array til scaling av stolpediagram.

/*
drawPolyline DOC:
	x:
	y:
	cvx:
	cvy:
	colour:
	yScale: The relevant scale of the project. Often use the same value as used in other programs utilizing the canvas.

*/
function drawPolyline(x, y, cvx, cvy, colour, yScale) {
	"use strict";
	var i, yPixel;
	ctx.beginPath();
	ctx.strokeStyle = colour;
	
	ctx.moveTo(x.length * cvx, y[y.length] + cvy);
	
	for (i = 0; i >= x.length; i += 1) {
		console.log(i);
		yPixel = y[i] * yScale;
		ctx.lineTo(10 + cvx * i, yPixel);
	}
	ctx.stroke();
}

/*
function drawPoleDiagram(); DOC:
	Draws a Pole-Diagram of the data array given into a canvas (ctx).
		data: An array of data to be displayed vertically.
		amount: The amount of poles in the array to be displayed.
		maxValue: Maximum value of the following operation so it can be scaled appropriately.
	IMPORTANT NEEDS FOLLOWING TO FUNCTION:
	Global variables:	canvasRead = document.getElementById("myCanvas");
						ctx = document.getElementById("myCanvas").getContext("2d");
	functions:	drawFilledSquare();
				drawText();

{
	ctx: ctx,
	canvasRead: canvasRead,
	data: [],
	amount: [],
	maxValue: [],
}

UNDER CONSTRUCTION *****************************************

*/

function drawPoleDiagram(ctx, canvasRead, data, amount, maxValue) {
	"use strict";
	var i, height, yScale;
	yScale = (canvasRead.height - 20) / maxValue; //max value of data instead of amount
	amount = amount - 1;
	for (i = 0; i <= amount; i += 1) {
		drawFilledSquare(10 + canvasRead.width / (amount + 1) * i, canvasRead.height - 10, data[i] * yScale, 20, "darkblue");
		drawText(data[i], 10 + canvasRead.width / (amount + 1) * i, canvasRead.height - (15 + data[i] * yScale), "Black", "16px Arial");
		drawText(i + 1, 15 + canvasRead.width / (amount + 1) * i, canvasRead.height - 15, "White", "16px Arial");
	}
}


/*
    - - - - - - - - - - - - - - - - - - - - - - - -
    Specific Canvas functions for user Interaction eg: drawing tools.
    - - - - - - - - - - - - - - - - - - - - - - - -
*/

//No Code

/*
    - - - - - - - - - - - - - - - - - - - - - - - -    - - - - - - - - - - - - - - - - - - - - - - - -
    - - - - - - - - - - - - - - - - - - - - - - - -    - - - - - - - - - - - - - - - - - - - - - - - -
    Different Templates For Functions and user interaction functions
    - - - - - - - - - - - - - - - - - - - - - - - -    - - - - - - - - - - - - - - - - - - - - - - - -
    - - - - - - - - - - - - - - - - - - - - - - - -    - - - - - - - - - - - - - - - - - - - - - - - -
*/

//Template for Switch Statement where switchParameter is a number
function switchStatement(switchParameter) {
	switch(switchParameter) {
        	case 0:
            //Block of code
			break;

			case 1:
            //Block of code
			break;

			case 2:
            //Block of code
			break;

			case 3:
            //Block of code
			break;
		default:
		//Block of code
	}
}

//Template for Object
var myCat;
myCat = {
	"name": "meowsalot",
	"species": "cat",
	"run": function () {
		console.log("Cat is now running");
	}
};


/*
keyDownHandler() DOC:
Makes enter fire a function.
Needs an Eventlistener. Use document.addEventListener(); to make it useable (see below)
	e: No idea what e stands for. May be some sort of context variable.

*/
function keyDownHandler(e) {
	"use strict";
	if (e.keyCode === 13) {
		console.log("Enter was pressed");
    }
}
document.addEventListener("keydown", keyDownHandler, false);

/*
Returns mouse coordinates on a page when mouse is clicked. Can be used with margin:0; on body
to get coordinates of a canvas in the upper right corner.
	Create two global variables named mX and mY or make the program return them.
*/
window.onclick = function (e) {
	"use strict";
	var mX, mY;
	mX = e.pageX;
	mY = e.pageY;
	console.log(mX + " " + mY);
};

/*
Javascript native functions:

- - - - - - - - - - - - - - - - - - - - - - - -  
STRINGS

constructor	Returns the string's constructor function
length	Returns the length of a string
prototype	Allows you to add properties and methods to an object

charAt()	Returns the character at the specified index (position)
charCodeAt()	Returns the Unicode of the character at the specified index
concat()	Joins two or more strings, and returns a new joined strings
endsWith()	Checks whether a string ends with specified string/characters
fromCharCode()	Converts Unicode values to characters
includes()	Checks whether a string contains the specified string/characters
indexOf()	Returns the position of the first found occurrence of a specified value in a string
lastIndexOf()	Returns the position of the last found occurrence of a specified value in a string
localeCompare()	Compares two strings in the current locale
match()	Searches a string for a match against a regular expression, and returns the matches
repeat()	Returns a new string with a specified number of copies of an existing string
replace()	Searches a string for a specified value, or a regular expression, and returns a new string where the specified values are replaced
search()	Searches a string for a specified value, or regular expression, and returns the position of the match
slice()	Extracts a part of a string and returns a new string
split()	Splits a string into an array of substrings
startsWith()	Checks whether a string begins with specified characters
substr()	Extracts the characters from a string, beginning at a specified start position, and through the specified number of character
substring()	Extracts the characters from a string, between two specified indices
toLocaleLowerCase()	Converts a string to lowercase letters, according to the host's locale
toLocaleUpperCase()	Converts a string to uppercase letters, according to the host's locale
toLowerCase()	Converts a string to lowercase letters
toString()	Returns the value of a String object
toUpperCase()	Converts a string to uppercase letters
trim()	Removes whitespace from both ends of a string
valueOf()	Returns the primitive value of a String object
- - - - - - - - - - - - - - - - - - - - - - - -  
*
- - - - - - - - - - - - - - - - - - - - - - - -  
ARRAYS

constructor	Returns the function that created the Array object's prototype
length	Sets or returns the number of elements in an array
prototype	Allows you to add properties and methods to an Array object

concat()	Joins two or more arrays, and returns a copy of the joined arrays
copyWithin()	Copies array elements within the array, to and from specified positions
entries()	Returns a key/value pair Array Iteration Object
every()	Checks if every element in an array pass a test
fill()	Fill the elements in an array with a static value
filter()	Creates a new array with every element in an array that pass a test
find()	Returns the value of the first element in an array that pass a test
findIndex()	Returns the index of the first element in an array that pass a test
forEach()	Calls a function for each array element
from()	Creates an array from an object
includes()	Check if an array contains the specified element
indexOf()	Search the array for an element and returns its position
isArray()	Checks whether an object is an array
join()	Joins all elements of an array into a string
keys()	Returns a Array Iteration Object, containing the keys of the original array
lastIndexOf()	Search the array for an element, starting at the end, and returns its position
map()	Creates a new array with the result of calling a function for each array element
pop()	Removes the last element of an array, and returns that element
push()	Adds new elements to the end of an array, and returns the new length
reduce()	Reduce the values of an array to a single value (going left-to-right)
reduceRight()	Reduce the values of an array to a single value (going right-to-left)
reverse()	Reverses the order of the elements in an array
shift()	Removes the first element of an array, and returns that element
slice()	Selects a part of an array, and returns the new array
some()	Checks if any of the elements in an array pass a test
sort()	Sorts the elements of an array
splice()	Adds/Removes elements from an array
toString()	Converts an array to a string, and returns the result
unshift()	Adds new elements to the beginning of an array, and returns the new length
valueOf()	Returns the primitive value of an array
- - - - - - - - - - - - - - - - - - - - - - - -  
*/