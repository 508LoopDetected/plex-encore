# Plex Encore
This Node.js app gathers and contextualizes the play history metrics from your local Plex music server. The purpose is to provide simple charts reminiscent of Spotify Wrapped or Apple Music Replay, and without the need for 3rd-party plugins like Tautulli. Therefore, this works retroactively on your library since it relies only on existing Plex API data.

It's functional but ultimately a proof of concept for a later, better version. It's currently terminal-based with simple menus to traverse charts and input custom criteria. The next step is to build a web-based GUI. This was all done quickly, so there are some navigation bugs, and the "By Genre" option is also under construction.

### Getting Started

After running `npm install`, create a `.env` with the following credentials:

    PLEX_SERVER_ADDR=server_ip_here
    PLEX_AUTH_TOKEN=auth_token_here

Run `npm start` to display the main menu, then enter numbers to navigate or text criteria when prompted. Pressing <kbd>Esc</kbd> returns you to the main menu (if you're not there already), and otherwise exits the app.

### To-Do

- Genre charts
- Web-based GUI