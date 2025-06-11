import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./app.css";
import { Toaster } from "@/components/ui/toaster";

import HomePage from "./pages/Home";
import AddProfilePage from "./pages/AddProfile";
import CalendarPage from "./pages/Calendar";
import AddMeasurePage from "./pages/AddMeasure";
import Stats from "./pages/Stats";

const routes = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/add-profile", element: <AddProfilePage /> },
  { path: "/add-measure", element: <AddMeasurePage /> },
  { path: "/calendar", element: <CalendarPage /> },
  { path: "/stats", element: <Stats /> },
]);

function App() {
  return (
    <main>
      <Toaster />
      <RouterProvider router={routes} />
    </main>
  );
}

export default App;
