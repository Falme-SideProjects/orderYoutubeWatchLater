var timestampElement = '[page-subtype="playlist"] span.ytd-thumbnail-overlay-time-status-renderer';

var actual = 0; //Number of actual index loop
var videoDurations = new Array();

function SetTotalVideosInPlaylist()
{
    //set values to array
    var totalVideos = document.querySelectorAll(timestampElement).length;
    for(var a=0; a<totalVideos; a++){
        //Set as duration of each video
        videoDurations[a] = parseInt((document.querySelectorAll(timestampElement)[a].innerHTML).replace(/\:/g, ''));
    }
}

function PreReorderPlaylist()
{
    //sort in descending order
    videoDurations.sort(function(a, b){return b - a});
}

function startSearch()
{
	var found = false;
	
	while(videoDurations.length > 0 && !found)
	{
		found = reorder(actual);
		actual++;
	}

}

//Function to move video to top
function reorder(a)
{

	//Set SAVO to compare atual video time to array
	var savo = parseInt((document.querySelectorAll('[page-subtype="playlist"] span.style-scope.ytd-thumbnail-overlay-time-status-renderer')[a].innerHTML).replace(/\:/g, ''));

	//If matches
	if(savo == videoDurations[0])
    {
		//get elements to move up
		document.querySelectorAll("[page-subtype='playlist'] #contents button.style-scope.yt-icon-button")[a].click();
        
        window.setTimeout(function(){
            if(document.querySelectorAll("ytd-menu-service-item-renderer yt-formatted-string")[3].innerHTML == "Mover para o início")
                document.querySelectorAll("ytd-menu-service-item-renderer")[3].click();
                
            videoDurations.shift(); //remove video time
            actual=0; //reset actual loop index

            startSearch();
        },500);

		return true;
	}

	return false;
}

//RUN

SetTotalVideosInPlaylist();
PreReorderPlaylist();
startSearch();
