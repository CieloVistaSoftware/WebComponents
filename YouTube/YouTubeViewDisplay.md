# YouTube Video WebComponent

Create a new WebComponent (WC) to show YouTube videos.

## Features

- It will have an external style sheet.
- It will have an HTML page that hosts the WC.
- It will have HTML template pages for the GUI (read in at runtime).

## Data Source

- It will host YouTube videos from a JSON file.
- The JSON file will have a top "global" configuration:
  - height and width
  - base YouTube URL with path of embed

- Each video will have a Title and the ID of the embedding.

## Example JSON Structure

```json
{
    "global": {
        "width": "560",
        "height": "315",
        "baseUrl": "https://www.youtube.com/embed/"
    },
    "videos": [
        {
            "title": "Stealing Musical Ideas To Make Unique Music [COMPOSING / PRODUCING / SONGWRITING]",
            "id": "na-W43-6JUc"
        },
        {
            "title": "Demonstrating 7 Ways that Composers Make Music Using Modes [SONGWRITING / THEORY]",
            "id": "sC2qXLnVU3A"
        },
        {
            "title": "The SMART Way To Think About Chord Names and Labels [+FREE PDF] [MUSIC THEORY LESSON]",
            "id": "2SeN9W1CIrI"
        },
        {
            "title": "Motifs and Chords- The Fast and Easy Way to Make Music!  [SONGWRITING - MUSIC THEORY - LESSON]",
            "id": "z3Dy6Mnp5Og"
        },
        {
            "title": "GUITAR SCALES Made Easy",
            "id": "AY-vkn_iBI8"
        },
        {
            "title": "The guitar fretboard MAP",
            "id": "VwSBtuWkhiA"
        },
        {
            "title": "The FRETBOARD memorization HACK",
            "id": "4h2M00lWxBQ"
        },
        {
            "title": "How Each Beatle Plays Piano",
            "id": "tLVHaHNXxyQ"
        },
        {
            "title": "The Genius Of Ringo Starr",
            "id": "ZDY-YeNTcE4"
        }
    ]
}