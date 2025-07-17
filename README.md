# Finance App

A modern personal finance management application with a responsive frontend and backend API.

## Features

- Modern, responsive UI with dynamic animations
- Welcome page with feature highlights
- Authentication system (login/register)
- Dashboard with financial insights
- Transaction tracking and visualization
- AI-powered financial recommendations

## Tech Stack

### Frontend
- React.js
- Material UI
- React Router
- Context API for state management
- CSS animations

### Backend
- Node.js
- Express.js
- JWT authentication

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/financeApp.git
cd financeApp
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server
```bash
cd backend
npm start
```

2. In a new terminal, start the frontend development server
```bash
cd frontend
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Visit the welcome page at the root URL
2. Create a new account or log in with existing credentials
3. Explore the dashboard features
4. Add accounts, track expenses, and get financial insights

## Customization

### Theme Customization

The application uses Material UI's theming system. You can modify the theme in `frontend/src/App.js` by editing the `theme` object.

### Adding New Features

The modular architecture makes it easy to add new features:
- Create new components in the `components` directory
- Add new pages in the `pages` directory
- Update routes in `App.js`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material UI for the component library
- React team for the awesome framework 