# Guess League Skin Game

Welcome to the **Guess League Skin Game**, an interactive game built with **React.js**. The goal is to guess the name of a **League of Legends** champion based on a progressively zoomed-out image. With each wrong guess, the image zooms out further, revealing more visual clues to help you identify the champion.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- Displays an image of a random League of Legends champion.
- Players must guess which champion is shown.
- With each incorrect guess, the image zooms out to provide more visual hints.
- Once the correct champion is guessed, a success message is shown, and a new image can be loaded.

## Installation

1.  `git clone https://github.com/kevin-ruault/GuessLeagueSkin.git `
2.  `cd GuessLeagueSkin/guesswho`
3.  `npm install`

## Usage

1.  `npm start`
2.  `http://localhost:3000`
3.  **How to play**:

    - An image of a champion will zoom out with each wrong guess.
    - Enter the name of the champion in the input field.
    - If the guess is correct, a new champion image can be displayed.

## Technologies Used

- **React.js** - A JavaScript library for building user interfaces.
- **JavaScript** - The programming language used for the application's logic.
- **CSS** - For styling and layout.
- **League of Legends API** - To fetch champion images from the game.
  https://developer.riotgames.com/docs/lol

## License

This project is licensed under the MIT License.
