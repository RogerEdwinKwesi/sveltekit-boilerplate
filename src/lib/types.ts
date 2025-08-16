// User authentication types
export type UserData = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    role: string;
    status: string;
};

// Example data types - customize for your application
export type Post = {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt: string;
};

export type Category = {
    id: string;
    name: string;
    description: string;
    slug: string;
};

// API response types
export type ApiResponse<T> = {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
};

// Form validation types
export type FormError = {
    field: string;
    message: string;
};

export type ValidationResult = {
    valid: boolean;
    errors: FormError[];
};