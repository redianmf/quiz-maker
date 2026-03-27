# Quiz Maker App

Frontend for the Quiz Maker App

## Quick start

```bash
# 1) Install deps
npm i

# 2) Copy env and customize if needed
cp .env.example .env

# 3) Start the server (make sure Backend service is running)
npm run dev

* if there is a trouble from installation, kindly switch to node version 24.14.1
```

The app will run at http://localhost:5173

## Architecture

- This project uses modified clean architecture invented by Robert C. Martin. It creates boundaries of layers such as domain layer (interfaces), application layer (services), interface adapters layer (repositories). I choose this approach over MVC (Model, View, Controller) because of it's advantages:
  - Maintainable : it gives better developer experience when the project grows
  - Separation of Concern : it separates clearly the responsibility between layers
- Libraries :
  - Vite+React : I choose Vite+React over Next.js because of the project scale and currently doesn't need server side rendering.
  - React Hook Form : I choose RHF over Formik because of it's feature which the components won't re-renders every form changes. This would make the form more performant in larger forms.
  - Zustand : I choose zustand as global state management for quiz state because of it's simplicity and less boilerplate than Redux. This surely make the development faster.
  - Tailwind + Shadcn : I mainly use Tailwind to make the development faster since I don't need to jump between React component files and CSS files. Also, it pairs well with Shadcn for UI components because Shadcn uses Tailwind under the hood.
  - Zod : I am using Zod as a form validation over Yup because of it's feature that could infer type from schema automatically.

## Anti-cheat Implementation

I implemented the anti-cheat by 2 actions: send to the backend (`{{baseUrl}}/attempts/{{attemptId}}/events`) and save to global state (zustand). This decision was made because the current business flow (reflected from the Backend endpoints) will shows the test result once and can't be shown again after user navigates to other page. The anti-cheat feature will shows the count of paste and out of focus window in the test summary. It works by listening to window's `paste` and document's `visibilitychange` events. These events will be detected inside useEffect callback and then followed by 2 actions stated above.
