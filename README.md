# Tienda-Online
# 🛍️ Proyecto Frontend de Ecommerce: Tienda Online Simulada 💻

Este proyecto es un desarrollo frontend completo de una tienda online, diseñado para simular la experiencia de un ecommerce real utilizando HTML5, CSS3, JavaScript y Bootstrap.  🚀 Aunque no incluye un backend real, simula la interacción con datos de productos utilizando la API pública [FakeStore API](https://fakestoreapi.com/). 🛒 El objetivo principal es crear una interfaz de usuario atractiva, responsiva y funcional que demuestre las características esenciales de una tienda online, desde la navegación y la visualización de productos hasta la gestión del carrito y la simulación de pago con generación de factura. 📄

Link de la pagina: 

## ✨ Características Principales

*   **📱 Diseño Responsivo y Semántico:** La página está construida con HTML5 semántico y diseño responsivo, garantizando una excelente experiencia de usuario en dispositivos móviles, tablets y escritorios.
*   **🎨 Interfaz Atractiva y Moderna:** Se utiliza Bootstrap para un diseño limpio y moderno, complementado con CSS3 personalizado para animaciones y efectos visuales sutiles, como hover y transiciones en las tarjetas de productos.
*   **📌 Menú de Navegación Fijo:** El encabezado incluye un menú de navegación fijo con enlaces a "Inicio", "Categorías" y un icono de "Carrito" que muestra una notificación dinámica con el número de productos añadidos.
*   **🏠 Sección de Inicio:**  Una sección de bienvenida con un título llamativo y una breve descripción de la tienda.
*   **📚 Sección de Categorías y Productos:** Muestra productos organizados en tarjetas uniformes, cargados dinámicamente desde la FakeStore API. Cada tarjeta incluye:
    *   🖼️ Imagen del producto
    *   🏷️ Nombre del producto
    *   💰 Precio del producto
    *   🛒 Botón "Añadir al carrito"
*   **🔢 Modal de Cantidad:** Al hacer clic en "Añadir al carrito", se abre un modal para que el usuario seleccione la cantidad deseada del producto antes de agregarlo al carrito.
*   **🛒 Carrito de Compras Modal:** Un modal de carrito que se puede abrir desde el icono del menú, mostrando:
    *   📝 Lista de productos añadidos al carrito
    *   #️⃣ Cantidad de cada producto
    *   💲 Precio unitario y subtotal por producto
    *   💳 Total del carrito
    *   ✅ Botón "Pagar" para simular la compra.
*   **💳 Simulación de Pasarela de Pago:** Al hacer clic en "Pagar" desde el carrito, se muestra un modal con un formulario genérico para simular una pasarela de pago. El usuario puede introducir datos de pago ficticios (nombre, tarjeta, fecha de expiración, CVV).
*   **🧾 Generación de Factura en PDF:** Al finalizar la compra simulada (haciendo clic en "Pagar" en el formulario de pago), se genera y descarga automáticamente una factura en formato PDF utilizando la librería `jsPDF`. La factura incluye el listado de productos comprados, cantidades, precios y el total de la compra.
*   **🔍 Búsqueda Dinámica de Productos:**  Un campo de búsqueda permite filtrar productos en tiempo real por nombre o categoría mientras el usuario escribe.
*   **🔄 Interacción Dinámica con JavaScript:**
    *   📤 Carga de productos desde la FakeStore API y visualización dinámica en la sección de categorías.
    *   🛍️ Implementación completa de la funcionalidad del carrito (añadir productos con cantidades personalizadas, actualizar el carrito, calcular el total).
    *   🔔 Actualización en tiempo real de la notificación del carrito en el menú.
    *   🔎 Filtrado de productos en tiempo real mediante la búsqueda dinámica.
    *   📄 Generación de la factura PDF.
*   **💬 Mensajes Temporales (Feedback al Usuario):** Se implementan mensajes temporales y discretos para informar al usuario sobre acciones importantes, como añadir un producto al carrito o confirmar el pago. 👍

## 🛠️ Tecnologías Utilizadas

*   **🌐 HTML5:** Estructura y contenido semántico de la página web.
*   **🎨 CSS3:** Estilos visuales, diseño responsivo, animaciones y transiciones.
*   **🔷 Bootstrap 4:** Framework CSS para diseño responsivo, componentes de interfaz de usuario y sistema de rejilla.
*   **📜 JavaScript:**  Lógica interactiva, manipulación del DOM, gestión del carrito, carga de datos desde la API, búsqueda dinámica y generación de PDF.
*   **🖨️ jsPDF:** Librería JavaScript para generar documentos PDF en el navegador (para la factura simulada).
*   **🖼️ Bootstrap Icons:** Biblioteca de iconos vectoriales para mejorar la interfaz de usuario.
*   **📦 FakeStore API:** API pública utilizada para simular la obtención de datos de productos para la tienda.

## 📂 Estructura del Proyecto

El proyecto se organiza en los siguientes archivos principales:

*   **📄 `index.html`:** Archivo HTML principal que define la estructura de la página, incluyendo el encabezado, menú, secciones, modales y la integración de Bootstrap y las hojas de estilo.
*   **🎨 `css/styles.css`:** Hoja de estilos CSS personalizada para aplicar estilos adicionales y modificar el diseño de Bootstrap, incluyendo animaciones y la apariencia general de la tienda.
*   **📜 `js/script.js`:** Archivo JavaScript que contiene toda la lógica interactiva de la página, incluyendo la carga de productos desde la API, la gestión del carrito, la búsqueda dinámica, la generación de la factura PDF y la interacción con los modales.

## ⚙️ Funcionalidades Detalladas

1.  **📤 Carga de Productos desde FakeStore API:**
    *   Al cargar la página, JavaScript realiza una petición GET a la FakeStore API para obtener un listado de productos.
    *   Los datos de los productos recibidos (imagen, título, precio, descripción, categoría) se utilizan para generar dinámicamente las tarjetas de producto en la sección de "Categorías".

2.  **🛍️ Gestión del Carrito de Compras:**
    *   **➕ Añadir al Carrito:** Al hacer clic en el botón "Añadir al carrito" de una tarjeta de producto, se abre el modal de cantidad. Tras seleccionar la cantidad y confirmar, el producto y la cantidad se almacenan en un array local (`carrito`) en JavaScript.
    *   **🔄 Actualización del Carrito:** El icono del carrito en el menú se actualiza dinámicamente mostrando el número total de productos en el carrito.
    *   **🛒 Modal del Carrito:** Al abrir el modal del carrito, se muestra una lista detallada de los productos en el carrito, con cantidades y subtotales. Se calcula y muestra el total del carrito.
    *   **🗑️ Vaciar Carrito:** Después de simular el pago y generar la factura, el carrito se vacía.

3.  **🔎 Búsqueda Dinámica:**
    *   El campo de búsqueda en la sección de "Búsqueda" permite al usuario escribir para filtrar los productos.
    *   JavaScript intercepta la entrada del usuario en el campo de búsqueda y filtra dinámicamente los productos mostrados en la sección de "Categorías" que coinciden con el texto de búsqueda (ya sea en el título o la categoría del producto).

4.  **💳 Simulación de Pasarela de Pago y 🧾 Generación de Factura PDF:**
    *   Al hacer clic en "Pagar" desde el modal del carrito, se abre el modal de "Pasarela de Pago Simulada".
    *   El usuario introduce datos de pago ficticios en el formulario.
    *   Al hacer clic en "Pagar y Generar Factura", JavaScript:
        *   ✅ Valida que se hayan introducido datos en el formulario de pago.
        *   🖨️ Utiliza la librería `jsPDF` para generar un documento PDF que contiene:
            *   📃 Título "Factura de Compra"
            *   📅 Fecha de la compra
            *   👤 Nombre del cliente (introducido en el formulario)
            *   💳 Número de tarjeta simulado (últimos 4 dígitos)
            *   📦 Listado de productos comprados con cantidades y precios
            *   💰 Total de la compra
        *   ⬇️ Descarga automáticamente el archivo PDF de la factura.

## 🎨 Diseño y Experiencia de Usuario (UI/UX)

*   **✨ Diseño Minimalista y Moderno:** Se prioriza un diseño limpio y sencillo, centrado en la usabilidad y la presentación clara de los productos.
*   **🎴 Tarjetas de Producto Uniformes:** Las tarjetas de producto mantienen un tamaño y proporción uniformes para una presentación visualmente consistente.
*   **💫 Animaciones y Transiciones Suaves:** Se utilizan animaciones hover en las tarjetas de productos y transiciones suaves para mejorar la interacción y la respuesta visual de la página.
*   **🖼️ Iconografía:** Se utilizan iconos de Bootstrap Icons para el carrito y otros elementos de la interfaz, mejorando la claridad y la estética visual.
*   **🗣️ Feedback Visual:** Los mensajes temporales informan al usuario sobre las acciones realizadas, mejorando la experiencia de usuario.

## ⚠️ Backend Simulado

Es importante destacar que este proyecto **no tiene un backend real**. 🚫 La interacción con datos de productos se simula utilizando la FakeStore API, que proporciona datos estáticos de productos para fines de prueba y desarrollo. En un ecommerce real, se requeriría un backend para gestionar la base de datos de productos, usuarios, pedidos, pagos, seguridad, etc. 🔐

## 🎉 Conclusión

Este proyecto de frontend de tienda online es una demostración funcional y visualmente atractiva de cómo se puede construir la interfaz de un ecommerce moderno utilizando tecnologías web estándar.  🌟 Sirve como una excelente base para entender los conceptos fundamentales del desarrollo frontend web y las funcionalidades esenciales de una tienda online, aunque con la limitación de simular la interacción con datos y sin un backend real. 👍
