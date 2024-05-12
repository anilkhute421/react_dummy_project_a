import React from "react";
import { useNavigate } from "react-router-dom";
import { BoxContainer, SubHeader } from "../../style/Gobalstyle";
import {
  IntegrationPOS,
  IntegrationPrinter,
  IntegrationWIFI,
} from "../../Utils/Images";
import IntlMessage from "../../Utils/IntlMessage";
import { Card, CardWrapper } from "./IntegrationStyle";

export default function Integration() {
  const navigate = useNavigate();
  const CardDetails = [
    {
      heading: "Micros simphony POS",
      content: "Dummy Text",
      href: "microssimphonyPOS",
      backgroundImage: `${IntegrationPOS}`,
    },
    {
      heading: "Receipts Printer",
      content: "Dummy Text",
      href: "receiptsprinter",
      backgroundImage: `${IntegrationPrinter}`,
    },
    {
      heading: "Wifi alert device",
      content: "Dummy Text",
      href: "wifialertdevice",
      backgroundImage: `${IntegrationWIFI}`,
    },
  ];

  const gotoNextpages = (link) => {
    navigate(`/aglut/integration/${link}`);
  };
  
  return (
    <div>
      <SubHeader>
        <p>
          <IntlMessage id="integrationModule.Heading" />
        </p>
      </SubHeader>
      <BoxContainer>
        <CardWrapper style={{ minHeight: 400 }}>
          {CardDetails &&
            CardDetails.map((el) => (
              <Card
                backgroundImage={el.backgroundImage}
                onClick={() => gotoNextpages(el.href)}
              >
                <header>{el.heading}</header>
                <p>{el.content}</p>
              </Card>
            ))}
        </CardWrapper>
      </BoxContainer>
    </div>
  );
}
