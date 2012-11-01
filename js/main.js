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
    	x,
    	balloonTypeValue,
    	tinselTypeValue,
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

    function bluePush(){
    	if(blue.checked){
    		colors.push(blue.value);
    	}
    };

    function greenPush(){
    	if(green.checked){
    		colors.push(green.value);
    	}
    };

    function redPush(){
    	if(red.checked){
    		colors.push(red.value);
    	}
    };

    function pinkPush(){
    	if(pink.checked){
    		colors.push(pink.value);
    	}
    };

    function purplePush(){
    	if(purple.checked){
    		colors.push(purple.value);
    	}
    };

    function orangePush(){
    	if(orange.checked){
    		colors.push(orange.value);
    	}
    };

    function blackPush(){
    	if(black.checked){
    		colors.push(black.value);
    	}
    };

    function whitePush(){
    	if(white.checked){
    		colors.push(white.value);
    	}
    };

    function yellowPush(){
    	if(yellow.checked){
    		colors.push(yellow.value);
    	}
    };

    function grayPush(){
    	if(gray.checked){
    		colors.push(gray.value);
    	}
    };	

	function saveData(){

		var id = Math.floor(Math.random()*10000001);
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
        }
	};

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
	blue.addEventListener("click", bluePush);
	green.addEventListener("click", greenPush);
	red.addEventListener("click", redPush);
	pink.addEventListener("click", pinkPush);
	purple.addEventListener("click", purplePush);
	orange.addEventListener("click", orangePush);
	black.addEventListener("click", blackPush);
	white.addEventListener("click", whitePush);
	yellow.addEventListener("click", yellowPush);
	gray.addEventListener("click", grayPush);
	getId("type").addEventListener("click", toggles);
	save.addEventListener("click", saveData);
	displayData.addEventListener("click", getData);
	clear.addEventListener("click", clearData);

});