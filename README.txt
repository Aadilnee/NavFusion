Run (Command Prompt, inside this folder):  python -m http.server
Open:  http://localhost:8000                     viewer for normal users
       http://localhost:8000/editor.html?edit    map editor (keep private, or delete it from the public repo)
Editor changes autosave in the browser. "Test in viewer" opens your unsaved changes in the real viewer.
Use Export JSON, then replace data/graph.json to make them permanent.

FILES
index.html        viewer, including live mode (the only copy of the live code)
editor.html       map editor
sw.js             keeps the viewer working offline after the first visit
fonts/            Manrope font (SIL Open Font License, see OFL.txt)
data/graph.json   the indoor map
data/outdoor.json the outdoor map (paths, places, links from block entrances to indoor porches)
floors/OUT.jpg    official campus map, turned north-up and aligned to GPS
floors/*.png      one image per floor

AFTER CHANGING ANY FILE
Edit sw.js and change VERSION (for example campus-v1 to campus-v2), or phones keep the old copy.
Phones show the saved copy first and fetch the new one in the background, so an update appears on the second visit.

LIVE MODE (Android Chrome, needs https; GitHub Pages is fine)
1. Pick start and end, press Start walking. Stand at the door of the start room, hold the phone upright, walk.
2. Direction: if the block's direction is known (see below), the arrow is right from the first step and the app
   says "Turn around" if you face or walk the wrong way. If not known, it auto-calibrates after 5 steps.
3. At stairs, tap "I'm on the ... floor". If the app says you are off route, pick where you are and it re-routes.
4. Sensor tools (slider button): sensitivity, Set direction, Add a step, Download log.

BLOCK DIRECTION (do this once per block: A, B, C, D)
1. Start walking a route in that block. Stand in a straight corridor of the route, facing the way the route goes.
2. Hold the phone upright and still for 2 seconds. Open Sensor tools, tap "Save block direction".
3. It is saved on that phone at once. The tools panel lists the saved values, for example "C 290".
   Send them, and they are added to data/graph.json as "up" on that block's floors, so every phone gets them.
   "up" = the compass heading you face when looking toward the top of the floor image.

INDOOR / OUTDOOR
- Toggle at the top left. Indoor works fully offline. Outdoor shows the campus map (also offline) and your GPS
  position; the browser asks for location permission the first time you open Outdoor.
- Outdoor opens zoomed: on you if you are on campus, else on the route, else on the main gate.
- If you are more than 45 m from any campus path when switching modes, a closable "You're not in college" message shows.
- SAT button: satellite photos (Esri), needs internet; the map stays usable without it.
- Routes can start outside and end in a room (or the other way). Live mode uses GPS outdoors and steps indoors.
  At the block entrance it stops and shows "Continue indoors to ..."; tap it when you are inside the porch.
