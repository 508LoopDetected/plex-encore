const readline = require('readline');

const calculateArtistPlays = (history, artistName, year, monthName) => {
  // Clear the terminal
  console.clear();
  process.stdout.write('\x1Bc');
  const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];

  const start = new Date(`${year}-01-01T00:00:00Z`);
  const end = new Date(`${year}-12-31T23:59:59Z`);
  const trackDetails = {};
  const monthlyPlays = Array.from({ length: 12 }, () => 0);
  let totalPlays = 0;
  let topTracksOfMonth = Array.from({ length: 12 }, () => ({ tracks: [] }));

  // Track unique tracks for each month
  let uniqueTracksPerMonth = Array.from({ length: 12 }, () => new Set());

  history.forEach(session => {
    const sessionDate = new Date(session.viewedAt * 1000);
    if (session.grandparentTitle === artistName && sessionDate >= start && sessionDate <= end) {
      totalPlays++;  // Increment total plays for each valid session

      const trackTitle = session.title;
      const albumTitle = session.parentTitle;
      const monthIndex = sessionDate.getMonth();
      const uniqueTrackIdentifier = `${trackTitle} - ${albumTitle}`;

      if (!trackDetails[trackTitle]) {
        trackDetails[trackTitle] = {
          title: trackTitle,
          album: albumTitle,
          playCount: 0,
          viewedAt: session.viewedAt
        };
      }
      trackDetails[trackTitle].playCount++;
      uniqueTracksPerMonth[monthIndex].add(uniqueTrackIdentifier);
      monthlyPlays[monthIndex]++; // Properly increment the play count for the month
    }
  });

  // Convert the Sets to arrays of track details
  topTracksOfMonth = topTracksOfMonth.map((month, index) => ({
    name: monthNames[index],
    tracks: [...uniqueTracksPerMonth[index]].map(identifier => trackDetails[identifier.split(' - ')[0]])
  }));

  const sortedTrackDetails = Object.values(trackDetails).sort((a, b) => b.playCount - a.playCount);

  // Ensure monthly play counts are correctly reflected in the final object
  const monthlyPlaysWithNames = monthlyPlays.map((count, index) => ({
    name: monthNames[index],
    count: count
  }));

  return {
    artist: artistName,
    totalPlays,
    monthlyPlays: monthlyPlaysWithNames,
    topTracksOfYear: sortedTrackDetails,
    topTracksOfMonth: topTracksOfMonth
  };
};






const fetchArtist = async (sessionsHistory, artistName, year, rl) => {
  const artistStats = calculateArtistPlays(sessionsHistory, artistName, year);

  // Display artist metrics
  console.log(`${artistStats.artist} - ${artistStats.totalPlays} Total Plays in ${year}\n`);
  artistStats.monthlyPlays.forEach((month, index) => {
    console.log(`[${index + 1}] ${month.name} - ${month.count} Plays`);
  });

  // Use passed readline instance for user input
  rl.question('\n[enter] top in ' + year + '\n[1 - 12] month', (input) => {
    const monthIndex = parseInt(input, 10) - 1;

    if (input === '') {
      // Clear the terminal
      console.clear();
      process.stdout.write('\x1Bc');
      // Display top 20 tracks of the year
      console.log(`Top ${artistStats.artist} Tracks in ${year}:\n`);
      artistStats.topTracksOfYear.slice(0, 20).forEach(track => {
          console.log(`${track.playCount} Plays: "${track.title}" - ${track.album}`);
      });
      console.log('\n[esc] menu\n');
      return;
    } else if (!isNaN(monthIndex) && monthIndex >= 0 && monthIndex < 12) {
      // Clear the terminal
      console.clear();
      process.stdout.write('\x1Bc');
      const monthData = artistStats.topTracksOfMonth[monthIndex];
      if (monthData && monthData.tracks) {
        console.log(`Top ${artistStats.artist} Tracks in ${monthData.name} ${year}:\n`);
        monthData.tracks.slice(0, 20).forEach(track => {
          console.log(`${track.playCount} Plays: "${track.title}" - ${track.album}`);
        });
        console.log('\n[esc] menu\n');
        return;
      } else {
        console.log('Invalid month. Please try again.');
        mainMenu(rl);  // Pass the readline interface back to main menu
      }
    } else {
      console.log('Invalid input. Please try again.');
      mainMenu(rl);  // Pass the readline interface back to main menu
    }

    rl.close(); // Close readline after handling input
  });
  console.log('\n[esc] menu\n');
};

module.exports = fetchArtist;
