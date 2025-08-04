# Library Management System (Kütüphane Yönetim Sistemi)

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.8.2-purple.svg)](https://redux-toolkit.js.org/)
[![RTK Query](https://img.shields.io/badge/RTK%20Query-2.8.2-green.svg)](https://redux-toolkit.js.org/rtk-query/overview)
[![Material-UI](https://img.shields.io/badge/Material--UI-7.2.0-blue.svg)](https://mui.com/)
[![.NET 8](https://img.shields.io/badge/.NET-8.0-blue.svg)](https://dotnet.microsoft.com/)
[![React Native](https://img.shields.io/badge/React%20Native-0.79.5-blue.svg)](https://reactnative.dev/)

## 📚 Project Overview (Proje Genel Bakış)

This is a comprehensive **Library Management System** built with modern technologies across three platforms:

Bu, üç farklı platformda modern teknolojilerle geliştirilmiş kapsamlı bir **Kütüphane Yönetim Sistemi**dir:

### 🖥️ Desktop Application (Masaüstü Uygulaması)
- **Technology**: .NET 8 Windows Forms
- **Database**: SQL Server with Entity Framework
- **Features**: Complete library management with RBAC system

### 🌐 Web Application (Web Uygulaması)
- **Technology**: React 19 + Redux Toolkit + RTK Query
- **UI Framework**: Material-UI (MUI)
- **State Management**: Advanced Redux setup with RTK Query for API calls
- **Features**: Modern web interface with role-based access control

### 📱 Mobile Application (Mobil Uygulama)
- **Technology**: React Native + Expo
- **Navigation**: React Navigation with bottom tabs
- **Features**: Cross-platform mobile experience

---

## 🚀 Key Features (Temel Özellikler)

### 🔐 RBAC (Role-Based Access Control) System
- **Admin**: Full system access and user management
- **Librarian/Staff**: Book management and loan operations
- **Member**: Basic book browsing and personal loan history

### 📖 Book Management
- Add, edit, delete books
- Stock management
- Book search and filtering
- Category management

### 🔄 Loan System
- 30-day loan period
- Automatic overdue detection
- Penalty system for late returns
- Stock tracking

### 👥 User Management
- User registration and authentication
- Role assignment
- Profile management
- Session management

### 📊 Statistics & Reports
- Loan statistics
- User activity reports
- Book popularity metrics
- Overdue reports

---

## 🛠️ Technology Stack (Teknoloji Yığını)

### Frontend Technologies
- **React 19**: Latest React with concurrent features
- **Redux Toolkit**: Modern Redux with simplified boilerplate
- **RTK Query**: Powerful data fetching and caching
- **Material-UI**: Professional UI components
- **React Router**: Client-side routing

### Backend Technologies
- **.NET 8**: Latest .NET framework
- **Windows Forms**: Desktop application framework
- **SQL Server**: Relational database
- **Entity Framework**: ORM for database operations

### Mobile Technologies
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **React Navigation**: Mobile navigation solution

### Security & Authentication
- **JWT Tokens**: Secure authentication
- **Session Management**: Persistent user sessions
- **Password Hashing**: BCrypt encryption
- **Role-based Authorization**: Granular access control

---

## 📁 Project Structure (Proje Yapısı)

```
📦 Library Management System
├── 🖥️ Desktop Application/
│   └── Seker_kutuphane/
│       ├── Forms/           # Windows Forms
│       ├── Models/          # Data models
│       ├── Services/        # Business logic
│       └── DatabaseHelper.cs
├── 🌐 Website/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store
│   │   │   ├── api/        # RTK Query APIs
│   │   │   └── slices/     # Redux slices
│   │   ├── utils/          # Utility functions
│   │   └── styles/         # CSS styles
│   └── public/             # Static assets
└── 📱 Mobile Application/
    └── kutuphane-mobile/
        ├── app/            # Screen components
        ├── components/     # Reusable components
        ├── store/          # Redux store
        ├── services/       # API services
        └── constants/      # App constants
```

---
### Prerequisites
- Node.js 18+ 
- .NET 8 SDK
- SQL Server
- Expo CLI (for mobile development)

### Installation (Kurulum)

#### 1. Web Application
```bash
cd Website
npm install
npm start
```

#### 2. Desktop Application
```bash
cd "Desktop Application/Seker_kutuphane"
dotnet restore
dotnet run
```

#### 3. Mobile Application
```bash
cd "Mobile Application/kutuphane-mobile"
npm install
npx expo start
```

---

## 🔧 Configuration

### Database Connection
Update the connection string in `DatabaseHelper.cs` for desktop application.

### API Configuration
Set your API URL in the web application's `apiSlice.js`.

### Environment Variables
Create `.env` files for sensitive configuration data.

---

## 📱 Features by Platform

### Desktop Application
- ✅ Complete CRUD operations
- ✅ Advanced search and filtering
- ✅ Report generation
- ✅ Bulk operations
- ✅ Offline capability

### Web Application
- ✅ Responsive design (Responsive)
- ✅ Real-time updates
- ✅ Advanced state management
- ✅ Progressive Web App (PWA)
- ✅ Modern UI/UX

### Mobile Application
- ✅ Cross-platform compatibility
- ✅ Offline-first approach
- ✅ Push notifications
- ✅ Touch-optimized interface
- ✅ Native performance

---

## 🔐 Security Features

- **Authentication**: JWT-based authentication
- **Authorization**: Role-based access control (RBAC)
- **Data Encryption**: Password hashing with SHA-256
- **Session Management**: Secure session handling
- **Input Validation**: Comprehensive input sanitization
- **SQL Injection Protection**: Parameterized queries

---

## 📊 Performance Optimizations

- **RTK Query Caching**: Intelligent data caching
- **Lazy Loading**: Component and route lazy loading
- **Code Splitting**: Bundle optimization
- **Image Optimization**: Compressed assets
- **Database Indexing**: Optimized queries

---

## 🧪 Testing

```bash
# Web Application Tests
cd Website
npm test

# Desktop Application Tests
cd "Desktop Application/Seker_kutuphane"
dotnet test
```

---

## 📈 Monitoring & Analytics

- **Error Tracking**: Comprehensive error logging
- **Performance Monitoring**: Application performance metrics
- **User Analytics**: Usage statistics and patterns
- **System Health**: Database and API health checks

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

## 📄 License (Lisans)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔄 Version History (Sürüm Geçmişi)

### v1.0.0 (Current)
- Initial release with all three platforms
- Complete RBAC implementation
- Advanced loan management system
- Modern UI/UX across all platforms

---
Developed By Serkan Gürcan , Burak Saka , Halil Malatyalı , Semiha Bahçebaşı , Umut Aydın.