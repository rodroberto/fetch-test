interface PaginationProps {
  pageNumber: number;
  isPrev: boolean,
  isNext: boolean,
  onPrev: () => void;
  onNext: () => void;
}

const pageNumberStyle = {
  display: "flex",
  justifyContent: "center",
  minWidth: "50px",
  border: "1px solid green",
  margin: "5px",
  padding: "5px",
  borderRadius: "6px"
}

const Pagination = ({ pageNumber, isPrev, isNext, onPrev, onNext }: PaginationProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button onClick={onPrev} disabled={!isPrev}>Prev</button>
      <span style={pageNumberStyle}>{pageNumber}</span>
      <button onClick={onNext} disabled={!isNext}>Next</button>
    </div>
  );
};

export default Pagination;
