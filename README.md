# NEXCARE Admin Dashboard

> **PT InternetWork Indonesia** - Network Operations Center Management System

A modern, role-based admin dashboard for managing RFO (Reason For Outage) reports, Starlink accounts, clients, and team members.

---

## 🚀 Features

### 1. **Authentication & Authorization**

- Secure login with role-based access control (RBAC)
- Three user roles: **NOC2**, **NOC1**, **Technical Support**
- Session management with persistent login state
- Animated login/logout notifications

### 2. **Dashboard Overview**

- Personalized welcome message with user session data
- Real-time statistics:
  - Total Clients
  - RFO Pending
  - Starlink Active/Suspended
- Interactive charts:
  - **RFO Duration Chart** (Bar Chart)
  - **Starlink Status Distribution** (Pie Chart)

### 3. **RFO Management**

- Complete CRUD operations (Create, Read, Update, Delete)
- Advanced filtering by Status and Starlink account
- Real-time search functionality
- Detailed RFO view with comprehensive incident information
- **PDF Export** - Generate professional RFO reports matching company template
- Role-based status editing (NOC2 only)

### 4. **Starlink Management**

- Manage Starlink accounts with full CRUD operations
- Track account status (Active/Suspend)
- OPT status and quota management
- Real-time search and filtering

### 5. **Client Management**

- Client database with bandwidth and service details
- Vendor information tracking
- Installation contact management
- Search and filter capabilities

### 6. **Team Management** (NOC2 Only)

- User account management
- Role assignment (NOC2, NOC1, Technical Support)
- Profile picture and signature management
- Restricted access for NOC2 users only

---

## 🎨 Design System

### Color Palette

- **Primary**: Purple (`#9333ea`) - Brand color
- **Background**: Light Gray (`#f3f4f6`) - Main background
- **Accents**:
  - Yellow (`#eab308`) - Pending/Warning states
  - Green (`#22c55e`) - Success/Active states
  - Red (`#ef4444`) - Error/Suspended states
  - Blue (`#3b82f6`) - Information

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)

---

## 📁 Project Structure

```
nexcare-admin/
├── public/
│   ├── iw.svg              # Favicon
│   └── logo.svg            # Company logo
├── src/
│   ├── assets/             # Static assets
│   │   ├── logo.svg
│   │   └── mascot.svg
│   ├── components/         # Reusable UI components
│   │   ├── ActionMenu.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Header.jsx
│   │   ├── Input.jsx
│   │   ├── Sidebar.jsx
│   │   └── SuccessNotification.jsx
│   ├── features/           # Feature modules
│   │   ├── auth/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── AuthNotification.jsx
│   │   │   └── LoginPage.jsx
│   │   ├── clients/
│   │   │   ├── ClientAddModal.jsx
│   │   │   ├── ClientDetailModal.jsx
│   │   │   ├── ClientManagementPage.jsx
│   │   │   └── ClientTable.jsx
│   │   ├── dashboard/
│   │   │   ├── DashboardCharts.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   └── StatsCards.jsx
│   │   ├── rfo/
│   │   │   ├── RFOAddModal.jsx
│   │   │   ├── RFODetailModal.jsx
│   │   │   ├── RFOManagementPage.jsx
│   │   │   ├── RFOReportTemplate.jsx
│   │   │   └── RFOTable.jsx
│   │   ├── starlink/
│   │   │   ├── StarlinkAddModal.jsx
│   │   │   ├── StarlinkDetailModal.jsx
│   │   │   ├── StarlinkManagementPage.jsx
│   │   │   └── StarlinkTable.jsx
│   │   └── team/
│   │       ├── TeamAddModal.jsx
│   │       ├── TeamDetailModal.jsx
│   │       ├── TeamManagementPage.jsx
│   │       └── TeamTable.jsx
│   ├── layouts/
│   │   └── DashboardLayout.jsx
│   ├── lib/
│   │   ├── auth-client.js  # Mock authentication
│   │   ├── db.js           # Mock database
│   │   └── utils.js        # Utility functions
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── vercel.json             # Vercel deployment config
└── vite.config.js
```

---

## 🔐 Role-Based Access Control (RBAC)

| Feature              | NOC2           | NOC1           | Technical Support |
| -------------------- | -------------- | -------------- | ----------------- |
| Dashboard            | ✅ Full Access | ✅ Full Access | ✅ Full Access    |
| RFO - View           | ✅             | ✅             | ✅                |
| RFO - Create         | ✅             | ✅             | ✅                |
| RFO - Edit           | ✅             | ✅             | ❌                |
| RFO - Delete         | ✅             | ✅             | ❌                |
| RFO - Edit Status    | ✅             | ❌             | ❌                |
| Starlink - Full CRUD | ✅             | ✅             | ✅ (No Delete)    |
| Client - Full CRUD   | ✅             | ✅             | ✅ (No Delete)    |
| Team Management      | ✅             | ❌             | ❌                |

---

## 🛠️ Tech Stack

- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.3.1
- **Routing**: React Router DOM 7.13.0
- **Styling**: Tailwind CSS 4.1.18
- **Charts**: Recharts 3.7.0
- **Icons**: Lucide React 0.564.0
- **PDF Generation**: html2pdf.js 0.14.0
- **Utilities**: clsx, tailwind-merge

---

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nexcare-admin
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 🧪 Test Accounts

Use these credentials to test different user roles:

| Email               | Password | Role              | Access Level      |
| ------------------- | -------- | ----------------- | ----------------- |
| `admin@nexcare.com` | `any`    | NOC2              | Full Access       |
| `noc1@nexcare.com`  | `any`    | NOC1              | Limited (No Team) |
| `tech@nexcare.com`  | `any`    | Technical Support | Read-Only RFO     |

> **Note**: This is a demo application with mock authentication. Any password will work.

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub/GitLab**

   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Vite
   - Click "Deploy"

The `vercel.json` configuration is already included for SPA routing.

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` folder.

---

## 📝 Key Features Implementation

### PDF Export

RFO reports can be exported as professional PDF documents matching the company template:

- Click "View" on any RFO entry
- Click "Download PDF" button
- PDF includes all incident details, business impact, and signatures

### Real-time Search

All management pages include instant search functionality:

- Type in the search box
- Results filter in real-time
- No page refresh needed

### Success Notifications

All CRUD operations show animated success notifications:

- Green checkmark animation
- Auto-dismiss after 3 seconds
- Non-intrusive overlay design

---

## 🎯 Future Enhancements

- [ ] Backend API integration
- [ ] Real authentication with JWT
- [ ] File upload for Business Impact images
- [ ] Advanced analytics and reporting
- [ ] Email notifications for RFO status changes
- [ ] Export data to Excel/CSV
- [ ] Dark mode support

---

## 👨‍💻 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Code Style

- Use functional components with hooks
- Follow component-based architecture
- Keep components small and focused
- Use Tailwind CSS for styling
- Maintain consistent naming conventions

---

## 📄 License

**Exclusive for PT InternetWork Indonesia**

---

## 👤 Credits

**Design & Development**: Fauzan Rahadian Faris  
**Company**: PT InternetWork Indonesia  
**Year**: 2026

---

## 📞 Support

For technical support or questions, please contact the NOC team at PT InternetWork Indonesia.

**Address**:  
Neo Soho Capital Lt.35 Unit 3509 Podomoro City, Central Park  
Jl. Letjen S. Parman Kav. 28, Jakarta Barat 11460, Indonesia
