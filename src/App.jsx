import { useState } from "react";
import "./App.css";
import CreateTicket from "./components/CreateTicket";
import ViewTickets from "./components/ViewTickets";

function App() {
  const [tickets, setTickets] = useState([]);

  return (
    <div className="app-container">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>FRMS</h2>
        <p>Dashboard</p>
        <p>Create Ticket</p>
        <p>View Tickets</p>
      </div>

      {/* Main Section */}
      <div className="main">

        {/* Navbar */}
        <div className="navbar">
          Fraud Management System
        </div>

        {/* Content */}
        <CreateTicket setTickets={setTickets} />
        <ViewTickets tickets={tickets} setTickets={setTickets} />

      </div>
    </div>
  );
}

export default App;