function handleClickButton(){
    const testElement = document.getElementsByClassName("no-dot")
    var li = document.createElement("li")
    li.innerHTML=`리스트 ${testElement[0].children.length + 1}`
    testElement[0].appendChild(li)
}

var btn = document.getElementById("btn")
btn.addEventListener("click",handleClickButton )