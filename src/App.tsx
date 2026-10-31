import "./App.css";
import useDarkMode from "./hooks/useDarkMode";

function App() {
  const { toggleDarkMode } = useDarkMode();

  return (
    <>
      <button
        onClick={() => toggleDarkMode()}
        className="p-2 rounded-md border"
      >
        Set Theme
      </button>
    </>
  );
}

export default App;
