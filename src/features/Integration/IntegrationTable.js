import { values } from "pusher-js";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import { UnsyncingResItemWithPosItem } from "../../services/Collection";
import { getErrorMessage } from "../../Utils/ErrorMessage";


export default function IntegrationTable({ header, tableData, action }) {
  const direction = useSelector((state) => state.languageDirection.direction);

  return (
    <TableWrapper>
      <Table>
        <thead>
          <TableHeader data={header} dir={direction} />
        </thead>
        <div className="forMargin" />
        {tableData?.map((item, index) => (
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
            {el.key === "Action" && action.apply ? (
              <TableAction action={action} data={body} />
            ) : el.id === "Names" ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "center",
                }}
              >
                {body[el.key]}
              </div>
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

  const unSyncPOSitems = async (values) => {

    let req = {
      item_price_id: values.individualPriceID,
      item_id: values.id
    }

    let res = await UnsyncingResItemWithPosItem(req);
    if (res.status === 200) {
      action.fetchData()
      toast.info(res.message);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
    }
  }

  return (
    <ActionDiv>
      {action.unlink && <span onClick={() => unSyncPOSitems(data)} >Unlink</span>}
      {action.view && <i className="icon-View" />}
      {action.edit && <i className="icon-Edit" />}
      {action.delete && (
        <i className="icon-Delete" />
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

  span {
    color: #f55a2c;
    cursor:pointer;
  }
`;


export const TableWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
  overflow-y: hidden;
`;

export const Table = styled.table`
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

export const THead = styled.tr`
  width: 100%;
  border-radius: 6px;

  th {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    padding: 0 5px;
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

export const TBody = styled.tr`
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