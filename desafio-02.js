const fs = require('fs');

// CLASE
class productManager {
	constructor() {
		this.path = './listadoDeProductos.json';
		
		this.products = [];
	}
	static id = 0;
	// METODO 1: Agrega un nuevo producto al array '#products' + un numero ID incrementable.
	addProduct = async (title, description, price, thumbnail, code, stock) => {
		// El bucle for, me permite saber si el atributo code de cada producto es repetido.
		for (let i = 0; i < this.products.length; i++) {
			if (this.products[i].code === code) {
				console.log(`Error, code ${code} esta repetido.`);
				break;
			}

			await fs.promises.writeFile(this.path, JSON.stringify(this.products))
		}

		const newProduct = {title, description, price, thumbnail, code, stock};

		// Comprueba que todos los campos sean obligatorios.
		if (!Object.values(newProduct).includes(undefined)) {
			productManager.id++; // Con cada producto nuevo, aumenta el ID en uno, de esta forma no se repiten.
			this.products.push({
        ...newProduct,
				id: productManager.id,
			});
		} else {
			console.log("Todos los campos son obligatorios.");
		}
	}

	// METODO 2: Devuelve el array completo del atributo '#products'.
	getProducts() {
		return this.products;
	}

	// METODO 3: Busca productos dentro del array #products segun el numero ID.
	getProductById(id) {
		if (!this.products.find((i) => i.id === id)) {
			console.log("Not found.");
		} else {
			console.log(this.products.find((i) => i.id === id));
		}
	}
}

// Se agregan productos.
const producto = new productManager();
producto.addProduct("error1", "descripcion", 20000, "img"); // Producto erroneo por falta de campos.
producto.addProduct("error2", "descripcion", 20000, "img"); // Producto erroneo por falta de campos.
producto.addProduct("Monitor", "descripcion 1", 10000, "img 1", "AA01", 10); // Producto 1
producto.addProduct("Teclado", "descripcion 2", 5000, "img 2", "AA02", 8); // Producto 2
producto.addProduct("Mouse", "descripcion 3", 2500, "img 3", "AA03", 2); // Producto 3

console.log(producto.getProducts());

producto.getProductById(5); // Devuelve si existe o no el producto con el ID buscado.
producto.getProductById(2);
producto.getProductById(8);
producto.getProductById(1);