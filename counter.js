let counter = 0;

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("button").onclick = count;
});

function count() {
  counter++;

  if (counter % 10 === 0) {
    alert("Mouse would like to thank you for the food food 🥙");
  }

  document.querySelector(".counter").innerHTML = counter;
}
