# 📋 Documentación de Estilos ATU

## Archivo CSS Centralizado: `atu.css`

Todos los archivos HTML usan un CSS centralizado (`atu.css`) para mantener consistencia visual en toda la aplicación.

---

## 🎨 Distribución de Estilos por Página

### 1. **atu.html** - Reporte ATU
**Clases CSS utilizadas:**
- `.dashboard` - Navegación superior con enlaces
- `.cov-card` - Tarjeta con información del COV actual
- `.cov-modal` / `.cov-panel` - Modal para cambiar COV
- `.card` - Contenedor de secciones
- `.grid` - Grid de 2 columnas
- `.btn` - Botones circulares (contador)
- Estilos específicos en `<style>` interno

**Estilos específicos de atu.html:**
- `.codigo-box` - Contenedor del código de ocupación
- `.contador` - Fila de contadores (CONADIS, PNP, BOMBEROS)
- `.tipo-bus` - Botones de selección de tipo de bus (405/SE09)
- `.generar` / `.siguiente` - Botones de acción grandes
- `.estado` - Mensaje de estado verde

---

### 2. **Incidentes.html** - Reporte de Incidencias
**Clases CSS utilizadas:**
- `.dashboard` - Navegación superior
- `.nav-tabs` - Tabs de navegación (Incidentes/Ocurrencias)
- `.container` - Contenedor principal centrado
- `.form-grid` - Grid de formulario
- `.botones` - Grid de 2 botones
- `.oculto` - Clase para ocultar elementos

**Funcionalidad:**
- Usa localStorage compartido con ocurrencias.html
- Almacena el nombre del COV en `atuCovNombre`
- Validación automática de placa (formato AUZ-922)
- Genera fecha y hora automáticamente

---

### 3. **ocurrencias.html** - Reporte de Ocurrencias
**Clases CSS utilizadas:**
- `.dashboard` - Navegación superior
- `.nav-tabs` - Tabs de navegación
- `.cov-card` / `.cov-modal` - Panel de COV
- `.card` - Contenedores de secciones
- `.grid` - Grid de 2 columnas
- `.btn` / `.btn.secondary` - Botones de acción
- `.type-switch` - Switch de tipo de reporte
- `.seccion-oculta` - Oculta secciones

**Tipos de reporte:**
1. **Tráfico** 🚥 - Cambios de semáforo con preferencia (1-10)
2. **P. Despacho** 👮 - Presencia de personal de despacho (SÍ/NO)
3. **P. Recaudo** 💰 - Presencia de personal de recaudo (SÍ/NO)

---

### 4. **vias.html** - Reporte de Vía
**Clases CSS utilizadas:**
- `.wrap` - Contenedor con ancho máximo
- `.dashboard` - Navegación superior (estilo específico)
- `.header` - Encabezado con animación
- `.blip` - Punto animado (pulse)
- `.panel` - Paneles de contenido
- `.field` / `.row2` - Campos de formulario
- `.via-row` - Filas de estado de vías
- `.toggle-row` / `.switch` - Toggles personalizados
- `.generate-btn` - Botón de generación con gradiente
- `.copy-btn` - Botón de copiar con estados

**Estilos específicos de vias.html:**
- Importa fuentes de Google: JetBrains Mono e Inter
- Colores personalizados: ámbar (#ffb454), verde (#3ddc84), rojo (#ff5c5c)
- Animaciones personalizadas de pulso
- Selects con icono personalizado

---

## 🎯 Colores Unificados

| Elemento | Color | Hex |
|----------|-------|-----|
| Fondo principal | Negro oscuro | `#121212` |
| Elementos secundarios | Gris oscuro | `#1e1e1e`, `#252525` |
| Bordes | Gris muy oscuro | `#2b2b2b` |
| Texto principal | Blanco | `white` |
| Texto secundario | Gris claro | `#cfcfcf`, `#cbd5e1` |
| Acento principal | Azul | `#4169e1` |
| Acento secundario | Naranja | `#ff9800` |
| Éxito/Verde | Verde | `#4caf50`, `#28a745` |
| Error/Rojo | Rojo | `#f44336`, `#ff5c5c` |

---

## 🔄 Almacenamiento Compartido

Todos los HTML comparten el mismo almacenamiento localStorage:
- **Clave:** `atuCovNombre`
- **Valor:** Nombre del COV registrado
- Cuando se registra en una página, se refleja automáticamente en las demás

---

## 📱 Responsive

El CSS incluye media queries para pantallas menores a 600px:
- Grillas cambian a 1 columna
- Botones se adaptan al ancho disponible
- Espacios se ajustan proporcionalmente

---

## 🔧 Personalización

Para modificar estilos:

1. **Cambios globales:** Edita `atu.css`
2. **Cambios por página:** Usa `<style>` en el HTML específico (dentro de `<head>`)
3. **Cambios inline:** Usa atributo `style` en elementos HTML (evitar si es posible)

Ejemplo de estilo específico en HTML:
```html
<head>
  <link rel="stylesheet" href="atu.css">
  <style>
    /* Estilos específicos de esta página */
    .miclase { color: red; }
  </style>
</head>
```

---

**Última actualización:** 2026-07-20
