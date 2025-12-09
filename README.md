# Todo Mobile - React Native App

A React Native todo app built with Expo, React Navigation, React Query, and Zod validation.


<img src="https://github.com/tfjordanp/Todos-ReactNative-Frontend/blob/main/demos/Login.PNG" alt="LOGIN"/>
<br/>
<img src="https://github.com/tfjordanp/Todos-ReactNative-Frontend/blob/main/demos/Signup.PNG" alt="SIGNUP"/>
<br/>
<img src="https://github.com/tfjordanp/Todos-ReactNative-Frontend/blob/main/demos/Dashboard.PNG" alt="DASHBOARD"/>
<br/>
<img src="https://github.com/tfjordanp/Todos-ReactNative-Frontend/blob/main/demos/Profile.PNG" alt="PROFILE"/>
<br/>

## Features

- **Authentication**: Login and signup with email/password
- **Todo Management**: Create, read, update, and toggle todos
- **Form Validation**: Zod schema validation with field-level error messages
- **Optimistic UI**: Instant feedback on todo completion toggle with automatic rollback on error
- **Filtering**: Filter todos by All / Active / Completed
- **Caching**: React Query for efficient data caching and synchronization
- **Pull-to-refresh**: Refresh todo list manually
- **Loading States**: Disabled inputs and buttons during requests
- **Async Token Storage**: JWT stored in AsyncStorage

## Project Structure

```
todo-mobile/
├─ App.tsx                          # Root component with providers
├─ app.json                         # Expo configuration
├─ babel.config.js                  # Babel config with dotenv plugin
├─ package.json                     # Dependencies
├─ tsconfig.json                    # TypeScript config
├─ .env                             # Environment variables
├─ .env.example                     # Example environment variables
└─ src/
   ├─ navigation/
   │  ├─ AppNavigator.tsx          # Conditional navigation logic
   │  ├─ AuthStack.tsx             # Login/Signup stack
   │  └─ MainTabs.tsx              # Dashboard/Profile tabs
   ├─ screens/
   │  ├─ LoginScreen.tsx           # Login form with validation
   │  ├─ SignupScreen.tsx          # Signup form with validation
   │  ├─ DashboardScreen.tsx       # Todos list with filtering
   │  └─ ProfileScreen.tsx         # User profile
   ├─ context/
   │  └─ AuthContext.tsx           # Authentication state management
   ├─ services/
   │  ├─ api.ts                    # Axios instance with interceptors
   │  ├─ auth.ts                   # Auth API calls
   │  └─ todos.ts                  # Todo API calls
   ├─ storage/
   │  └─ token.ts                  # JWT token AsyncStorage helpers
   ├─ types/
   │  ├─ auth.ts                   # Auth types
   │  ├─ user.ts                   # User types
   │  └─ todo.ts                   # Todo types
   ├─ components/
   │  ├─ LoadingView.tsx           # Loading spinner view
   │  ├─ TodoItem.tsx              # Todo item component
   │  └─ FieldError.tsx            # Field error message component
   └─ utils/
      └─ validation.ts             # Zod schemas and validators
```

## Installation

### Prerequisites
- Node.js 16+ and npm
- Expo CLI: `npm install -g expo-cli`

### Steps

1. Navigate to the project:
   ```bash
   cd todo-mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   - Copy `.env.example` to `.env`
   - Update `API_BASE_URL` if needed (default: `http://localhost:8000/api/v1`)
   - For physical device, replace `localhost` with your machine IP

4. Start the app:
   ```bash
   npm run start
   ```

5. Run on desired platform:
   - **iOS**: Press `i` or run `npm run ios`
   - **Android**: Press `a` or run `npm run android`
   - **Web**: Press `w` or run `npm run web`

## Dependencies

### Core
- `react` - UI library
- `react-native` - Mobile framework
- `expo` - Development framework

### Navigation
- `@react-navigation/native` - Navigation library
- `@react-navigation/native-stack` - Stack navigator
- `@react-navigation/bottom-tabs` - Tab navigator
- `react-native-screens` - Native screen components
- `react-native-safe-area-context` - Safe area handling

### State & Data Fetching
- `@tanstack/react-query` - Server state management
- `axios` - HTTP client
- `@react-native-async-storage/async-storage` - Local storage

### Validation
- `zod` - Schema validation

### Config
- `react-native-dotenv` - Environment variables

## API Endpoints

The app expects the following endpoints:

### Auth
- `POST /auth/login` - Login with email/password
- `POST /auth/signup` - Signup with name/email/password
- `GET /users/me` - Get current user (requires auth)

### Todos
- `GET /todos` - List all todos (requires auth)
- `POST /todos` - Create a new todo (requires auth)
- `PATCH /todos/:id` - Update a todo (requires auth)

## Key Features Explained

### Validation with Zod
Form inputs are validated using Zod schemas before submission. Validation errors are displayed inline for each field.

```typescript
const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
```

### Optimistic UI
When toggling a todo, the UI updates immediately (optimistic update). If the API request fails, the state automatically rolls back.

```typescript
const toggleMutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (vars) => {
    // Update cache immediately
    qc.setQueryData(["todos"], old => /* updated data */);
  },
  onError: (err, vars, ctx) => {
    // Rollback on error
    qc.setQueryData(["todos"], ctx.previous);
  },
});
```

### React Query Caching
React Query automatically caches API responses and manages stale data. Pull-to-refresh refetches the list.

```typescript
const todosQuery = useQuery({
  queryKey: ["todos"],
  queryFn: listTodos,
});
```

### Loading States
All buttons are disabled during requests to prevent duplicate submissions. Input fields are also disabled.

## Available Scripts

- `npm run start` - Start Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run on web browser

## Troubleshooting

### Can't connect to API
- Ensure backend is running on `http://localhost:8000`
- For physical device: update `.env` to use your machine IP instead of localhost
- Example: `API_BASE_URL=http://192.168.1.10:8000/api/v1`

### Module not found errors
- Delete `node_modules` and `.expo` folders
- Run `npm install` again
- Clear Expo cache: `expo start -c`

### Port already in use
- Change the port in `.env` if needed
- Or kill the process using the port

## Next Steps

- Implement more advanced filtering and sorting
- Add todo edit functionality
- Add todo deletion
- Add due dates and reminders
- Implement push notifications
- Add dark mode support
- Add unit and integration tests
