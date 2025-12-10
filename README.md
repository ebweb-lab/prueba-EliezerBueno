# Sistema de Gestión de Tarjetas de Crédito

Este proyecto implementa un sistema completo para la gestión de tarjetas de crédito, desarrollado como parte de una prueba técnica. Incluye un frontend interactivo con validaciones en tiempo real y un backend RESTful con persistencia en Firebase.

## Descripción del Proyecto

El sistema permite a los usuarios agregar, visualizar y gestionar tarjetas de crédito a través de una interfaz moderna y responsiva. Las tarjetas se almacenan de forma persistente en Firebase Firestore y se muestran con animaciones fluidas.

### Características Principales

- **Vista previa en tiempo real**: La tarjeta se actualiza mientras el usuario escribe
- **Validación completa**: Todos los campos tienen validación específica
- **Diseño moderno**: Interfaz inspirada en monobank con animaciones suaves
- **Persistencia de datos**: Las tarjetas se guardan en Firebase Firestore
- **API RESTful**: Backend completo con TypeScript y Express

## Estructura del Proyecto

```
prueba-EliezerBueno/
  frontend/          # Frontend (React + TypeScript)
    src/
      components/               # Componentes de la UI
      services/                 # Servicios de API
      types.ts                  # Definiciones de tipos
    package.json

  backend/                      # Backend (Node.js + TypeScript)
    src/
      config/                   # Configuración de Firebase
      controllers/              # Lógica de negocio
      routes/                   # Rutas de la API
      types/                    # Tipos TypeScript
    package.json
```

## Instrucciones de Instalación y Ejecución

### Requisitos Previos

- Node.js 18 o superior
- npm o yarn
- Cuenta de Firebase (para el backend)

### 1. Configurar el Frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

### 2. Configurar el Backend

#### Paso 1: Instalar dependencias

```bash
cd backend
npm install
```

#### Paso 2: Configurar Firebase

1. Crear un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilitar Firestore Database
3. Ir a Project Settings > Service Accounts
4. Generar nueva clave privada (descargar JSON)
5. Copiar `.env.example` a `.env` y configurar las credenciales:

```env
PORT=3001
FIREBASE_PROJECT_ID=tu-project-id
FIREBASE_CLIENT_EMAIL=tu-email@proyecto.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

#### Paso 3: Ejecutar el backend

```bash
npm run dev
```

El backend estará disponible en `http://localhost:3001`

## Cómo Probar el Proyecto

### Pruebas del Frontend

1. Abrir `http://localhost:5173` en el navegador
2. Llenar el formulario con datos de prueba:
   - **Número de tarjeta**: 16 dígitos (ej: 4111111111111234)
   - **Fecha de vencimiento**: MM/YY (ej: 12/25)
   - **Nombre del titular**: Solo letras (ej: Juan Pérez)
   - **CVV**: 3-4 dígitos (ej: 123)
3. Observar la vista previa actualizándose en tiempo real
4. Hacer clic en "Agregar Tarjeta"
5. Verificar que la tarjeta aparece en el sidebar derecho con animación

### Pruebas del Backend (opcional)

Puedes probar los endpoints de la API usando Postman o curl:

**Obtener todas las tarjetas:**
```bash
curl http://localhost:3001/api/cards
```

**Crear una tarjeta:**
```bash
curl -X POST http://localhost:3001/api/cards \
  -H "Content-Type: application/json" \
  -d '{
    "cardNumber": "4111111111111234",
    "expirationDate": "12/25",
    "cardholderName": "Juan Pérez",
    "cvv": "123"
  }'
```

## Puntos Realizados

### Bloque 1: Frontend (100% completado)

**Formulario de tarjeta con validación**
- Validación de número de tarjeta (16 dígitos, solo números)
- Validación de fecha de vencimiento (formato MM/YY, mes 01-12, año válido)
- Validación de nombre del titular (solo letras con tildes, máx 20 caracteres)
- Validación de CVV (3-4 dígitos)
- Mensajes de error en tiempo real

**Lista de tarjetas guardadas**
- Enmascaramiento de números (ej: 4111********1234)
- Información completa de cada tarjeta

### Bloque 2: Backend (100% completado)

**API RESTful con todos los métodos CRUD**
- `GET /api/cards` - Obtener todas las tarjetas
- `GET /api/cards/:id` - Obtener tarjeta por ID
- `POST /api/cards` - Crear nueva tarjeta
- `PUT /api/cards/:id` - Actualizar tarjeta
- `DELETE /api/cards/:id` - Eliminar tarjeta

**Integración con Firebase Firestore**
- Configuración de Firebase Admin SDK
- Persistencia de datos en Firestore
- Manejo de errores de base de datos

**Validación de campos requeridos**
- Validación en el servidor de todos los campos
- Respuestas HTTP apropiadas (200, 201, 400, 404, 500
- Mensajes de error descriptivos

**Integración Frontend-Backend**
- Servicio de API en el frontend
- Carga automática de tarjetas al iniciar
- Guardado de tarjetas en Firestore
- Manejo de errores con mensajes visuales

## Tecnologías Utilizadas

### Frontend
- **React 19** con TypeScript
- **Vite** como bundler
- **CSS vanilla** para estilos
- Google Fonts (Space Grotesk, Inter)

### Backend
- **Node.js** con TypeScript
- **Express** para el servidor
- **Firebase Admin SDK** para Firestore
- **CORS** habilitado para desarrollo

## Observaciones

### Consideraciones de Seguridad

- Las reglas de Firestore están configuradas para desarrollo (acceso abierto)
- En producción se deben implementar reglas de seguridad apropiadas
- No se implementó autenticación ya que no era requerido para la prueba
- No se implementaron medidas de seguridad en el backend adicionales ya que no era requerido para la prueba

## Contacto

Para cualquier consulta sobre el proyecto, no dudes en contactarme.

---

**Nota*: Este proyecto fue desarrollado como parte de una prueba técnica y demuestra conocimientos en desarrollo full-stack con React, TypeScript, Node.js y Firebase.
