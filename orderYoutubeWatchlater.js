var timestampElement = '[page-subtype="playlist"] span.ytd-thumbnail-overlay-time-status-renderer';

//Limit of loop : How many Videos are in Watch later
var totalVideos= document.querySelectorAll(timestampElement).length;
//new -> document.querySelectorAll('[page-subtype="playlist"] span.ytd-thumbnail-overlay-time-status-renderer').length
var actual = 1; //Number of actual index loop
var timeslooped = 0; //How many times have found the video in loop

//Array to save duration of all videos
var arrayDurations = new Array();

//set values to array
for(var a=0; a<totalVideos; a++){
	//Set as duration of each video
    arrayDurations[a] = parseInt((document.querySelectorAll(timestampElement)[a].innerHTML).replace(/\:/g, ''));
}

//sort in descending order
arrayDurations.sort(function(a, b){return b - a});


function startSearch(){

	var found = false;
	
	while(actual < totalVideos && !found)
	{
		found = reorder(actual);
		actual++;
	}

	if(actual < totalVideos)
		window.setTimeout(function(){startSearch()},1500);
}
//Function to move video to top
function reorder(a){

	//Set SAVO to compare atual video time to array
	var savo = parseInt((document.querySelectorAll('[page-subtype="playlist"] span.style-scope.ytd-thumbnail-overlay-time-status-renderer')[a].innerHTML).replace(/\:/g, ''));

	//If matches
	if(savo == arrayDurations[0]){
		timeslooped++; //to do not begin all again
 
		//get elements to move up
		document.querySelectorAll("[page-subtype='playlist'] #contents button.style-scope.yt-icon-button")[a].click();
		
		if(document.querySelectorAll("ytd-menu-service-item-renderer yt-formatted-string")[3].innerHTML == "Mover para o início")
			document.querySelectorAll("ytd-menu-service-item-renderer")[3].click();
		else if(document.querySelectorAll("ytd-menu-service-item-renderer yt-formatted-string")[2].innerHTML == "Mover para o início")
			document.querySelectorAll("ytd-menu-service-item-renderer")[2].click();
		
		arrayDurations.shift(); //remove video time
		actual=1; //reset actual loop index

		return true;
	}

	return false;
}

startSearch();
