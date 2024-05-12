import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { aqlutstorage, containerProfile } from "../Utils/ContainerPath";

export default function Test() {
  const RestaurentInfo = useSelector(
    (state) => state.profileDetails.restaurantDetails
  );

  document.addEventListener("DOMContentLoaded", function () {
    if (!Notification) {
      alert(
        "Desktop notifications not available in your browser. Try Chromium."
      );
      return;
    }

    if (Notification.permission !== "granted") Notification.requestPermission();
  });

  function notifyMe() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    // Let's check if the user is okay to get some notification
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification

      const image =
        `${aqlutstorage}` + `${containerProfile}` + `${RestaurentInfo?.logo}`;

      const text = `HEY! Your task "${RestaurentInfo?.name}" is now overdue.`;
      const notification = new Notification(`${RestaurentInfo?.name}`, {
        body: text,
        icon: image,
      });
    }

    // Otherwise, we need to ask the user for permission
    // Note, Chrome does not implement the permission static property
    // So we have to check for NOT 'denied' instead of 'default'
    else if (Notification.permission !== "denied") {
      Notification.requestPermission(function (permission) {
        // Whatever the user answers, we make sure we store the information
        if (!("permission" in Notification)) {
          Notification.permission = permission;
        }

        // If the user is okay, let's create a notification
        if (permission === "granted") {
          const image =
            `${aqlutstorage}` +
            `${containerProfile}` +
            `${RestaurentInfo?.logo}`;
          new Notification(
            `Notifications from ${RestaurentInfo?.name} have been allowed`,
            {
              icon: image,
            }
          );
        }
      });
    } else {
      alert(
        `Permission is ${Notification.permission}, Please enable notification`
      );
    }
  }

  return (
    <div>
      <h1>Hey, I am Test </h1>
      <button onClick={notifyMe}>Notify me!</button>
    </div>
  );
}
