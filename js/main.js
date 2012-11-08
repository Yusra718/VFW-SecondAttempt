// Yusra Ahmed
// Project 2: Web App Part 2
// Visual Frameworks Term 1211

window.addEventListener("DOMContentLoaded", function() {

	function getId(id) {
        var element = document.getElementById(id)
        return element
    };

    var decorType = ["What would you like?", "Tinsel", "Lights", "Ceiling Decorations", "Balloons"],
    	save = getId("save"),
    	displayData = getId("displaydata"),
    	clear = getId("clearstoreddata"),
    	blue = getId("blue"),
    	green = getId("green"),
    	red = getId("red"),
    	pink = getId("pink"),
    	purple = getId("purple"),
    	orange = getId("orange"),
    	black = getId("black"),
    	white = getId("white"),
    	yellow = getId("yellow"),
    	gray = getId("gray"),
    	balloonTypeValue,
    	tinselTypeValue,
        sliderValue,
        colors = [];

    function toggleDisplay(n){
        switch(n){
            case "on":
                getId("decorateForm").style.display = "none";
                clear.style.display = "inline";
                displayData.style.display = "none";
                getId("addItem").style.display = "inline";
                break;
            case "off":
                getId("decorateForm").style.display = "block";
                clear.style.display = "inline";
                displayData.style.display = "inline";
                getId("addItem").style.display = "none";
                getId("decor").style.display = "none";
                break;
            default:
                return false;
        }
    };

    function toggles(){
    	balloonDisplay();
		tinselDisplay();
    };
	
	function balloonDisplay(){
		if(getId("type").value == "Balloons"){
			getId("balloon").style.display = "inline-block"
		} else {
			getId("balloon").style.display = "none"
		}
	};

	function tinselDisplay(){
		if(getId("type").value == "Tinsel"){
			getId("tinsel").style.display = "inline-block"
		} else {
			getId("tinsel").style.display = "none"
		}
	};


	function makeType(){
	        var form = document.getElementsByTagName("form"),
	            selectLi = getId("select"),
	            makeSelect = document.createElement("select");
	            makeSelect.setAttribute("id", "type");
	        for(var i=0, j=decorType.length; i<j; i++){
	            var makeOption = document.createElement("option");
	            var optText = decorType[i];
	            makeOption.setAttribute("value", optText);
	            makeOption.innerHTML = optText;
	            makeSelect.appendChild(makeOption);
	        }
	        selectLi.appendChild(makeSelect);
	};

	function getBalloonType(){
		var typeBalloon = document.forms[0].balloonType;
        for(var i=0; i<typeBalloon.length; i++) {
            if (typeBalloon[i].checked){
                balloonTypeValue = typeBalloon[i].value;
            }
        }
    };

    function getTinselType(){
    	var typeTinsel = document.forms[0].tinselType;
        for(var i=0; i<typeTinsel.length; i++) {
            if (typeTinsel[i].checked){
                tinselTypeValue = typeTinsel[i].value;
            }
        }
    };

    function colorsPush() {
        var myColors = [blue, green, red, pink, purple, orange, black, white, yellow, gray];
        for(var i=0, j=myColors.length; i<j; i++) {
            if (myColors[i].checked){
                colors.push(myColors[i].value);
            }
        }
    };

    function sliderChange(val) {
        getId("howMany").value.innerHTML = val
    };


	function saveData(){

		var id = Math.floor(Math.random()*10000001);
        sliderChange();
		getBalloonType();
		getTinselType();
		var decor = {};
			decor.dectype = ["Type: ", getId("type").value];
			if(getId("type").value == "Balloons"){
				decor.balloonType = ["Balloon Type: ", balloonTypeValue];
			} else if(getId("type").value == "Tinsel"){
				decor.tinselType = ["Tinsel Type: ", tinselTypeValue];
			}
			decor.colors = ["Color(s): ", colors];
			decor.occasion = ["Occasion: ", getId("occasion").value];
			decor.notes = ["Notes: ", getId("notes").value];
            decor.packs = ["How many packs? : ", getId("howMany").value];
		localStorage.setItem(id, JSON.stringify(decor));
		alert("Added to Cart!");
	};

	function getData(){
		toggleDisplay("on");
        var makeDiv = document.createElement("div");
        makeDiv.setAttribute("id", "decor");
        var makeList = document.createElement("ul");
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        for (var i=0, j=localStorage.length; i<j;i++) {
            var makeli = document.createElement("li");
            var links = document.createElement("li");
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            var makeSubList = document.createElement("ul");
            makeli.appendChild(makeSubList);
            for (var n in obj){
                var makeSubli = document.createElement("li");
                makeSubList.appendChild(makeSubli);
                var optSubText = obj[n][0]+" "+obj[n][1];
                makeSubli.innerHTML = optSubText;
                makeSubList.appendChild(links);
            }
            makeItemLinks(localStorage.key(i), links);
        }
	};

    function makeItemLinks(key, links){
        var editLink = document.createElement("a");
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Item";
        //editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        links.appendChild(editLink);
        editLink.style.display = "block"

        var deleteLink = document.createElement("a");
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Remove Item";
        //deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = deleteText;
        deleteLink.style.display = "block"
        links.appendChild(deleteLink);
    }

	function clearData() {
        if (localStorage.length === 0) {
            alert("Nothing to clear!")
            window.location.reload();
        } else {
            localStorage.clear();
            alert("Data Cleared!");
            window.location.reload();
            return false;
        }
    }



	makeType();
	getId("type").addEventListener("click", toggles);
    save.addEventListener("click", colorsPush);
    save.addEventListener("click", saveData);
	displayData.addEventListener("click", getData);
	clear.addEventListener("click", clearData);

});