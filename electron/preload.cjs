const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("silverCompanion", {
  platform: process.platform,
});
