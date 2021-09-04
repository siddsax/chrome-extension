chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Outside");
  console.log(request);
  //   if (request.todo == "showPageAction") {
  console.log("Inside this shit");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //   chrome.pageAction.show(tabs[0].id);
    console.log(tabs);
  });
  //   }
});

chrome.runtime.sendMessage({ todo: "showPageAction" });
console.log("Testing");
