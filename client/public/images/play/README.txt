Photos and clips for the Play pin board.
Each one is listed in client/src/data/sections.ts under playBoard with its caption and, for card pins, its story.

Photos: any size; JPG or WebP, under about 400 KB each.

Clips: 10 to 20 seconds, no sound needed (they play muted). Keep each file under about 3 MB so the page stays quick.
Export from your phone at 720p, or shrink any clip with ffmpeg (free, ffmpeg.org):

  ffmpeg -i in.mov -t 20 -vf "scale=-2:720" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart clip.mp4

and make its poster frame (the image shown before the clip starts):

  ffmpeg -i clip.mp4 -ss 0.5 -frames:v 1 -q:v 3 clip.jpg

Then add to playBoard:  { image: "/images/play/clip.jpg", video: "/images/play/clip.mp4", alt: "...", caption: "..." }
