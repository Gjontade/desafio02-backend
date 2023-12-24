const fs = require("fs");
const {default: test} = require("node:test");

// CLASE
class productManager {
	constructor(ruta) {
		this.path = ruta;

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
		}

		const newProduct = {title, description, price, thumbnail, code, stock};

		// Comprueba que todos los campos sean obligatorios.
		if (!Object.values(newProduct).includes(undefined)) {
			productManager.id++; // Con cada producto nuevo, aumenta el ID en uno, de esta forma no se repiten.
			this.products.push({
				...newProduct,
				id: productManager.id,
			});
			await fs.promises.writeFile(this.path, JSON.stringify(this.products));
		} else {
			console.log("Todos los campos son obligatorios.");
		}
	};

	// METODO 2: Devuelve el array completo del atributo '#products'.
	// async getProducts() {
	// 	let jaja = await fs.promises.readFile(this.path, 'utf-8')
	// 	// JSON.parse(jaja)
	// 	console.log(JSON.parse(jaja))
	// }
	getProducts = async () => {
		try {
			let colectionJSON = await fs.promises.readFile(this.path, "utf-8");
			return JSON.parse(colectionJSON);
		} catch (error) {
			await fs.promises.writeFile(this.path, "[]");
			let colectionJSON = await fs.promises.readFile(this.path, "utf-8");
			return JSON.parse(colectionJSON);
		}
	};

	// METODO 3: Busca productos dentro del array #products segun el numero ID.
	getProductById = async (id) => {
		let idProducto = await this.getProducts();
		if (!idProducto.find((i) => i.id === id)) {
			console.log("Not found.");
		} else {
			console.log(idProducto.find((i) => i.id === id));
		}
	};

	deleteProduct = async (id) => {
		let idProducto = await this.getProducts();
		let lista = idProducto.filter((i) => i.id !== id);

		await fs.promises.writeFile(this.path, JSON.stringify(lista));
	};

	updateProduct = async (id, campo, valor) => {
		let colecciones = await this.getProducts();
		let productoIndex = colecciones.findIndex((i) => i.id === id);

		if (productoIndex !== -1) {
			colecciones[productoIndex][campo] = valor;
			await fs.promises.writeFile(this.path, JSON.stringify(colecciones));
		} else {
			console.log(`Not found id: ${id}`);
		}
	};

	test = async () => {
		// Primera llamada = arreglo vacio.
		console.log(await producto.getProducts());

		await producto.addProduct("error01", "descripcion", 20000, "img"); // Producto erroneo por falta de campos.
		await producto.addProduct("error02", "descripcion", 20000, "img"); // Producto erroneo por falta de campos.

		await producto.addProduct(
			"Monitor",
			"descripcion 1",
			10000,
			"img 1",
			"AA01",
			10
		); // Producto 1
		await producto.addProduct(
			"Teclado",
			"descripcion 2",
			5000,
			"img 2",
			"AA02",
			8
		); // Producto 2
		await producto.addProduct(
			"Mouse",
			"descripcion 3",
			2500,
			"img 3",
			"AA03",
			2
		); // Producto 3
		await producto.addProduct(
			"Auriculares",
			"descripcion 4",
			1500,
			"img 4",
			"AA04",
			7
		); // Producto 4
		await producto.addProduct(
			"Gabinete",
			"descripcion 5",
			8000,
			"img 5",
			"AA05",
			4
		); // Producto 5

		await producto.addProduct("Pad", "descripcion 6", 500, "img 6", "AA05", 15); // Validacion de codigo repetido.

		await producto.deleteProduct(2); // Producto borrado.
		await producto.deleteProduct(5); // Producto borrado.

		await producto.updateProduct(4, "title", "Auriculares Inalambricos"); // Producto modificado.

		// Segunda llamada = arreglo de productos.
		console.log(await producto.getProducts());

		await producto.getProductById(9); // Devuelve si existe o no el producto con el ID buscado.
		await producto.getProductById(1);
		await producto.getProductById(8);
		await producto.getProductById(3);
	};
}

// Se agregan productos.
const producto = new productManager("./listadoDeProductos.json");

producto.test();