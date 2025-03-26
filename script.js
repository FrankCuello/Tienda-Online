// script.js

document.addEventListener('DOMContentLoaded', () => {
    const productosContainer = document.getElementById('productos-container');
    const carritoCountBadge = document.querySelector('.carrito-count');
    const carritoModalBody = document.getElementById('lista-carrito-productos');
    const carritoTotalElement = document.getElementById('carrito-total');
    const btnPagar = document.getElementById('btn-pagar');
    const btnFinalizarCompra = document.getElementById('btn-finalizar-compra');
    const cantidadModal = document.getElementById('cantidadModal');
    const btnAgregarCarritoModal = document.getElementById('btn-agregar-carrito');
    const productoCantidadInput = document.getElementById('producto-cantidad');
    const productoIdModalInput = document.getElementById('producto-id-modal');
    const busquedaProductoInput = document.getElementById('busqueda-producto');
    const carritoVacioMensaje = document.getElementById('carrito-vacio-mensaje');


    let carrito = []; // Array para almacenar los productos en el carrito
    let productosData = []; // Para almacenar todos los productos fetched desde la API

    // Función para cargar productos desde FakeStore API
    const cargarProductos = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            productosData = await response.json();
            mostrarProductos(productosData); // Mostrar todos los productos inicialmente
        } catch (error) {
            console.error('Error al cargar productos:', error);
            productosContainer.innerHTML = '<p class="text-danger">Error al cargar los productos. Por favor, intenta nuevamente más tarde.</p>';
        }
    };

    // Función para mostrar productos en el contenedor
    const mostrarProductos = (productos) => {
        productosContainer.innerHTML = ''; // Limpiar el contenedor antes de mostrar nuevos productos
        if (productos.length === 0) {
            productosContainer.innerHTML = '<p>No se encontraron productos que coincidan con tu búsqueda.</p>';
            return;
        }
        productos.forEach(producto => {
            const cardHtml = `
                <div class="col-md-4 mb-4 producto-card" data-category="${producto.category}" data-title="${producto.title.toLowerCase()}">
                    <div class="card h-100">
                        <img src="${producto.image}" class="card-img-top" alt="${producto.title}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${producto.title}</h5>
                            <p class="card-text">$${producto.price.toFixed(2)}</p>
                            <button class="btn btn-agregar-carrito mt-auto" data-product-id="${producto.id}">Añadir al carrito</button>
                        </div>
                    </div>
                </div>
            `;
            productosContainer.innerHTML += cardHtml;
        });
        agregarEventListenersBotonesCarrito(); // Asegurar que los event listeners se agreguen después de crear los botones
    };

    // Función para agregar event listeners a los botones "Añadir al carrito"
    const agregarEventListenersBotonesCarrito = () => {
        const botonesAgregarCarrito = document.querySelectorAll('.btn-agregar-carrito');
        botonesAgregarCarrito.forEach(boton => {
            boton.addEventListener('click', (event) => {
                const productoId = parseInt(event.target.dataset.productId);
                productoIdModalInput.value = productoId; // Guarda el ID en el modal
                $(cantidadModal).modal('show'); // Mostrar modal de cantidad
            });
        });
    };

    // Event listener para el botón "Añadir al carrito" en el modal de cantidad
    btnAgregarCarritoModal.addEventListener('click', () => {
        const productoId = parseInt(productoIdModalInput.value);
        const cantidad = parseInt(productoCantidadInput.value);
        agregarAlCarrito(productoId, cantidad);
        $(cantidadModal).modal('hide'); // Ocultar modal después de añadir al carrito
    });


    // Función para agregar producto al carrito
    const agregarAlCarrito = (productoId, cantidad) => {
        const productoSeleccionado = productosData.find(producto => producto.id === productoId);
        if (productoSeleccionado) {
            const itemCarrito = carrito.find(item => item.producto.id === productoId);
            if (itemCarrito) {
                itemCarrito.cantidad += cantidad; // Si ya existe, aumentar la cantidad
            } else {
                carrito.push({ producto: productoSeleccionado, cantidad: cantidad }); // Si no, añadir nuevo item
            }
            actualizarCarritoVisual();
            actualizarContadorCarrito();
            mostrarMensajeTemporal('Producto añadido al carrito!');
        }
    };

    // Función para actualizar la visualización del carrito en el modal
    const actualizarCarritoVisual = () => {
        carritoModalBody.innerHTML = ''; // Limpiar el contenido actual del modal
        let totalCarrito = 0;

        if (carrito.length === 0) {
            carritoVacioMensaje.classList.remove('d-none'); // Mostrar mensaje de carrito vacío
            carritoModalBody.classList.add('d-none'); // Ocultar la lista si está vacía
            carritoTotalElement.textContent = 'Total: $0.00';
            btnPagar.disabled = true; // Deshabilitar botón pagar si el carrito está vacío
        } else {
            carritoVacioMensaje.classList.add('d-none'); // Ocultar mensaje de carrito vacío
            carritoModalBody.classList.remove('d-none'); // Mostrar la lista
            btnPagar.disabled = false; // Habilitar botón pagar

            carrito.forEach(item => {
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
                listItem.innerHTML = `
                    <div>
                        ${item.producto.title}
                        <span class="badge badge-primary badge-pill ml-2">x${item.cantidad}</span>
                    </div>
                    <span>$${(item.producto.price * item.cantidad).toFixed(2)}</span>
                `;
                carritoModalBody.appendChild(listItem);
                totalCarrito += item.producto.price * item.cantidad;
            });
            carritoTotalElement.textContent = `Total: $${totalCarrito.toFixed(2)}`;
        }
    };


    // Función para actualizar el contador del carrito en el header
    const actualizarContadorCarrito = () => {
        const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
        carritoCountBadge.textContent = totalItems;
        carritoCountBadge.style.display = totalItems > 0 ? 'inline-block' : 'none'; // Mostrar solo si hay items
    };

    // Función para mostrar mensajes temporales (feedback al usuario)
    const mostrarMensajeTemporal = (mensaje) => {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.classList.add('alert', 'alert-success', 'position-fixed', 'top-0', 'end-0', 'm-3', 'fade', 'show');
        mensajeDiv.setAttribute('role', 'alert');
        mensajeDiv.textContent = mensaje;
        document.body.appendChild(mensajeDiv);

        setTimeout(() => {
            mensajeDiv.classList.remove('show');
            mensajeDiv.classList.add('fade');
            setTimeout(() => {
                mensajeDiv.remove();
            }, 500); // Esperar a que termine la transición fadeOut
        }, 3000); // Mostrar mensaje por 3 segundos
    };


    // Búsqueda dinámica de productos
    busquedaProductoInput.addEventListener('input', (e) => {
        const textoBusqueda = e.target.value.toLowerCase().trim();
        const productosFiltrados = productosData.filter(producto => {
            return producto.title.toLowerCase().includes(textoBusqueda) || producto.category.toLowerCase().includes(textoBusqueda);
        });
        mostrarProductos(productosFiltrados);
    });


    // ---  PASARELA DE PAGO SIMULADA Y GENERACIÓN DE FACTURA PDF ---
    btnFinalizarCompra.addEventListener('click', () => {
        const nombre = document.getElementById('nombre').value;
        const tarjeta = document.getElementById('tarjeta').value;
        const fechaExpiracion = document.getElementById('fecha-expiracion').value;
        const cvv = document.getElementById('cvv').value;

        if (!nombre || !tarjeta || !fechaExpiracion || !cvv) {
            alert('Por favor, complete todos los campos de pago.');
            return;
        }

        if (carrito.length > 0) {
            generarFacturaPDF(carrito, carritoTotalElement.textContent, nombre, tarjeta);
            carrito = []; // Vaciar el carrito después de la compra
            actualizarCarritoVisual();
            actualizarContadorCarrito();
            $(cantidadModal).modal('hide');
            $(carritoModal).modal('hide');
            $(pagoModal).modal('hide');
            mostrarMensajeTemporal('Pago realizado con éxito y factura generada!');
        } else {
            alert('El carrito está vacío. Añade productos para realizar la compra.');
        }
    });


    // Función para generar la factura en PDF con jsPDF
    const generarFacturaPDF = (productosCarrito, totalCarritoTexto, nombreCliente, tarjetaCliente) => {
        const { jsPDF } = window.jspdf; // Asegúrate de usar la versión UMD de jsPDF
        const pdf = new jsPDF();

        pdf.setFontSize(22);
        pdf.text('Factura de Compra', 20, 20);

        pdf.setFontSize(12);
        pdf.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 30);
        pdf.text(`Cliente: ${nombreCliente}`, 20, 40);
        pdf.text(`Tarjeta: **** **** **** ${tarjetaCliente.slice(-4)}`, 20, 50); // Mostrar solo los últimos 4 dígitos

        let yPos = 70;
        pdf.setFontSize(14);
        pdf.text('Productos:', 20, yPos);
        yPos += 10;
        pdf.setFontSize(12);

        productosCarrito.forEach(item => {
            pdf.text(`${item.producto.title} (x${item.cantidad}) - $${(item.producto.price * item.cantidad).toFixed(2)}`, 20, yPos);
            yPos += 10;
        });

        pdf.setFontSize(14);
        pdf.text(totalCarritoTexto, 20, yPos + 10); // Total de la compra

        // Guardar o descargar el PDF
        pdf.save(`factura-compra-${new Date().toLocaleDateString()}.pdf`);
    };


    // Cargar productos al iniciar la página
    cargarProductos();
    actualizarContadorCarrito(); // Inicializar el contador del carrito al cargar la página
    actualizarCarritoVisual(); // Inicializar la visualización del carrito

});