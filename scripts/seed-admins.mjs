import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const admins = [
  { email: "buse@algorycode.com", password: "buse123" },
  { email: "tarik@algorycode.com", password: "tarik123" },
];

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function seedAdmins() {
  const { data: listData, error: listError } =
    await supabase.auth.admin.listUsers();

  if (listError) {
    throw listError;
  }

  const existingUsers = listData.users;

  for (const admin of admins) {
    const existing = existingUsers.find((user) => user.email === admin.email);

    if (existing) {
      const { error } = await supabase.auth.admin.updateUserById(existing.id, {
        password: admin.password,
        email_confirm: true,
        app_metadata: { role: "admin" },
      });

      if (error) {
        throw new Error(`Failed to update ${admin.email}: ${error.message}`);
      }

      console.log(`Updated admin: ${admin.email}`);
      continue;
    }

    const { error } = await supabase.auth.admin.createUser({
      email: admin.email,
      password: admin.password,
      email_confirm: true,
      app_metadata: { role: "admin" },
    });

    if (error) {
      throw new Error(`Failed to create ${admin.email}: ${error.message}`);
    }

    console.log(`Created admin: ${admin.email}`);
  }
}

seedAdmins().catch((error) => {
  console.error(error);
  process.exit(1);
});
