const fs = require('fs/promises');
const URL = 'https://thronesapi.com/api/v2/Characters';
const URLid = 'https://thronesapi.com/api/v2/Characters/{id}';

// PERSONAJES
const personaje1 = 
    {
    "firstName": "aaa",
    "lastName": "aaa",
    "fullName": "aaa aaa",
    "title": "aaa",
    "family": "aaa",
    };

const personaje2 = 
    {
    "firstName": "bbb",
    "lastName": "bbb",
    "fullName": "bbb bbb",
    "title": "bbb",
    "family": "bbb",
    };

const personaje3 = 
    {
    "firstName": "ccc",
    "lastName": "ccc",
    "fullName": "ccc ccc",
    "title": "ccc",
    "family": "ccc",
    };

// FUNCIONES:
async function obtenerPersonajes() {
    try {
        const info = await fetch(URL);

        if(!info.ok) throw new Error(`Error en la API: ${info.status}`);

        const datos = await info.json();
        console.log('Datos obtenidos correctamente.');
        const datosPersistidos = JSON.stringify(datos, null, 2);
        await fs.writeFile('personajesGOT.json', datosPersistidos);
        
    } catch (error) {
        console.log(error.message);
    }
}

async function agregarPersonaje() {
    try {
        const personaje = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(personaje1)
        });

        if(!personaje.ok) throw new Error ("No se pudo crear el personaje");

        console.log(`El personaje fue creado correctamente: ${personaje.status}`);
        // const resultado = await personaje.json();
        // console.log("Personaje creado correctamente: ", resultado);
    } catch (error) {
        console.log(error.message);
    }
    
}

async function buscarPersonaje(id) {
    try {
        const info = await fetch(`${URLid}/${id}`)
        if(!info.ok) throw new Error (`Error en la API: ${info.status}`);
        console.log(`El id solicitado fue hallado correctamente: ${info.status}`);
    } catch (error) {
        console.log(error.message);
    }
    
}

async function cargarDatos() {
    try {
        const contenido = await fs.readFile('personajesGOT.json', 'utf-8');
        return JSON.parse(contenido);
    } catch (error) {
        console.log(error.message);
    }
    
}

async function agregar () {
    try {
        const lista = await cargarDatos();
        lista.push(personaje1);
        console.log('Personaje agregado correctamente.');
        await fs.writeFile('personajesGOT.json', JSON.stringify(lista, null, 2));
    } catch (error) {
        console.log(error.message);
    }
    
}

async function agregar2 () {
    try {
        const lista = await cargarDatos();
        lista.unshift (personaje2, personaje3);
        console.log('Personajes agregados correctamente.');
        await fs.writeFile('personajesGOT.json', JSON.stringify(lista, null, 2));
    } catch (error) {
        console.log(error.message);
    }
    
}

async function eliminarIndex1() {
    try {
        const lista = await cargarDatos();
        console.log('El siguiente elemento fue eliminado correctamente:');
        console.log(lista.shift());
        
        await fs.writeFile('personajesGOT.json', JSON.stringify(lista, null, 2));
    } catch (error) {
        console.log(error.message);
    }
}

async function simplificarDatos() {
    try {
        const lista = await cargarDatos();
        const nuevoArray = lista.map (p => ({
            id: p.id,
            nombre: p.fullName
        }));
        nuevoArray.sort((a,b)=>{
            return a.nombre.localeCompare(b.nombre);
        });
        console.log(nuevoArray);
    } catch (error) {
        console.log(error.message);
    }
    
}


// FUNCIONA PRINCIPAL
async function main() {
    console.log("Generando archivo .json...");
    await obtenerPersonajes();
    console.log('\n');

    console.log("Agregando personaje a la API...");
    await agregarPersonaje();
    console.log('\n');

    console.log('Buscando personaje con ID: 2...');
    await buscarPersonaje(2);
    console.log('\n');

    console.log("Agregando personaje al final...");
    await agregar();
    console.log('\n');

    console.log("Agregando personajes al inicio...");
    await agregar2();
    console.log('\n');

    console.log("Eliminando primer elemento...");
    await eliminarIndex1();
    console.log('\n');

    console.log("Simplificando informacion...");
    await simplificarDatos();
    console.log('\n');

}

main();





