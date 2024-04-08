
# Balcentric logistics

Este proyecto tiene como objetivo demostrar la implementación de un sistema de gestión de pedidos básico.

## Características

- Permite la creación/actualización/borrado de artículos y pedidos.
- Cálculo de los totales con y sin impuestos de los pedidos.
- Soporte multilenguaje (Español e inglés)
- Soporte para su ejecución en Docker

## Tecnologías utilizadas
- Next.js para la base del proyecto (https://nextjs.org/)
- Para aplicar estilos se ha utilizado Tailwind CSS (https://tailwindcss.com/)
- Para los test unitarios y end-to-end se ha utilizado jest (https://jestjs.io/), testing-library (https://testing-library.com/) y cypress (https://www.cypress.io/)


## Prerequisitos
- Docker: https://docs.docker.com/engine/install/

## Empezar

Para ejecutar el proyecto en un entorno local sigue estos pasos:

- Clona el repositorio en tu máquina local:

    ```bash
    git clone https://github.com/juangaspar/balcentric-logistics.git
    ```

- Navega hasta el directorio del proyecto:

    ```bash
    cd balcentric-logistics
    ```

- Para crear la imagen de docker ejecuta:

    ```bash
    docker build -t baltricen-logistics-app .
    ```

- Una vez creada la imagen ponla en marcha ejecutando:

    ```bash
    docker run -d -p 3000:3000 -p 3001:3001 baltricen-logistics-app:latest
    ```

- Accede en tu navegador a la url http://localhost:3001 y podrás comenzar a utilizar la aplicación

## Posibles mejoras en el proyecto

Hay muchas cosas mejorables dentro del proyecto que no se han realizado por una cuestión de tiempo. A continuación listo algunas de ellas:

- Mejoras en la organización del código. Hay varios componentes como OrderView que podrían separarse en varios componentes y también sacar código como el reducer fuera del mismo.
- Abstracción de la capa de API. Ahora mismo la API está totalmente acoplada a los componentes. Se deberían extraer esas llamadas a otro módulo que gestionara las llamadas, esto podría hacerse con un patrón tipo repositorio por ejemplo.
- Añadir gestión de errores en las llamadas a la API.
- Mejorar la optimización. Hay varios puntos donde podría utilizar useMemo o useCallback para evitar renderizados innecesarios.
- Obviamente los tests implementados tienen como objetivo ejercer de muestra, deberían implementarse test unitarios y end-to-end que dieran valor.
-

