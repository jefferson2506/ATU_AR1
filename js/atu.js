let codigo = 1;
let modoAutomatico = true;

// Capacidad de asientos por tipo de bus
const asientosPorTipo = {
    "405": 37,
    "SE09": 25
};

let tipoBus = "405";
let asientos = asientosPorTipo[tipoBus];
let paradero = "CANAVAL Y MOREYRA";

const niveles = {
1:"🟢 Vacío",
2:"🟢 Casi vacío",
3:"🟡 Sentado 50%",
4:"🟠 Sentado 100%",
5:"🔴 Sentado + pasajeros de pie",
6:"⚫ Lleno Full"
};

// Elegir tipo de bus (405 o SE09) y recalcular capacidad/código
function elegirTipo(tipo){

tipoBus = tipo;
asientos = asientosPorTipo[tipo];

document.getElementById("btn405").classList.remove("activo");
document.getElementById("btnSE09").classList.remove("activo");

if(tipo === "405"){
    document.getElementById("btn405").classList.add("activo");
} else {
    document.getElementById("btnSE09").classList.add("activo");
}

document.getElementById("asientosNota").innerText =
"Asientos: " + asientos;

actualizarCorredor();
actualizarCodigo();
}

function getCorredorActual(){
    const paraderoSelect = document.getElementById("paradero");
    paradero = paraderoSelect ? paraderoSelect.value : paradero;

    if(paradero === "MOQUEGUA" || paradero === "ALCAZAR"){
        return "412";
    }

    return tipoBus;
}

function actualizarCorredor(){
    const corredor = getCorredorActual();
    const nota = document.getElementById("corredorNota");
    const btn405 = document.getElementById("btn405");
    const btnSE09 = document.getElementById("btnSE09");
    const tipoBusButtons = document.getElementById("tipoBusButtons");
    const corredorFijo412 = document.getElementById("corredorFijo412");

    if(nota){
        nota.innerText = "Corredor actual: " + corredor;
    }

    const esCorridorFijo = paradero === "MOQUEGUA" || paradero === "ALCAZAR";

    if(tipoBusButtons && corredorFijo412){
        tipoBusButtons.style.display = esCorridorFijo ? "none" : "flex";
        corredorFijo412.style.display = esCorridorFijo ? "flex" : "none";
    }

    if(btn405 && btnSE09){
        btn405.disabled = esCorridorFijo;
        btnSE09.disabled = esCorridorFijo;
        btn405.classList.toggle("activo", !esCorridorFijo && tipoBus === "405");
        btnSE09.classList.toggle("activo", !esCorridorFijo && tipoBus === "SE09");
    }
}

// Calcula el código según cuántos usuarios ABORDAN, en proporción
// a la capacidad de asientos del bus (37 en el 405, 25 en el SE09)
function calcularCodigo(abordan, asientosBus){

if(abordan === 0){
    return 1;
}

let ratio = abordan / asientosBus;

// Umbrales proporcionales, tomando como referencia el bus 405 (37 asientos):
// <=15/37 casi vacío, <=30/37 sentado 50%, <=100% sentado 100%,
// <=40/37 sentado+pie, resto lleno full
if(ratio <= 15/37){
    return 2;
}
if(ratio <= 30/37){
    return 3;
}
if(ratio <= 1){
    return 4;
}
if(ratio <= 40/37){
    return 5;
}
return 6;
}

const STORAGE_KEY = "atuCovNombre";

function cargarCovNombre(){
    const nombre = localStorage.getItem(STORAGE_KEY);
    const label = document.getElementById("covNameLabel");
    if(label){
        label.innerText = nombre ? nombre : "Sin registrar";
    }
}

function guardarCovNombre(nombre){
    const valor = nombre.trim();
    if(!valor){ return; }
    localStorage.setItem(STORAGE_KEY, valor);
    cargarCovNombre();
}

function mostrarModalCov(){
    const modal = document.getElementById("covModal");
    const input = document.getElementById("covInput");
    if(modal){
        modal.classList.add("show");
    }
    if(input){
        input.value = localStorage.getItem(STORAGE_KEY) || "";
        setTimeout(()=>input.focus(), 100);
    }
}

function guardarCovDesdeModal(){
    const input = document.getElementById("covInput");
    if(input){
        guardarCovNombre(input.value);
    }
    const modal = document.getElementById("covModal");
    if(modal){
        modal.classList.remove("show");
    }
}

window.addEventListener("click", function(e){
    const modal = document.getElementById("covModal");
    if(modal && e.target === modal){
        modal.classList.remove("show");
    }
});

