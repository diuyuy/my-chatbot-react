import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import Providers from "./providers/providers";
import { router } from "./router/router";

function App() {
  return (
    <div>
      <Providers>
        <RouterProvider router={router}></RouterProvider>
      </Providers>
      <Toaster richColors closeButton />
    </div>
  );
}

export default App;
