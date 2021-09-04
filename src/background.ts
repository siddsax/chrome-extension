import { MessageTypes } from "./types";

// async function getCurrentTab() {
//   let queryOptions = { active: true, currentWindow: true };
//   let [tab] = await chrome.tabs.query(queryOptions);
//   return tab;
// }

const sendSnowStatus = (snowing: boolean) => {
  const message = { type: "SNOW_STATUS", snowing };

  // send message to popup
  chrome.runtime.sendMessage(message);

  // send message to every active tab
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, message);
      }
    });
  });
};

let snowing = false;

// Get locally stored value
chrome.storage.local.get("snowing", (res) => {
  if (res["snowing"]) {
    snowing = true;
  } else {
    snowing = false;
  }
});

chrome.runtime.onMessage.addListener((message: MessageTypes) => {
  console.log("**********");
  switch (message.type) {
    case "REQ_SNOW_STATUS":
      sendSnowStatus(snowing);
      break;
    case "TOGGLE_SNOW":
      snowing = message.snowing;
      chrome.storage.local.set({ snowing: snowing });
      sendSnowStatus(snowing);
      break;
    default:
      break;
  }
});

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log("Outside");
//   if (request.todo == "showPageAction") {
//     console.log("Inside this shit");
//     // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     //   chrome.pageAction.show(tabs[0].id);
//     // });
//   }
// });
