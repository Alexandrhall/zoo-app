import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Layout } from "./components/Layout";
import { NotFound } from "./components/NotFound";
import { Animal } from "./components/pages/Animal";
import { Home } from "./components/pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="/animals/:id" element={<Animal />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
