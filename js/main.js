// Yusra Ahmed
// Project 2: Web App Part 2
// Visual Frameworks Term 1211

window.addEventListener("DOMContentLoaded", function() {

	function getId(id) {
        var element = document.getElementById(id)
        return element
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
	    }

	var decorType = ["What would you like?", "Tinsel", "Lights", "Ceiling Decorations", "Balloons"];
	makeType();

});