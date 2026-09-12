# Recording & Configuration Guide

This guide explains how to add user-supplied Gujarati narration for the district stories.

## 1. Directory Structure

Each district has its own folder in public/district-media/<district-slug>/. 
The folder contains:
- script.txt: The text script to read from.
- story.json: The configuration and scene timestamps.
- images/: A folder to drop photos that will appear during the recording.

## 2. Recording Process

1. Open public/district-media/<district-slug>/script.txt.
2. Record the narration in Gujarati. Aim for a steady, documentary-style pace (approx. 130-150 words per minute).
3. Export the recording as an MP3 file.
4. Save the file as udio.mp3 inside the district's folder (public/district-media/<district-slug>/audio.mp3).

## 3. Configuration (story.json)

After recording, you must synchronize the visual scenes with the audio timestamps. Open the district's story.json file.

**A. Add Images:**
Place any photographs in the images/ directory.

**B. Update Scenes:**
In the "scenes" array, set the exact start and end times in seconds for each image/chapter.
`json
"scenes": [
  {
    "start": 0,
    "end": 45.5,
    "title": "??????????",
    "text": "Introductory text...",
    "image": "images/intro.jpg",
    "focus": "50% 50%"
  }
]
`
*Note: Timestamps must be consecutive. A scene's start time must equal the previous scene's end time.*

**C. Update Topics:**
Topics allow users to jump to specific subjects (e.g., Geography, History). Map these to the corresponding time ranges.

**D. Publish:**
When the audio is ready and timestamps are configured, change "published": false to "published": true.

## 4. Rebuild the Project

Once the JSON is updated and the audio file is in place:
1. Run 
pm run build
2. The prebuild validation script (district-media.mjs) will check your timestamps and files.
3. If validation passes, the audio will now be playable in the 3D Atlas and Directory views.
