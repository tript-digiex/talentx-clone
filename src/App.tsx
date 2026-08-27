import { AppRoutes } from "./routes";
import { QueryProvider } from "./providers/QueryProvider";
import { Toaster } from "sonner";

function App() {
  return (
    <QueryProvider>
      <AppRoutes />
      <Toaster position="top-right" richColors />
    </QueryProvider>
  );
}

export default App;
