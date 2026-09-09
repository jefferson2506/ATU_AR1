const STORAGE_KEY = "atuCovNombre";
const continuar=document.getElementById("continuar");
const inicio=document.getElementById("inicio");
const menu=document.getElementById("menu");
const covMostrado=document.getElementById("covMostrado");
const btnCambiarCov=document.getElementById("btnCambiarCov");
let covActual="";

// Cargar COV al iniciar
function cargarCov(){
  const covGuardado=localStorage.getItem(STORAGE_KEY);
  if(covGuardado){
    covActual=covGuardado;
    covMostrado.textContent=covGuardado;
    inicio.classList.add("oculto");
    menu.classList.remove("oculto");
  } else {
    inicio.classList.remove("oculto");
    menu.classList.add("oculto");
  }
}

continuar.onclick=()=>{
  const cov=document.getElementById("cov").value.trim();
  if(cov==""){
    alert("Ingrese el nombre del COV");
    return;
  }
  covActual=cov;
  localStorage.setItem(STORAGE_KEY,cov);
  covMostrado.textContent=cov;
  inicio.classList.add("oculto");
  menu.classList.remove("oculto");
}

btnCambiarCov.onclick=()=>{
  const nuevoCov=prompt("Ingrese nuevo nombre del COV:",covActual);
  if(nuevoCov && nuevoCov.trim()){
    covActual=nuevoCov.trim();
    localStorage.setItem(STORAGE_KEY,covActual);
    covMostrado.textContent=covActual;
  }
}

const placa=document.getElementById("placa");

placa.addEventListener("input",function(){
  let valor=this.value.toUpperCase().replace(/[^A-Z0-9]/g,"");
  if(valor.length>3){
    valor=valor.substring(0,3)+"-"+valor.substring(3,6);
  }
  this.value=valor;
});

document.getElementById("generar").onclick=function(){
  const cov=covActual.toUpperCase();
  const sentido=document.getElementById("sentido").value;
  const placa=document.getElementById("placa").value;
  const ruta=document.getElementById("ruta").value;
  const servicio=document.getElementById("servicio").value;
  const usuarios=document.getElementById("usuarios").value;

  if(placa.length!=7){
    alert("La placa debe tener formato AUZ-922");
    return;
  }

  const ahora=new Date();
  const fecha=
    String(ahora.getDate()).padStart(2,"0")+"/"+
    String(ahora.getMonth()+1).padStart(2,"0")+"/"+
    String(ahora.getFullYear()).slice(-2);

  const hora=
    String(ahora.getHours()).padStart(2,"0")+":"+
    String(ahora.getMinutes()).padStart(2,"0")+" hrs.";

  const texto=`🚦 INCIDENCIA CCSJL - Z4 TM
👮🏻‍♂️ COV: ${cov}
🚏 PARADERO: CANAVAL Y MOREYRA
🔁 SENTIDO: ${sentido}
🉑 RUTA: ${ruta}
🚌 SERVICIO: ${servicio}
🆎 PLACA: ${placa}
📆 FECHA: ${fecha}
⏰ HORA: ${hora}

🧐 OPCIÓN:
🚫 Evasión de paradero. ✅

📝 SUCESO:
Para informar a la hora que unidad en mención, evade el paradero dejando ${usuarios} usuarios. Se informa para conocimiento.

Se adjuntan evidencias:`;

  document.getElementById("resultado").value=texto;
}

document.getElementById("copiar").onclick=function(){
  const area=document.getElementById("resultado");
  if(area.value==""){
    alert("Primero genere el reporte.");
    return;
  }
  navigator.clipboard.writeText(area.value);
  alert("✅ Reporte copiado.");
}

cargarCov();
