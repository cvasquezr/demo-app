# Prompt para Generación de Código: CRUD con Autenticación y Roles

Pásale este documento a Claude para que genere exactamente la estructura de código que necesitas para tu Demo, preparada para el despliegue automático en Railway.

---

```markdown
Hola Claude. Necesito que generes el código base para un MVP/Demo funcional utilizando una arquitectura multi-contenedor limpia. El objetivo es tener un sistema con Login, Roles (Administrador, Usuario) y un CRUD sencillo.

La aplicación debe estar estructurada de tal forma que hoy funcione de manera ligera, pero que en una Versión 2 sea extremadamente fácil de acoplar con Redis y Celery (el diseño ya contempla estas tecnologías a futuro).

Por favor, genera la estructura de archivos y el código esencial para los siguientes componentes:

## 1. Tecnologías a Utilizar
* **Frontend:** Vite + Vue 3 (TypeScript o JavaScript) utilizando Tailwind CSS para una interfaz limpia y responsiva.
* **Backend:** FastAPI (Python 3.11+) estructurado modularmente.
* **Base de Datos:** PostgreSQL utilizando SQLAlchemy (o SQLModel) como ORM y Alembic para migraciones.
* **Proxy/Web Server:** Nginx para unificar el acceso en producción (sirviendo el frontend estático y redirigiendo `/api` al backend).

---

## 2. Requerimientos de Software

### A. Autenticación y Seguridad
* Sistema de Login basado en tokens JWT (OAuth2 con password bearer en FastAPI).
* Almacenamiento seguro de contraseñas utilizando `passlib` con `bcrypt`.

### B. Gestión de Roles
* **Roles definidos:** `admin` y `user`.
* **Control de Acceso (RBAC):** Crear un decorador o dependencia en FastAPI para restringir rutas (ej. solo el `admin` puede ver la lista completa de usuarios o eliminar registros).

### C. El CRUD (Ejemplo de Negocio)
* Un modelo simple (ejemplo: "Items" o "Proyectos").
* **Campos mínimos:** ID, título, descripción, propietario_id, fecha_creación.
* **Permisos:** El `user` solo puede ver y editar sus propios registros. El `admin` puede ver, editar y eliminar los registros de cualquier usuario.

---

## 3. Preparación Arquitectónica para V2 (Redis / Celery)
Para evitar reescribir el backend en el futuro cuando implementemos cargas masivas de archivos con Celery, necesito que dejes lista la configuración base en el backend:
1.  Crea un archivo `app/core/celery_app.py` o `app/worker.py` donde se inicialice una instancia de Celery apuntando a una URL de Broker que lea de las variables de entorno (`REDIS_URL`). Por ahora, déjala comentada o con un endpoint dummy.
2.  Escribe una tarea de ejemplo vacía (ej. `def proeces_excel_dummy(file_path): pass`) para saber exactamente dónde meteremos la lógica pesada después.

---

## 4. Estructura de Archivos Solicitada

Por favor, organízame el código bajo la siguiente estructura estándar para que Railway pueda leerlo mediante Docker:

```text
mi-proyecto/
├── backend/
│   ├── app/
│   │   ├── core/           # Configuración, seguridad (JWT), Celery base
│   │   ├── models/         # Modelos de SQLAlchemy (User, Item)
│   │   ├── schemas/        # Esquemas de Pydantic
│   │   ├── routers/        # Rutas (auth.py, items.py, users.py)
│   │   └── main.py         # Inicialización de FastAPI
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── vite.config.js
│   ├── Dockerfile
│   └── package.json
├── nginx/
│   └── nginx.conf
└── docker-compose.yml
```

---

## 5. Archivos de Orquestación Docker

Por favor, inclúyeme el código completo para estos tres archivos clave, optimizados para producción:

1.  **`backend/Dockerfile`**: Exponiendo el puerto 8000 con Uvicorn.
2.  **`nginx/nginx.conf`**: Configurado para que escuche en el puerto 80, sirva los archivos estáticos de la compilación de Vite (`frontend/dist`) en `/` y redirija las peticiones de `/api/` hacia el contenedor del backend (`http://backend:8000/`).
3.  **`docker-compose.yml`**: Que coordine los servicios de `postgres`, `backend` y `nginx`, enlazados en la misma red interna. Deja comentadas las secciones de `redis` y `celery_worker` con un tag `# Versión 2` para que yo solo tenga que descomentarlas en el futuro.

Genera el código modular, limpio y listo para copiar y pegar. ¡Muchas gracias!
```
