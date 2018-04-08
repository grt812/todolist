$(document).ready(function(){
    //Global Variables
    var title;
    var events;
    var loadlist;
    var splitlist;
    var listtitles;
    var splittitles;
    var itemcontainer;
    var deletemode;
    //Local Storage Variables
    loadlist = localStorage.getItem("list");
    splitlist = "";
    listtitles = localStorage.getItem("listtitles");
    splittitles = "";
    //Variables
    var list = $("#list");
    var addItem = $("#add");
    var addHeading = $("#addheading");
    var addList = $("#addlist");
    var deleteItem = $("#delete");
    var moveItems = $("#move");
    var saveItems = $("#save");
    var clearItems = $("#clear");
    var listTitle = $("#listheader");
    var loading = $("#loading");
    var revert = $("#revert");
    events = $("span[contenteditable=true]");
    var eventsparents = $(".event");
    itemcontainer = $("#eventcontainer");
    deletemode = false;
    var movemode = false;
    var eventid = "";
    title = $("title");
    var eventspans =  $("#event"+eventid+", #event"+eventid+">h2>span");
    loadlistfunction();
    //Add item click event listener
    $("#add").click(function(){
    	updatetitle();
    	if(!deletemode && !movemode){
          updateitems();
          eventid = $(".event").length;
          //check if there are missing ids
          for(var i = 0; i < eventsparents.length; i++){
              if($("#event"+i).length === 0){
                //set the new id to the missing id
                eventid = i;
                i = eventsparents.length + 1;
              }
          }
          itemcontainer.append("<div id='event" + eventid + "' class='event'><span contenteditable='true'></span><i class='material-icons close'>close</i></div>");
          if(deletemode){
              $("#delete").addClass("buttonSelected");
              eventsparents.addClass("deleteEvent");
              $("#event"+eventid).addClass("deleteEvent");
          }
          $("#event"+eventid).hide();
          $("#event"+eventid).fadeIn(400);
          updateitems();
          /*$("#event"+eventid).click(function(){
              if(deletemode){
              	 $(event.target).fadeOut(400, function(){ this.remove(); });
              }
          });*/
          addItemDeleteOnClick();
          //$("#event"+eventid).focusout(function(){
          //	if($(event.target).html() == ""){
          //  	  $(event.target).html("Click to Type Here");
          //  }
          //});
      }
    });
    //Creates new list
    $("#addlist").click(function(){
        itemcontainer.append("<div class='list'><h1><span contenteditable='true'></span></h1><i class='material-icons close'>close</i></div>");
        $(".list").click(function(){
            $(this).toggleClass("listClosed");
        });
    });
    //Add heading click event listener
    $("#addheading").click(function(){
        updatetitle();
    	if(!deletemode && !movemode){
          updateitems();
          eventid = eeventsparents.length;
          //check if there are missing ids
          for(var i = 0; i < eventsparents.length; i++){
              if($("#event"+i).length === 0){
                //set the new id to the missing id
                eventid = i;
                i = eventsparents.length + 1;
              }
          }
          itemcontainer.append("<div id='event" + eventid + "' class='event'><h2><span contenteditable='true'></span></h2><i class='material-icons close'>close</i></div>");
          if(deletemode){
              $("#delete").addClass("buttonSelected");
              events.addClass("deleteEvent");
              $("#event"+eventid).addClass("deleteEvent");
          }
          $("#event"+eventid).hide();
          $("#event"+eventid).fadeIn(400);
          addItemDeleteOnClick()
      }
    });
    itemcontainer.sortable();
    itemcontainer.sortable("disable");
    //Move item click event listener
    $("#move").click(function(){
    	updatetitle();
        if(!deletemode){
          updateitems();
          if(movemode){
              movemode = false;
              $("#move").removeClass("buttonSelected");
              $("#move").enableSelection();
              itemcontainer.sortable("disable");
              $(".list").sortable("disable");
              eventsparents.css("cursor","auto");
          } else{
              movemode = true;
              $("#move").addClass("buttonSelected");
              $("#move").disableSelection();  
              itemcontainer.sortable("enable");
              $(".list").sortable({
                connectWith: ".list"
              });
              eventsparents.css("cursor","move");
          }
        }
    });
    //Clear item click event listener
    $("#clear").click(function(){
    	updateitems();
        if(confirm("Are you sure you want to delete all items?")){
    		eventsparents.hide(500, function(){ eventsparents.remove(); });
        }
    });
    //Save item click event listener
    $("#save").click(function(){
      updatetitle();
      if(confirm("Are you sure you want to override the previous save?")){
          updateitems();
          itemcontents = [];
          for(var j = 0; j < events.length; j++){
              itemcontents.push(events[j].innerHTML);
          }
          localStorage.setItem("list", itemcontents.join("((end))"));
          localStorage.setItem("listtitles", listTitle.html());
      }
    });
    $("#revert").click(function(){
        if(confirm("Are you sure you want to revert to the previous save?")){
            loadlistfunction();
        }
    });
    //Functions
    function loadlistfunction(){
        resetLocalStorage();
        deletemode = false;
        $("#delete").enableSelection(); 
        eventsparents.css("user-select","all");
        events.attr("contenteditable","true");
        $("#delete").removeClass("buttonSelected");
        eventsparents.removeClass("deleteEvent");
        console.log(deletemode);
        eventsparents = $(".event:not(#listheadercontainer)");
        var deletedEvents = eventsparents;
        eventsparents.hide(500, function(){ deletedEvents.remove(); });
        loading.show();
        if(loadlist != "" && loadlist != null){
            updateitems();
            splitlist = loadlist.split("((end))");
            for(var k = 0; k < splitlist.length; k++){
                if(splitlist[k] != ""){              
                  itemcontainer.append("<div id='event"+k+"'class='event'><span contenteditable='true'>"+splitlist[k]+"</span><i class='material-icons close'>close</i></div>");
                  $("#event"+k).click(function(){
                      if(deletemode){
                          $(event.target).fadeOut(400, function(){ this.remove(); });
                      }
                  });
                }
            }
          updatetitle();
          console.log(listtitles);
          if(listtitles != "" && listtitles != null && listtitles != " "){
              splittitles = listtitles.split("((end))");        
              listTitle.text(listtitles);
          }
        }
        listTitle.html(localStorage.getItem("listtitles"));
        loading.hide();
        updateitems();
        addItemDeleteOnClick();
    }
    
    //Update Events
    function updateitems(){
      events = $("span[contenteditable=true]");
      eventspans =  $("#event"+eventid+", #event"+eventid+">h2>span");
    }

    //Update title
    function updatetitle(){
        updateitems();
        if(eventsparents.length != 0){
          title.text("To-Do: " + events.first().text());
        } else {
          title.text("To-Do List");
        }
    }
    function addItemDeleteOnClick(){
        $(".close").off("click");
        $(".close").each(function(){
            $(this).click(function(){
                $(this).parent().fadeOut(400, function(){ this.remove(); });;  
            });
        });
    };
    /*function addHeadingDeleteOnClick(){
        $(".event").off("click");
        $("#event"+eventid+", #event"+eventid+">h2>span").click(function(){
              //document.execCommand('selectAll',false,null);
              if(deletemode){
              	 $(event.target).fadeOut(400, function(){ this.remove(); });
              }
        });
    };*/
    function resetLocalStorage(){
        loadlist = localStorage.getItem("list");
        splitlist = "";
        listtitles = localStorage.getItem("listtitles");
        splittitles = "";
    };
});


