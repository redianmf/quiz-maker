import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Welcome to Quiz Maker App</h1>} />
      <Route path="/quiz" element={<h1>Quiz</h1>} />
      <Route path="/take-test" element={<h1>Take Test</h1>} />

      <Route path="/*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
