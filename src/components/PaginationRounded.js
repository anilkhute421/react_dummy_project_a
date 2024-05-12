import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationRounded = ({ PaginationRounded, onChangePage }) => {
  return (
    <Stack spacing={1}>
      <Pagination
        count={PaginationRounded}
        variant="outlined"
        shape="rounded"
        onChange={(e, pageNumber) => {
          onChangePage(pageNumber);
        }}
      />
    </Stack>
  );
};
export default PaginationRounded;
