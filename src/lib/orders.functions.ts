import { createServerFn } from "@tanstack/react-start";
import {
  orderInput,
  adminInput,
  adminListInput,
  updateStatusInput,
  deleteInput,
  assertAdmin,
  type OrderRow,
} from "./orders.helpers.server";

export type { OrderRow };

export const createChargerOrder = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => orderInput.parse(d))
  .handler(async ({ data }) => {
    const { getSql, ensureSchema } = await import("./db.server");
    await ensureSchema();
    const sql = getSql();
    const rows = (await sql`
      INSERT INTO charger_orders (prenom, nom, telephone, wilaya, adresse, notes, quantity, total_price)
      VALUES (${data.prenom}, ${data.nom}, ${data.telephone}, ${data.wilaya}, ${data.adresse}, ${data.notes ?? null}, ${data.quantity}, ${data.total_price})
      RETURNING id;
    `) as unknown as Array<{ id: number }>;
    return { ok: true, id: rows[0].id };
  });

export const createPatchesOrder = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => orderInput.parse(d))
  .handler(async ({ data }) => {
    const { getSql, ensureSchema } = await import("./db.server");
    await ensureSchema();
    const sql = getSql();
    const rows = (await sql`
      INSERT INTO patches_orders (prenom, nom, telephone, wilaya, adresse, notes, quantity, total_price)
      VALUES (${data.prenom}, ${data.nom}, ${data.telephone}, ${data.wilaya}, ${data.adresse}, ${data.notes ?? null}, ${data.quantity}, ${data.total_price})
      RETURNING id;
    `) as unknown as Array<{ id: number }>;
    return { ok: true, id: rows[0].id };
  });

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => adminInput.parse(d))
  .handler(async ({ data }) => {
    const real = process.env.ADMIN_PASSWORD;
    if (!real) throw new Error("ADMIN_PASSWORD not configured");
    if (data.password !== real) {
      return { ok: false as const };
    }
    return { ok: true as const, token: real };
  });

export const adminListOrders = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => adminListInput.parse(d))
  .handler(async ({ data }): Promise<{ orders: OrderRow[] }> => {
    assertAdmin(data.token);
    const { getSql, ensureSchema } = await import("./db.server");
    await ensureSchema();
    const sql = getSql();
    const q =
      data.product === "charger"
        ? sql`SELECT id, prenom, nom, telephone, wilaya, adresse, notes, quantity, total_price::text AS total_price, status, created_at::text AS created_at FROM charger_orders ORDER BY created_at DESC LIMIT 500`
        : sql`SELECT id, prenom, nom, telephone, wilaya, adresse, notes, quantity, total_price::text AS total_price, status, created_at::text AS created_at FROM patches_orders ORDER BY created_at DESC LIMIT 500`;
    const rows = (await q) as unknown as OrderRow[];
    return { orders: rows };
  });

export const adminUpdateStatus = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => updateStatusInput.parse(d))
  .handler(async ({ data }) => {
    assertAdmin(data.token);
    const { getSql, ensureSchema } = await import("./db.server");
    await ensureSchema();
    const sql = getSql();
    if (data.product === "charger") {
      await sql`UPDATE charger_orders SET status = ${data.status} WHERE id = ${data.id}`;
    } else {
      await sql`UPDATE patches_orders SET status = ${data.status} WHERE id = ${data.id}`;
    }
    return { ok: true };
  });

export const adminDeleteOrder = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => deleteInput.parse(d))
  .handler(async ({ data }) => {
    assertAdmin(data.token);
    const { getSql, ensureSchema } = await import("./db.server");
    await ensureSchema();
    const sql = getSql();
    if (data.product === "charger") {
      await sql`DELETE FROM charger_orders WHERE id = ${data.id}`;
    } else {
      await sql`DELETE FROM patches_orders WHERE id = ${data.id}`;
    }
    return { ok: true };
  });
