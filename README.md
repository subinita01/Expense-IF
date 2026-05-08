# 💰 Expense-IF

A modern, real-time expense tracking application built with React, TypeScript, and Firebase. Track your daily expenses, visualize spending patterns, and manage your finances with an intuitive and beautiful interface.

**🌐 Live Demo:** [https://expense-if.netlify.app/](https://expense-if.netlify.app/)

---

## ✨ Features

- **🔐 Authentication**: Secure user registration and login with Firebase Authentication
- **📝 Expense Tracking**: Add, edit, and delete expenses with ease
- **📊 Real-time Analytics**: View expense summaries and category-wise breakdowns
- **📈 Visual Charts**: Interactive charts powered by Recharts to visualize spending patterns
- **🏷️ Category Management**: Organize expenses into 7 predefined categories:
  - Food & Dining
  - Transport
  - Entertainment
  - Shopping
  - Utilities
  - Health
  - Other
- **📅 Monthly Overview**: Track monthly spending with summary cards showing total expenses and current month's spending
- **⚡ Real-time Sync**: All data is synced in real-time using Firebase Firestore
- **🎨 Modern UI**: Clean, responsive design using shadcn/ui and Tailwind CSS
- **🌙 Dark Mode Support**: Built-in theme support for dark and light modes
- **📱 Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3**: UI framework
- **TypeScript 5.8**: Type safety
- **Vite 5.4**: Lightning-fast build tool
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components
- **React Router v6**: Client-side routing
- **React Hook Form**: Efficient form handling
- **Zod**: Schema validation

### Backend & Database
- **Firebase**: Backend-as-a-service platform
  - **Authentication**: User sign-up and login
  - **Firestore**: Real-time NoSQL database
  - **Analytics**: User activity tracking

### Libraries & Tools
- **Recharts 2.15**: Data visualization
- **React Query 5.83**: Server state management
- **Lucide React**: Beautiful icon library
- **Sonner**: Toast notifications
- **date-fns 3.6**: Date manipulation and formatting
- **Zod 3.25**: TypeScript-first schema validation
- **next-themes**: Theme management (dark/light mode)

### Development Tools
- **ESLint**: Code quality linting
- **TypeScript**: Static type checking
- **PostCSS**: CSS transformations
- **Autoprefixer**: Browser compatibility

---

## 📁 Project Structure

```
Expense-IF/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── ExpenseForm.tsx        # Form for adding/editing expenses
│   │   ├── ExpenseList.tsx        # Display list of expenses
│   │   ├── ExpenseChart.tsx       # Visualization component
│   │   ├── SummaryCards.tsx       # Summary statistics
│   │   ├── Header.tsx             # Navigation header
│   │   └── layout/
│   │       └── ProtectedRoute.tsx # Route protection for authenticated users
│   ├── hooks/
│   │   ├── useExpenses.ts         # Custom hook for expense management
│   │   ├── useAuth.ts             # Authentication hook
│   │   └── use-mobile.tsx         # Mobile detection hook
│   ├── pages/
│   │   ├── Index.tsx              # Landing page
│   │   ├── Dashboard.tsx          # Main expense dashboard
│   │   ├── login.tsx              # Login page
│   │   ├── signup.tsx             # Registration page
│   │   └── NotFound.tsx           # 404 page
│   ├── services/
│   │   └── userService.ts         # User-related API calls
│   ├── types/
│   │   └── expense.ts             # TypeScript interfaces and types
│   ├── lib/
│   │   └── utils.ts               # Utility functions
│   ├── firebase.ts                # Firebase configuration
│   ├── App.tsx                    # Root component with routing
│   ├── main.tsx                   # Entry point
│   ├── App.css                    # Global styles
│   └── index.css                  # Tailwind CSS imports
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── _redirects                 # Netlify routing configuration
├── package.json                   # Project dependencies
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
├── eslint.config.js               # ESLint configuration
├── components.json                # shadcn/ui configuration
├── netlify.toml                   # Netlify deployment configuration
└── index.html                     # HTML entry point
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- A **Firebase** project (for database and authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/subinita01/Expense-IF.git
   cd Expense-IF
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Firebase Configuration** (Optional for local development)
   - The project already has Firebase credentials configured
   - If you want to use your own Firebase project:
     - Update the `firebaseConfig` in `src/firebase.ts` with your credentials

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:8080`

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

---

## 📖 Usage

### 1. Landing Page
- Visit the home page to see project information
- Click on "Login" or "Sign Up" to get started

### 2. Create an Account
- Fill in your email and password
- Click "Sign Up" to create a new account
- Your account data is securely stored in Firebase

### 3. Add an Expense
- Click on the "Add Expense" button in the dashboard
- Fill in the details:
  - **Title**: Short description of the expense
  - **Amount**: Expense amount
  - **Category**: Select from predefined categories
  - **Date**: Pick the date of the expense
  - **Description** (optional): Additional notes
- Click "Save" to add the expense

### 4. View Expenses
- All expenses are displayed in a table format
- Summary cards show:
  - Total expenses (all time)
  - This month's total
  - Total number of expense records

### 5. Edit or Delete
- Click the edit icon to modify an existing expense
- Click the delete icon to remove an expense
- Changes sync in real-time across all sessions

### 6. Analyze Spending
- View category-wise spending distribution in the chart
- Identify spending patterns and manage your budget accordingly

---

## 🔐 Authentication

The app uses **Firebase Authentication** with email and password:

- **Sign Up**: Create a new account with email and password
- **Login**: Sign in with your credentials
- **Protected Routes**: Dashboard is only accessible to authenticated users
- **Auto-redirect**: Unauthenticated users are redirected to the login page

---

## 📊 Data Model

### Expense Type
```typescript
interface Expense {
  id: string;                    // Unique identifier (Firestore doc ID)
  title: string;                 // Expense title
  amount: number;                // Expense amount
  category: Category;            // One of 7 categories
  date: string;                  // ISO date format (YYYY-MM-DD)
  description?: string;          // Optional notes
}

type Category = 
  | "food"
  | "transport"
  | "entertainment"
  | "shopping"
  | "utilities"
  | "health"
  | "other";
```

### Firestore Collection Structure
```
users/
  └── {userId}/
      └── expenses/
          └── {expenseId}
              ├── title: string
              ├── amount: number
              ├── category: string
              ├── date: string
              └── description: string (optional)
```

---

## 🎨 Customization

### Change Expense Categories
Edit the `CATEGORIES` array in `src/types/expense.ts`:
```typescript
export const CATEGORIES = [
  { value: "food", label: "Food & Dining", color: "hsl(var(--category-food))" },
  // Add more categories here
];
```

### Customize Colors
- Edit CSS variables in `src/index.css`
- Tailwind CSS configuration in `tailwind.config.ts`

### Theme
- The app supports light and dark modes
- Theme toggle is available in the header component

---

## 🔄 Real-time Features

- **Firestore Real-time Listeners**: Expenses update instantly across all devices
- **Live Status Indicator**: Shows when the app is connected and last update time
- **Automatic Sync**: Changes are automatically synchronized with the database

---

## 📱 Responsive Design

- **Mobile**: Touch-friendly interface optimized for phones
- **Tablet**: Adjusted layout for medium screens
- **Desktop**: Full-featured layout for larger screens
- Built with mobile-first approach using Tailwind CSS

---

## 🚢 Deployment

### Deploy to Netlify (Recommended)

The project is configured for Netlify deployment:

1. **Connect your GitHub repository to Netlify**
2. **Configure build settings:**
   - Build Command: `npm run build`
   - Publish Directory: `dist`
3. **Deploy**

The project includes:
- `netlify.toml`: Deployment configuration
- `public/_redirects`: SPA routing configuration

### Other Deployment Options

- **Vercel**: Works seamlessly with Vite
- **GitHub Pages**: Configure with appropriate base URL
- **Self-hosted**: Build and serve the `dist` folder

---

## 📝 API Endpoints / Firebase Operations

The app performs the following Firebase operations:

### Authentication
```typescript
signUp(email, password)     // Create new account
signIn(email, password)     // Login
signOut()                   // Logout
getCurrentUser()            // Get authenticated user
```

### Firestore CRUD
```typescript
addExpense(expenseData)     // Create new expense
getExpenses()               // Read all user expenses (real-time)
updateExpense(id, data)     // Update expense
deleteExpense(id)           // Delete expense
```

---

## 🐛 Troubleshooting

### Issue: Cannot load expenses
- Ensure you're logged in
- Check Firebase configuration in `src/firebase.ts`
- Verify Firestore rules allow read/write access

### Issue: Changes not syncing
- Check your internet connection
- Verify Firestore is accessible
- Reload the page

### Issue: Authentication fails
- Ensure email is valid
- Password should be at least 6 characters
- Clear browser cache if issue persists

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👤 Author

**Subinita** - [GitHub Profile](https://github.com/subinita01)

---

## 🙏 Acknowledgments

- **shadcn/ui** for amazing React components
- **Firebase** for real-time backend services
- **Recharts** for beautiful data visualizations
- **Tailwind CSS** for utility-first CSS framework
- **React Router** for client-side routing

---

## 💡 Future Enhancements

Potential features for future versions:

- [ ] Expense filtering and search
- [ ] Budget setting and tracking
- [ ] Recurring expenses
- [ ] Multi-currency support
- [ ] Export to CSV/PDF
- [ ] Mobile app (React Native)
- [ ] Integration with payment methods
- [ ] Expense splitting (shared expenses)
- [ ] Expense reminders and notifications
- [ ] Advanced analytics and reports

---

## 📞 Support & Contact

For issues, questions, or suggestions:
- Open an issue on [GitHub Issues](https://github.com/subinita01/Expense-IF/issues)
- Check the [Live Demo](https://expense-if.netlify.app/)

---

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

---

**Happy Expense Tracking! 💳✨**
