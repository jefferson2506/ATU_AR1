const STORAGE_KEY = "atuCovNombre";
let tipoReporteActual = "trafico";
let presenciaPersonal = null;
let presenciaRecaudo = null;

function cargarCovNombre(){
  const nombre = localStorage.getItem(STORAGE_KEY);
  const input = document.getElementById("cov");
  const inputPresencia = document.getElementById("cov-presencia");
  const inputRecaudo = document.getElementById("cov-recaudo");
  const label = document.getElementById("covNameLabel");
  if(input){ input.value = nombre || ""; }
  if(inputPresencia){ inputPresencia.value = nombre || ""; }
  if(inputRecaudo){ inputRecaudo.value = nombre || ""; }
  if(label){ label.innerText = nombre ? nombre : "Sin registrar"; }
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
  if(modal){ modal.classList.add("show"); }
  if(input){ input.value = localStorage.getItem(STORAGE_KEY) || ""; setTimeout(()=>input.focus(), 100); }
}

function guardarCovDesdeModal(){
  const input = document.getElementById("covInput");
  if(input){ guardarCovNombre(input.value); }
  const modal = document.getElementById("covModal");
  if(modal){ modal.classList.remove("show"); }
}

window.addEventListener("click", function(e){
  const modal = document.getElementById("covModal");
  if(modal && e.target === modal){ modal.classList.remove("show"); }
});

function pad(n){ return n.toString().padStart(2, "0"); }

function getFechaHoy(){
  const hoy = new Date();
  return `${pad(hoy.getDate())}/${pad(hoy.getMonth()+1)}/${hoy.getFullYear()}`;
}

function getHoraAhora(){
  const hoy = new Date();
  return `${pad(hoy.getHours())}:${pad(hoy.getMinutes())}hrs.`;
}

function cambiarTipo(tipo){
  tipoReporteActual = tipo;
  presenciaPersonal = null;
  
  const btnTrafico = document.querySelectorAll(".type-switch button")[0];
  const btnPresencia = document.querySelectorAll(".type-switch button")[1];
  const btnRecaudo = document.querySelectorAll(".type-switch button")[2];
  const seccionTrafico = document.getElementById("seccion-trafico");
  const seccionPresencia = document.getElementById("seccion-presencia");
  const seccionRecaudo = document.getElementById("seccion-recaudo");
  
  // Resetear todos los botones
  btnTrafico.classList.remove("activo");
  btnPresencia.classList.remove("activo");
  btnRecaudo.classList.remove("activo");
  
  // Ocultar todas las secciones
  seccionTrafico.classList.add("seccion-oculta");
  seccionPresencia.classList.add("seccion-oculta");
  seccionRecaudo.classList.add("seccion-oculta");
  
  if(tipo === "trafico"){
    btnTrafico.classList.add("activo");
    seccionTrafico.classList.remove("seccion-oculta");
    generarReporte();
  } else if(tipo === "presencia"){
    btnPresencia.classList.add("activo");
    seccionPresencia.classList.remove("seccion-oculta");
    document.getElementById("resultado").innerText = "Selecciona si hay presencia o no";
  } else if(tipo === "recaudo"){
    btnRecaudo.classList.add("activo");
    seccionRecaudo.classList.remove("seccion-oculta");
    document.getElementById("resultado").innerText = "Selecciona si hay presencia o no";
  }
}

function cambiarPresencia(hay){
  presenciaPersonal = hay;
  const btnSi = document.getElementById("btn-si");
  const btnNo = document.getElementById("btn-no");
  const estado = document.getElementById("presencia-estado");
  
  if(hay){
    btnSi.style.background = "#4caf50";
    btnNo.style.background = "#2b2b2b";
    estado.innerText = "✅ Presencia SÍ registrada";
  } else {
    btnSi.style.background = "#2b2b2b";
    btnNo.style.background = "#f44336";
    estado.innerText = "❌ Sin presencia de personal";
  }
  
  generarReporte();
}

function cambiarRecaudo(hay){
  presenciaRecaudo = hay;
  const btnSi = document.getElementById("btn-recaudo-si");
  const btnNo = document.getElementById("btn-recaudo-no");
  const estado = document.getElementById("recaudo-estado");
  
  if(hay){
    btnSi.style.background = "#4caf50";
    btnNo.style.background = "#2b2b2b";
    estado.innerText = "✅ Presencia SÍ registrada";
  } else {
    btnSi.style.background = "#2b2b2b";
    btnNo.style.background = "#f44336";
    estado.innerText = "❌ Sin presencia de personal";
  }
  
  generarReporte();
}

function actualizar(){
  document.getElementById("valor").innerText = document.getElementById("semaforos").value;
  generarReporte();
}

function generarReporte(){
  if(tipoReporteActual === "trafico"){
    generarReporteTrafico();
  } else if(tipoReporteActual === "presencia"){
    generarReportePresencia();
  } else if(tipoReporteActual === "recaudo"){
    generarReporteRecaudo();
  }
}

