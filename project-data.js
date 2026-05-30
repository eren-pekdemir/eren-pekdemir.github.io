/* =====================================================================
   PROJECT DETAILS
   ---------------------------------------------------------------------
   Each project on the site links to project.html?id=<repo-name>.
   This file holds the extra content for those detail pages.

   HOW TO ADD MEDIA / EDIT A PROJECT
   ---------------------------------------------------------------------
   1. Find the project below by its key (the lowercase GitHub repo name).
   2. Edit "title", "blurb", "tags", and "body" however you like.
        - "body" is an array: each string becomes its own paragraph.
        - "tags" are just labels (engine, language…). Edit freely — some
          are my best guesses and may be wrong.
   3. To add a VIDEO:
        - Drop the file at:  assets/projects/<key>/demo.mp4
        - Set:  video: "assets/projects/<key>/demo.mp4"
   4. To add PHOTOS:
        - Drop files at:  assets/projects/<key>/1.jpg, 2.jpg, ...
        - List them:  gallery: ["assets/projects/<key>/1.jpg", "..."]
   5. Empty video ("") or empty gallery ([]) simply shows nothing —
      no broken images. Fill them in whenever you're ready.

   Projects NOT listed here still get a working detail page (title +
   GitHub description pulled live). Add an entry here to enrich them.
   ===================================================================== */

const GITHUB_USER = 'eren-pekdemir';

const PROJECTS = {

  "inventorysystem": {
    name:  "InventorySystem",
    title: "Inventory System",
    blurb: "A modular, reusable inventory system built from scratch.",
    tags:  ["Unreal Engine 5", "C++"],
    body: [
      "A modular and flexible inventory system I built to drop into different projects with minimal rework.",
      "The goal was a clean, reusable foundation — adding, stacking, moving and removing items without rewriting the same plumbing every time I start something new."
    ],
    video:   "",                       // e.g. "assets/projects/inventorysystem/demo.mp4"
    gallery: [],                        // e.g. ["assets/projects/inventorysystem/1.jpg"]
    repo:    "https://github.com/eren-pekdemir/InventorySystem"
  },

  "locomationsystem": {
    name:  "LocomationSystem",
    title: "Locomotion System",
    blurb: "A character locomotion & movement system focused on feel.",
    tags:  ["Unreal Engine 5"],
    body: [
      "A character locomotion system — handling movement states and animation blending for responsive, good-feeling traversal.",
      "Most of the work here is about the small details: acceleration, turning, and the transitions that make a character feel grounded instead of floaty."
    ],
    video:   "",                       // e.g. "assets/projects/locomationsystem/demo.mp4"
    gallery: [],
    repo:    "https://github.com/eren-pekdemir/LocomationSystem"
  },

  "vanguardarena": {
    name:  "VanguardArena",
    title: "Vanguard Arena",
    blurb: "An arena game I'm building to sharpen my skills.",
    tags:  ["Unreal Engine 5", "C++"],
    body: [
      "A game I'm developing to push my skills further and learn by doing.",
      "I'm using it as a sandbox for combat, arena flow and overall game feel — iterating on mechanics as I go."
    ],
    video:   "",
    gallery: [],
    repo:    "https://github.com/eren-pekdemir/VanguardArena"
  },

  "gravitygun": {
    name:  "GravityGun",
    title: "Gravity Gun",
    blurb: "A physics-driven gravity-gun mechanic.",
    tags:  ["Unreal Engine 5", "C++"],
    body: [
      "A small game I made to gain experience — built around a gravity-gun mechanic for grabbing, holding and launching physics objects.",
      "A focused exercise in physics interaction and making a single mechanic feel satisfying."
    ],
    video:   "",
    gallery: [],
    repo:    "https://github.com/eren-pekdemir/GravityGun"
  },

  "inventorycraft": {
    name:  "InventoryCraft",
    title: "Inventory Craft",
    blurb: "An inventory system with crafting and quick-slots.",
    tags:  ["Unity", "C#"],
    body: [
      "An inventory system featuring crafting and quick-slot support.",
      "Built to explore item management, recipes and the UI flow around them."
    ],
    video:   "",
    gallery: [],
    repo:    "https://github.com/eren-pekdemir/InventoryCraft"
  },

  "simplegame": {
    name:  "SimpleGame",
    title: "Simple Game",
    blurb: "My very first game project — where it all started.",
    tags:  ["C++"],
    body: [
      "My first ever game project: I built a character and a simple AI that could interact with each other.",
      "Rough around the edges, but it's the project that got me hooked on game development."
    ],
    video:   "",
    gallery: [],
    repo:    "https://github.com/eren-pekdemir/SimpleGame"
  },

  "lostborn": {
    name:  "Lostborn",
    title: "Lostborn",
    blurb: "My dream game — the project closest to my heart.",
    tags:  ["Unreal Engine 5"],
    body: [
      "The game I keep dreaming about and iterating on.",
      "Still taking shape, but this is the long-term project everything else feeds into."
    ],
    video:   "",
    gallery: [],
    repo:    "https://github.com/eren-pekdemir/Lostborn"
  },

  "lostborngame": {
    name:  "LostbornGame",
    title: "Lostborn (Game)",
    blurb: "Another iteration of my dream game.",
    tags:  ["Unreal Engine 5"],
    body: [
      "An iteration of Lostborn — my ongoing dream project."
    ],
    video:   "",
    gallery: [],
    repo:    "https://github.com/eren-pekdemir/LostbornGame"
  },

  "thelostchild": {
    name:  "TheLostChild",
    title: "The Lost Child",
    blurb: "An early take on my dream game.",
    tags:  ["Unreal Engine 5"],
    body: [
      "An early version of the dream game that later became Lostborn."
    ],
    video:   "",
    gallery: [],
    repo:    "https://github.com/eren-pekdemir/TheLostChild"
  },

  "topdownshootergame": {
    name:  "TopDownShooterGame",
    title: "Top-Down Shooter",
    blurb: "A top-down shooter prototype.",
    tags:  ["Game"],
    body: [
      "A top-down shooter I built to experiment with movement, aiming and enemy behaviour."
    ],
    video:   "",
    gallery: [],
    repo:    "https://github.com/eren-pekdemir/TopDownShooterGame"
  },

  "smart-fitness---nutrition-agent": {
    name:  "Smart-Fitness---Nutrition-Agent",
    title: "Smart Fitness & Nutrition Agent",
    blurb: "An AI agent for fitness and nutrition planning.",
    tags:  ["Python", "AI"],
    body: [
      "A Python project exploring an AI agent that helps with fitness and nutrition planning."
    ],
    video:   "",
    gallery: [],
    repo:    "https://github.com/eren-pekdemir/Smart-Fitness---Nutrition-Agent"
  },

  "swe-testing-assignment": {
    name:  "swe-testing-assignment",
    title: "SWE Testing Assignment",
    blurb: "A software-engineering testing coursework project.",
    tags:  ["C++", "Testing"],
    body: [
      "A university software-engineering assignment focused on testing practices in C++."
    ],
    video:   "",
    gallery: [],
    repo:    "https://github.com/eren-pekdemir/swe-testing-assignment"
  }

};
