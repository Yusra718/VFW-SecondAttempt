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
        myColors = [blue, green, red, pink, purple, orange, black, white, yellow, gray],
        errorList = getId("error"),
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
			if(getId("occasion").value !== ""){
                decor.occasion = ["Occasion: ", getId("occasion").value];
            }
            if(getId("notes").value !== ""){
                decor.notes = ["Notes: ", getId("notes").value];
            }
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
        var edit = document.createElement("a");
        edit.href = "#";
        edit.key = key;
        var editText = "Edit Item";
        edit.addEventListener("click", editItem);
        edit.innerHTML = editText;
        links.appendChild(edit);
        edit.style.display = "block"

        var remove = document.createElement("a");
        remove.href = "#";
        remove.key = key;
        var removeText = "Remove Item";
        //remove.addEventListener("click", deleteItem);
        remove.innerHTML = removeText;
        links.appendChild(remove);
        remove.style.display = "block"
    }

    function editItem() {
        var value = localStorage.getItem(this.key);
        var decor = JSON.parse(value);

        toggleDisplay("off");

        getId("type").value = decor.dectype[1];
        if (decor.dectype[1] == "Balloons"){
            var balloonRadios = document.forms[0].balloonType;
            for(var i=0, j=balloonRadios.length; i<j; i++){
                if(balloonRadios[i].value == "Metallic" && decor.balloonType[1] == "Metallic"){
                    balloonRadios[i].setAttribute("checked", "checked");
                } else if(balloonRadios[i].value == "Regular" && decor.balloonType[1] == "Regular"){
                    balloonRadios[i].setAttribute("checked", "checked");
                }
            }
        } else if (decor.dectype[1] == "Tinsel"){
            var tinselRadios = document.forms[0].tinselType;
            for(var i=0, j=tinselRadios.length; i<j; i++){
                if(tinselRadios[i].value == "Multiple Colors" && decor.tinselType[1] == "Multiple Colors"){
                    tinselRadios[i].setAttribute("checked", "checked");
                } else if(tinselRadios[i].value == "Separated Colors" && decor.tinselType[1] == "Separated Colors"){
                    tinselRadios[i].setAttribute("checked", "checked");
                }
            }
        }
        
        for(var k=0, l=colors.length; k<l; k++){
            for(var i=0, j=myColors.length; i<j; i++){
                if (colors[k] == myColors[i].value){
                    myColors[i].setAttribute("checked", "checked");
                } 
            }
        }
        getId("occasion").value = decor.occasion[1];
        getId("notes").value = decor.notes[1];
        getId("howMany").value = decor.packs[1];

        //save.removeEventListener("click", saveData);
        getId("save").value = "Edit Item";
        var editSave = getId("save");
        editSave.addEventListener("click", validate);
        editSave.key = this.key;

    }

    function validate(eventData){
        errorList.innerHTML = "";
        getId("type").style.border = "none";
        getId("colors").style.border = "none";
        getId("packs").style.border = "none"
        var errors = [],
        validatingTinsel = [],
        validatingBalloons = [];
        if(getId("type").value == "What would you like?"){
            var typeError = "Please choose Type.";
            getId("type").style.border = "1px solid red";
            errors.push(typeError);
        } else if(getId("type").value == "Tinsel"){
            var tinselValidate = document.forms[0].tinselType;
            for(var i=0, j=tinselValidate.length; i<j; i++){
                if(tinselValidate[i].checked){
                    validatingTinsel.push(tinselValidate[i].value);
                }
            }
            if(validatingTinsel.length === 0){
                 var tinselTypeError = "Please choose Tinsel Type.";
                 getId("tinsel").style.border = "1px solid red";
                 errors.push(tinselTypeError);
            } else if(validatingTinsel.length >=1){
                getId("tinsel").style.border = "none";
            }
        } else if(getId("type").value == "Balloons"){
            var balloonValidate = document.forms[0].balloonType;
            for(var i=0, j=balloonValidate.length; i<j; i++){
                if(balloonValidate[i].checked){
                    validatingBalloons.push(balloonValidate[i].value);
                }
            }
            if(validatingBalloons.length === 0){
                 var balloonTypeError = "Please choose Balloon Type.";
                 getId("balloon").style.border = "1px solid red";
                 errors.push(balloonTypeError);
            } else if(validatingBalloons.length >=1){
                getId("balloon").style.border = "none";
            }
        }
        if(colors.length === 0){
            var colorsError = "A minimum of one color chosen is required.";
            getId("colors").style.border = "1px solid red";
            errors.push(colorsError);
        }
        if(getId("howMany").value == "0"){
            var packsError = "Please choose a minimum of one pack.";
            getId("packs").style.border = "1px solid red"
            errors.push(packsError);
        }
        if(errors.length >=1){
            for(var i=0, j=errors.length; i<j; i++){
                var errorText = document.createElement("li");
                errorText.innerHTML = errors[i];
                errorList.appendChild(errorText);
                errorList.style.color = "red";
            }
            eventData.preventDefault();
            return false;
        } else {
            saveData();
        }
        
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
    save.addEventListener("click", validate);
	displayData.addEventListener("click", getData);
	clear.addEventListener("click", clearData);

});