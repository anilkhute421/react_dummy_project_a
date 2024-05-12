import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import Delete from "../../components/Delete";
import { deleteOrderItem } from "../../services/Collection";
import { AddOns, SpecialNotes } from "../../style/Gobalstyle";
import { getErrorMessage } from "../../Utils/ErrorMessage";
import IntlMessage from "../../Utils/IntlMessage";
import EditItem from "./EditItem";

import { Table, TableWrapper, TBody, THead } from "./OrderStyle";

export default function OrderTable({
  header,
  tableData,
  action,
  subheader,
  subcontents,
}) {
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
            subheader={subheader}
            subcontents={subcontents}
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
        <th style={{ padding: "0 10px" }} key={index}>{item.id}</th>
      ))}
    </THead>
  );
};

const TableBody = ({ body, header, action, dir, subheader, subcontents }) => {
  const navigate = useNavigate();
  return (
    <tbody className="tbody">
      <TBody dir={dir}>
        {header.map((el) => ( 
          
          <td style={{ padding: "0 10px" }}>
            {el.key === "payment_status" && body[el.key] === "1" ? (
              <span style={{ color: "red" }}>Pending</span>
            ) : el.key === "payment_status" && body[el.key] === "2" ? (
              <span style={{ color: "#008726" }}>Paid</span>
            ) : el.key === "payment_status" && body[el.key] === "3" ? (
              <span style={{ color: "red" }}>Cancel</span>
            ) : el.key === "Action" && action.apply && action.showDetail ? (
              <TableAction action={action} data={body} />
            ) : el.key === "mode_of_payment" && body[el.key] === "1" ? (
              "Cash"
            ) : el.key === "mode_of_payment" && body[el.key] === "2" ? (
              "Card"
            ) : el.key === "mode_of_payment" && body[el.key] === "3" ? (
              "Aglut"
            ) : el.key === "mode_of_payment" && body[el.key] === "4" ? (
              "Multiple"
            ): el.key === "order_date" ? (
                moment(new Date((body[el.key]) * 1000)).format("DD-MM-YYYY")
            ):el.key === "order_time" ? (
                moment(new Date((body[el.key]) * 1000)).format("hh:mm")
            ):(
              body[el.key]
              )}
          </td>
        ))}

      </TBody>
      <div className="forMargin" />
      {subheader.length > 0 && subcontents && (
        <>
          <td
            colSpan={6}
            style={{
              width: "100%",
              textAlign: "end",
            }}
          >
            {action.type !== "Takeaway" && (
              <AddButtonWrapper>
                <span
                  onClick={() =>
                    navigate(`/aglut/orders/OrderDetails/addItems/:${body.id}`)
                  }
                >
                  +<IntlMessage id="button.addItem" />
                </span>
              </AddButtonWrapper>
            )}
          </td>
          <tr>
            <td colSpan={6}>
              <SubTable>
                <thead>
                  <SubHead dir={dir}>
                    {subheader.map((item, index) => (
                      <th style={{ padding: "0 5px" }} key={index}>{item.id}</th>
                    ))}
                  </SubHead>
                </thead>
                <div className="forMargin" />
                {subcontents.map((item, index) => (
                  <>
                    <TBody dir={dir}>
                      {subheader.map((el) => (
                        <>
                          <td style={{ padding: "0 5px" }}>
                            {el.key === "Action" && action.apply && item.amount > 0 ? (
                              <TableAction
                                action={action}
                                data={body}
                                subcontents={item}
                                index={index}
                              />
                            ) : el.key === "Item" ? (
                              <span>
                                {item.veg ? (
                                  <span
                                    class="icon-Veg"
                                    style={{ margin: "0 8px" }}
                                  >
                                    <span class="path1"></span>
                                    <span class="path2"></span>
                                    <span class="path3"></span>
                                  </span>
                                ) : (
                                  <i
                                    class="icon-NonVeg"
                                    style={{ margin: "0 8px" }}
                                  >
                                    <span class="path1"></span>
                                    <span class="path2"></span>
                                    <span class="path3"></span>
                                  </i>
                                )}
                                {item[el.key]}
                              </span>
                            ): el.key === "payment_status" &&
                            item.amount === 0 ? (
                            <span style={{ color: "green" }}>Free Item</span>
                          ) : el.key === "payment_status" &&
                              item[el.key] === "1" ? (
                              <span style={{ color: "red" }}>Pending</span>
                            ) : el.key === "payment_status" &&
                              item[el.key] === "2" ? (
                              <span style={{ color: "#008726" }}>Paid</span>
                            ) : el.key === "payment_status" &&
                              item[el.key] === "3" ? (
                              <span style={{ color: "red" }}>Cancel</span>
                            )  : (
                              item[el.key]
                            )}
                            {el.key === "item_name" && (
                              <>
                                {item?.OrderItemAddOns.map((el) => (
                                  <AddOns>
                                    <span>{el?.option_group_name}</span>
                                    <span>({el?.option_item_name})</span>
                                  </AddOns>
                                ))}
                                <SpecialNotes>
                                  <p>{item?.special_notes}</p>
                                </SpecialNotes>
                              </>
                            )}
                          </td>
                        </>
                      ))}
                    </TBody>
                    <div className="forMargin" />
                  </>
                ))}
              </SubTable>
            </td>
          </tr>
        </>
      )}
    </tbody>
  );
};

