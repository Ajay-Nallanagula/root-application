import { registerApplication, start, LifeCycles } from "single-spa";
//import {publicApiFunction} from 'utility-microapp'

//THIS IS BOILER PLATE
// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import<LifeCycles>(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"],
// });

// const landingApp = {
//   bootstrap: () => Promise.resolve(), //bootstrap function
//   mount: () => Promise.resolve(() => "<div>Landing Page</div>"), //mount function
//   unmount: () => Promise.resolve(), //unmount function
// };

// const landingApp = {
//   bootstrap: async () => {}, //bootstrap function
//   mount: async () => {
//     console.log("Hello World!!");
//     document.getElementById("root").innerHTML =
//       "<div><h2>This is Landing Page</h2></div>";
//   }, //mount function
//   unmount: async () => {
//     document.getElementById("root").innerHTML = "";
//   }, //unmount function
//   unload: async () => {
//     //unload is optional
//   },
// };

const landingApp = {
  bootstrap: () => {
    console.log("bootstrap lifecycle stage");
    return Promise.resolve();
  },
  mount: () => {
    console.log("Mount lifecycle Stage");
    document.getElementById("root").innerHTML =
      "<div><h2>This is Landing Page</h2></div>";
    return Promise.resolve();
  },
  unmount: async () => {
    console.log("UnMount lifecycle Stage");
    document.getElementById("root").innerHTML = "";
    //return Promise.resolve();
  },
  unload: () => {
    console.log("unload lifecycle Stage");
    return Promise.resolve();
  },
};

registerApplication({
  name: "header-title",
  app: landingApp,
  activeWhen: ["/"], //(location) => location.pathname.startsWith("/"),
});

registerApplication({
  name: "first-react-app",
  app: () => {
    return System.import<LifeCycles>(
      "http://localhost:8080/firstReactMicroapp-first-example-microapp.js"
    );
  },
  activeWhen: ["/app1"],
});

registerApplication({
  name: "second-react-microapp",
  app: () => {
    return System.import<LifeCycles>(
      "http://localhost:8081/secondMicroapp-second-mfe.js"
    );
  },
  activeWhen: ["/app2"],
});

// registerApplication({
//   name: "@single-spa-practice/navbar",
//   app: () => System.import("@single-spa-practice/navbar"),
//   activeWhen: ["/"]
// });

start({
  urlRerouteOnly: true,
});
