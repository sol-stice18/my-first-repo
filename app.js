// Navegación del menú lateral (Cambio de pestañas)
document.querySelectorAll(".nav-link").forEach(boton => {
    boton.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelectorAll(".nav-link").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-view").forEach(v => v.classList.remove("active-view"));

        this.classList.add("active");
        const vistaDestino = this.getAttribute("data-target");
        document.getElementById(vistaDestino).classList.add("active-view");
    });
});

let totalBecasActivas = 142;

// Función auxiliar para registrar eventos en la pestaña Solicitudes y Auditoría
function registrarEnSistema(nombre, zona, promedio, puntaje, aprobada) {
    const tabla = document.getElementById("tablaSolicitudes");
    let estadoHTML = '<span class="tag-danger">Rechazada</span>';

    if (aprobada) {
        totalBecasActivas++;
        document.getElementById("becasActivas").textContent = `${totalBecasActivas} Alumnos`;

        estadoHTML = puntaje >= 95
            ? '<span class="tag-excellence">Aprobada (Excelencia)</span>'
            : '<span class="tag-success">Aprobada</span>';
    }

    tabla.innerHTML += `
        <tr>
            <td>${nombre}</td>
            <td>${zona}</td>
            <td>${promedio}</td>
            <td>${puntaje} pts</td>
            <td>${estadoHTML}</td>
        </tr>
    `;

    const consola = document.getElementById("consolaAuditoria");
    consola.innerHTML += `<p>[EVALUACIÓN] Candidato: ${nombre} (${zona}) | Promedio: ${promedio} -> Puntaje calculado: ${puntaje} pts.</p>`;
}

// Módulo 1: Evaluación transparente de becas
document.getElementById("formBeca").addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombreAlumno").value;
    const promedio = parseFloat(document.getElementById("promedio").value);
    const zona = document.getElementById("zonaEscolar").value;
    const haceDeporte = document.getElementById("extraDeporte").checked;

    let puntaje = promedio;

    // Apoyo equitativo para zonas rurales (+5 puntos de nivelación)
    if (zona === "Rural") {
        puntaje += 5;
    }

    // Bono por actividades extracurriculares (+10 puntos)
    if (haceDeporte) {
        puntaje += 10;
    }

    const aprobada = puntaje >= 70;
    const cajaResultado = document.getElementById("resultadoBeca");

    if (aprobada) {
        cajaResultado.innerHTML = `✅ <strong>Beca Aprobada</strong> para ${nombre}. Puntaje final: ${puntaje} pts.`;
    } else {
        cajaResultado.innerHTML = `❌ <strong>No Aprobada</strong> (${puntaje} pts). Se requieren mínimo 70 pts.`;
    }

    registrarEnSistema(nombre, zona, promedio, puntaje, aprobada);
});

// Módulo 2: Activación de tarjeta estudiantil
document.getElementById("formWallet").addEventListener("submit", function(evento) {
    evento.preventDefault();

    const correo = document.getElementById("correoWallet").value;
    const nip = document.getElementById("nipWallet").value;

    const cajaWallet = document.getElementById("resultadoWallet");
    cajaWallet.innerHTML = `🎉 Tarjeta activada correctamente para <strong>${correo}</strong> sin comisiones.`;

    const consola = document.getElementById("consolaAuditoria");
    consola.innerHTML += `<p>[WALLET] Tarjeta activada para el correo: ${correo}</p>`;
});
