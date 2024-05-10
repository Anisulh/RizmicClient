# Rizmic Fits Client

[![React Version](https://img.shields.io/badge/react-18.x-61DAFB.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.4-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS Version](https://img.shields.io/badge/tailwindcss-3.x-38B2AC.svg)](https://tailwindcss.com/)
[![Jest Testing](https://img.shields.io/badge/testing-jest-red.svg)](https://jestjs.io/)

Welcome to the frontend repository for Rizmic Fits, a dynamic web application built using React and TypeScript, designed to manage wardrobe elements efficiently. This application was designed to intuitively handle user data, wardrobe items, outfit combinations, and social interactions. This project leverages the best practices and modern tools in the development ecosystem to ensure a seamless user experience and efficient data management. 

This application is deployed and available at: [https://rizmicfits.com](https://rizmicfits.com)

If you haven't already, check out the back-end code: [https://github.com/anisulh/RizmicServer](https://github.com/anisulh/RizmicServer)

## Features

- **Dynamic Form Handling**: Utilizes `react-hook-forms` for managing form states and `zod` for schema-based form validation to ensure robust data integrity.
- **Styling and UI Components**: Styled using `Tailwind CSS` and `Headless UI` to ensure a responsive and accessible user interface.
- **Server-State Management**: Employs `React Query` for efficient server-state management, reducing the need to manage server state within the component state.
- **Secure Payment Integration**: Integrates `Stripe` for handling secure and scalable payments.
- **API Communication**: Uses the `fetch` API for making network requests to interact with back-end services.

## Technologies

- **React** for interactive client-side framework
- **TypeScript** for type-safe code
- **Zod** for form input validation
- **React Query** for API response state management
- **Tailwind CSS** for styling
- **Headless UI** for interactive UI components
- **Stripe** for payment integration
- **React Hook Form** for form state management

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or above)
- npm (v7 or above)
- A modern web browser that supports ES6

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/anisulh/RizmicClient.git
   ```

2. **Navigate to the project directory**

   ```bash
   cd RizmicClient
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the root directory and update it with your API URI, and other configurations. 

5. **Run the start script**

   ```bash
   npm run start
   ```
   

## Contributing

Contributions are what make the open-source community such a fantastic place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

Best way to get in contact is via email: rizmicfits@gmail.com
