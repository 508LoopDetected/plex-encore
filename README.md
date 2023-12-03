# PLEX Encore
This Node.js app gathers and contextualizes the play history metrics from your local Plex music server. The purpose is to provide simple charts reminiscent of Spotify Wrapped or Apple Music Replay, and without the need for 3rd-party plugins like Tautulli. Therefore, this works retroactively on your library since it relies only on existing Plex API data.

It's functional but ultimately a proof of concept for a later, better version. It's currently terminal-based with simple menus to traverse charts and input custom criteria. The next step is to build a web-based GUI.

This was all done quickly, so there are some navigation bugs, and the "By Genre" option is also under construction.

### Getting Started

After running `npm install`, create a `.env` with the following credentials:

    PLEX_SERVER_ADDR=server_ip_here
    PLEX_AUTH_TOKEN=auth_token_here

Run `npm start` to display the main menu, then enter numbers to navigate or text criteria when prompted.

    PLEX Encore
    v0.1

    Select an option:
    [1] Most Played by Year
    [2] 2023 Artist Data
    [3] Genres by Year

    [esc] exit

Entering <kbd>1</kbd> gives you something like this:

    Top 10 Artists of 2023:

    1. David Bowie - 925 Plays
    2. The Smashing Pumpkins - 727 Plays
    3. Nine Inch Nails - 558 Plays
    4. Yellow Magic Orchestra - 476 Plays
    5. Talking Heads - 347 Plays
    6. Roxy Music - 310 Plays
    7. Queens of the Stone Age - 265 Plays
    8. The Beatles - 261 Plays
    9. Radiohead - 256 Plays
    10. Einstürzende Neubauten - 244 Plays

    [1 - 10] select artist
    [esc] main menu

It whittles down further from there, showing total plays per month and the most played songs that year. Pressing <kbd>Esc</kbd> returns you to the main menu (if you're not there already), and otherwise exits the app.

### To-Do

- Genre charts
- Web-based GUI