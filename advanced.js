const MIN_HOUR = 7; // 최소 시간
const MAX_HOUR = 9; // 최대 시간

/**
 * @description 브라우저의 local storage에서 direction 정보를 가져옵니다.
 */
const getDirection = () => {
  return window.localStorage.getItem("direction");
};

/**
 * @description 브라우저의 local storage에서 direction 정보를 갱신합니다.
 */
const setDirection = (direction) => {
  window.localStorage.setItem("direction", direction);
};

/**
 * @description 코레일의 다음 버튼을 가져옵니다.
 * @returns 다음 버튼 a 태그. 없는 경우 undefined
 */
const getNextButton = () => {
  const table = document.getElementsByClassName("btn")[0];
  const tbody = table.getElementsByTagName("tbody")[0];
  const td = tbody.children[0].children[0];
  const aTag = td.getElementsByTagName("a")[0];
  const img = aTag.getElementsByTagName("img")[0];
  const imgAlt = img.getAttribute("alt");
  // 다음 버튼만 있는 경우
  if (imgAlt === "다음") return aTag;
  // 이전 버튼, 다음 버튼 둘다 있는 경우
  if (td.getElementsByTagName("a")[1]) return td.getElementsByTagName("a")[1];
  //  이전 버튼만 있는 경우
  return;
};

/**
 * @description 코레일의 이전 버튼을 가져옵니다.
 * @returns 이전 버튼 a 태그. 없는 경우 undefined
 */
const getPrevButton = () => {
  const table = document.getElementsByClassName("btn")[0];
  const tbody = table.getElementsByTagName("tbody")[0];
  const td = tbody.children[0].children[0];
  const aTag = td.getElementsByTagName("a")[0];
  const img = aTag.getElementsByTagName("img")[0];
  const imgAlt = img.getAttribute("alt");
  // 이전 버튼이 있는 경우
  if (imgAlt === "이전") return aTag;
  // 다음 버튼만 있는 경우
  return;
};

/**
 * @description 출발 시간시간을 가져와서 지정 시간보다 이른지, 늦는지 반환합니다.
 * @param 현재 tr의 td collection
 * @returns 지정 시간보다 이르면 early, 늦으면 late, 적절하면 ok
 */
const getTimeStatus = (tdCollection) => {
  const td = tdCollection[2];
  const departureHour = parseInt(td.childNodes[2].textContent.split(":")[0]);
  if (departureHour < MIN_HOUR) return "early";
  if (departureHour > MAX_HOUR) return "late";

  return "ok";
};

/**
 * @description 예약 상태를 반환합니다.
 * @param 현재 tr의 td collection
 * @returns 예약 상태 텍스트
 */
const getReservationStatus = (tdCollection) => {
  const td = tdCollection[5];
  const img = td.getElementsByTagName("img")[0];
  const imgAlt = img.getAttribute("alt");
  return imgAlt;
};

/**
 * @description 예약 a 태그를 반환합니다.
 * @param 현재 tr의 td collection
 * @returns 예약 a 태그
 */
const getReservationButton = (tdCollection) => {
  const td = tdCollection[5];
  const aTag = td.getElementsByTagName("a")[0];
  return aTag;
};

let canReserve = false;
const table = document.getElementById("tableResult");
const tbody = table.getElementsByTagName("tbody")[0];
const trElements = tbody.getElementsByTagName("tr");
for (const tr of trElements) {
  const tdElements = tr.getElementsByTagName("td");

  //  현재 행의 시간이 너무 빠른지, 너무 늦는지 확인
  const status = getTimeStatus(tdElements);
  if (status === "early") {
    setDirection("forward");
    break;
  } else if (status === "late") {
    setDirection("backward");
    break;
  }

  //  예약 상태 확인
  const reservationStatus = getReservationStatus(tdElements);

  if (reservationStatus === "예약하기") {
    canReserve = true;
    if (window.confirm("예매 하시겠습니까")) {
      const aTag = getReservationButton(tdElements);
      aTag.click();
      break;
    } else {
      break;
    }
  }
}

// 현재 페이지서 예약이 불가능한 경우 이전 또는 다음 버튼을 클릭
if (!canReserve) {
  setTimeout(() => {
    const direction = getDirection();
    if (direction === "forward") {
      const nextButton = getNextButton();
      if (nextButton) nextButton.click();
      else window.alert("다음 버튼이 없습니다.");
    } else {
      const prevButton = getPrevButton();
      if (prevButton) prevButton.click();
      else window.alert("이전 버튼이 없습니다.");
    }
  }, 1000);
}
