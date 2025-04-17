document.addEventListener("DOMContentLoaded", () => {
  const productos = [
    { id: 1, nombre: "Green Crack", descripcion: "", disponible: 48 },
	
    { id: 2, nombre: "GranDaddyPurple", descripcion: "", disponible: 12 },
    { id: 3, nombre: "Thick punch", descripcion: "", disponible: 8 },
    { id: 4, nombre: "White death", descripcion: "", disponible: 69 },
	{ id: 5, nombre: "OG kush", descripcion: "", disponible: 4 },
	{ id: 10, nombre: "Meth GranDaddyAss", descripcion: "", disponible: 64 },
	{ id: 11, nombre: "Fruity ghost", descripcion: "", disponible: 10 },
	{ id: 12, nombre: "Thick Smegma", descripcion: "", disponible: 10}
  ];
  

  const contenedor = document.getElementById("productos");
  const totalFinalElement = document.getElementById("total-final");

  const cantidadesExtra = {};
  const cantidadesPedido = {};

  productos.forEach(prod => {
    cantidadesExtra[prod.id] = 0;
    cantidadesPedido[prod.id] = 0;

    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";
    tarjeta.innerHTML = `
      <h3>${prod.nombre}</h3>
      <p>${prod.descripcion}</p>
      <div class="controles">
        <div class="fila-controles">
          <label>Stock:</label>
          <div class="grupo">
            <button onclick="sumarExtra(${prod.id}, 1)">+1</button>
            <button onclick="sumarExtra(${prod.id}, 5)">+5</button>
            <button onclick="sumarExtra(${prod.id}, -1)">-1</button>
			<button onclick="sumarExtra(${prod.id}, -5)">-5</button>
          </div>
        </div>
        <div class="fila-controles">
          <label>Pedido:</label>
          <div class="grupo">
            <button onclick="modificarPedido(${prod.id}, -1)">-1</button>
			<button onclick="modificarPedido(${prod.id}, -5)">-5</button>
            <span class="valor" id="pedido-${prod.id}">0</span>
            <button onclick="modificarPedido(${prod.id}, 1)">+1</button>
			<button onclick="modificarPedido(${prod.id}, 1)">+5</button>
          </div>
        </div>
        <div class="resultado">
          Total disponible: <span class="valor" id="total-${prod.id}">${prod.disponible}</span>
        </div>
      </div>
    `;
    contenedor.appendChild(tarjeta);
  });

  window.sumarExtra = (id, cantidad) => {
    const base = productos.find(p => p.id === id).disponible;
    const nuevaCantidad = cantidadesExtra[id] + cantidad;
    // Evitar que el total disponible quede negativo
    if (base + nuevaCantidad < 0) return;
    cantidadesExtra[id] = nuevaCantidad;
    actualizar(id);
  };

  window.modificarPedido = (id, cambio) => {
    const max = productos.find(p => p.id === id).disponible + cantidadesExtra[id];
    cantidadesPedido[id] += cambio;
    if (cantidadesPedido[id] < 0) cantidadesPedido[id] = 0;
    if (cantidadesPedido[id] > max) cantidadesPedido[id] = max;
    actualizar(id);
  };

  function actualizar(id) 
  {
    const base = productos.find(p => p.id === id).disponible;
    const extra = cantidadesExtra[id];
    const pedido = cantidadesPedido[id];
    const total = Math.max(base + extra - pedido, 0);

    document.getElementById(`pedido-${id}`).textContent = pedido;
    document.getElementById(`total-${id}`).textContent = total;

   
  }


  document.getElementById("cerrar-todos").addEventListener("click", () => {
    productos.forEach(p => {
      cantidadesPedido[p.id] = 0;

    });
  });

  productos.forEach(p => actualizar(p.id));
});


  // Materias primas
const materiasPrimas = [
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

const materiasPanel = document.getElementById("materias-primas");

materiasPrimas.forEach(m => {
  const bloque = document.createElement("div");
  bloque.className = "materia";
  bloque.innerHTML = `
    <h4>${m.nombre}</h4>
    <span class="cantidad" id="materia-${m.id}">${m.cantidad}</span>
    <div>
      <button onclick="cambiarMateria('${m.id}', -1)">-1</button>
      <button onclick="cambiarMateria('${m.id}', 1)">+1</button>
    </div>
  `;
  materiasPanel.appendChild(bloque);
});

window.cambiarMateria = (id, delta) => {
  const materia = materiasPrimas.find(m => m.id === id);
  if (!materia) return;
  materia.cantidad += delta;
  if (materia.cantidad < 0) materia.cantidad = 0;
  document.getElementById(`materia-${id}`).textContent = materia.cantidad;
};
