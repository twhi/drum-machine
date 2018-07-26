var Player = (function() {

  var currentRow;
  var currentCell;
  var adjacentCell;
  var timerHandle;
  var firstPlay = true;
  var rows;
  var getAudio = document.querySelectorAll('audio');
  var totalSteps;
  var bpm;

  var getBPM = function() {
    bpm = document.querySelector('#bpm').value;
    noteRadioButtons = document.getElementsByName('notes');
    var notes;
    noteRadioButtons.forEach(function(e) {
      if (e.checked) {
        notes = e.value;
        return;
      }
    });

    notes = notes / 4
    var tickTime = (60 / (bpm * notes)) * 1000;
    return tickTime;
  }

  var startLoop = function(tickerTime) {
    rows = document.querySelector('.grid').children;
    totalSteps = rows[0].childNodes.length - 1;
    var currentStep = 1;
    timerHandle = setInterval(function() {
      playColumn(currentStep, totalSteps);
      (currentStep === totalSteps) ? currentStep = 1: currentStep++;
    }, tickerTime);
  }

  var applyClassesStop = function() {
    var table = document.querySelector('.grid').childNodes; // if a grid already exists then get rid of it first
    table.forEach(function(row) { // loop through each row
      row.childNodes.forEach(function(cell) { // for the current row, loop through each cell
        if (cell.className.indexOf("clicked") !== -1) {
          cell.className = "clicked"; // if the cell has been clicked then revert back to a class of just clicked
        } else {
          if (cell.className != 'title') {
            cell.className = ""; // if the cell is unclicked them remove the playing class
          }
        }
      });
    });
  }

  var playColumn = function(col, totalSteps) {
    var tab = document.getElementById('grid');
    for (var i = 0; i < tab.rows.length; i++) { // for each cell in the column
      applyClassesPlaying(tab, i, col); // apply class to change formatting
      if (currentCell.className === 'clicked playing') {
        createSound(getAudio[i].src); // if the cell has a particular class then play the associated sound
      }
    }
    firstPlay = false;
  }

  var applyClassesPlaying = function(tab, i, col) {
    currentRow = tab.rows[i];
    currentCell = currentRow.cells[col]; // get current cell

    if (!firstPlay) {
      if (col == 1) { // if it's the first column then format the final column
        adjacentCell = currentRow.cells[totalSteps]; // get last column
      } else {
        adjacentCell = currentRow.cells[col - 1]; // if it's not the first cell then format the cell directly to the left
      }
    }
    if (adjacentCell) adjacentCell.classList.remove('playing');
    currentCell.classList.add('playing');
  }

  var createSound = function(sound) {
    let audio = document.createElement("audio"); // create new audio element
    audio.src = sound; // define audio source
    audio.play(); // play new audio
  }

  var initialisePlayer = function() {
    if (!timerHandle) {
      var tickerTime = getBPM();
      startLoop(tickerTime);
    }
  }

  var stopMusic = function() {
    clearInterval(timerHandle);
    applyClassesStop();
    firstPlay = true;
    timerHandle = null;
    adjacentCell = null;
  }

  return {
    init: initialisePlayer,
    stop: stopMusic
  };

})();
