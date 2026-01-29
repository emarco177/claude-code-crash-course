import { getOrCreateUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BattleLobby } from "@/components/battle/BattleLobby";

export default async function BattlePage() {
  const user = await getOrCreateUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="max-w-4xl mx-auto">
      <BattleLobby user={user} />
    </div>
  );
}
