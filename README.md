# SvelteKit Authentication Boilerplate

A modern SvelteKit application template with JWT authentication, protected routes, and clean architecture patterns.

## Features

- 🔐 JWT Authentication with server-side verification
- 🛡️ Protected routes with middleware
- 🔄 Smart login redirects with custom messages
- 📱 Responsive design with Bootstrap
- 🎨 Icon integration with Lucide Svelte
- ⚡ Loading states and navigation indicators
- 📝 TypeScript support
- 🛡️ Security-focused redirect validation
- 🎯 Clean project structure

## Project Structure

```
src/
├── app.html                 # HTML template
├── app.d.ts                 # App type definitions
├── hooks.server.ts          # Authentication middleware
├── lib/
│   ├── components/          # Reusable components
│   ├── server/             # Server-side utilities
│   ├── stores/             # Client-side state management
│   ├── types.ts            # Type definitions
│   └── utils/              # Utility functions
│       ├── auth.ts         # Authentication utilities
│       ├── date.ts         # Date formatting utilities
│       └── index.ts        # Central exports
├── routes/
│   ├── (protected)/        # Protected route group
│   │   ├── +layout.server.ts
│   │   ├── +layout.svelte
│   │   └── [pages]/        # Protected pages
│   ├── +page.svelte        # Login page
│   ├── otp/                # OTP verification
│   └── logout/             # Logout handler
└── static/                 # Static assets
```

## Getting Started

1. **Clone this template:**
   ```bash
   npx degit your-repo/sveltekit-auth-boilerplate my-app
   cd my-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file:
   ```env
   JWT_SECRET=your-super-secret-jwt-key
   JWT_WORKER_URL=your-jwt-worker-url  # Optional for production
   ```

4. **Customize the application:**
   - Update `package.json` with your project details
   - Modify types in `src/lib/types.ts`
   - Customize authentication logic in `src/lib/server/auth.ts`
   - Update protected routes in `src/hooks.server.ts`

5. **Run the development server:**
   ```bash
   npm run dev
   ```

## Key Files to Customize

### Authentication
- `src/hooks.server.ts` - Authentication middleware and route protection
- `src/lib/server/auth.ts` - JWT verification logic
- `src/lib/stores/auth.ts` - Client-side authentication state
- `src/lib/utils/auth.ts` - Authentication utilities and redirect handling

### Types
- `src/lib/types.ts` - Define your application's data types
- `src/app.d.ts` - Extend SvelteKit's App interface

### UI Components
- `src/lib/components/` - Reusable UI components
- `src/routes/(protected)/+layout.svelte` - Protected pages layout

### Routes
- `src/routes/+page.svelte` - Login page
- `src/routes/(protected)/` - Add your protected pages here

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Run type checking
- `npm run lint` - Check code formatting

## Customization Guide

### Adding New Protected Pages
1. Create a new directory in `src/routes/(protected)/`
2. Add `+page.svelte` and `+page.server.ts` files
3. Update navigation in the layout if needed

### Modifying Authentication
1. Update `UserData` type in `src/lib/types.ts`
2. Modify verification logic in `src/lib/server/auth.ts`
3. Update protected routes list in `src/hooks.server.ts`
4. Customize redirect messages in `src/lib/utils/auth.ts`

### Styling
- Bootstrap 5 is included by default
- Custom styles in `static/css/styles.css`
- FontAwesome icons available
- Lucide Svelte for modern icons

## Deployment

This template works with various SvelteKit adapters:
- `@sveltejs/adapter-auto` (default)
- `@sveltejs/adapter-cloudflare`
- `@sveltejs/adapter-node`
- And more...

## Authentication Flow

### Login Redirect System
The boilerplate includes a smart redirect system that enhances user experience:

1. **Protected Route Access**: When unauthenticated users try to access protected routes, they're redirected to login with:
   - The original URL stored in `redirectTo` parameter
   - A custom message explaining why they need to log in

2. **Login Process**: The login page:
   - Displays the redirect message to inform users
   - Handles authentication
   - Redirects users back to their original destination

3. **Security Features**:
   - Validates redirect URLs to prevent open redirect attacks
   - Only allows relative URLs or same-origin redirects
   - Falls back to dashboard if redirect URL is invalid

### Utility Functions
Located in `src/lib/utils/auth.ts`:

- `handleLoginRedirect(event, message)` - Generates login URLs with redirect info
- `getRedirectUrl(url)` - Extracts redirect URL from query parameters
- `getAuthMessage(url)` - Gets auth messages from URL
- `isValidRedirectUrl(url)` - Validates redirect URLs for security

### Example Usage
```typescript
// In hooks.server.ts
const redirectUrl = handleLoginRedirect(event, "Please log in to view your profile");

// In login page
const redirectTo = getRedirectUrl(url);
const message = getAuthMessage(url);
```

## License

MIT