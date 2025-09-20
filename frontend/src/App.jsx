import { useState } from "react";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      {loggedIn ? <Dashboard /> : <Login setLoggedIn={setLoggedIn} />}
    </div>
  );
}

export default App;
