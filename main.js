//Global Variables
var title;
var events;
var loadlist;
var splitlist;

$(document).ready(function(){
    //Local Storage Variables
    loadlist = localStorage.getItem("list");
    splitlist = "";
    if(loadlist != "" && loadlist != null){
    	splitlist = loadlist.split("((end))");
    }
    var listnum = localStorage.getItem("listnum");
    var listtitles = localStorage.getItem("listtitles");
    var listcontents = localStorage.getItem("listcontents"); 
    //Variables
    var list = $("#list");
    var addItem = $("#add");
    var addHeading = $("#addheading");
    var addSubList = $("#addsublist");
    var addList = $("#addlist");
    var deleteItem = $("#delete");
    var moveItems = $("#move");
    var saveItems = $("#save");
    var clearItems = $("#clear");
    events = $(".event");
    var itemcontainer = $("#eventcontainer");
    var deletemode = false;
    var movemode = false;
    var eventid = "";
    title = $("title");
    
    
    //Load List
    if(loadlist != "" && loadlist != null){
      for(var k = 0; k < splitlist.length; k++){
      	  if(splitlist[k] != ""){
            itemcontainer.append("<div id='event"+k+"'class='event' contenteditable='true'>"+splitlist[k]+"</div>");
            $("#event"+k).click(function(){
                if(deletemode){
              	 	$(event.target).fadeOut(400, function(){ this.remove(); });
              	}
            });
          }
      }
      updatetitle();
    }
    
    
    
    addItem.click(function(){
    	updatetitle();
    	if(!deletemode && !movemode){
          updateitems();
          eventid = events.length;
          //check if there are missing ids
          for(var i = 0; i < events.length; i++){
              if($("#event"+i).length === 0){
                //set the new id to the missing id
                eventid = i;
                i = events.length + 1;
              }
          }
          itemcontainer.append("<div id='event" + eventid + "' class='event' contenteditable='true'></div>");
          if(deletemode){
              deleteItem.addClass("buttonSelected");
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
    addList.click(function(){
        
        listnum++;
    });
    addHeading.click(function(){
        updatetitle();
    	if(!deletemode && !movemode){
          updateitems();
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
              deleteItem.addClass("buttonSelected");
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
    
    deleteItem.click(function(){
    	updatetitle();
    	if(!movemode){
          updateitems();
          if(deletemode){
              deletemode = false;
              deleteItem.enableSelection(); 
              events.css("user-select","all");
              events.attr("contenteditable","true");
              deleteItem.removeClass("buttonSelected");
              events.removeClass("deleteEvent");
          } else{
              deletemode = true;
              deleteItem.disableSelection(); 
              events.css("user-select","none");
              events.attr("contenteditable","false");
              deleteItem.addClass("buttonSelected");
              events.addClass("deleteEvent");
          }
        }
    });
    itemcontainer.sortable();
    itemcontainer.sortable("disable");
    moveItems.click(function(){
    	updatetitle();
        if(!deletemode){
          updateitems();
          if(movemode){
              movemode = false;
              moveItems.removeClass("buttonSelected");
              moveItems.enableSelection();
              eventcontainer.sortable("disable");
              events.css("cursor","auto");
          } else{
              movemode = true;
              moveItems.addClass("buttonSelected");
              moveItems.disableSelection();  
              eventcontainer.sortable("enable");
              events.css("cursor","move");
          }
        }
    });
    clearItems.click(function(){
    	updateitems();
        if(confirm("Are you sure you want to delete all items?")){
    		events.hide(500, function(){ events.remove(); });
        }
    });
    saveItems.click(function(){
      updatetitle();
      if(confirm("Are you sure you want to override the previous save?")){
          updateitems();
          itemcontents = [];
          for(var j = 0; j < events.length; j++){
              itemcontents.push(events[j].innerHTML);
          }
          localStorage.setItem("list", itemcontents.join("((end))"));
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
function updateitems(){
  events = $(".event");
}

//Update title
function updatetitle(){
  updateitems();
  if(events.length != 0){
  	title.text("To-Do: " + events.first().text());
  } else {
  	title.text("To-Do List");
  }
}
