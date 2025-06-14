const juego = document.querySelector(".juego");
const cronometro = document.getElementById("cronometro");

const cartas = ["img/img1.png","img/img2.png","img/img3.png","img/img4.png","img/img5.png","img/img6.png","img/img7.png","img/img8.png","img/img9.png","img/img10.png"];  
const cartasDuplicadas = cartas.concat(cartas); //ahora tenemos los 10 pares de cartas
let primeraCarta = null;
let segundaCarta = null;
let bloqueo = false; //uso para q no se den 2 clicks rapidos mientras se muestran
let aciertos = 0;
let tiempo = 0;
let intervalo = null;

mezclarCartas(cartasDuplicadas);

cartasDuplicadas.forEach(valor =>{
    const carta = document.createElement("div");
    carta.classList.add("carta");
    carta.dataset.valor = valor; //dataset le agrega data-valor = al valor q quiera es mas x js para saber el valor al hacer click es un elemento oculto del html
    carta.textContent = ""; //vacio xq sino estaria mostrando el valor desde el principio y q lo muestre al hacer click
    carta.style.backgroundImage = `url(${"img/fondo.png"})`;
    
    carta.addEventListener("click",()=>{
        //cuando haga el primer click q comienza arranca el tiempo
        iniciarCronometro();

        //para evitar errores si el jugador ya acerto en esa carta q no vuelva a apretar
        if(bloqueo || carta.classList.contains("acertada") || carta === primeraCarta) return;
        
        carta.style.backgroundImage = `url(${carta.dataset.valor})`;
        carta.classList.add("darVuelta");

        if(!primeraCarta){
            primeraCarta = carta;
        }else{
            segundaCarta = carta;
            bloqueo = true;
        

        if(primeraCarta.dataset.valor === segundaCarta.dataset.valor){
            primeraCarta.classList.add("acertada");
            segundaCarta.classList.add("acertada");
            aciertos++;
            
            if(aciertos === 10){
                detenerCronometro();
                mostrarModal();
                cronometro.innerHTML = `Tiempo: ${tiempo} s`;
            }
            reiniciarTurno();
        }else{
            setTimeout(()=>{
                cartasIncorrectas();
                reiniciarTurno();
            },1000);
        }
    }
    });
    juego.appendChild(carta);
});

document.getElementById("reiniciar").addEventListener("click",()=>{
        location.reload();
});






function iniciarCronometro(){
    intervalo = setInterval(()=>{
    tiempo++;
},1000);
}

function detenerCronometro(){
    clearInterval(intervalo);
}

function cartasIncorrectas(){
    primeraCarta.textContent = "";
    segundaCarta.textContent = "";
    primeraCarta.classList.remove("darVuelta");
    segundaCarta.classList.remove("darVuelta"); 
    primeraCarta.style.backgroundImage = `url(${"img/fondo.png"})`;
    segundaCarta.style.backgroundImage = `url(${"img/fondo.png"})`;
}

function mostrarModal(){
    const modal = document.getElementById("modal");
    modal.classList.add("visible");
}

function reiniciarTurno(){
    primeraCarta = null;
    segundaCarta = null;
    bloqueo = false;
}

function mezclarCartas(cartasDuplicadas){
    for (let i = 0; i < cartasDuplicadas.length; i++) {
        let j = Math.floor(Math.random() * (i+1));
        let temporal = cartasDuplicadas[i];
        cartasDuplicadas[i] = cartasDuplicadas[j];
        cartasDuplicadas[j] = temporal; 
    }
}






















