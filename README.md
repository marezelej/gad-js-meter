# GAD JavaScript Meter
Espacio métrico destinado a comparar funciones en JavaScript - Proyecto final de Gestión Avanzada de Datos (GAD)

# Instalación
El proyecto se basa en el framework [Adonis JS](https://docs.adonisjs.com/guides/introduction).
El código fuente se encuentra en la carpeta `backend`.
Para instalar las dependencias se debe ejecutar:
- `cd backend`
- `npm install`
- Configurar la DB en base al manual [DB de Adonis](https://docs.adonisjs.com/guides/database/introduction).
- Migrar la DB con el comando `node ace migration:run`.

# Ejecución
Para ejecutar el servidor de pruebas, desde la carpeta `backend`:
- `npm run dev`
- Accedemos a la dirección que indica la consola (por defecto [http://127.0.0.1:3333](http://127.0.0.1:3333)).

# Uso de la aplicación
A continuación se describen las funcionalidades de la app.

## Seed de la DB
Ejecutar el comando `node ace gad:seed` para escanear la carpeta `code-examples` y cargar la base de datos
con las funciones contenidas en los archivos de código fuente.

## Consultas por rango
Acceder al frontend de la aplicación desde el navegador, la página toma como input una función
en Javascript y un radio de consulta. La consulta devuelve las 10 funciones de la base de datos más cercanas
a la consulta.