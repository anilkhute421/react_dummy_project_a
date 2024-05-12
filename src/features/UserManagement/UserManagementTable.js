import React, { useState } from "react";
import { useSelector } from "react-redux";
import Delete from "../../components/Delete";
import ToggleSwitch from "../../components/ToggleSwitch";
import {
  ActionDiv,
  Table,
  TableWrapper,
  TBody,
  THead,
} from "../Menu/MenuStyle";
import EditUser from "./EditUser";
import { deleteUserManagement } from "../../services/Collection";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../Utils/ErrorMessage";

export default function UserManagementTable({
  header,
  tableData,
  action,
  updateRolesOfTrue,
}) {
  const direction = useSelector((state) => state.languageDirection.direction);

  const nextUpdateRolesOfTrue = (payload, selectedSection, status) => {
    updateRolesOfTrue(payload, selectedSection, status);
  };

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
            nextUpdateRolesOfTrue={nextUpdateRolesOfTrue}
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

const TableBody = ({
  body,
  header,
  action,
  id,
  dir,
  nextUpdateRolesOfTrue,
}) => {
  const updateRolesOfTrue = (payload, selectedSection, status) => {
    nextUpdateRolesOfTrue(payload, selectedSection, status);
  };

  return (
    <tbody className="tbody">
      <TBody dir={dir}>
        {header.map((el) => (
          <td style={{ padding: "0 5px" }}>
            {el.key === "Action" && action.apply ? (
              <TableAction action={action} data={body} />
            ) : el.key === "Toggle" && action.apply && action.toggle ? (
              <TableToggle data={body} />
            ) : body[el.key] === true ? (
              <i
                className="icon-Tick"
                onClick={() => updateRolesOfTrue(body, el.key, body[el.key])}
              />
            ) : body[el.key] === false ? (
              <i
                className="icon-Cross"
                onClick={() => updateRolesOfTrue(body, el.key, body[el.key])}
              />
            ) : el.key === "role" && body[el.key] === "1" ? (
              <span style={{ color: "red", fontWeight: "500" }}>Owner</span>
            ) : el.key === "role" && body[el.key] === "2" ? (
              <span style={{ color: "#0070AF", fontWeight: "500" }}>Staff</span>
            ) : el.key === "role" ? (
              <span style={{ color: "#f55a2c", fontWeight: "600" }}>
                {" "}
                {body[el.key]}{" "}
              </span>
            ) : el.key === "Email" ? (
              <span style={{ textDecoration: "underline" }}>
                {body[el.key]}
              </span>
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

const TableToggle = ({ data }) => {
  return <>{data.active && <ToggleSwitch label={data.Sort_OrderID} />}</>;
};

const TableAction = ({ action, data }) => {
  const [openEditSectionItem, setOpenEditSectionItem] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleConfirm = async (id) => {
    setLoading(true);

    let res = await deleteUserManagement(id);
    if (res.status === 200) {
      setLoading(false);
      setOpenDelete(false);
      action.alldata();
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
      {openEditSectionItem && (
        <EditUser
          open={openEditSectionItem}
          handleClose={() => setOpenEditSectionItem(false)}
          payload={data}
          fetchdata={action.alldata}
        />
      )}

      {openDelete && (
        <Delete
          open={openDelete}
          handleClose={() => setOpenDelete(false)}
          handleConfirm={handleConfirm}
          payload={data}
          loading={loading}
        />
      )}
      {action.edit && (
        <i className="icon-Edit" onClick={() => setOpenEditSectionItem(true)} />
      )}
      {action.delete && (
        <i className="icon-Delete" onClick={() => setOpenDelete(true)} />
      )}
    </ActionDiv>
  );
};
