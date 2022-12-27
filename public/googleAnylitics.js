var all_elements = document.getElementsByTagName("*");
for (var i = 0; i < all_elements.length; i++) {
  all_elements[i].dispatchEvent = () => {
    location.href = "/reportBugs";
  };
}
document.addEventListener("keydown", (e) => {
  if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && e.keyCode == 73)) {
    e.preventDefault();
    alert("개발자 도구는 접근할 수 없습니다!");
    e.returnValue = false;
  }
  if (e.keyCode == 85 && e.ctrlKey) {
    e.preventDefault();
    alert("소스를 볼 수 없습니다!");
    e.returnValue = false;
  }
});

var textCnt = document.getElementById("text.cnt");
var lastScore = Number(localStorage.getItem("myPop"));
setInterval(() => {
  try {
    var nowScore = Number(textCnt.innerText);
    var diff = nowScore - lastScore;
    lastScore = nowScore;

    if (diff > 200) {
      location.href = "/usingMacro";
    }
  } catch (e) {
    textCnt = document.getElementById("text.cnt");
    lastScore = Number(localStorage.getItem("myPop"));
  }
}, 1000);
