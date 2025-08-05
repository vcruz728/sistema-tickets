# 🎟️ Sistema de Tickets

Sistema web para gestión de tickets de soporte técnico desarrollado con Laravel 12, Inertia.js, React, TypeScript y base de datos SQL Server.

---

## 🛠 Tecnologías utilizadas

- [Laravel 12](https://laravel.com/)
- [React + TypeScript](https://react.dev/)
- [Inertia.js](https://inertiajs.com/)
- [Vite](https://vitejs.dev/)
- [SQL Server](https://www.microsoft.com/sql-server)
- [Tailwind CSS](https://tailwindcss.com/) (opcional, si lo usas)
- Autenticación y Middleware de roles

---

## ⚙️ Requisitos

- PHP >= 8.2
- Composer
- Node.js >= 18.x
- NPM o Yarn
- SQL Server
- Extensión `sqlsrv` instalada en PHP

---

## 🚀 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/vcruz728/sistema-tickets.git
cd sistema-tickets

2. Instala dependencias
composer install
npm install

3. Copia el archivo de entorno y configura:
cp .env.example .env
Edita el .env y coloca tu configuración de base de datos:

DB_CONNECTION=sqlsrv
DB_HOST=127.0.0.1
DB_PORT=1433
DB_DATABASE=tickets_db
DB_USERNAME=usuario
DB_PASSWORD=contraseña

4 .Genera la key de la app:
php artisan key:generate

5. Corre las migraciones y seeders:
php artisan migrate:fresh --seed

6. Compila los assets:
npm run dev

7. Inicia el servidor:

php artisan serve