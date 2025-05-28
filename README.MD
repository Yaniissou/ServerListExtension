# Lunar Client Server Manager

A lightweight web app to organize and manage your Minecraft Lunar Client servers with folders and local storage.

## Features

- Create, delete, and reorder folders using drag & drop.
- Add and remove servers within each folder.
- Clickable servers launch Lunar Client directly via their deeplink.
- Data is saved locally in your browser (`localStorage`), so it persists between sessions.
- Simple and intuitive interface.

## How to Use

1. **Create a folder:** Enter a name in the "New Folder" field and click "Add Folder."  
2. **Add a server:** Inside a folder, fill in the server name and IP address, then click "Add Server."  
3. **Launch a server:** Click on a server’s name to open it in Lunar Client using the `lunarclient://` protocol.  
4. **Reorder folders:** Drag and drop folders to rearrange them.  
5. **Delete:** Use the "Delete" buttons to remove folders or servers.

## Data Storage

All your data is stored locally in your browser’s `localStorage`. It remains available on the same device and browser even after closing.

## Notes & Credits

- This app uses Lunar Client’s deeplink URL scheme (`lunarclient://play?serverAddress=...`) to launch servers.  
- Lunar Client is a third-party Minecraft launcher. This manager is independent and just leverages their deeplink feature for convenience.

## Limitations

- No cloud sync or sharing across devices.  
- No import/export functionality (can be added in the future).  
- Data is browser-specific.

## Development & Customization

Built with plain HTML, CSS, and JavaScript for easy customization and extension.

## License

Feel free to use, modify, and distribute freely.

---

Made by Yanissou
