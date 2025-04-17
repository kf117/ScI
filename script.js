// Definiciones globales
let productos = [];
let materiasPrimas = [];

// Esperar DOM
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("productos");
  const materiasPanel = document.getElementById("materias-primas");

  function crearTarjetaProducto(prod) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";
    tarjeta.id = `producto-${prod.id}`;
    tarjeta.innerHTML = `
      <h3>${prod.nombre}</h3>
      <p>${prod.descripcion}</p>
      <div class="controles">
        <div class="fila-controles">
          <label>Stock:</label>
          <div class="grupo">
            <button onclick="modificarDisponible(${prod.id}, -5)">-5</button>
            <button onclick="modificarDisponible(${prod.id}, -1)">-1</button>
            <input class="valor" id="total-${prod.id}" value="${prod.disponible}" />
            <button onclick="modificarDisponible(${prod.id}, 1)">+1</button>
            <button onclick="modificarDisponible(${prod.id}, 5)">+5</button>
          </div>
        </div>
        <div class="fila-controles">
          <label>Pedido:</label>
          <div class="grupo">
            <button onclick="modificarPedido(${prod.id}, -5)">-5</button>
            <button onclick="modificarPedido(${prod.id}, -1)">-1</button>
            <input class="valor" id="pedido-${prod.id}" value="${prod.pedido || 0}" />
            <button onclick="modificarPedido(${prod.id}, 1)">+1</button>
            <button onclick="modificarPedido(${prod.id}, 5)">+5</button>
          </div>
        </div>
      </div>
    `;
    contenedor.appendChild(tarjeta);
  }

  function crearBloqueMateria(m) {
    const bloque = document.createElement("div");
    bloque.className = "materia";
    bloque.id = `bloque-${m.id}`;
    bloque.innerHTML = `
      <h4>${m.nombre}</h4>
      <span class="cantidad" id="materia-${m.id}">${m.cantidad}</span>
      <div>
        <button onclick="cambiarMateria('${m.id}', -1)">-1</button>
        <button onclick="cambiarMateria('${m.id}', 1)">+1</button>
      </div>
    `;
    materiasPanel.appendChild(bloque);
  }

  window.modificarDisponible = (id, delta) => {
    const input = document.getElementById(`total-${id}`);
    const actual = parseInt(input.value, 10) || 0;
    input.value = Math.max(0, actual + delta);
  };

  window.modificarPedido = (id, delta) => {
    const pedidoInput = document.getElementById(`pedido-${id}`);
    const stockInput = document.getElementById(`total-${id}`);
    let pedido = parseInt(pedidoInput.value, 10) || 0;
    let stock = parseInt(stockInput.value, 10) || 0;

    if (delta > 0 && stock >= delta) {
      pedido += delta;
      stock -= delta;
    } else if (delta < 0 && pedido + delta >= 0) {
      pedido += delta;
      stock -= delta; // sumar al stock al cancelar
    }

    pedidoInput.value = Math.max(0, pedido);
    stockInput.value = Math.max(0, stock);
  };

  document.getElementById("cerrar-todos").addEventListener("click", () => {
    productos.forEach(p => {
      const total = parseInt(document.getElementById(`total-${p.id}`).value, 10);
      p.disponible = isNaN(total) ? p.disponible : total;
      p.pedido = 0;
      const pedidoInput = document.getElementById(`pedido-${p.id}`);
      if (pedidoInput) pedidoInput.value = 0;
    });
  });

  document.getElementById("guardar-datos").addEventListener("click", () => {
    const data = {
      productos: productos.map(p => ({
        id: p.id,
        nombre: p.nombre,
        descripcion: p.descripcion,
        disponible: parseInt(document.getElementById(`total-${p.id}`).value, 10) || 0,
        pedido: parseInt(document.getElementById(`pedido-${p.id}`).value, 10) || 0
      })),
      materias: materiasPrimas
    };
    document.getElementById("input-datos").value = JSON.stringify(data, null, 2);
  });

  document.getElementById("cargar-datos-texto").addEventListener("click", () => {
    const contenido = document.getElementById("input-datos").value;
    try {
      const data = JSON.parse(contenido);
      if (!data.productos || !data.materias) return alert("Formato inválido");

      productos = data.productos;
      materiasPrimas = data.materias;
      contenedor.innerHTML = "";
      materiasPanel.innerHTML = "";

      productos.forEach(p => crearTarjetaProducto(p));
      materiasPrimas.forEach(m => crearBloqueMateria(m));

    } catch (err) {
      alert("Error al leer datos: " + err.message);
    }
  });

  // Inicializar (si hay datos por defecto)
  if (productos.length === 0) {
    productos = [
      { id: 0, nombre: "Green Crack", descripcion: "", disponible: 48, pedido: 0 },
      { id: 1, nombre: "GranDaddyPurple", descripcion: "", disponible: 12, pedido: 0 },
      { id: 2, nombre: "Thick punch", descripcion: "", disponible: 8, pedido: 0 },
      { id: 3, nombre: "White death", descripcion: "", disponible: 69, pedido: 0 },
      { id: 4, nombre: "OG kush", descripcion: "", disponible: 4, pedido: 0 },
      { id: 5, nombre: "Meth GranDaddyAss", descripcion: "", disponible: 64, pedido: 0 },
      { id: 6, nombre: "Fruity ghost", descripcion: "", disponible: 10, pedido: 0 },
      { id: 7, nombre: "Thick Smegma", descripcion: "", disponible: 10, pedido: 0 }
    ];
  }

  if (materiasPrimas.length === 0) {
    materiasPrimas = [
      { id: 'm1', nombre: 'Tierra', cantidad: 17 },
      { id: 'm2', nombre: 'Green crack', cantidad: 6 },
      { id: 'm3', nombre: 'OG', cantidad: 0 },
      { id: 'm4', nombre: 'Sour diesel', cantidad: 0 },
      { id: 'm5', nombre: 'GranDaddy Purple', cantidad: 0 },
      { id: 'm6', nombre: 'Bolsitas', cantidad: 75 },
      { id: 'm7', nombre: 'Frascos', cantidad: 24 },
      { id: 'm8', nombre: 'Acido', cantidad: 10 },
      { id: 'm9', nombre: 'fosforo', cantidad: 10 },
      { id: 'm10', nombre: 'Pseudo', cantidad: 1 },
      { id: 'm11', nombre: 'Banana', cantidad: 1 },
      { id: 'm12', nombre: 'Viagra', cantidad: 1 },
      { id: 'm13', nombre: 'Cuke', cantidad: 1 },
      { id: 'm14', nombre: 'Chili', cantidad: 1 },
      { id: 'm15', nombre: 'flu', cantidad: 1 },
      { id: 'm16', nombre: 'Gasoline', cantidad: 1 },
      { id: 'm17', nombre: 'Energy drink', cantidad: 1 },
      { id: 'm18', nombre: 'Motor Oil', cantidad: 1 },
      { id: 'm19', nombre: 'Mega bean', cantidad: 1 }
    ];
  }

  productos.forEach(p => crearTarjetaProducto(p));
  materiasPrimas.forEach(m => crearBloqueMateria(m));

  window.cambiarMateria = (id, delta) => {
    const materia = materiasPrimas.find(m => m.id === id);
    if (!materia) return;
    materia.cantidad = Math.max(0, materia.cantidad + delta);
    document.getElementById(`materia-${id}`).textContent = materia.cantidad;
  };
});