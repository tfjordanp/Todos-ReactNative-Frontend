# Quick Start Guide

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
cd todo-mobile
npm install
```

### 2. Configure Environment
The `.env` file is already configured with the default backend URL:
```
API_BASE_URL=http://localhost:8000/api/v1
```

**For Physical Device:**
Replace `localhost` with your machine IP:
```
API_BASE_URL=http://192.168.1.10:8000/api/v1
```

### 3. Start the App
```bash
npm run start
```

### 4. Run on Your Device
- **iOS Simulator**: Press `i`
- **Android Emulator**: Press `a`  
- **Web Browser**: Press `w`

## 📋 What's Included

✅ **Authentication**
- Login with email/password
- Signup with name/email/password
- JWT token stored in AsyncStorage
- Automatic token injection in API requests

✅ **Form Validation**
- Zod schemas for login, signup, and todo creation
- Field-level error messages
- Instant validation feedback

✅ **Todo Management**
- Create todos with title and description
- Toggle todo completion status
- Filter by All/Active/Completed
- Pull-to-refresh functionality

✅ **State Management**
- React Query for server state
- AuthContext for user authentication
- Optimistic UI updates
- Automatic error rollback

✅ **Loading States**
- Disabled inputs during requests
- Disabled buttons to prevent duplicates
- Loading indicators and messages

## 📁 File Structure Summary

| Directory | Purpose |
|-----------|---------|
| `src/screens/` | UI screens (Login, Signup, Dashboard, Profile) |
| `src/navigation/` | Navigation stacks and configuration |
| `src/context/` | Authentication state management |
| `src/services/` | API calls (auth, todos) |
| `src/types/` | TypeScript type definitions |
| `src/storage/` | Token storage utilities |
| `src/components/` | Reusable UI components |
| `src/utils/` | Validation schemas and helpers |

## 🔌 API Endpoints Required

Your backend should implement these endpoints:

```
POST   /auth/signup          - Register new user
POST   /auth/login           - Login user
GET    /users/me             - Get current user
GET    /todos                - List todos
POST   /todos                - Create todo
PATCH  /todos/:id            - Update todo
```

## 🎨 Key Features Explained

### Optimistic Updates
When you toggle a todo, it updates instantly on the UI. If the API fails, it rolls back automatically.

### Form Validation
All forms validate input before submission using Zod. Errors appear inline below each field.

### Caching
React Query automatically caches the todo list and only fetches when data is stale.

### Loading States
Buttons and inputs are disabled while requests are in progress to prevent user errors.

## 🛠️ Development Tips

- **Hot Reload**: Changes auto-reload in the app
- **Clear Cache**: Run `expo start -c` to clear cache
- **Debugging**: Use React DevTools or console logs
- **Environment Variables**: Edit `.env` and restart the app

## 📝 Example .env for Physical Device

```
API_BASE_URL=http://192.168.1.100:8000/api/v1
```

Find your IP with:
```bash
# macOS/Linux
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows
ipconfig
```

## 🚨 Troubleshooting

**Connection Error?**
- Check backend is running on port 8000
- Verify API_BASE_URL in `.env`
- For device: use IP instead of localhost

**Module Not Found?**
- Delete `node_modules` folder
- Run `npm install` again
- Run `expo start -c` to clear cache

**Port in Use?**
- Expo uses ports 8081, 8082, 8083
- Close other Expo instances
- Kill process: `lsof -i :8081` then `kill -9 <PID>`

## 📚 Learn More

- [Expo Docs](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org)
- [React Query](https://tanstack.com/query/latest)
- [Zod Documentation](https://zod.dev)
