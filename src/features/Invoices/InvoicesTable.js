import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ActionDiv, Table, TableWrapper, TBody, THead } from "./InvoicesStyle";

export default function InvoicesTable({ header, tableData, action }) {
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
  //   const [show, setShow] = useState();
  //   const navigate = useNavigate();
  //   const [openDelete, setOpenDelete] = useState();
  //   const [deleteData, setDeleteData] = useState({});
  //   const handleClickAway = () => {
  //     setShow(false);
  //   };


  return (
    <tbody className="tbody">
      <TBody dir={dir}>
        {header.map((el) => (
          <td style={{ padding: "0 5px" }}>
            {el.key === "SrNo" ? (
              index + 1
            ) : el.key === "Track_ID" && body[el.key] === "#5893366" ? (
              <span style={{ color: "red" }}>{body[el.key]}</span>
            ) : el.key === "Status" && body[el.key] === "Pending" ? (
              <span style={{ color: "red" }}>{body[el.key]}</span>
            ) : el.key === "Status" && body[el.key] === "Paid" ? (
              <span style={{ color: "#008726" }}>{body[el.key]}</span>
            ) : el.key === "Action" && action.apply ? (
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

const TableAction = ({ action }) => {
    const navigate =  useNavigate()

  return (
    <ActionDiv>
      {action.view && <i className="icon-View" onClick={()=>navigate("/aglut/payment/invoicesdetails/123")} />}
      {action.edit && <i className="icon-Edit" />}
      {action.delete && <i className="icon-Delete" />}
    </ActionDiv>
  );
};