const TableAction = ({ action, data, subcontents, index }) => {
  const navigate = useNavigate();
  const [openEditItem, setOpenEditItem] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [sendMainDataToEdit, setSendMainDataToEdit] = useState({});
  const [sendIndvisualDataToEdit, setSendIndvisualDataToEdit] = useState({});

  const DeleteOrderItems = async (id) => {
    // setLoading(true);
    let res = await deleteOrderItem(id);
    if (res.status === 200) {
      // setLoading(false);
      setOpenDelete(false);
      action.dataFetch();
      toast.info(res.message);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      // setLoading(false);
      setOpenDelete(false);
      toast.error(message);
    }
  };

  const EditOrderItem = (data, subcontents) => {
    setSendMainDataToEdit(data);
    setSendIndvisualDataToEdit(subcontents);
    setOpenEditItem(true);
  };

  return (
    <ActionDiv>
      {openEditItem && (
        <EditItem
          open={openEditItem}
          data={sendMainDataToEdit}
          selectedData={sendIndvisualDataToEdit}
          dataFetch={action.dataFetch}
          handleClose={() => setOpenEditItem(false)}
        />
      )}
      {openDelete && (
        <Delete
          open={openDelete}
          handleClose={() => setOpenDelete(false)}
          payload={subcontents}
          handleConfirm={DeleteOrderItems}
        />
      )}
      {action.view && <i className="icon-View" />}
      {action.showDetail && (
        <ShowDetail
          onClick={() => navigate(`/aglut/orders/completed/details/${data.id}`)}
        >
          Show Details
        </ShowDetail>
      )}
      {action.edit && data?.OrderItems[index]?.payment_status === "1" && (
        <i
          className="icon-Edit"
          onClick={() => EditOrderItem(data, subcontents)}
        />
      )}
      {action.delete && data?.OrderItems[index]?.payment_status === "1" && (
        <i className="icon-Delete" onClick={() => setOpenDelete(true)} />
      )}
    </ActionDiv>
  );
};

const AddButtonWrapper = styled.div`
  span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    color: #f55a2c;
  }
`;

const ShowDetail = styled.div`
  background: #e1e1e1;
  border: 1px solid #b9b9b9;
  border-radius: 10px;
  padding: 8px 16px;
  cursor: pointer;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;

  color: #515151;
`;

export const ActionDiv = styled.div`
  display: flex;
  justify-content: center;
  i {
    font-size: 16px;
    margin: 0 3px;
    cursor: pointer;
  }
`;

const SubHead = styled.tr`
  width: 100%;
  border-radius: 6px;

  th {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;

    color: #353535;

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

const SubTable = styled.table`
  width: 100%;
  border-spacing: 0;

  thead {
    height: 42px;
    background: #e2e2e2;
  }

  .forMargin {
    margin: 4px 0;
  }
`;

const ShowHide = styled.div`
  width: 55px;
  background: #ffffff;
  border: 1px solid #f55a2c;
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 5px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  padding: 6px 14px;
  color: #f55a2c;
  cursor: pointer;
`;
