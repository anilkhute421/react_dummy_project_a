import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import Delete from "../../components/Delete";
import ToggleSwitch from "../../components/ToggleSwitch";
import { deleteMenuGroup, deleteQRCode } from "../../services/Collection";
import { getErrorMessage } from "../../Utils/ErrorMessage";
import { QRCodeIcon } from "../../Utils/Images";
import EditQR from "./QRCode/EditQR";
import ViewQR from "./QRCode/ViewQR";
import EditMenuGroup from "./QRMenuGroup/EditMenuGroup";
import ViewMenuGroup from "./QRMenuGroup/ViewMenuGroup";

export default function QRTable({ header, tableData, action }) {
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
            {el.key === "Action" && action.apply ? (
              <TableAction action={action} data={body} />
            ) : el.key === "Toggle" && action.apply && action.toggle ? (
              <TableToggle data={body} />
            ) : el.key === "QR_Code" ? (
              <img src={QRCodeIcon} alt="QR" />
            ) : el.key === "group_type" && body.group_type === "2" ? (
              "Takeaway"
            ) : el.key === "group_type" && body.group_type === "1" ? (
              "Dine"
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
  const [openViewQR, setOpenViewQR] = useState(false);
  const [openEditQR, setOpenEditQR] = useState(false);
  const [openViewQRMenuGroup, setOpenViewQRMenuGroup] = useState(false);
  const [openEditQRMenuGroup, setOpenEditQRMenuGroup] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const OpenViewSection = () => {
    if (action.actionOfView === "OpenViewQR") {
      setOpenViewQR(true);
    }
    if (action.actionOfView === "OpenViewQRMenuGroup") {
      setOpenViewQRMenuGroup(true);
    }
  };

  const openEditSection = () => {
    if (action.actionOfEdit === "openEditQR") {
      setOpenEditQR(true);
    }
    if (action.actionOfEdit === "OpenEditQRMenuGroup") {
      setOpenEditQRMenuGroup(true);
    }
  };

  const handleConfirm = async (id) => {
    if (action.actionOfDelete === "OpenDeleteQRMenuGroup") {
      setLoading(true);

      let res = await deleteMenuGroup(id);
      if (res.status === 200) {
        setLoading(false);
        setOpenDelete(false);
        action.fetchData();
        toast.info(res.message);
      } else {
        const message = getErrorMessage(res, "Failed to connection");
        setLoading(false);
        setOpenDelete(false);
        toast.error(message);
      }
    }

    if (action.actionOfDelete === "openDeleteQR") {
      setLoading(true);

      let res = await deleteQRCode(id);
      if (res.status === 200) {
        setLoading(false);
        setOpenDelete(false);
        action.fetchData();
        toast.info(res.message);
      } else {
        const message = getErrorMessage(res, "Failed to connection");
        setLoading(false);
        setOpenDelete(false);
        toast.error(message);
      }
    }
  };

  return (
    <ActionDiv>
      {openEditQRMenuGroup && (
        <EditMenuGroup
          open={openEditQRMenuGroup}
          handleClose={() => setOpenEditQRMenuGroup(false)}
          payload={data}
          fetchData={action.fetchData}
        />
      )}
      {openViewQRMenuGroup && (
        <ViewMenuGroup
          open={openViewQRMenuGroup}
          handleClose={() => setOpenViewQRMenuGroup(false)}
          payload={data}
        />
      )}

      {openDelete && (
        <Delete
          open={openDelete}
          handleClose={() => setOpenDelete(false)}
          payload={data}
          handleConfirm={handleConfirm}
        />
      )}

      {openEditQR && (
        <EditQR
          handleClose={() => setOpenEditQR(false)}
          payload={data}
          fetchData={action.fetchData}
        />
      )}
      {openViewQR && (
        <ViewQR
          open={openViewQR}
          handleClose={() => setOpenViewQR(false)}
          payload={data}
        />
      )}
      {action.view && <i className="icon-View" onClick={OpenViewSection} />}
      {action.edit && <i className="icon-Edit" onClick={openEditSection} />}
      {action.delete && (
        <i className="icon-Delete" onClick={() => setOpenDelete(true)} />
      )}
    </ActionDiv>
  );
};

export const ActionDiv = styled.div`
  i {
    font-size: 16px;
    margin: 0 3px;
    cursor: pointer;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
  overflow-y: hidden;
}
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 0;

  thead {
    height: 42px;
    background: #f55a2c;
  }

  .forMargin {
    margin: 4px 0;
  }
`;

const THead = styled.tr`
  width: 100%;
  border-radius: 6px;

  th {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    &:first-child {
      border-radius: ${({ dir }) => dir === "ltr" && "6px 0 0 6px"};
      border-radius: ${({ dir }) => dir === "rtl" && "0 6px 6px 0"};
    }
    &:last-child {
      border-radius: ${({ dir }) => dir === "ltr" && "0 6px 6px 0"};
      border-radius: ${({ dir }) => dir === "rtl" && "6px 0 0 6px"};
    }
  }
`;

const TBody = styled.tr`
  width: 100%;

  td {
    text-align: center;
    background: #fcfdfe;
    height: 42px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    border: 1px solid #f0f1f7;
    border-right: 0px;
    border-left: 0px;
    &:first-child {
      border-radius: ${({ dir }) => dir === "ltr" && "6px 0 0 6px"};
      border-radius: ${({ dir }) => dir === "rtl" && "0 6px 6px 0"};
      border-left: ${({ dir }) => dir === "ltr" && "1px solid #f0f1f7"};
      border-right: ${({ dir }) => dir === "rtl" && "1px solid #f0f1f7"};
    }
    &:last-child {
      border-radius: ${({ dir }) => dir === "ltr" && "0 6px 6px 0"};
      border-radius: ${({ dir }) => dir === "rtl" && "6px 0 0 6px"};
      border-right: ${({ dir }) => dir === "ltr" && "1px solid #f0f1f7"};
      border-left: ${({ dir }) => dir === "rtl" && "1px solid #f0f1f7"};
    }
  }
`;
