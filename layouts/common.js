function setTheme(theme){
    let lights = document.querySelector("header .right");
    let root = document.querySelector(":root");
    console.log(theme);
    if(theme == "light"){
        root.style.setProperty("--background-color", "white")
        root.style.setProperty("--color", "black");
        lights.children[0].textContent = `
 :
 :
 :
 :
 :
 :
 *`
        lights.children[1].textContent = ` |_______| 
  \\ |_| /
    /|\\
-  ( @ )  -
    '-'
  /     \\
     *`
        lights.children[2].textContent = ` \\ # /   _
- (@) - |#|
 / ‾ \\  |‾|
   *     ‾`
        localStorage.setItem("theme", "light");
    } else {
        root.style.setProperty("--background-color", "black")
        root.style.setProperty("--color", "white");
        lights.children[0].textContent = `
 :
 :
 :
 :
 *`
        lights.children[1].textContent = ` |_______| 
    |_|
    /|\\
   ( * )
    '-'`
        lights.children[2].textContent = `   #     _
  (@)   |_|
   ‾    |#|
         ‾`
        localStorage.setItem("theme", "dark");
    }
}

function main(){
    let theme = localStorage.getItem("theme") || "light";
    setTheme(theme);

    document.querySelector("header .right").addEventListener("click", function(){
        if(localStorage.getItem("theme") == "light"){
            setTheme("dark");
        } else {
            setTheme("light");
        }
    });
}