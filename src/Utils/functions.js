export const getNotificationMsg = (dineIn , msg) => {
  if ((dineIn ?? []).length) {
    const updatedDineIn = dineIn?.map((el) => {
      const qr = el;
      if (qr?.QrCodes?.length) {
        const updatdQr = qr?.QrCodes?.map((orderEl) => {
          const orders = orderEl;
          if (orders?.Orders?.length) {
            const abcd = orders?.Orders?.map((orderId) => {
              const orderObj = orderId;
              if (
                orderObj?.order_id &&
                msg?.length > 0 &&
                msg?.filter(({ order_id }) => order_id === orderObj?.order_id)
                  .length
              ) {
                orderObj.message =
                  msg?.filter(
                    (filterEl) => filterEl?.order_id === orderObj?.order_id
                  ) ?? [];
              } else {
                orderObj.message = [];
              }
              return orderObj;
            });

            return { ...orders, Orders: abcd };
          } else {
            orders.Orders = [];
          }
          return orders;
        });
        qr.QrCodes = updatdQr;
      }
      return qr;
    });

    return updatedDineIn;
  }

  return [];
};
