import styled from "styled-components";



export const PlanDetails = styled.div`
display: flex;
justify-content: space-between;

div {
  margin: 5px 0;
}
label {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.08em;
  color: #000000;
}

span {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.08em;
  color: #646464;
  margin: 0 10px;
}

@media (max-width: 600px){

  display:unset;
}
`;

export const Currentplan = styled.div`
display: flex;
justify-content: space-between;

header {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.05em;
  color: #000000;
}

label {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.08em;
  color: #000000;
  margin: 0 2px;
}

span {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.08em;
  color: #646464;
  margin: 0 5px;
}

@media (max-width: 600px){
  display: unset;
}
`;




export const ActionDiv = styled.div`
  i {
    font-size: 16px;
    margin: 0 3px;
    cursor: pointer;
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








