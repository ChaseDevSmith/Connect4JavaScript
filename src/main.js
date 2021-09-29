
$(document).ready(function(){
  let currentPlayerName = "playerOne"
  var winner = 0;
  var colors = {
    playerOne: "red",
    playerTwo: "yellow"
  }
  const redwins = 0
  const yellowwins = 0


////event handler
document.getElementById("reset").addEventListener("click", resetBoard)
  ///boardsetup

  const createOrResetBoard = (isCreate) => {
    $(".cell").each((index, element) => {
      if(isCreate) {
        $(element).css("background-color", "white");
      }
      $(element).attr("id", index);
      $(element).attr("data-player", 0);
  
      $(element).click(function() {
        if(isValid($(this).attr("id"))){
          $(this).css("background-color", colors[currentPlayerName] );
          $(this).attr("data-player", currentPlayerName);
          if(checkWin(currentPlayerName)){
            openModal(currentPlayerName)
          }
          currentPlayerName == "playerOne" ? currentPlayerName = "playerTwo" : currentPlayerName = "playerOne"
        }
      })
    }); 
  }
  createOrResetBoard(false)
  
///functions
  function resetBoard() {
  createOrResetBoard(true)
  currentPlayerName = "playerOne"
}
  function isValid(n){
    var id = parseInt(n);

    if($("#" + id).attr("data-player") === "0"){
      if(id >= 35){
        return true;
      }
      if($("#" + (id + 7)).attr("data-player") !== 0){
        return true;
      }
    }
    return false;
  }

  function winTally(x){
    console.log(x)
  }

  function checkWin(currentPlayerName){
    ///rows
    var chain = 0
    for (var i = 0; i < 42; i+=7){
      for(var j = 0; j <7; j++){
        var cell = $("#" + (i+j));
        if(cell.attr("data-player") == currentPlayerName){
          chain++;
        }else{
          chain = 0;
        }

        if(chain>=4){
          winTally("rows")
          return true;

        }
      }
      chain = 0
    }


    ///columns

    chain = 0
    for(var i = 0; i <7; i++){
      for(var j = 0; j < 42; j+=7){
        var cell = $("#" + (i+j));
        if(cell.attr("data-player") == currentPlayerName){
          chain++;
        }else {
          chain = 0;
        }

        if(chain>= 4){
          winTally("columns")
          return true;
        }
      }
      chain=0
    }


    //diagssssss double 4 loop
    var topLeft = 0;
    var topRight = topLeft + 3;
    

    for(var i = 0; i < 3; i++){
      for( var j = 0; j < 4; j++){
        //checking topleft to bottom right diagnol
        if($('#' + topLeft).attr("data-player") == currentPlayerName 
        && $('#' + (topLeft+8)).attr("data-player") == currentPlayerName
        && $('#' + (topLeft+16)).attr("data-player") == currentPlayerName 
        && $('#' + (topLeft+24)).attr("data-player") == currentPlayerName){
          winTally("diagnol")
          return true
        }  
        if($('#' + topRight).attr("data-player") == currentPlayerName 
        && $('#' + (topRight+6)).attr("data-player") == currentPlayerName
        && $('#' + (topRight+12)).attr("data-player") == currentPlayerName 
        && $('#' + (topRight+18)).attr("data-player") == currentPlayerName){
          winTally("diagnol")
          return true
        }  
        topLeft++;
        topRight = topLeft +3;
      }
      topLeft = i * 7 + 7;
      topRight = topLeft + 3;
    }
    return false;
  }

  const openModal = (currentPlayerName) => {
    var modal = document.getElementById("myModal")
    var modalContent = document.getElementById("modal-content");
    console.log(modal)
    var playerWinText = document.createElement("p")
    playerWinText.id = "winner"
    var text = document.createTextNode(`${currentPlayerName} has won this round!`)
    playerWinText.append(text)
    modalContent.append(playerWinText)
    var btn = document.getElementById("myBtn");
    btn.onclick = function() {
      modal.style.display = "block";
    }
    btn.click()
  }

  const createModal = () => {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
      modal.style.display = "none";
      const winnerText = document.getElementById("winner");
      winnerText.remove()
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        const winnerText = document.getElementById("winner");
        winnerText.remove()
      }
    }
  }

  createModal()
});

function counter() {
  let seconds = 0;
  setInterval(() => {
    seconds += 1;
    document.getElementById('app').innerHTML = `<p>You have been here for ${seconds} seconds.</p>`;
  }, 1000);
}

counter();

