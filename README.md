# Ride Admin Dashboard

A modern, responsive admin dashboard for ride-sharing services built with React, Vite, Tailwind CSS, and shadcn UI components.

## 🚀 Features

- **10 Professional Themes** - Complete theme system following 60/30/10 color rule
- **Responsive Design** - Works perfectly on all screen sizes
- **Theme Persistence** - Themes are saved and restored across sessions
- **Theme Preview** - Hover to preview themes before applying
- **Modern UI Components** - Built with Tailwind CSS and shadcn UI patterns
- **React Router** - Client-side routing with nested layouts
- **Mobile-First** - Optimized for mobile devices with collapsible sidebar

## 🎨 Theme System

The dashboard includes 10 professionally designed themes:

1. **Default** - Blue primary, Gray secondary, Orange accent
2. **Dark** - Dark mode with inverted colors
3. **Green** - Green primary, Slate secondary, Yellow accent
4. **Purple** - Purple primary, Zinc secondary, Pink accent
5. **Red** - Red primary, Stone secondary, Blue accent
6. **Orange** - Orange primary, Neutral secondary, Teal accent
7. **Teal** - Teal primary, Gray secondary, Purple accent
8. **Indigo** - Indigo primary, Slate secondary, Rose accent
9. **Rose** - Rose primary, Zinc secondary, Emerald accent
10. **Emerald** - Emerald primary, Stone secondary, Violet accent

Each theme follows the 60/30/10 color rule for optimal visual hierarchy and consistency.

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS v3.4** - Utility-first CSS framework (stable version)
- **Lucide React** - Beautiful icons
- **PostCSS** - CSS processing with Tailwind CSS
- **No TypeScript** - Pure JavaScript as requested
- **No Next.js** - Vite-based setup as requested

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ride-admin-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── common/
│   ├── themes.js          # Theme definitions and utilities
│   └── utils.js           # Utility functions
├── components/
│   └── layout/
│       ├── Navbar.js      # Top navigation bar
│       ├── Sidebar.js     # Side navigation
│       └── Layout.js      # Main layout wrapper
├── hooks/
│   └── useTheme.js        # Theme context and hooks
├── pages/
│   ├── Dashboard.js       # Main dashboard page
│   ├── Users.js          # User management
│   └── Drivers.js        # Driver management
├── routes/
│   └── index.js          # Router configuration
├── App.jsx               # Main app component
├── main.jsx              # App entry point
└── index.css             # Global styles and Tailwind imports
```

## 🎯 Key Components

### Layout Components
- **Navbar** - Fixed top navigation with logo, search, theme selector, and settings
- **Sidebar** - Collapsible side navigation with route groups and user profile
- **Layout** - Main layout wrapper integrating navbar and sidebar

### Pages
- **Dashboard** - Overview with statistics, recent activity, and quick actions
- **Users** - User management with search, filtering, and actions
- **Drivers** - Driver management with status indicators and ratings
- **Other Pages** - Placeholder pages for Rides, Payments, Analytics, etc.

### Theme System
- **ThemeProvider** - React context for global theme management
- **useTheme Hook** - Custom hook for theme operations
- **Theme Persistence** - Automatic saving/loading from localStorage

## 🎨 Customization

### Adding New Themes
1. Open `src/common/themes.js`
2. Add your theme object following the existing pattern
3. Ensure colors follow the 60/30/10 rule
4. Update the theme list in the same file

### Modifying Colors
All colors are defined as CSS custom properties in the theme objects. You can modify any color by updating the corresponding HSL values.

### Adding New Pages
1. Create your page component in `src/pages/`
2. Add the route in `src/routes/index.js`
3. Add navigation item in `src/components/layout/Sidebar.js`

## 📱 Responsive Design

The dashboard is fully responsive with:
- **Mobile (< 768px)** - Collapsible sidebar with overlay
- **Tablet (768px - 1024px)** - Optimized layout for medium screens
- **Desktop (> 1024px)** - Full sidebar always visible

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help, please open an issue in the repository.

---

Built with ❤️ using React, Vite, and Tailwind CSS