const readline = require('readline');
const axios = require('axios');
require('dotenv').config();

const fetchArtist = require('./views/artist');
const fetchYear = require('./views/year');
const fetchGenre = require('./views/genre');

// Flag to check if we are at the main menu
let atMainMenu = false;

// Set up the readline interface
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

process.stdin.on('keypress', (str, key) => {
  if (key && key.name === 'escape') {
    if (atMainMenu) {
      console.log('\n\n~ goodbye ~\n');
      rl.close();
      process.exit(0);
    } else {
      console.log('\n\n~ moseying to menu... ~\n');
      rl.close(); // Close the current readline interface
      mainMenu(); // Recall mainMenu
    }
  }
});


const fetchData = async () => {
  try {
    const response = await axios.get(`http://${process.env.PLEX_SERVER_ADDR}:32400/status/sessions/history/all?X-Plex-Token=${process.env.PLEX_AUTH_TOKEN}`);
    return response.data.MediaContainer.Metadata;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    return null;
  }
};

// Functions to ask for for stuff
const askForYear = (sessionsHistory) => {
  atMainMenu = false;
  rl.question('Enter the year: ', (year) => {
    fetchYear(sessionsHistory, year, rl);
  });
};
const askForArtist = (sessionsHistory) => {
  atMainMenu = false;
  rl.question('Enter the artist name: ', (artistName) => {
    fetchArtist(sessionsHistory, artistName, '2023', rl);
  });
};

const mainMenu = async () => {
  atMainMenu = true; // User is now at the main menu

  // Reinitialize readline if it's closed
  if (!rl || rl.closed) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  const sessionsHistory = await fetchData();
  if (!sessionsHistory) {
    console.log('Failed to fetch data, exiting...');
    return;
  }

  // Clear the terminal
  console.clear();
  process.stdout.write('\x1Bc');

  // Display main menu
  rl.question('PLEX Encore / RE:PLEX\nv0.1 - github.com/508loopdetected\n\nSelect an option:\n[1] By Artist\n[2] By Year\n[3] By Genre\n\n[esc] exit\n\nEnter choice: ', (answer) => {
    atMainMenu = false; // User has made a selection, no longer at the main menu
    switch (answer) {
      case '1':
        askForArtist(sessionsHistory, rl);
        break;
      case '2':
        askForYear(sessionsHistory, rl);  // Pass the readline interface
        break;
      case '3':
        fetchGenre(sessionsHistory, rl);
        break;
      default:
        console.log('Invalid selection. Please try again.');
        mainMenu();
        break;
    }
  });
};

mainMenu();