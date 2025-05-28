// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log('Phishy Shield extension installed/updated.');
  // You could set up default blacklist/settings here on first install
  // chrome.storage.local.get(['blacklist'], (result) => {
  //   if (!result.blacklist) {
  //     chrome.storage.local.set({ blacklist: [] });
  //   }
  // });
});

// Optional: Listen for messages if needed for more complex interactions
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.type === "SOME_ACTION") {
//     // Do something
//     sendResponse({ status: "done" });
//   }
//   return true; // Indicates you wish to send a response asynchronously
// });