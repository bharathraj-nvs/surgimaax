# Surgimaax - Medical Instruments Supply Company

## Overview

Surgimaax is a medical instruments supply company website built for a Coimbatore-based business. The application serves as a digital catalog and inquiry platform for healthcare professionals looking to procure medical equipment, surgical instruments, and diagnostic devices. The system allows users to browse products by category, filter by price ranges, and submit inquiries for equipment purchases.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side application is built with React 19 using TypeScript and follows a component-based architecture. Key architectural decisions include:

- **Routing**: Uses Wouter for lightweight client-side routing, chosen for its simplicity over React Router
- **State Management**: Combines React Query for server state management with local React state for UI state
- **UI Components**: Implements Radix UI primitives with custom styling using Tailwind CSS and shadcn/ui patterns
- **Form Handling**: Uses React Hook Form with Zod validation for type-safe form management
- **Styling**: Tailwind CSS with custom CSS variables for theming and brand colors

### Backend Architecture
The server is built with Express.js and TypeScript, implementing a RESTful API structure:

- **Storage Layer**: Currently uses in-memory storage (MemStorage class) with an interface-based design for future database integration
- **Route Structure**: Modular route handlers separated from the main server file
- **Data Validation**: Shared Zod schemas between client and server for consistent validation
- **API Design**: RESTful endpoints for products and inquiries with filtering capabilities

### Data Storage Solutions
The application currently uses an in-memory storage system but is architected for easy migration to a persistent database:

- **Storage Interface**: IStorage interface defines contract for data operations
- **Schema Design**: Zod schemas define data structures for products, inquiries, and cart items
- **Product Categories**: Predefined medical instrument categories including surgical instruments, diagnostic equipment, patient monitoring, etc.
- **Sample Data**: Includes realistic medical equipment data for demonstration

### Authentication and Authorization
Currently no authentication system is implemented, as the application serves as a public product catalog and inquiry platform. Future implementations could add:

- Admin authentication for product management
- Customer accounts for order tracking
- Role-based access for different user types

## External Dependencies

### Core Framework Dependencies
- **React 19**: Frontend framework with latest features
- **Express 5**: Backend web framework
- **TypeScript**: Type safety across the entire application

### UI and Styling
- **Tailwind CSS 4**: Utility-first CSS framework for responsive design
- **Radix UI**: Accessible component primitives for complex UI components
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Utility for creating variant-based component APIs

### Data and State Management
- **TanStack React Query**: Server state management and caching
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation for type-safe data handling
- **Drizzle ORM**: Database toolkit (configured but not actively used with current in-memory storage)

### Development and Build Tools
- **Vite**: Build tool and development server with React plugin
- **PostCSS**: CSS processing with Autoprefixer
- **TSX**: TypeScript execution for server-side development

### Planned Integrations
The architecture supports future integration of:

- **Database**: PostgreSQL with Drizzle ORM (configuration already present)
- **Email Service**: For inquiry notifications and customer communication
- **Payment Gateway**: For future e-commerce functionality
- **Authentication Provider**: For user management and admin access