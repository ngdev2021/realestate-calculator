# Creative Finance Calculator

A Progressive Web App (PWA) that serves as an intelligent creative finance calculator. It helps both buyers and sellers understand and explore various non-traditional financing options, providing tailored recommendations based on their specific circumstances.

## Features

- **Creative Finance Calculator**: Advanced calculations for various financing options
- **AI Integration**: Gemini API for optimal deal structuring intelligence
- **User Authentication**: Firebase-based authentication system
- **Data Persistence**: Firestore database for saving calculations and deals
- **Progressive Web App**: Installable app with offline capabilities
- **Responsive Design**: Built with Tailwind CSS for mobile-first design
- **State Management**: NgRx for predictable state management

## Tech Stack

- **Frontend**: Angular 18
- **State Management**: NgRx
- **Styling**: Tailwind CSS + Angular Material
- **Backend**: Firebase (Authentication & Firestore)
- **AI Integration**: Gemini API
- **PWA**: Angular PWA support

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Get your Firebase configuration
   - Update `src/environments/environment.ts` and `src/environments/environment.development.ts` with your Firebase config

4. Configure Gemini API:
   - Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Add it to your environment files

5. Run the development server:
   ```bash
   ng serve
   ```

6. Navigate to `http://localhost:4200/`

## Project Structure

```
src/
├── app/
│   ├── core/                  # Singleton services (auth, API, Firebase)
│   ├── shared/                # Reusable UI components, directives, pipes
│   ├── auth/                  # Authentication-related components and state
│   ├── calculator/            # Main calculator module (inputs, results, AI integration)
│   ├── saved-deals/           # Module for managing saved calculations
│   ├── components/            # Layout components (header, footer, modals)
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   ├── app.module.ts
│   └── ...
├── environments/
├── assets/
├── index.html
├── main.ts
├── styles.css
└── ...
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Development

- `ng serve` - Start development server
- `ng build` - Build for production
- `ng test` - Run unit tests
- `ng e2e` - Run end-to-end tests

## PWA Features

This app is configured as a Progressive Web App with:
- Service Worker for offline functionality
- Web App Manifest for installability
- Responsive design for all devices

## License

This project is licensed under the MIT License.
