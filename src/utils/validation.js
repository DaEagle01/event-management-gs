// validation.js
import { z } from 'zod';

export const signupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});



export const eventSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
    startTime: z.string().min(1, { message: "Start time is required" }),
    endTime: z.string().min(1, { message: "End time is required" }),
    location: z.string().min(1, { message: "Location is required" }),
});