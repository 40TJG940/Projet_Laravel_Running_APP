const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Définissez ici vos méthodes IPC si nécessaire
});