import { TypographyH2 } from "@/components/ui/typography";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import UserTable from "./user-table";

export default async function Users() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }
  const { data: users, error } = await supabase.from("profiles").select("*");

  if (error) {
    throw new Error(`Supabase error: ${error.message}`);
  }
  return (
    <>
      <TypographyH2>Teams Dashboard</TypographyH2>
      <UserTable fetchedUser={users}></UserTable>
    </>
  );
}
