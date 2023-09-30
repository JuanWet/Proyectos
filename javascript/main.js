//obtener los elementos de la calse.close
let links = document.querySelectorAll(".close");
//recorrerlos
links.forEach(function(link){
//agregar un evento al click a cada uno de ellos
    link.addEventListener("click",function(ev){
      // ev.preventDefault();
       let content = document.querySelector(".content");
       //quitarles las animaciones que tiene
       content.classList.remove("animate__fadeInDown");
       content.classList.remove("animate__animated");
       //agregar animaciones nuevas fadeOutUp
       content.classList.add("animate__fadeOutUp");
       content.classList.add("animate__animated");
       setTimeout(function(){
        location.href="/";
       },600);
    });
});

