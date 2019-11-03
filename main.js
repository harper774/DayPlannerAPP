//display current day
$("#currentDay").text(moment().format('dddd')+', '+moment().format("MMM Do YYYY"));

//display timeblocks
for (var i = 0; i<9; i++){
	var timeBlockEl = $("<div>");
	timeBlockEl.attr("id", i);
	timeBlockEl.attr("class", "row");
	$(".container").append(timeBlockEl);
}

//adding three parts into each timeblocks
$.each($(".row"), function(){
	// console.log($(this));
	var timerEl = $("<div>");
	timerEl.attr("class", "time-block hour");
	$(this).append(timerEl);

	var userInput = $("<textarea>");
	userInput.attr({
		"class":"description"
	});
	$(this).append(userInput);

	var saveBtn = $("<button>");
	saveBtn.attr("class", "saveBtn");
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


