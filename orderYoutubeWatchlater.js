//Limit of loop
var limit= document.getElementsByClassName("timestamp").length;
var actual =0; //Number of actual index loop
var timeslooped = 0; //How many times have found the video in loop

//Array to save duration of all videos
var arrayDurations = new Array();

//set values to array
for(var a=0; a<document.getElementsByClassName("timestamp").length; a++){
	//Set as duration of each video
	arrayDurations[a] = parseInt((document.querySelectorAll('.timestamp')[a].children[0].innerHTML).replace(/\:/g, ''));
}

//sort in descending order
arrayDurations.sort(function(a, b){return b - a});

// Wait 1/10 second to make the changing effective
window.setInterval(function(){
	//If is in loop
	if(actual < limit){ 
		actual++; //Add
		reorder(actual); //Call function to reorder
	}}, 100);

//Function to move video to top
function reorder(a){

	//Set SAVO to compare atual video time to array
	var savo = parseInt((document.querySelectorAll('.timestamp')[a].children[0].innerHTML).replace(/\:/g, ''));

	//If matches
	if(savo == arrayDurations[0]){
		timeslooped++; //to do not begin all again

		//get elements to move up
		document.getElementsByClassName("pl-video-edit-more")[a].click();
		document.getElementsByClassName("pl-video-edit-move-top")[a].click();
		arrayDurations.shift(); //remove video time
		actual=timeslooped; //reset actual loop index
	}
}