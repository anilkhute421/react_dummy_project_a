import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Delete from "../../components/Delete";
import { deleteDiscount } from "../../services/Collection";
import { getErrorMessage } from "../../Utils/ErrorMessage";
import ViewDiscount from "../Discount/ViewDiscount";
import {
  ActionDiv,
  Table,
  TableWrapper,
  TBody,
  THead,
} from "../Invoices/InvoicesStyle";

export default function DiscountTable({ header, tableData, action }) {
  const direction = useSelector((state) => state.languageDirection.direction);
  return (
    <TableWrapper>
      <Table>
        <thead>
          <TableHeader data={header} dir={direction} />
        </thead>
        <div className="forMargin" />
        {tableData.map((item, index) => (
          <TableBody
            header={header}
            body={item}
            action={action}
            index={index}
            id={item.id}
            dir={direction}
          />
        ))}
      </Table>
    </TableWrapper>
  );
}

const TableHeader = ({ data, dir }) => {
  return (
    <THead dir={dir}>
      {data.map((item, index) => (
        <th key={index}>{item.id}</th>
      ))}
    </THead>
  );
};

const TableBody = ({ body, header, action, index, id, dir }) => {
  return (
    <tbody className="tbody">
      <TBody dir={dir}>
        {header.map((el) => (
          <td style={{ padding: "0 5px" }}>
            {el.key === "SrNo" ? (
              index + 1
            ) : el.key === "discount_type" && body[el.key] === "1" ? (
              "Item Free"
            ) : el.key === "discount_type" && body[el.key] === "2" ? (
              "Item Price Discount"
            ) : el.key === "discount_type" && body[el.key] === "3" ? (
              "Total Price Discount"
            ) : el.key === "action" && action.apply ? (
              <TableAction action={action} data={body} />
            ) : (
              body[el.key]
            )}
          </td>
        ))}
      </TBody>
      <div className="forMargin" />
    </tbody>
  );
};

const TableAction = ({ action, data }) => {
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const [openViewDiscount, setOpenViewDiscount] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (id) => {
    setLoading(true);

    let res = await deleteDiscount(id);
    if (res.status === 200) {
      setLoading(false);
      setOpenDelete(false);
      action.fetchdata();
      toast.info(res.message);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      setLoading(false);
      setOpenDelete(false);
      toast.error(message);
    }
  };

  return (
    <ActionDiv>
      {openDelete && (
        <Delete
          open={openDelete}
          handleClose={() => setOpenDelete(false)}
          payload={data}
          handleConfirm={handleConfirm}
        />
      )}

      {openViewDiscount && (
        <ViewDiscount
          type={data}
          open={openViewDiscount}
          handleClose={() => setOpenViewDiscount(false)}
        />
      )}

      {action.view && (
        <i className="icon-View" onClick={() => setOpenViewDiscount(true)} />
      )}

      {action.edit && (
        <i
          className="icon-Edit"
          onClick={() => navigate(`/aglut/discount/edit/${data.id}`)}
        />
      )}
      {action.delete && (
        <i className="icon-Delete" onClick={() => setOpenDelete(true)} />
      )}
    </ActionDiv>
  );
};
