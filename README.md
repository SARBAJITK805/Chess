# Chess Game with React and Socket.IO

## Overview
This is a real-time chess game built using **React** for the frontend and **Node.js** with **Socket.IO** for the backend. The application supports two players (White and Black) and multiple spectators, with live game updates and drag-and-drop functionality for piece movements.

---

## Features
- **Real-Time Gameplay**: Players can play chess in real-time with live updates.
- **Spectator Mode**: Users can join as spectators if both player roles are taken.
- **Drag-and-Drop Moves**: Drag and drop pieces to make moves.
- **Turn Indicator**: Displays whose turn it is.
- **Responsive Design**: Adapted for various screen sizes.

---

## Tech Stack
### Frontend
- **React**: UI and component management
- **Tailwind CSS**: Styling and layout

### Backend
- **Node.js**: Server-side runtime
- **Socket.IO**: Real-time communication
- **chess.js**: Game logic and rules

---

## Setup Instructions

### Prerequisites
- **Node.js** installed on your system
- **npm** or **yarn** for package management

### Steps to Run
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd chess-game
   ```

2. **Install Dependencies**
   Install backend dependencies:
   ```bash
   npm install
   ```
   Navigate to the `client` directory and install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

3. **Run the Backend Server**
   ```bash
   npm start
   ```
   This starts the server on `http://localhost:3000`.

4. **Run the React Frontend**
   In the `client` directory, start the React development server:
   ```bash
   npm start
   ```

5. **Play the Game**
   Open `http://localhost:3000` in two browser windows to simulate two players.

---

## File Structure
```
chess-game/
├── client/                # React frontend
│   ├── public/            # Static assets
│   ├── src/               # Source files
│   │   ├── components/    # React components
│   │   ├── App.js         # Main app component
│   │   ├── index.css      # Global styles
│   │   └── index.js       # Entry point
├── server/                # Node.js backend
│   ├── app.js             # Main server file
│   └── public/            # Static files for frontend
├── package.json           # Backend dependencies
├── README.md              # Project documentation
```

---

## Functionalities

### Players
- When a user connects, they are assigned the **White** or **Black** role.
- If both roles are taken, the user becomes a **Spectator**.

### Game Rules
- Game logic is powered by `chess.js`, ensuring valid moves.
- Moves are synced in real-time using `Socket.IO`.

### User Interface
- **Chessboard**: Displays an 8x8 board with draggable pieces.
- **Turn Indicator**: Shows whose turn it is to play.

---

## Contributing
1. Fork the repository
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request

---

## Future Improvements
- Add user authentication for named players.
- Implement timers for timed chess matches.
- Display captured pieces for both players.
- Add support for move undo and draw requests.
- Improve UI with animations.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments
- [chess.js](https://github.com/jhlywa/chess.js) for game logic.
- [Socket.IO](https://socket.io/) for real-time communication.
- [React](https://reactjs.org/) for frontend development.

---

Happy Coding and Enjoy the Game!

