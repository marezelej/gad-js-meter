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

## Importar código a la base de datos
Ejecutar el comando `node ace code:import` para escanear la carpeta `code-examples` y cargar la base de datos
con las funciones contenidas en los archivos de código fuente.
Utilizar la opción `-i` para indexar de manera automática los nuevos resultados.

## Indexación del código en la base de datos
Ejecutar el comando `node ace code:index` para generar los pivotes (en caso de no existir) y el índice respecto al código en la base de datos.
Utilizar la opción `-r` para reiniciar el índice, regenerando la tabla de pivotes y nodos.

## Consultas por rango
Acceder al frontend de la aplicación desde el navegador, la página toma como input una función
en Javascript y un radio de consulta. La consulta devuelve las 10 funciones de la base de datos más cercanas
a la consulta.

# Función de distancia
La función de distancia utilizada es la distancia euclidiana entre vectores de parámetros obtenidos al analizar el código.
A continuación se describen los parámetros utilizados (definidos en la clase `CodeVector`):
- **loopCount**: Cantidad de bucles (while, for, doWhile, forIn y llamadas recursivas).
- **paramsCount**: Cantidad de parámetros en la función.
- **maxTreeDeep**: Profundidad máxima del árbol sintáctico.
- **ifCount**: Cantidad de sentencias condicionales (if, else y consideración de operadores lógicos).

# Repositorio de código
El repositorio de código comprendido en `code-examples` se generó a partir de código
disponible de manera pública en internet. Algunas de las fuentes son:
- https://github.com/trekhleb/javascript-algorithms
- https://github.com/TheAlgorithms/Javascript