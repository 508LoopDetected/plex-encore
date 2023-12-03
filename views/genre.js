const readline = require('readline');

const calculateGenrePlays = (sessionsHistory, year, rl) => {
  const genrePlays = {};
  const startOfYear = new Date(`${year}-01-01T00:00:00Z`);
  const endOfYear = new Date(`${year}-12-31T23:59:59Z`);

  sessionsHistory.forEach(session => {
    const sessionDate = new Date(session.viewedAt * 1000);
    if (sessionDate >= startOfYear && sessionDate <= endOfYear) {
      const genre = session.genre; // Assuming 'genre' is a property of session
      if (genre) {
        if (!genrePlays[genre]) {
          genrePlays[genre] = 0;
        }
        genrePlays[genre]++;
      }
    }
  });

  return genrePlays;
};

const fetchGenre = (sessionsHistory, year, rl) => {
  // Clear the terminal
  console.clear();
  process.stdout.write('\x1Bc');
  const genrePlays = calculateGenrePlays(sessionsHistory, year);
  const sortedGenres = Object.entries(genrePlays)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);


  console.log(`Coming soon...`);
  // console.log(`Top 20 Genres in ${year}:`);
  sortedGenres.forEach(([genre, count], index) => {
    console.log(`${index + 1}. ${genre} - ${count} Plays`);
  });

  console.log('\n[esc] menu\n');
};

module.exports = fetchGenre;
