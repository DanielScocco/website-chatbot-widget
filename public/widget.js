//check for cookie
var cookie = getCookie('chatId');
if(cookie==null){
	var name = "chatId";
	var cookieValue = randomString();
	var date = new Date();
	date.setTime(date.getTime()+(365*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();

	document.cookie = name + "=" + cookieValue + expires + "; path=/";
}

var mainDiv = document.getElementById("chatwidget");

//----- ############### Minimized widget ################### --------//
var widget1 = document.createElement('div');
widget1.id = "minWidget";
mainDiv.appendChild(widget1);

var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

//------ Style
widget1.style.color = "#ffffff";
widget1.style.background = "#2c3e50";
widget1.style.cursor = "pointer";
if(width<400){
    widget1.style.fontSize = "13px";
    widget1.style.width = "280px";
    widget1.style.padding = "5px 0px 5px 4px";
    widget1.style.borderRadius = "6px 6px 0px 0px";
    widget1.style.height = "30px";
	widget1.style.boxSizing = "border-box";
}
else{
    widget1.style.fontSize = "16px";
    widget1.style.width = "340px";
    widget1.style.padding = "10px 10px 0px 10px";
    widget1.style.borderRadius = "10px 10px 0px 0px";
    widget1.style.height = "35px";
	widget1.style.boxSizing = "border-box";
}

//---- Icon
widget1.style.backgroundImage = "url(https://chatserver.herokuapp.com/images/up-arrow.png)";
widget1.style.backgroundRepeat = "no-repeat";
widget1.style.backgroundPosition = "98% 50%";

//-------- Hover effect
widget1.addEventListener("mouseenter",function(event){
		var target = event.target;
		target.style.background = "#406387";
		target.style.backgroundImage = "url(https://chatserver.herokuapp.com/images/up-arrow.png)";
		target.style.backgroundRepeat = "no-repeat";
		target.style.backgroundPosition = "98% 50%";
				},false);
widget1.addEventListener("mouseleave",function(event){
		var target = event.target;
		target.style.background = "#2c3e50";
		target.style.backgroundImage = "url(https://chatserver.herokuapp.com/images/up-arrow.png)";
		target.style.backgroundRepeat = "no-repeat";
		target.style.backgroundPosition = "98% 50%";
				},false);


//------ Position 
widget1.style.position = "fixed";
widget1.style.bottom = "0px";
widget1.style.right = "10px";
widget1.style.zIndex = "10";

//----- Initial text
setTimeout(function(){widget1.innerHTML = "H";},1000);
setTimeout(function(){widget1.innerHTML = "Hi";},1100);
setTimeout(function(){widget1.innerHTML = "Hi.";},1200);
setTimeout(function(){widget1.innerHTML = "Hi. C";},2000);
setTimeout(function(){widget1.innerHTML = "Hi. Ca";},2100);
setTimeout(function(){widget1.innerHTML = "Hi. Can";},2200);
setTimeout(function(){widget1.innerHTML = "Hi. Can I";},2300);
setTimeout(function(){widget1.innerHTML = "Hi. Can I h";},2400);
setTimeout(function(){widget1.innerHTML = "Hi. Can I he";},2500);
setTimeout(function(){widget1.innerHTML = "Hi. Can I hel";},2600);
setTimeout(function(){widget1.innerHTML = "Hi. Can I help";},2700);
setTimeout(function(){widget1.innerHTML = "Hi. Can I help yo";},2800);
setTimeout(function(){widget1.innerHTML = "Hi. Can I help you";},2900);
setTimeout(function(){widget1.innerHTML = "Hi. Can I help you f";},3000);
setTimeout(function(){widget1.innerHTML = "Hi. Can I help you fi";},3100);
setTimeout(function(){widget1.innerHTML = "Hi. Can I help you fin";},3200);
setTimeout(function(){widget1.innerHTML = "Hi. Can I help you find";},3300);
setTimeout(function(){widget1.innerHTML = "Hi. Can I help you find y";},3400);
setTimeout(function(){widget1.innerHTML = "Hi. Can I help you find you";},3500);
setTimeout(function(){widget1.innerHTML = "Hi. Can I help you find your";},3600);
setTimeout(function(){widget1.innerHTML = "Hi. Can I help you find your n";},3700);
setTimeout(function(){widget1.innerHTML = "Hi. Can I help you find your ne";},3800);
setTimeout(function(){widget1.innerHTML = "Hi. Can I help you find your nex";},3900);
setTimeout(function(){widget1.innerHTML = "Hi. Can I help you find your next";},4000);
setTimeout(function(){widget1.innerHTML = "Hi. Can I help you find your next b";},4100);
setTimeout(function(){widget1.innerHTML = "Hi. Can I help you find your next bo";},4200);
setTimeout(function(){widget1.innerHTML = "Hi. Can I help you find your next boo";},4300);
setTimeout(function(){widget1.innerHTML = "Hi. Can I help you find your next book";},4400);
setTimeout(function(){widget1.innerHTML = "Hi. Can I help you find your next book?";},4500);

//----- ############### Maximized widget, has 3 layers ################### --------//
var maxWidget = document.createElement('div');
maxWidget.id = "maxWidget";
maxWidget.style.display = "none";
mainDiv.appendChild(maxWidget);

//----- Style
maxWidget.style.background = "#ffffff";
if(width<400){    
    maxWidget.style.width = "280px";   
    maxWidget.style.borderRadius = "6px 6px 0px 0px";
    maxWidget.style.height = "170px";
}
else{	
	maxWidget.style.width = "330px";
	maxWidget.style.height = "300px";
	maxWidget.style.borderRadius = "10px 10px 0px 0px";
}


//------ Position 
maxWidget.style.position = "fixed";
maxWidget.style.bottom = "0px";
maxWidget.style.right = "10px";
maxWidget.style.zIndex = "10";

//######### Top layer
var topLayer = document.createElement('div');
topLayer.id = "topLayer";
maxWidget.appendChild(topLayer);
topLayer.style.background = "#2c3e50";
if(width<400){ 
	topLayer.style.height = "25px";
	topLayer.style.borderRadius = "6px 6px 0px 0px";
}
else{
	topLayer.style.height = "30px";
	topLayer.style.borderRadius = "10px 10px 0px 0px";
}
topLayer.style.cursor = "pointer";
//- Icon
topLayer.style.backgroundImage = "url(https://chatserver.herokuapp.com/images/down-arrow.png)";
topLayer.style.backgroundRepeat = "no-repeat";
topLayer.style.backgroundPosition = "98% 50%";
//- Hover effect
topLayer.addEventListener("mouseenter",function(event){
		var target = event.target;
		target.style.background = "#406387";
		target.style.backgroundImage = "url(https://chatserver.herokuapp.com/images/down-arrow.png)";
		target.style.backgroundRepeat = "no-repeat";
		target.style.backgroundPosition = "98% 50%";
				},false);
topLayer.addEventListener("mouseleave",function(event){
		var target = event.target;
		target.style.background = "#2c3e50";
		target.style.backgroundImage = "url(https://chatserver.herokuapp.com/images/down-arrow.png)";
		target.style.backgroundRepeat = "no-repeat";
		target.style.backgroundPosition = "98% 50%";
				},false);
//- On click minimize
topLayer.onclick = function(){
	var maxWidget = document.getElementById("maxWidget");
	maxWidget.style.display = 'none';
	var minimizedWidget = document.getElementById("minWidget");
	minimizedWidget.style.display = 'inline';
};

//######## Middle Layer
var middleLayer = document.createElement('div');
middleLayer.id = "middleLayer";
maxWidget.appendChild(middleLayer);
if(width<400){ 
	middleLayer.style.height = "115px";
	middleLayer.style.padding = "8px";	
}
else{
	middleLayer.style.height = "230px";
	middleLayer.style.padding = "15px";
}
middleLayer.style.boxSizing = "border-box";
middleLayer.style.border = "1px solid #2c3e50";
middleLayer.style.overflow = "auto";
middleLayer.style.fontFamily = "Lato,'Helvetica Neue',Helvetica,Arial,sans-serif";
middleLayer.style.letterSpace = "20px";
middleLayer.style.lineHeight = "1.5";
middleLayer.style.fontSize = "13px";
middleLayer.innerHTML = "<strong>Bob</strong>: Hi. Are you looking for fiction or non-fiction?";

//######## Bottom Layer
var bottomLayer = document.createElement('div');
bottomLayer.id = "bottomLayer";
maxWidget.appendChild(bottomLayer);
if(width<400){ 
	bottomLayer.style.height = "30px";
}
else{
	bottomLayer.style.height = "40px";
}
bottomLayer.style.borderRight = "1px solid #2c3e50";
bottomLayer.style.borderLeft = "1px solid #2c3e50";
bottomLayer.innerHTML = "<input placeholder=\"Type here... press <Enter> to send.\"type=\"text\" name=\"message\" id=\"inputBox\" onkeydown=\"searchKey(event,this)\">";
var inputBox = document.getElementById("inputBox");
inputBox.style.width = "100%";
if(width<400){ 
	inputBox.style.height = "30px";
	inputBox.style.paddingLeft = "5px";
}
else{
	inputBox.style.height = "40px";
	inputBox.style.paddingLeft = "10px";
}


//----- ############### Functions ################### --------//

//------ On click maximize
widget1.onclick = function(){
	var minimizedWidget = document.getElementById("minWidget");
	minimizedWidget.style.display = 'none';
	var maxWidget = document.getElementById("maxWidget");
	maxWidget.style.display = 'inline';
	var inputBox = document.getElementById("inputBox");
	inputBox.focus();
};

//------- Add bot message to chat widget
function addBotLine(text){
	var middleLayer = document.getElementById("middleLayer");
	var currentChat = middleLayer.innerHTML;
	middleLayer.innerHTML = currentChat + "<br/><strong>Bob</strong>: " + text;
	middleLayer.scrollTop = middleLayer.scrollHeight;
}

//------- Add user message to chat widget
function addUserLine(text){
	var middleLayer = document.getElementById("middleLayer");
	var currentChat = middleLayer.innerHTML;
	middleLayer.innerHTML = currentChat + "<br/><strong>You</strong>: " + text;
	middleLayer.scrollTop = middleLayer.scrollHeight;
}

function getCookie(name){
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if(parts.length==2){
		return parts.pop().split(";").shift();
	}
	else{
		return null;
	}
}

//-------random
function randomString(){
        var d = new Date();
        var string1 = ""+d.getTime();
        string1 = string1.substring(0,10);

        var string2 = "";
        for(var i=0;i<10;i++){
                string2 += Math.floor(Math.random() * 20);
        }
        string2 = string2.substring(0,10);


        var string3 = "";
        var n = d.getMilliseconds();
        for(var i=0;i<10;i++){
                var random = Math.floor(Math.random()*10);
                var n = d.getMilliseconds();
                string3 += (random * n)
        }

        string3 = string3.substring(0,10);

        return string1+string2+string3;
}

//------- check if <Enter> is pressed by user, if so send message
function searchKey(ev,element){
    var keyCode = ev.which || ev.keyCode;
	if(keyCode == 13){
		message = element.value;
		element.value = '';
		addUserLine(message);
		encodedMessage = message.replace(' ','+');
		
		var cookieValue = getCookie('chatId');

		var script = document.createElement('script');
		script.src = 'https://chatserver.herokuapp.com/?callback=parseResponse&message=' + encodedMessage + '&id='+cookieValue;
		document.getElementsByTagName('head')[0].appendChild(script);
	}
	
}

//------ get response from server, parse and call addBotLine
function parseResponse(jsonObj){
	addBotLine(jsonObj.reply);
}



