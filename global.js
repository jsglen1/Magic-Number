//global variables
var vista = 0;
var intentos = 0;
var max = 1000;
var min = 1;
var numerom = 0;
let lista = [];

function VerAlertNice(resultado,incono){
    Swal.fire({
        icon: incono ,
        text: resultado,
      })
}

if (vista == 0) { // vista por defecto 
    document.getElementById("form2").style.display = "none";
    document.getElementById("person").style.display = "none";
}

function mostrar_intentos(ask) { // muestra cuantos intentos hizo para ganar o perder
    if(ask==1){
        VerAlertNice("has ganado" + " numero de intentos de " + document.getElementById("nombre").value + " son: " +
        localStorage.getItem(document.getElementById("nombre").value),"success"); // gano
    }else{
        VerAlertNice("has perdido" + " numero de intentos de " + document.getElementById("nombre").value + " son: " +
        localStorage.getItem(document.getElementById("nombre").value),"error"); // perdio
    }
    
}

document.getElementById("BotonAdivinar").onclick = function adivinar(evt) { // logica de adivinar
    var usuario = document.getElementById("numero").value;
    var numero = parseInt(usuario, 10);
    if (numero <= 1000 && numero > 0 && intentos <= 9) {

        lista.push(numero);
        intentos = intentos + 1;
        document.getElementById("repet").innerHTML = "intentos[" + intentos + "]";

        if (usuario == numerom) {// gano
            localStorage.setItem(document.getElementById("nombre").value, lista.toString());
            mostrar_intentos(1);
            vista_reset(1);

        } else if (usuario < numerom) {
            VerAlertNice("ingrese un numero mayor, VUELVE A INTENTARLO","error"); // nope ;v
        } else if (usuario > numerom) {
            VerAlertNice("ingrese un numero menor, VUELVE A INTENTARLO","error"); // nope ;v
        }

    }
    if (intentos > 9 && usuario != numerom) {// perdio 
        localStorage.setItem(document.getElementById("nombre").value, lista.toString());
        mostrar_intentos(2);
        vista_reset(1);
    }
};

function vista_reset(n) {
    if (n == 1) { // vista usuario
        document.getElementById("form1").style.display = "block";
        document.getElementById("form2").style.display = "none";
        document.getElementById("person").style.display = "none";
        document.getElementById("repet").style.display = "none";
    } else { // vista numeros
        document.getElementById("person").style.display = "block";
        document.getElementById("form2").style.display = "block";
        document.getElementById("form1").style.display = "none";
        var dato1 = document.getElementById("nombre").value;
        document.getElementById("person").innerHTML = dato1;
        document.getElementById("repet").innerHTML = "intentos[" + intentos + "]";
    }
}


document.getElementById("BotonIngresar").onclick = function ingresar(evt) { // logica de ingresar
    if(document.getElementById("nombre").value != 0){
        vista = 1;
    }else{
        vista = 0;
        VerAlertNice("Por Favor Llene el campo nombre","error"); // nope ;v
    }
    mostrar();
};

function mostrar(evt) {
    if (vista == 0) { // `por defecto muestra para el nombre
        document.getElementById("form2").style.display = "none";
        document.getElementById("person").style.display = "none";
    } else if (vista == 1) { // muestra para los numeros 
        VerAlertNice("Bienvenido "+document.getElementById("nombre").value,"success"); // nope ;v
        numerom = Math.random() * (max - min) + min;
        numerom = parseInt(numerom);
        intentos = 0;
        lista = [];
        localStorage.clear;
        vista_reset(2);
    }

};

let html = document.getElementById("tiempo");

setInterval(function () {
    tiempo = new Date();

    horas = tiempo.getHours();
    minutos = tiempo.getMinutes();
    segundos = tiempo.getSeconds();

    //evitar los 0 o numeros individuales
    if (horas < 10)
        horas = "0" + horas;
    if (minutos < 10)
        minutos = "0" + minutos;
    if (segundos < 10)
        segundos = "0" + segundos;

    html.innerHTML = horas + " : " + minutos + " : " + segundos;
}, 1000);

