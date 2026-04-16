import { useEffect, useState } from "react";
import API from "../services/api";

const PAGE_SIZE = 10;

function ViewTickets({ tickets, setTickets }) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await API.get("/tickets");
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets", error);
    }
  };

  const totalPages = Math.ceil(tickets.length / PAGE_SIZE);

  const paginatedTickets = tickets.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="card">
      <h2>View Tickets</h2>

      <table>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Customer ID</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTickets.length === 0 ? (
            <tr>
              <td colSpan="4">No tickets found</td>
            </tr>
          ) : (
            paginatedTickets.map((t) => (
              <tr key={t.ticketId}>
                <td>{t.ticketId}</td>
                <td>{t.customerId}</td>
                <td>{t.description}</td>
                <td className="status-open">{t.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>

          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lsaquo;
          </button>

          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &rsaquo;
          </button>

          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>

          <span className="pagination-info">
            Page {currentPage} of {totalPages} &nbsp;|&nbsp; {tickets.length} total tickets
          </span>
        </div>
      )}
    </div>
  );
}

export default ViewTickets;