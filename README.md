# 🧩 Product Frontend – Angular 19 + Material UI

This is a modern **Angular 19** frontend for managing a list of products through a REST API. It uses **Angular Material** for UI components and consumes an ASP.NET Core Web API for data operations.

## ✨ Features

* View product list in a responsive Material table
* Add new product (create dialog)
* Edit existing product (edit dialog)
* Delete product with confirmation
* Spinner for loading state
* Styled with Angular Material Design

## 🚀 Tech Stack

* Angular 19 (standalone components)
* Angular Material UI
* TypeScript
* RxJS (Observables)
* SCSS

## 🔗 API Endpoint

Configured to connect to:

```
http://localhost:5293/api/Products
```

Make sure the backend is running before launching the frontend.

## 📁 Folder Structure (simplified)

```
src/app/
├── app.component.ts          # Main logic
├── app.component.html        # Table and UI
├── app.component.scss        # Styling
├── product.service.ts        # API communication
└── product-dialog.component.ts|html|scss # Dialog for create/edit
```

## 📦 Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/your-username/angular-product-app.git
cd angular-product-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the app**

```bash
ng serve -o
```

The app will open in your browser at:

```
http://localhost:4200
```

## ⚙️ Configuration

Ensure the base API URL in `product.service.ts` matches your backend address:

```ts
const baseUrl = 'http://localhost:5293/api/';
```

## 🔐 CORS Note

The backend must allow requests from the Angular dev server:

```csharp
.WithOrigins("http://localhost:4200")
```

## 📜 License

MIT
