import { getOrCreateUser } from "@/lib/auth";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getOrCreateUser();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        user={
          user
            ? {
                totalXp: user.totalXp,
                currentLevel: user.currentLevel,
                username: user.username,
              }
            : null
        }
      />
      <div className="flex flex-1">
        <Sidebar username={user?.username} />
        <main className="flex-1 container py-6">{children}</main>
      </div>
    </div>
  );
}
