const fetchGenre = async (sessionsHistory, year, rl) => {
  console.log('Coming soon...');
return;
};
module.exports = fetchGenre;


// const fetchArtist = require('./artist');
// const readline = require('readline');

// const fetchGenre = async (sessionsHistory, year, rl) => {
//   // Clear the terminal
//   console.clear();
//   process.stdout.write('\x1Bc');
  
//   const artistPlays = {};

//   sessionsHistory.forEach(session => {
//     const sessionDate = new Date(session.viewedAt * 1000);
//     const sessionYear = sessionDate.getFullYear();
//     if (sessionYear === parseInt(year) && session.type === 'track') {
//       const artistName = session.grandparentTitle;
//       if (!artistPlays[artistName]) {
//         artistPlays[artistName] = 0;
//       }
//       artistPlays[artistName]++;
//     }
//   });

//   const sortedArtists = Object.entries(artistPlays)
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, 20);

//   console.log(`Top 20 Artists of ${year}:\n`);
//   sortedArtists.forEach(([artist, count], index) => {
//     console.log(`${index + 1}. ${artist} - ${count} Plays`);
//   });

//   console.log('\n[1 - 20] artist\n[esc] menu\n');

//   rl.question('Enter choice: ', (number) => {
//     const artistIndex = parseInt(number, 10) - 1;
//     if (artistIndex >= 0 && artistIndex < sortedArtists.length) {
//       const artistName = sortedArtists[artistIndex][0];
//       fetchArtist(sessionsHistory, artistName, year, rl);  // Pass the readline interface
//     } else {
//       console.log('Invalid number. Please try again.');
//       mainMenu(rl);  // Pass the readline interface back to main menu
//     }
//   });
// };

// module.exports = fetchGenre;