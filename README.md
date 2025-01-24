# Chess Game with Real-Time Multiplayer

This is a simple real-time multiplayer chess game built using **Node.js**, **Socket.IO**, and **Chess.js**. The frontend uses **HTML**, **CSS**, and **TailwindCSS** for styling.

## Features

- **Real-time multiplayer:** Play chess with another player online.
- **Turn-based logic:** Automatically switches turns between players.
- **Spectator mode:** Additional connections are treated as spectators.
- **Drag-and-drop interface:** Move chess pieces with a simple drag-and-drop interaction.
- **Responsive design:** Chessboard adapts to different screen sizes.

---

## How It Works

### Server-Side (Backend)
- Built with **Express.js** for serving static files and rendering pages.
- Uses **Socket.IO** for real-time communication between players and spectators.
- Chess rules and validations are handled using the **Chess.js** library.

### Client-Side (Frontend)
- Displays a chessboard using CSS grid.
- Player actions are handled via drag-and-drop events.
- Turn-based updates and board state are synchronized using Socket.IO events.

---

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Server**
   ```bash
   npm start
   ```
   The server will start at `http://localhost:3000`.

4. **Open in Browser**
   Navigate to `http://localhost:3000` in your web browser.

---

## Project Structure

```
.
├── public/
│   ├── js/
│   │   └── chessgame.js    # Frontend logic for the chessboard
│   └── styles.css          # Additional CSS (if any)
├── views/
│   └── index.ejs           # Main HTML file with EJS templating
├── app.js                  # Main server file
├── package.json            # Project metadata and dependencies
└── README.md               # Documentation (this file)
```

---

## Usage

1. **Player Roles:**
   - The first user to connect is assigned the "White" player.
   - The second user is assigned the "Black" player.
   - Any additional connections will join as spectators.

2. **Game Interaction:**
   - Drag and drop pieces to make a move.
   - The turn indicator at the top of the screen shows whose turn it is.

3. **Spectators:**
   - Spectators can view the game in real-time but cannot make moves.

---

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - Socket.IO
  - Chess.js

- **Frontend:**
  - HTML
  - CSS (TailwindCSS)
  - JavaScript

---

## Future Improvements

- Add player authentication and profiles.
- Implement timers for turn limits.
- Allow game saving and resuming using FEN strings.
- Add support for AI-based opponents.
- Improve mobile responsiveness.

---

## License

This project is licensed under the MIT License. Feel free to use and modify it as per your needs.

---

## Contributing

Contributions are welcome! If you have suggestions or encounter any issues, please open an issue or submit a pull request.

---

## Acknowledgments

- [Chess.js](https://github.com/jhlywa/chess.js) for chess logic and rules.
- [Socket.IO](https://socket.io/) for real-time communication.
- [TailwindCSS](https://tailwindcss.com/) for modern styling.

---

**Enjoy playing chess!**
