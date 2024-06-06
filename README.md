# Battleship Game

## Description

**Battleship** is a strategic naval game where a single human player plays against ships randomly placed by the computer on a 10x10 grid. The objective is to sink all the computer's ships by guessing their locations.

## Game Mechanics

1. **Initial Setup:**

   - The application creates a 10x10 grid.
   - Ships are randomly placed on the grid with the following sizes:
     - 1x Battleship (5 squares)
     - 2x Destroyers (4 squares each)

2. **Gameplay:**
   - The player enters coordinates in the form (or choose clicking over the squares) of “A5”, where "A" is the column and "5" is the row, to specify a square to target.
   - Shots result in hits, misses, or ships sinking.
   - The game ends when all the computer's ships are sunk.

## Technologies Used

- **React:** Frontend framework for building the user interface.
- **TypeScript:** For static typing and improved code quality.
- **SCSS:** Styling the components for a better user experience.

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/battleship.git
   cd battleship
   ```
2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the application:**

   ```bash
   npm start
   ```

## Testing

The project includes unit tests to ensure the correctness of utility functions and game logic. You can run the tests using the following command:

```bash
npm test
```