function generarReporteTrafico(){
  const cov = document.getElementById("cov").value.trim() || localStorage.getItem(STORAGE_KEY) || "—";
  const paradero = document.getElementById("paradero").value.trim() || "Canaval y Moreyra";
  const sentido = document.getElementById("sentido").value;
  const cambios = document.getElementById("semaforos").value;
  const fecha = getFechaHoy();
  const hora = getHoraAhora();
  const suceso = document.getElementById("suceso").value.trim() || "Se informa para conocimiento.";

  const reporte = `🚥 OCURRENCIA CCSJL - Z4 TM
👮🏻‍♂️ COV: ${cov}
🚏 PARADERO: ${paradero}
🔁 SENTIDO: ${sentido}
📆 FECHA: ${fecha}
⏰ HORA: ${hora}

📝 SUCESO:
Para informar que se visualiza que PNP de tránsito inicia dando pase a la Av. Paseo de la República a ${cambios} cambios de semáforo en verde a la hora, dando pase preferencial de Av. Juan de Arona causando congestión en esta intersección.

${suceso}

Se informa para conocimiento.

SE ADJUNTAN EVIDENCIAS:`;

  document.getElementById("resultado").innerText = reporte;
  document.getElementById("estadoTexto").innerText = "Reporte listo para copiar";
}

function generarReportePresencia(){
  if(presenciaPersonal === null){
    document.getElementById("resultado").innerText = "Selecciona si hay presencia o no";
    return;
  }

  const cov = document.getElementById("cov-presencia").value.trim() || localStorage.getItem(STORAGE_KEY) || "—";
  const paradero = document.getElementById("paradero-presencia").value.trim() || "Canaval y Moreyra";
  const sentido = document.getElementById("sentido-presencia").value;
  const fecha = getFechaHoy();
  const hora = getHoraAhora();

  let mensaje = presenciaPersonal 
    ? "Para informar a la hora, que SI CONTAMOS CON PRESENCIA DE PERSONAL DE DESPACHO DE CONSORCIO en Paradero Canaval y Moreyra " + sentido + "."
    : "Para informar a la hora, que NO CONTAMOS CON PRESENCIA DE PERSONAL DE DESPACHO DE CONSORCIO en Paradero Canaval y Moreyra " + sentido + ".";

  const reporte = `🚥 OCURRENCIA CCSJL - Z4 TM

👮🏻‍♂️ COV: ${cov}
🚏 PARADERO: ${paradero}
🔁 SENTIDO: ${sentido}
📆 FECHA: ${fecha}
⏰ HORA: ${hora}

📝 SUCESO:
${mensaje}

Se hace de conocimiento.

SE ADJUNTAN EVIDENCIAS:`;

  document.getElementById("resultado").innerText = reporte;
  document.getElementById("estadoTexto").innerText = "Reporte listo para copiar";
}

function generarReporteRecaudo(){
  if(presenciaRecaudo === null){
    document.getElementById("resultado").innerText = "Selecciona si hay presencia o no";
    return;
  }

  const cov = document.getElementById("cov-recaudo").value.trim() || localStorage.getItem(STORAGE_KEY) || "—";
  const paradero = document.getElementById("paradero-recaudo").value.trim() || "Canaval y Moreyra";
  const sentido = document.getElementById("sentido-recaudo").value;
  const fecha = getFechaHoy();
  const hora = getHoraAhora();

  let mensaje = presenciaRecaudo 
    ? "Para informar que se visualiza la presencia de personal de recaudo en el paradero en mención, para atención a los usuarios con el servicio de recargas y venta de tarjetas Lima Pass."
    : "Para informar que NO se visualiza la presencia de personal de recaudo en el paradero en mención, afectando la atención a los usuarios con el servicio de recargas y venta de tarjetas Lima Pass.";

  const reporte = `🚥 OCURRENCIA CCSJL - Z4 TM

👮🏻‍♂️ COV: ${cov}
🚏 PARADERO: ${paradero}
🔁 SENTIDO: ${sentido}
📆 FECHA: ${fecha}
⏰ HORA: ${hora}

📝 SUCESO:
${mensaje}

Se informa para conocimiento.

SE ADJUNTAN EVIDENCIAS:`;

  document.getElementById("resultado").innerText = reporte;
  document.getElementById("estadoTexto").innerText = "Reporte listo para copiar";
}

function copiarReporte(){
  const texto = document.getElementById("resultado").innerText;
  if(texto.includes("Selecciona") || texto.includes("Aquí aparecerá")){
    alert("Por favor genera un reporte primero");
    return;
  }
  navigator.clipboard.writeText(texto);
  document.getElementById("estadoTexto").innerText = "Reporte copiado ✅";
}

cargarCovNombre();
if(!localStorage.getItem(STORAGE_KEY)){
  mostrarModalCov();
}
generarReporte();
