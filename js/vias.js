// Paraderos que comparten el formato "similar" (Lado A / Lado B + COV ATU)
const PARADEROS_SIMILARES = ["ALCAZAR", "MOQUEGUA", "ICA"];

const PARADERO_TEXTOS = {
  "CANAVAL Y MOREYRA": "Canaval y Moreyra",
  "ALCAZAR": "ALCÁZAR",
  "MOQUEGUA": "MOQUEGUA",
  "ICA": "ICA",
  "TORRE UGARTE": "Torre Ugarte",
  "JAVIER PRADO / IQUITOS": "Av. Javier Prado/Prolg. Iquitos"
};

function colorSelect(sel){
  sel.classList.remove('s-fluido','s-moderado','s-cargmod','s-cargado');
  const map = {
    'FLUIDO':'s-fluido',
    'MODERADO':'s-moderado',
    'CARGADO/MODERADO':'s-cargmod',
    'CARGADO':'s-cargado'
  };
  sel.classList.add(map[sel.value]);
}
// init colors
document.querySelectorAll('.status-select').forEach(colorSelect);

function pad(n){return n.toString().padStart(2,'0');}

// Ajusta las etiquetas del formulario según el paradero elegido
function actualizarFormulario(){
  const paraderoValue = document.getElementById('paradero').value;
  const esSimilar = PARADEROS_SIMILARES.includes(paraderoValue);

  const via1Label = document.getElementById('via1Label');
  const via2Label = document.getElementById('via2Label');
  const covRow = document.getElementById('covRow');
  const despachoRow = document.getElementById('despachoRow');

  if(paraderoValue === 'TORRE UGARTE'){
    via1Label.textContent = 'Av. Petit Thouars';
    via2Label.textContent = 'Tránsito Lado B';
    covRow.style.display = 'flex';
    despachoRow.style.display = 'none';
  } else if(paraderoValue === 'JAVIER PRADO / IQUITOS'){
    via1Label.textContent = 'Lado A y B : Javier Prado';
    via2Label.textContent = 'Lado A : Prolongación Iquitos';
    covRow.style.display = 'flex';
    despachoRow.style.display = 'none';
  } else if(esSimilar){
    via1Label.textContent = 'Lado A';
    via2Label.textContent = 'Lado B';
    covRow.style.display = 'flex';
    despachoRow.style.display = 'none';
  } else {
    via1Label.textContent = 'Av. Paseo de la República';
    via2Label.textContent = 'Av. Canaval y Moreyra / Av. Juan de Arona';
    covRow.style.display = 'none';
    despachoRow.style.display = 'flex';
  }
}

