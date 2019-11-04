//display current day
$("#currentDay").text(moment().format('dddd')+', '+moment().format("MMM Do YYYY"));

//display timeblocks
for (var i = 0; i<9; i++){
	var timeBlockEl = $("<div>");
	timeBlockEl.attr("class", "row");
	$(".container").append(timeBlockEl);
}

//adding three parts into each timeblocks
$.each($(".row"), function(i){
	// console.log($(this));
	var timerEl = $("<div>");
	timerEl.attr("class", "time-block hour");
	$(this).append(timerEl);

	var userInput = $("<textarea>");
	userInput.attr({
		"class":"description",
		"id":"text"+i
	});
	$(this).append(userInput);

	var saveBtn = $("<button>");
	saveBtn.attr({
		"class":"saveBtn",
		"id":"btn"+i
	});
	$(this).append(saveBtn);
});

//adding icons into save button
$(".saveBtn").each(function(){
	console.log(this);
	var iconSave = $('<i class="material-icons">archive</i>');
	iconSave.css("font-size","40px");
	$(this).append(iconSave);
});

//adding hour into timerEL
$(".time-block").each(function(i,element){
	if(i<4){
		var index = i+9;
		$(this).text(index+"AM");
	}else{
		var index = i-3;
		$(this).text(index+"PM");
	}
});

//get the current time frm moment.js
var currentTime = parseInt(moment().format('HH'));

//changing the color of textarea
//according to the current time
$(".row").each(function(){
	//change all time into 24H
	var time = parseInt($(this).children(".time-block").text())
	if(time<6){
		time +=12;
	}

	var inputArea = $(this).children("textarea");
	if(time<currentTime){
		inputArea.addClass("past");
		inputArea.removeClass("present");
		inputArea.removeClass("future");
	}
	else if(time === currentTime){
		inputArea.addClass("present");
		inputArea.removeClass("past");
		inputArea.removeClass("future");	
	}
	else{
		inputArea.addClass("future");
		inputArea.removeClass("present");
		inputArea.removeClass("past");
	}
});

//save button
$(".saveBtn").click(function(){
	var i = $(this).attr("id");
	var value = $(this).parent(".row").children(".description").val().trim();
	window.localStorage.setItem(i,value);
});

//displaying texts
$("textarea").on("keyup",function(){
	var i = $(this).parent(".row").children(".saveBtn").attr("id");
	var value = $(this).val().trim();
	window.localStorage.setItem(i,value);
	// $(this).text(window.localStorage.getItem(i));
});

//set the color to reflect the time
$(document).ready(function(){
	setInterval(function(){
		$("textarea").each(function(){
			var i = $(this).parent(".row").children(".saveBtn").attr("id");
			var value = $(this).val().trim();
			// window.localStorage.setItem(i,value);
			$(this).text(window.localStorage.getItem(i));
		});
	},1000);	
});