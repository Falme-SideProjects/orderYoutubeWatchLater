//Limit of loop : How many Videos are in Watch later
var totalVideos= document.querySelectorAll('[page-subtype="playlist"] .ytd-thumbnail-overlay-time-status-renderer').length;
var actual = 1; //Number of actual index loop
var timeslooped = 0; //How many times have found the video in loop

//Array to save duration of all videos
var arrayDurations = new Array();

//set values to array
for(var a=1, b=1; a<totalVideos; a+=2, b++){
	//Set as duration of each video
    arrayDurations[b] = parseInt((document.querySelectorAll('[page-subtype="playlist"] .ytd-thumbnail-overlay-time-status-renderer')[a].innerHTML).replace(/\:/g, ''));
    console.log("for1 : "+arrayDurations[b]);
}

//sort in descending order
arrayDurations.sort(function(a, b){return b - a});


function startSearch(){

	var found = false;

	while(actual < totalVideos && !found){
		console.log(actual);
		found = reorder(actual);
		actual+=2;
	}

	if(actual < totalVideos)
		window.setTimeout(function(){startSearch()},500);
}
//Function to move video to top
function reorder(a){

	//Set SAVO to compare atual video time to array
	var savo = parseInt((document.querySelectorAll('.ytd-thumbnail-overlay-time-status-renderer')[a].innerHTML).replace(/\:/g, ''));

    console.log(a+" : "+savo);

	//If matches
	if(savo == arrayDurations[0]){
		timeslooped++; //to do not begin all again

		//get elements to move up
		document.querySelectorAll("#contents button.style-scope.yt-icon-button")[Math.floor(a/2)].click();
		document.querySelectorAll("ytd-menu-service-item-renderer")[3].click();
		arrayDurations.shift(); //remove video time
		//actual=timeslooped; //reset actual loop index
		actual=1; //reset actual loop index

		return true;
	}

	return false;
}

startSearch();
