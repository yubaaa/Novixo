import { z } from "zod";

export const orderInput = z.object({
    prenom: z.string().trim().min(1).max(80),
    nom: z.string().trim().min(1).max(80),
    telephone: z.string().trim().min(6).max(30),
    wilaya: z.string().trim().min(1).max(60),
    adresse: z.string().trim().min(3).max(300),
    notes: z.string().trim().max(500).optional().nullable(),
    quantity: z.number().int().min(1).max(20),
    total_price: z.number().min(0).max(1000000),
});

export const adminInput = z.object({ password: z.string().min(1).max(200) });

export const adminListInput = z.object({
    token: z.string().min(1).max(200),
    product: z.enum(["charger", "patches"]),
});

export const updateStatusInput = z.object({
    token: z.string().min(1).max(200),
    product: z.enum(["charger", "patches"]),
    id: z.number().int().min(1),
    status: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled"]),
});

export const deleteInput = z.object({
    token: z.string().min(1).max(200),
    product: z.enum(["charger", "patches"]),
    id: z.number().int().min(1),
});

export function assertAdmin(token: string | undefined) {
    const real = process.env.ADMIN_PASSWORD;
    if (!real) throw new Error("ADMIN_PASSWORD not configured");
    if (!token || token !== real) throw new Error("Unauthorized");
}

export interface OrderRow {
    id: number;
    prenom: string;
    nom: string;
    telephone: string;
    wilaya: string;
    adresse: string;
    notes: string | null;
    quantity: number;
    total_price: string;
    status: string;
    created_at: string;
}
