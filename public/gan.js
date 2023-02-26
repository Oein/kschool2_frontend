var all_elements = document.getElementsByTagName("*");
for (var i = 0; i < all_elements.length; i++) {
  all_elements[i].dispatchEvent = () => {
    location.href = "/reportBugs";
  };
}
document.addEventListener("keydown", (e) => {
  if (e.keyCode == 85 && e.ctrlKey) {
    e.preventDefault();
    alert("소스를 볼 수 없습니다!");
    e.returnValue = false;
  }
});
