
let productosEnCarrito = [];


const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarProductosCarrito() {
  const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));

  if (productosEnCarritoLS && productosEnCarritoLS.length > 0) {
    productosEnCarrito = productosEnCarritoLS;

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");

    contenedorCarritoProductos.innerHTML = "";

    productosEnCarrito.forEach((producto, indice) => {
      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML = `
        <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="carrito-producto-titulo">
          <small>Titulo</small>
          <h3>${producto.titulo}</h3>
        </div>
        <div class="carrito-producto-cantidad">
          <small>Titulo</small>
          <p>${producto.cantidad}</p>
        </div>
        <div class="carrito-producto-precio">
          <small>Precio</small>
          <p>$${producto.precio}</p>
        </div>
        <div class="carrito-producto-subtotal">
          <small>subtotal</small>
          <p>$${producto.precio * producto.cantidad}</p>
        </div>
        <button class="carrito-producto-eliminar" data-indice="${indice}" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
      `;
      contenedorCarritoProductos.appendChild(div);
    });
  } else {
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
  }

  actualizarBotonesEliminar();
  actualizarTotal();
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
  const botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}


function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;

  
   
    if (Array.isArray(productosEnCarrito) && productosEnCarrito.length > 0) {
      const index = productosEnCarrito.findIndex((producto) => producto.id === idBoton);
      console.log("Índice a eliminar:", index);
  
      if (index !== -1) {
        productosEnCarrito.splice(index, 1);

  
       
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
  

        cargarProductosCarrito();
      }
    }
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){
  Swal.fire({
    title: '¿Estas seguro?',
    icon: 'question',
    html:`Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad,0)} productos`,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText:'Si',
    cancelButtonText:'No',
    cancelButtonAriaLabel: 'Thumbs down'
  }).then((result) => {
    if (result.isConfirmed) {
      productosEnCarrito.length = 0;
      localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
      cargarProductosCarrito();
    } 
  })
 
}

function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc,producto) => acc + (producto.precio * producto.cantidad),0);
    total.innerText =  `$${totalCalculado}`;

}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito(){

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}
