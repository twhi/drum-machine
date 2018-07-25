window.onload = function() {
  document.querySelector('#generate-grid').addEventListener("click", Grid.init);
  document.querySelector('#play').addEventListener("click", Player.init);
  document.querySelector('#stop').addEventListener("click", Player.stop);
  document.querySelector('#clear').addEventListener("click", Grid.clear);
};
