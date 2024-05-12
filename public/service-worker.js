importScripts("https://js.pusher.com/beams/service-worker.js");

// PusherPushNotifications.onNotificationReceived = ({
//     pushEvent,
//     payload,
//     handleNotification,
//   }) => {
//     // Your custom notification handling logic here 🛠️
//     // This method triggers the default notification handling logic offered by
//     // the Beams SDK. This gives you an opportunity to modify the payload.
//     // E.g. payload.notification.title = "A client-determined title!"
//     // pushEvent.waitUntil(()=>{
//         console.log('payload',payload);
//         if ('serviceWorker' in navigator) {
//             navigator.serviceWorker.ready.then((registration) => {
//                 registration.showNotification('Vibration Sample', {
//                   body: 'Buzz! Buzz!',
//                   icon: '../images/touch/chrome-touch-icon-192x192.png',
//                   vibrate: [200, 100, 200, 100, 200, 100, 200],
//                   tag: 'vibration-sample'
//                 });
//               });
//         }else{
//             console.log("svfgh")
//         }
//         return null;
        
//     // });
//   };
