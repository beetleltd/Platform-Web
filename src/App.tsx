import { ThemeProvider } from "./contexts/ThemeContext";
import StoreFrontRouter from "./routes";

function App() {
  return (
    <ThemeProvider>
      <StoreFrontRouter />
    </ThemeProvider>
  );
}

export default App;
