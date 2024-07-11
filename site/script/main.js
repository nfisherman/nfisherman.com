let collapsibleNavEmoji = document.querySelector("nav details summary .emoji");

addEventListener("click", e => {
    let click = document.elementFromPoint(e.clientX, e.clientY);
    
    let dropbtn = document.getElementsByClassName("dropbtn")[0];
    let dropbtn__input = document.getElementsByClassName("dropbtn--input")[0];
    if(click != dropbtn){
        dropbtn__input.checked = false;
    }

    if(document.querySelector("nav details").open){
        collapsibleNavEmoji.textContent = "▼";
    } else {
        collapsibleNavEmoji.textContent = "▲";
    }

    if(dropbtn__input.checked){
        dropbtn.textContent = "▲ nav";
    } else {
        dropbtn.textContent = "▼ nav";
    }
});

addEventListener("resize", e => {
    navAutoHide();
});

function navAutoHide() {
    let blogNav = document.querySelector("nav details");
    if(window.innerWidth < 800 || window.innerHeight < 250){
        blogNav.open = false;
        collapsibleNavEmoji.textContent = "▼";
    } else {
        blogNav.open = true;
    }
}

function main() {
    navAutoHide();
}
