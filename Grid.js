var Grid = (function() {

  var getDimensions = function() {
    var rowNum = document.querySelectorAll('audio').length;
    var colNum = document.querySelector('#cols').value;
    return {
      rowNum: rowNum,
      colNum: colNum
    };
  };

  var checkExisting = function() {
    var tableElements = document.querySelectorAll('.grid'); // if a grid already exists then get rid of it first
    if (tableElements.length > 0) {
      console.log(tableElements);
      tableElements.forEach(function(e) {
        e.remove();
      });
    }
  };

  function eventFunction(el) {
    console.log(el.className);
    if (el.className == 'clicked playing' || el.className == 'clicked') {
      el.className = '';
    } else if (el.className == 'playing') {
      el.className = 'clicked playing';
    }
  }

  var generateGrid = function(rows, cols, eventFunction) {
    var i = 0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    grid.setAttribute('id', 'grid');
    for (var r = 0; r < rows; ++r) {
      var tr = grid.appendChild(document.createElement('tr'));
      for (var c = 0; c < cols; ++c) {
        var cell = tr.appendChild(document.createElement('td'));
        cell.className = '';
        cell.addEventListener('mousedown', (function(el) {
          return function() {
            eventFunction(el); // function needs to be within function because of closures
          };
        })(cell), false);
      }
    }
    return grid;
  }

  var clickCheck = function(e) {
    "clicked" === e.className ? e.className = "" : e.className = "clicked"
  };

  var addTitles = function(getAudio) {
    var grid = document.querySelector('.grid').children;
    for (var i = 0; i < grid.length; i++) {
      var newRowTitle = grid[i].insertCell(0); // insert a new cell at the first position of the row
      newRowTitle.innerHTML = decodeURIComponent(getAudio[i].src.replace(/^.*[\\\/]/, '').slice(0, -4)); // potentially file inputs
      newRowTitle.className = "title";
    }
  };

  var appendGrid = function(grid) {
    var container = document.querySelector('.container');
    container.appendChild(grid);
  };

  var createMusicGrid = function() {
    var getAudio = document.querySelectorAll('audio');
    var dims = getDimensions();
    checkExisting();
    var grid = generateGrid(dims.rowNum, dims.colNum, clickCheck);
    appendGrid(grid);
    addTitles(getAudio);
  }

  var clearClasses = function() {
    if(document.querySelector('.grid')) {
      Player.stop();
      var table = document.querySelector('.grid').childNodes;
      table.forEach(function(row) {
        row.childNodes.forEach(function(cell) {
            if (cell.className != 'title') {
              cell.className = "";
            }
        });
      });
    }
  }

  return {
    init: createMusicGrid,
    clear: clearClasses
  };

})();
