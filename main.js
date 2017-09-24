//Global Variables
var title;
var events;

$(document).ready(function(){
    //Gets First List from Local Storage
    var loadlist = localStorage.getItem("list");
    var splitlist = "";
    if(loadlist != "" && loadlist != null){
    	splitlist = loadlist.split("((end))");
    }
    var numlist = localStorage.getItem("listnum");
    //Variables
    var list = $("#list");
    var addDropdown = $("#adddropdown");
    var addDropdownContainer = $("#adddropdowncontainer");
    var addDropdownCarrot = $("#adddropdown > i");
    var addDropdownLinks = addDropdown.children();
    var addEvent = $("#add");
    var addHeading = $("#addheading");
    var addSubList = $("#addsublist");
    var deleteEvent = $("#delete");
    var moveEvents = $("#move");
    var saveEvents = $("#save");
    var clearEvents = $("#clear");
    events = $(".event");
    var eventcontainer = $("#eventcontainer");
    var eventcontents = [];
    var deletemode = false;
    var movemode = false;
    var eventid = "";
    title = $("title");
    
    
    //Load List
    if(loadlist != "" && loadlist != null){
      for(var k = 0; k < splitlist.length; k++){
      	  if(splitlist[k] != ""){
            eventcontainer.append("<div id='event"+k+"'class='event' contenteditable='true'>"+splitlist[k]+"</div>");
            $("#event"+k).click(function(){
                if(deletemode){
              	 	$(event.target).fadeOut(400, function(){ this.remove(); });
              	}
            });
          }
      }
      updatetitle();
    }
    
    
    
    addEvent.click(function(){
    	updatetitle();
    	if(!deletemode && !movemode){
          updateevents();
          eventid = events.length;
          //check if there are missing ids
          for(var i = 0; i < events.length; i++){
              if($("#event"+i).length === 0){
                //set the new id to the missing id
                eventid = i;
                i = events.length + 1;
              }
          }
          eventcontainer.append("<div id='event" + eventid + "' class='event' contenteditable='true'></div>");
          if(deletemode){
              deleteEvent.addClass("deleteSelected");
              events.addClass("deleteEvent");
              $("#event"+eventid).addClass("deleteEvent");
          }
          $("#event"+eventid).hide();
          $("#event"+eventid).fadeIn(400);
          $("#event"+eventid).click(function(){
              if(deletemode){
              	 $(event.target).fadeOut(400, function(){ this.remove(); });
              }
          });
          //$("#event"+eventid).focusout(function(){
          //	if($(event.target).html() == ""){
          //  	  $(event.target).html("Click to Type Here");
          //  }
          //});
      }
    });
    
    addHeading.click(function(){
        updatetitle();
    	if(!deletemode && !movemode){
          updateevents();
          eventid = events.length;
          //check if there are missing ids
          for(var i = 0; i < events.length; i++){
              if($("#event"+i).length === 0){
                //set the new id to the missing id
                eventid = i;
                i = events.length + 1;
              }
          }
          eventcontainer.append("<div id='event" + eventid + "' class='event'><h2><span contenteditable='true'></span></h2></div>");
          if(deletemode){
              deleteEvent.addClass("deleteSelected");
              events.addClass("deleteEvent");
              $("#event"+eventid).addClass("deleteEvent");
          }
          $("#event"+eventid).hide();
          $("#event"+eventid).fadeIn(400);
          $("#event"+eventid+", #event"+eventid+">h2>span").click(function(){
              //document.execCommand('selectAll',false,null);
              if(deletemode){
              	 $(event.target).fadeOut(400, function(){ this.remove(); });
              }
          });
          //$("#event"+eventid+">h2>span").focusout(function(){
          // if($(event.target).html() == ""){
          //  	$(event.target).html("Click to Type Here");
          // }
          //});
      }
    });
    
    deleteEvent.click(function(){
    	updatetitle();
    	if(!movemode){
          updateevents();
          if(deletemode){
              deletemode = false;
              deleteEvent.enableSelection(); 
              events.css("user-select","all");
              events.attr("contenteditable","true");
              deleteEvent.removeClass("deleteSelected");
              events.removeClass("deleteEvent");
          } else{
              deletemode = true;
              deleteEvent.disableSelection(); 
              events.css("user-select","none");
              events.attr("contenteditable","false");
              deleteEvent.addClass("deleteSelected");
              events.addClass("deleteEvent");
          }
        }
    });
    eventcontainer.sortable();
    eventcontainer.sortable("disable");
    moveEvents.click(function(){
    	updatetitle();
        if(!deletemode){
          updateevents();
          if(movemode){
              movemode = false;
              moveEvents.removeClass("moveSelected");
              moveEvents.enableSelection();
              eventcontainer.sortable("disable");
              events.css("cursor","auto");
          } else{
              movemode = true;
              moveEvents.addClass("moveSelected");
              moveEvents.disableSelection();  
              eventcontainer.sortable("enable");
              events.css("cursor","move");
          }
        }
    });
    clearEvents.click(function(){
    	updateevents();
        if(confirm("Are you sure you want to delete all events?")){
    		events.hide(500, function(){ events.remove(); });
        }
    });
    saveEvents.click(function(){
      updatetitle();
      if(confirm("Are you sure you want to override the previous save?")){
          updateevents();
          eventcontents = [];
          for(var j = 0; j < events.length; j++){
              eventcontents.push(events[j].innerHTML);
          }
          localStorage.setItem("list", eventcontents.join("((end))"));
      }
    });
    /*
    window.onerror = function(message, url, lineNumber) {
      switch(message){
      	case "Uncaught TypeError: this.select is not a function":
        	return true; 
      }
    };
    */
});
//Update Events
function updateevents(){
  events = $(".event");
}

//Update title
function updatetitle(){
  updateevents();
  if(events.length != 0){
  	title.text("To-Do: " + events.first().text());
  } else {
  	title.text("To-Do List");
  }
}
