addEventListener("click", e => {
    let elem = document.elementFromPoint(e.clientX, e.clientY);
    
    let dropbtn = document.getElementsByClassName("dropbtn")[0];
    let dropbtn__input = document.getElementsByClassName("dropbtn--input")[0];
    if(elem != dropbtn){
        dropbtn__input.checked = false;
    }

    if(dropbtn__input.checked){
        dropbtn.textContent = "▲ nav";
    } else {
        dropbtn.textContent = "▼ nav";
    }
});