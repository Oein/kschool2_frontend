let all_elements = document.getElementsByTagName("*");
for (let i = 0; i < all_elements.length; i++) {
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

let textCnt = document.getElementById("text.cnt");
let lastScore = Number(localStorage.getItem("myPop"));
setInterval(() => {
  try {
    let nowScore = Number(textCnt.innerText);
    let diff = nowScore - lastScore;
    lastScore = nowScore;

    if (diff > 100) {
      location.href = "/usingMacro";
    }
  } catch (e) {
    textCnt = document.getElementById("text.cnt");
  }
}, 1000);