function generarReporte(){
  const paraderoValue = document.getElementById('paradero').value;
  const paradero = PARADERO_TEXTOS[paraderoValue] || paraderoValue;
  const sentido = document.getElementById('sentido').value;
  const via1 = document.getElementById('via1').value;
  const via2 = document.getElementById('via2').value;
  const semaforos = document.getElementById('semaforos').checked;
  const pnp = document.getElementById('pnp').checked;
  const recaudo = document.getElementById('recaudo').checked;

  const now = new Date();
  const fecha = `${pad(now.getDate())}/${pad(now.getMonth()+1)}/${now.getFullYear()}`;
  const hora = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

  let reporte;

  if(paraderoValue === 'TORRE UGARTE'){
    const cov = document.getElementById('cov').checked;
    const semaforosTxt = semaforos ? 'Contamos con semáforos operativos.' : 'No contamos con semáforos operativos.';
    const pnpTxt = pnp ? 'Contamos con apoyo del PNP de tránsito.' : 'No Contamos con apoyo policial en el punto.';
    const covTxt = cov ? 'Contamos con personal Cov en el punto.' : 'No contamos con personal Cov en el punto.';
    const recaudoTxt = recaudo ? 'Contamos con personal de recaudo.' : 'No contamos con personal de recaudo.';

    reporte =
`🗳️ REPORTE DE VÍA
🚏 PARADERO: ${paradero}
🔁 SENTIDO: ${sentido}
📆 FECHA: ${fecha}
⏰ HORA: ${hora}Hrs
-----------------------------------
🚧 TRÁNSITO:
Av. Petit Thouars
Tránsito Lado B : ${via1} - ${via2}

🚦 SEMÁFOROS:
${semaforosTxt}

👮🏻‍♂️ APOYO PNP:
${pnpTxt}

👮 COV ATU:
${covTxt}

👩‍✈️ RECAUDO:
${recaudoTxt}

SE ADJUNTAN EVIDENCIAS:`;

  } else if(paraderoValue === 'JAVIER PRADO / IQUITOS'){
    const cov = document.getElementById('cov').checked;
    const semaforosTxt = semaforos ? 'Contamos con semáforos operativos.' : 'No contamos con semáforos operativos.';
    const pnpTxt = pnp ? 'Contamos con apoyo del PNP de tránsito.' : 'No contamos con apoyo del PNP de tránsito.';
    const covTxt = cov ? 'Contamos con personal Cov en labor de aceleramiento.' : 'No contamos con personal Cov en labor de aceleramiento.';

    reporte =
`REPORTE DE VÍA
🚏 PARADERO: ${paradero}
👮🏻‍♂️ COV: Ari Hilasaca Jefferson
🔁 SENTIDO: ${sentido}
📆 FECHA: ${fecha}
⏰ HORA: ${hora} HRS.
------------------------------------
🚧 TRÁNSITO:
Lado A y B : Javier Prado
- ${via1}
Lado A : Prolongación Iquitos
- ${via2}

🚦 SEMÁFOROS:
${semaforosTxt}

👮🏻‍♂️ APOYO PNP:
${pnpTxt}

COV ATU:
${covTxt}

OBS. :
se visualizan unidades atrapadas en la congestión vehicular.

SE ADJUNTAN EVIDENCIAS:`;

  } else if(PARADEROS_SIMILARES.includes(paraderoValue)){
    // Formato para ALCÁZAR / MOQUEGUA / ICA
    const cov = document.getElementById('cov').checked;

    const semaforosTxt = semaforos ? 'Contamos con semáforos operativos.' : 'No contamos con semáforos operativos.';
    const pnpTxt = pnp ? 'Contamos con presencia policial.' : 'No contamos con presencia policial.';
    const covTxt = cov ? 'Contamos con personal Cov en el punto.' : 'No contamos con personal Cov en el punto.';
    const recaudoTxt = recaudo ? 'Contamos con personal de recaudo.' : 'No contamos con personal de recaudo.';

    reporte =
`REPORTE DE VÍA
🚏 PARADERO: ${paradero} 
🔁 SENTIDO: ${sentido}
📆 FECHA: ${fecha} 
⏰ HORA: ${hora} hrs
------------------------------
🚧 TRÁNSITO:
Lado A: ${via1} 
Lado B: ${via2} 
🚦SEMÁFOROS:
${semaforosTxt}
👮🏻‍♂APOYO PNP: 
${pnpTxt}
👮COV ATU:
${covTxt}
👩‍✈️RECAUDO:
${recaudoTxt}
SE ADJUNTAN EVIDENCIAS:`;

  } else {
    // Formato original para Canaval y Moreyra (sin cambios)
    const despacho = document.getElementById('despacho').checked;

    const semaforosTxt = semaforos ? 'Si contamos con semáforos operativos.' : 'No contamos con semáforos operativos.';
    const pnpTxt = pnp ? 'Si contamos con apoyo policial de tránsito.' : 'No contamos con apoyo policial de tránsito.';
    const recaudoTxt = recaudo ? 'Si contamos con personal de recaudo' : 'No contamos con personal de recaudo';
    const despachoTxt = despacho ? 'Si se cuenta con personal de Despacho.' : 'No se cuenta con personal de Despacho.';

    reporte =
`🗳️ REPORTE DE VÍA
🚏 PARADERO: ${paradero}
🔁 SENTIDO: ${sentido}
📆 FECHA: ${fecha}
⏰ HORA: ${hora} hrs. 
-------------------------------------

🚧 TRÁNSITO:
• Av. Paseo de la República:
${via1} 

• Av. Canaval y Moreyra / Av. Juan de Arona: 
${via2} 

🚦 SEMÁFOROS:
${semaforosTxt}

👮🏻‍♂️ APOYO PNP:
${pnpTxt}

${recaudoTxt} 

${despachoTxt}

📸 SE ADJUNTAN EVIDENCIAS:`;
  }

  document.getElementById('output').textContent = reporte;
  const copyBtn = document.getElementById('copyBtn');
  copyBtn.disabled = false;
  document.getElementById('output').scrollIntoView({behavior:'smooth', block:'nearest'});
}

function copiarReporte(){
  const text = document.getElementById('output').textContent;
  const btn = document.getElementById('copyBtn');

  function marcarCopiado(){
    btn.textContent = '✓ Copiado';
    btn.classList.add('copied');
    setTimeout(()=>{btn.textContent='Copiar'; btn.classList.remove('copied');}, 1800);
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(marcarCopiado).catch(copiarConFallback);
  } else {
    copiarConFallback();
  }

  function copiarConFallback(){
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand('copy');
      marcarCopiado();
    } catch (err) {
      btn.textContent = 'Error al copiar';
      setTimeout(()=>{btn.textContent='Copiar';}, 1800);
    }
    document.body.removeChild(ta);
  }
}

// Estado inicial del formulario
actualizarFormulario();