function renderCodigo(){
    document.getElementById("codigo").innerText =
    codigo.toString().padStart(2,"0");

    document.getElementById("nivel").innerText =
    niveles[codigo] || niveles[1];

    const switchInput = document.getElementById("modoAutomatico");
    const switchText = document.getElementById("switchText");
    const btnAnterior = document.getElementById("btnCodigoAnterior");
    const btnSiguiente = document.getElementById("btnCodigoSiguiente");
    const notaModo = document.getElementById("modoNota");

    if(switchInput){
        switchInput.checked = modoAutomatico;
    }

    if(switchText){
        switchText.innerText = modoAutomatico ? "AUTO" : "MANUAL";
    }

    if(btnAnterior && btnSiguiente){
        btnAnterior.disabled = modoAutomatico;
        btnSiguiente.disabled = modoAutomatico;
    }

    if(notaModo){
        notaModo.innerText = modoAutomatico
            ? "Modo automático activado: el código cambia según abordan."
            : "Modo manual activado: usa los botones o desliza para cambiar el código.";
    }
}

function actualizarCodigo(){

let abordan =
parseInt(document.getElementById("abordan").value) || 0;

if(modoAutomatico){
    codigo = calcularCodigo(abordan, asientos);
}

renderCodigo();
}

function toggleModoAutomatico(){
    const switchInput = document.getElementById("modoAutomatico");
    modoAutomatico = switchInput ? switchInput.checked : true;

    if(modoAutomatico){
        actualizarCodigo();
    } else {
        renderCodigo();
    }
}

function cambiarCodigo(direccion){
    if(modoAutomatico){ return; }

    codigo = Math.max(1, Math.min(6, codigo + direccion));
    renderCodigo();
}

function configurarDeslizamientoCodigo(){
    const codigoBox = document.getElementById("codigoBox");
    if(!codigoBox){ return; }

    let touchStartX = 0;
    let touchEndX = 0;

    codigoBox.addEventListener("touchstart", (event)=>{
        touchStartX = event.changedTouches[0].screenX;
    }, {passive:true});

    codigoBox.addEventListener("touchend", (event)=>{
        touchEndX = event.changedTouches[0].screenX;
        const diferencia = touchEndX - touchStartX;

        if(Math.abs(diferencia) < 50){ return; }
        if(!modoAutomatico){
            cambiarCodigo(diferencia < 0 ? 1 : -1);
        }
    }, {passive:true});
}

function toggleConfiguracionAdicional(){
const panel = document.getElementById("configuracionAdicional");
const icon = document.getElementById("configToggleIcon");

if(!panel || !icon){ return; }

panel.classList.toggle("oculto");
icon.innerText = panel.classList.contains("oculto") ? "▸" : "▾";
}

function mas(id){
let valor =
parseInt(document.getElementById(id).innerText);

document.getElementById(id).innerText =
valor + 1;
}

function menos(id){
let valor =
parseInt(document.getElementById(id).innerText);

if(valor > 0){
    document.getElementById(id).innerText =
    valor - 1;
}
}

function generarReporte(){

let usuarios =
parseInt(document.getElementById("usuarios").value) || 0;

let abordan =
parseInt(document.getElementById("abordan").value) || 0;

let quedan =
usuarios - abordan;

if(quedan < 0){
    quedan = 0;
}

// Aseguramos que el código esté actualizado según lo que aborda
if(modoAutomatico){
    codigo = calcularCodigo(abordan, asientos);
}
renderCodigo();

let servicio = document.getElementById("servicio").value;
let espera = document.getElementById("espera").value;

let reporte =

`🚏 PARADERO: ${paradero}
🚌 CORREDOR: ${getCorredorActual()}
🔢 SERVICIO: ${servicio}
📊 CODIGO: ${codigo.toString().padStart(2,"0")}
👨‍👨‍👧 CANT. USUARIOS: ${usuarios}
🅰️ ABORDAN: ${abordan}
👩🏻‍🤝‍👨🏻 QUEDAN EN PISO: ${quedan}
👩‍🦽 CONADIS: ${document.getElementById("conadis").innerText}
👮🏼‍♂️ PNP: ${document.getElementById("pnp").innerText}
👩‍🚒 BOMBEROS: ${document.getElementById("bomberos").innerText}
🕰 TIEMPO DE ESPERA: ${espera} Minutos`;

document.getElementById("resultado").value = reporte;

navigator.clipboard.writeText(reporte);

document.getElementById("estado").innerHTML =
"✅ REPORTE COPIADO";
}

function nuevoBus(){

let servicioActual =
parseInt(document.getElementById("servicio").value) || 0;

document.getElementById("servicio").value =
servicioActual + 1;

document.getElementById("usuarios").value = "";
document.getElementById("abordan").value = "";
document.getElementById("espera").value = "";

document.getElementById("conadis").innerText = 0;
document.getElementById("pnp").innerText = 0;
document.getElementById("bomberos").innerText = 0;

document.getElementById("resultado").value = "";
document.getElementById("estado").innerHTML =
"🚌 LISTO PARA EL SIGUIENTE BUS";

codigo = 1;
renderCodigo();
}

actualizarCorredor();
actualizarCodigo();
cargarCovNombre();
toggleConfiguracionAdicional();
configurarDeslizamientoCodigo();

if(!localStorage.getItem(STORAGE_KEY)){
    mostrarModalCov();
}
