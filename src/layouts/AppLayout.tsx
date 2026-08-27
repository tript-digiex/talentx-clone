import { Outlet } from "react-router-dom";


export function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* <aside className="fixed inset-y-0 left-0 z-10 flex w-64 flex-col border-r border-sidebar-border bg-sidebar px-3 py-4 text-sidebar-foreground">
        <div className="px-3 pb-6">
          <div className="text-lg font-semibold tracking-tight">TalentX</div>
          <div className="mt-1 truncate text-sm text-muted-foreground">
            {user?.email}
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {navigationItems.map((item) => (
            <NavLink key={item.href} to={item.href}>
              {({ isActive }) => (
                <span
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive &&
                      "bg-sidebar-accent text-sidebar-accent-foreground",
                  )}
                >
                  <item.icon className="size-4" aria-hidden="true" />
                  {item.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={handleLogout}
        >
          <LogOut className="size-4" aria-hidden="true" />
          Logout
        </Button>
      </aside> */}

      <main className="min-h-screen pl-64">
        <div className="mx-auto w-full max-w-7xl px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
