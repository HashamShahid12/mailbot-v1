import { AppRoutes } from "./routes/app-routes";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "./theme";
import { Toaster } from "./components/ui/toaster";
import { SessionExpiredModal } from "./components/auth/session-expired-modal";

function App() {
  return (
    <>
      <ChakraProvider value={system}>
        <AppRoutes />
        <Toaster />
        <SessionExpiredModal />
      </ChakraProvider>
    </>
  );
}

export default App;
