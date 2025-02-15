interface PaginationProps {
  page: number; // Current page (0-based)
  totalPages: number; // Total number of pages
  onPageChange: (page: number) => void; // Callback when a page is clicked
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  // Helper function to generate page buttons
  const getPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;

    if (totalPages <= maxVisibleButtons) {
      // Show all pages if total pages are within the limit
      for (let i = 0; i < totalPages; i++) {
        buttons.push(i);
      }
    } else {
      // Show a truncated version with ellipsis
      if (page <= 2) {
        buttons.push(0, 1, 2, -1, totalPages - 1); // -1 represents the ellipsis
      } else if (page >= totalPages - 3) {
        buttons.push(0, -1, totalPages - 3, totalPages - 2, totalPages - 1);
      } else {
        buttons.push(0, -1, page - 1, page, page + 1, -1, totalPages - 1);
      }
    }

    return buttons;
  };

  const buttons = getPaginationButtons();

  return (
    <div className="join">
      {buttons.map((btn, index) => {
        if (btn === -1) {
          // Ellipsis button
          return (
            <button key={index} className="join-item btn btn-disabled">
              ...
            </button>
          );
        }

        return (
          <button
            key={index}
            className={`join-item btn ${btn === page ? "btn-active" : ""}`}
            onClick={() => onPageChange(btn)}
            disabled={btn === page}
          >
            {btn + 1}
          </button>
        );
      })}
    </div>
  );
}

