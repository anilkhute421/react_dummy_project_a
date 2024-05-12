import React, { useMemo, useState } from "react";
import { IntlProvider } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import AppLocale from "./language/languageIndex";
import AglutRoutes from "./routes/AglutRoutes";
import "./style/CustomClasses.css";
import "react-phone-input-2/lib/style.css";
import "react-toastify/dist/ReactToastify.css";
import { useCallback } from "react";
import { getErrorMessage } from "./Utils/ErrorMessage";
import { useEffect } from "react";
import { pusher } from "./pusher/PusherConfig";
import { pusherRealtimeSuccess } from "./pusher/PusherStore";
import { getMessageIdentifier } from "./services/Collection";
import { useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import Sound from "./assets/notification.mp3";
// import Sound from "../public/assets/notification.mp3";

function App() {
  const playButton = useRef();

  const language = useSelector((state) => state.languageDirection.language);
  const currentAppLocale = AppLocale[language];
  const dispatch = useDispatch();
  const audioPlayer = useRef(null);
  const [channel, setChannel] = useState(null);
  const [paymentNotificationChannel, setPaymentNotificationChannel] =
    useState(null);
  const Restaurentid = useSelector(
    (state) => state.profileDetails?.restaurantDetails?.id
  );
  const credentials = useSelector((state) => state.loginAuth.token);

  const getNotification = useCallback(async () => {
    const getAllUnreadNotifications = (data) => {
      if (data.getAllMessage) {
        dispatch(pusherRealtimeSuccess(data.getAllMessage));
        // audioPlayer.current.play();
      } else {
        const message = getErrorMessage("Failed to connection");
        toast.error(message);
      }
      // setLoading(false);
    };

    let res = await getMessageIdentifier();

    if (res) {
      const channel = pusher.subscribe(`All-ChatBoat-messages${Restaurentid}`);
      if (channel) {
        channel.bind(
          `Event-All-ChatBoat-Messages${Restaurentid}`,
          getAllUnreadNotifications
        );
      }
      return () => {
        if (channel) {
          pusher.unsubscribe(`All-ChatBoat-messages${Restaurentid}`);
          channel.unbind(
            `Event-All-ChatBoat-Messagest${Restaurentid}`,
            getAllUnreadNotifications
          );
        }
      };
    }
  }, [dispatch]);

  const playAudio = useCallback(() => {
    if (audioPlayer.current) {
      audioPlayer.current.play();
    }
  }, [audioPlayer]);

  const onPusherData = useCallback(
    (data) => {
      if (data.unReadCount) {
        toast.info(`${data.getOrder}`, { theme: "colored" });
        playButton.current.click();
        dispatch(pusherRealtimeSuccess(data));
        getNotification();
      } else {
        const message = getErrorMessage("Failed to connection");
        toast.error(message);
      }
      // setLoading(false);
    },
    [dispatch, getNotification]
  );

  useMemo(() => {
    if (channel)
      channel.bind(`Event-Sent-Single-Restaurent${Restaurentid}`, onPusherData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel]);

  useEffect(() => {
    if (credentials && Restaurentid) {
      setChannel(
        pusher.subscribe(`Message-Send-Single-Restaurent${Restaurentid}`)
      );

      // setPaymentNotificationChannel(
      //   pusher.subscribe(`Order-Payment${Restaurentid}`)
      // );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credentials, Restaurentid]);

  useEffect(() => {
    console.log("Use Effect");
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <IntlProvider
        locale={currentAppLocale}
        defaultLocale="en"
        messages={currentAppLocale.messages}
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <audio
          ref={audioPlayer}
          src="https://d25msqmb2zw79p.cloudfront.net/notificationsound2.wav"
        />
        <button
          style={{ display: "none" }}
          ref={playButton}
          type="hidden"
          onClick={playAudio}
        />
        <AglutRoutes />
      </IntlProvider>
    </DndProvider>
  );
}

export default App;
