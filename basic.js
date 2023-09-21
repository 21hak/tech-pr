let canReserve = false;
// id가 tableResult인 element를 가져옴
const table = document.getElementById("tableResult");
// table에서 tag 이름이 tbody인 element를 가져옴
const tbody = table.getElementsByTagName("tbody")[0];
// tbody에서 tag 이름이 tr인 element 집합을 가져옴
const trElements = tbody.getElementsByTagName("tr");
// tr element 집합을 순회하면서 tr에서 tag 이름이 td인 element 집합을 가져옴
for (const tr of trElements) {
  const tdElements = tr.getElementsByTagName("td");
  // 6번째 td에 접근해서 img 요소와 a 요소에 접근
  const td = tdElements[5];
  const aTag = td.getElementsByTagName("a")[0];
  const img = td.getElementsByTagName("img")[0];
  // img 요소의 alt 속성에 접근
  const imgAlt = img.getAttribute("alt");
  if (imgAlt === "예약하기") {
    canReserve = true;
    if (window.confirm("예매 하시겠습니까")) {
      aTag.click();
    } else {
      break;
    }
  }
}
