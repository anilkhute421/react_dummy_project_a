import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AddOns, SpecialNotes } from "../../style/Gobalstyle";

export default function FeedbackTable({ header, tableData, action }) {
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
        <th style={{padding: "0 10px"}} key={index}>{item.id}</th>
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
          <td style={{ padding: "0 10px" }}>
            {el.key === "itemSummary" ? (
              <span>
                {body.veg ? (
                  <span class="icon-Veg" style={{ margin: "0 10px" }}>
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </span>
                ) : (
                  <i class="icon-NonVeg">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                )}
                {body[el.key]}
              </span>
            ) : (
              body[el.key]
            )}

            {el.key === "item_name" && (
              <>
                {body?.OrderItemAddOns.map((el) => (
                  <AddOns>
                    <span>{el?.option_group_name}</span>
                    <span>({el?.option_item_name})</span>
                  </AddOns>
                ))}
                <SpecialNotes>
                  <p>{body?.special_notes}</p>
                </SpecialNotes>
              </>
            )}
          </td>
        ))}
      </TBody>
      <div className="forMargin" />
    </tbody>
  );
};

const TableWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
  overflow-y: hidden;

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
