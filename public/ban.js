document.dispatchEvent = () => {};
document.addEventListener("keydown", (e) => {
  if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && e.keyCode == 73)) {
    e.preventDefault();
    alert("개발자 도구는 접근할 수 없습니다!");
    e.returnValue = false;
  }
});
