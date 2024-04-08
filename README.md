
# Balcentric logistics


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
    git clone https://github.com/your-username/balcentric-logistics.git
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

