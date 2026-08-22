/* Inhabited islands of the Mediterranean, grouped by region.
 * lon/lat are approximate centroids (used to place + zoom the map).
 * This aims to cover the permanently inhabited islands; the Mediterranean has
 * thousands of islets, so the smallest uninhabited rocks are omitted. */
window.ISLANDS = [
  // ---- Spain (Balearics & coast) ----
  { name: "Mallorca",     lon:  3.02, lat: 39.60, blurb: "The largest of the Balearic Islands." },
  { name: "Menorca",      lon:  4.10, lat: 39.95, blurb: "The quieter, greener Balearic sister of Mallorca." },
  { name: "Ibiza",        lon:  1.43, lat: 38.98, blurb: "Balearic island of hidden coves and nightlife." },
  { name: "Formentera",   lon:  1.43, lat: 38.70, blurb: "The smallest inhabited Balearic island." },
  { name: "Tabarca",      lon: -0.48, lat: 38.17, blurb: "A tiny inhabited islet off Alicante." },

  // ---- France ----
  { name: "Corsica",      lon:  9.10, lat: 42.15, blurb: "Napoleon's mountainous French homeland." },
  { name: "Porquerolles", lon:  6.20, lat: 43.00, blurb: "The largest of the Îles d'Hyères off Provence." },

  // ---- Italy: Tuscan archipelago ----
  { name: "Elba",         lon: 10.30, lat: 42.78, blurb: "Napoleon's first place of exile." },
  { name: "Giglio",       lon: 10.90, lat: 42.36, blurb: "A granite island in the Tuscan archipelago." },
  { name: "Capraia",      lon:  9.84, lat: 43.05, blurb: "A volcanic Tuscan island near Corsica." },

  // ---- Italy: Pontine & Campanian ----
  { name: "Ponza",        lon: 12.96, lat: 40.90, blurb: "The largest of the Pontine Islands." },
  { name: "Ventotene",    lon: 13.43, lat: 40.79, blurb: "A small Pontine island of Roman origin." },
  { name: "Ischia",       lon: 13.90, lat: 40.73, blurb: "A volcanic spa island in the Bay of Naples." },
  { name: "Procida",      lon: 14.02, lat: 40.76, blurb: "A pastel-coloured fishing island near Naples." },
  { name: "Capri",        lon: 14.24, lat: 40.55, blurb: "A glamorous rock and its famous Blue Grotto." },

  // ---- Italy: Aeolian Islands ----
  { name: "Lipari",       lon: 14.95, lat: 38.47, blurb: "The main island of the volcanic Aeolian archipelago." },
  { name: "Vulcano",      lon: 14.96, lat: 38.40, blurb: "Aeolian island of sulphur fumaroles and mud baths." },
  { name: "Salina",       lon: 14.83, lat: 38.56, blurb: "The greenest of the Aeolian Islands." },
  { name: "Stromboli",    lon: 15.21, lat: 38.79, blurb: "An ever-active volcano rising straight from the sea." },
  { name: "Panarea",      lon: 15.07, lat: 38.64, blurb: "The smallest and chicest Aeolian island." },
  { name: "Filicudi",     lon: 14.57, lat: 38.57, blurb: "A remote, tranquil Aeolian island." },
  { name: "Alicudi",      lon: 14.36, lat: 38.54, blurb: "The wildest, westernmost Aeolian island." },

  // ---- Italy: Sicily & satellites ----
  { name: "Sicily",       lon: 14.15, lat: 37.60, blurb: "The largest island in the Mediterranean, crowned by Mount Etna." },
  { name: "Ustica",       lon: 13.18, lat: 38.71, blurb: "A volcanic island and marine reserve north of Palermo." },
  { name: "Favignana",    lon: 12.33, lat: 37.93, blurb: "Butterfly-shaped chief of the Aegadian Islands." },
  { name: "Levanzo",      lon: 12.34, lat: 38.00, blurb: "The smallest of the Aegadian Islands." },
  { name: "Marettimo",    lon: 12.07, lat: 37.97, blurb: "The most remote of the Aegadian Islands." },
  { name: "Pantelleria",  lon: 11.99, lat: 36.80, blurb: "A black volcanic island between Sicily and Tunisia." },
  { name: "Lampedusa",    lon: 12.60, lat: 35.51, blurb: "Italy's southernmost point, closer to Africa than Sicily." },
  { name: "Linosa",       lon: 12.87, lat: 35.86, blurb: "A small volcanic island of the Pelagie group." },

  // ---- Italy: Sardinia & satellites, Adriatic ----
  { name: "Sardinia",     lon:  9.05, lat: 40.10, blurb: "Rugged coves and the turquoise Costa Smeralda." },
  { name: "San Pietro",   lon:  8.31, lat: 39.14, blurb: "Home to Carloforte, a town of Ligurian heritage." },
  { name: "Sant'Antioco", lon:  8.44, lat: 39.06, blurb: "Joined to Sardinia by an ancient causeway." },
  { name: "La Maddalena", lon:  9.40, lat: 41.21, blurb: "The main island of a Sardinian archipelago park." },
  { name: "Tremiti",      lon: 15.49, lat: 42.12, blurb: "A tiny Adriatic archipelago off the Gargano." },

  // ---- Malta ----
  { name: "Malta",        lon: 14.42, lat: 35.92, blurb: "A nation-island of honey-coloured stone." },
  { name: "Gozo",         lon: 14.24, lat: 36.04, blurb: "Malta's greener, more rural sister island." },
  { name: "Comino",       lon: 14.33, lat: 36.01, blurb: "A near-empty island famed for its Blue Lagoon." },

  // ---- Croatia: Kvarner & northern Dalmatia ----
  { name: "Krk",          lon: 14.60, lat: 45.05, blurb: "One of the largest Croatian Adriatic islands." },
  { name: "Cres",         lon: 14.40, lat: 44.85, blurb: "A long, wild island of the Kvarner gulf." },
  { name: "Lošinj",       lon: 14.47, lat: 44.60, blurb: "A green Kvarner island of sea captains." },
  { name: "Rab",          lon: 14.76, lat: 44.76, blurb: "Known for its four bell towers and sandy beaches." },
  { name: "Pag",          lon: 15.05, lat: 44.45, blurb: "A lunar-landscape island famed for cheese and lace." },
  { name: "Silba",        lon: 14.70, lat: 44.37, blurb: "A car-free Zadar-archipelago island." },
  { name: "Dugi Otok",    lon: 15.05, lat: 44.00, blurb: "The 'long island' off Zadar." },
  { name: "Ugljan",       lon: 15.17, lat: 44.09, blurb: "The densely settled 'olive island' near Zadar." },
  { name: "Pašman",       lon: 15.35, lat: 43.95, blurb: "A tranquil island linked to Ugljan by a bridge." },
  { name: "Murter",       lon: 15.60, lat: 43.80, blurb: "Gateway to the Kornati archipelago." },
  { name: "Žirje",        lon: 15.65, lat: 43.65, blurb: "The outermost inhabited Šibenik island." },
  { name: "Zlarin",       lon: 15.85, lat: 43.70, blurb: "A car-free island once known for coral." },
  { name: "Prvić",        lon: 15.79, lat: 43.73, blurb: "A small car-free island near Šibenik." },

  // ---- Croatia: central & southern Dalmatia ----
  { name: "Šolta",        lon: 16.28, lat: 43.38, blurb: "A quiet island of olive groves near Split." },
  { name: "Čiovo",        lon: 16.30, lat: 43.50, blurb: "A bridged island beside the town of Trogir." },
  { name: "Brač",         lon: 16.65, lat: 43.32, blurb: "Famed for Zlatni Rat beach and white stone." },
  { name: "Hvar",         lon: 16.65, lat: 43.15, blurb: "Lavender fields and one of Croatia's sunniest isles." },
  { name: "Vis",          lon: 16.18, lat: 43.05, blurb: "The most remote inhabited central-Dalmatian island." },
  { name: "Korčula",      lon: 17.13, lat: 42.95, blurb: "Reputedly the birthplace of Marco Polo." },
  { name: "Lastovo",      lon: 16.90, lat: 42.77, blurb: "A remote island and dark-sky nature park." },
  { name: "Mljet",        lon: 17.52, lat: 42.75, blurb: "Half national park, with two saltwater lakes." },
  { name: "Šipan",        lon: 17.86, lat: 42.72, blurb: "The largest of the Elaphiti Islands near Dubrovnik." },
  { name: "Lopud",        lon: 17.94, lat: 42.69, blurb: "A car-free Elaphiti island of sandy bays." },
  { name: "Koločep",      lon: 18.02, lat: 42.66, blurb: "The southernmost inhabited Croatian island." },

  // ---- Greece: Ionian ----
  { name: "Corfu",        lon: 19.90, lat: 39.62, blurb: "Lush Ionian island off the coast of Greece." },
  { name: "Paxos",        lon: 20.19, lat: 39.20, blurb: "A small green Ionian island of olive groves." },
  { name: "Lefkada",      lon: 20.71, lat: 38.72, blurb: "An Ionian island joined to the mainland by a causeway." },
  { name: "Meganisi",     lon: 20.78, lat: 38.66, blurb: "A tiny island of coves near Lefkada." },
  { name: "Ithaca",       lon: 20.70, lat: 38.40, blurb: "The legendary home of Homer's Odysseus." },
  { name: "Kefalonia",    lon: 20.60, lat: 38.20, blurb: "The largest of the Ionian Islands." },
  { name: "Zakynthos",    lon: 20.75, lat: 37.79, blurb: "Home to the famous Navagio shipwreck beach." },
  { name: "Kythira",      lon: 23.01, lat: 36.24, blurb: "An island between the Ionian and Aegean seas." },
  { name: "Antikythira",  lon: 23.31, lat: 35.86, blurb: "A remote islet famed for its ancient shipwreck mechanism." },

  // ---- Greece: Saronic ----
  { name: "Salamis",      lon: 23.49, lat: 37.96, blurb: "Site of the decisive 480 BC naval battle." },
  { name: "Aegina",       lon: 23.50, lat: 37.74, blurb: "A Saronic island known for its pistachios." },
  { name: "Agistri",      lon: 23.35, lat: 37.70, blurb: "A small pine-clad Saronic island." },
  { name: "Poros",        lon: 23.46, lat: 37.50, blurb: "A Saronic island a stone's throw from the Peloponnese." },
  { name: "Hydra",        lon: 23.47, lat: 37.34, blurb: "A car-free island of stone mansions and donkeys." },
  { name: "Spetses",      lon: 23.16, lat: 37.26, blurb: "A wooded Saronic island of shipowners." },

  // ---- Greece: Cyclades ----
  { name: "Kea",          lon: 24.33, lat: 37.62, blurb: "The closest Cycladic island to Athens." },
  { name: "Kythnos",      lon: 24.42, lat: 37.40, blurb: "A Cycladic island of thermal springs." },
  { name: "Serifos",      lon: 24.50, lat: 37.15, blurb: "A rugged Cycladic island of old iron mines." },
  { name: "Sifnos",       lon: 24.70, lat: 36.98, blurb: "A Cycladic island renowned for pottery and cuisine." },
  { name: "Milos",        lon: 24.44, lat: 36.72, blurb: "Volcanic island where the Venus de Milo was found." },
  { name: "Kimolos",      lon: 24.58, lat: 36.80, blurb: "A small chalk-white island beside Milos." },
  { name: "Andros",       lon: 24.85, lat: 37.83, blurb: "A green, mountainous northern Cyclade." },
  { name: "Tinos",        lon: 25.16, lat: 37.58, blurb: "A place of pilgrimage dotted with dovecotes." },
  { name: "Mykonos",      lon: 25.35, lat: 37.45, blurb: "Cycladic island of whitewashed windmills." },
  { name: "Syros",        lon: 24.92, lat: 37.44, blurb: "The capital of the Cyclades." },
  { name: "Paros",        lon: 25.15, lat: 37.08, blurb: "A Cycladic island prized in antiquity for its marble." },
  { name: "Antiparos",    lon: 25.03, lat: 37.03, blurb: "A laid-back island across a narrow channel from Paros." },
  { name: "Naxos",        lon: 25.52, lat: 37.10, blurb: "The largest and greenest of the Cyclades." },
  { name: "Ios",          lon: 25.28, lat: 36.72, blurb: "A Cycladic island said to hold Homer's tomb." },
  { name: "Amorgos",      lon: 25.90, lat: 36.83, blurb: "A dramatic cliff-edged easternmost Cyclade." },
  { name: "Folegandros",  lon: 24.92, lat: 36.62, blurb: "A cliff-top island of quiet beauty." },
  { name: "Sikinos",      lon: 25.11, lat: 36.68, blurb: "One of the least-developed Cyclades." },
  { name: "Anafi",        lon: 25.77, lat: 36.36, blurb: "A remote island east of Santorini." },
  { name: "Santorini",    lon: 25.42, lat: 36.40, blurb: "A dramatic caldera born of a volcanic eruption." },
  { name: "Koufonisia",   lon: 25.60, lat: 36.94, blurb: "Tiny 'Small Cyclades' islands of turquoise water." },
  { name: "Iraklia",      lon: 25.47, lat: 36.85, blurb: "The quietest of the Small Cyclades." },
  { name: "Schoinoussa",  lon: 25.52, lat: 36.87, blurb: "A sleepy islet of the Small Cyclades." },
  { name: "Donousa",      lon: 25.81, lat: 37.10, blurb: "The most isolated of the Small Cyclades." },

  // ---- Greece: Sporades & Evia ----
  { name: "Skiathos",     lon: 23.49, lat: 39.16, blurb: "The cosmopolitan gem of the Sporades." },
  { name: "Skopelos",     lon: 23.65, lat: 39.12, blurb: "A pine-forested Sporades island." },
  { name: "Alonnisos",    lon: 23.86, lat: 39.16, blurb: "At the heart of a marine national park." },
  { name: "Skyros",       lon: 24.57, lat: 38.90, blurb: "The largest Sporades island, home to wild ponies." },
  { name: "Euboea",       lon: 23.60, lat: 38.55, blurb: "A long slender island hugging the Greek mainland." },

  // ---- Greece: North-East Aegean ----
  { name: "Thasos",       lon: 24.65, lat: 40.68, blurb: "A green, marble-rich island in the north Aegean." },
  { name: "Samothrace",   lon: 25.53, lat: 40.46, blurb: "A wild island crowned by Mount Saos." },
  { name: "Limnos",       lon: 25.25, lat: 39.90, blurb: "A volcanic island of sandy plains and vineyards." },
  { name: "Agios Efstratios", lon: 25.00, lat: 39.50, blurb: "A tiny, remote north-Aegean island." },
  { name: "Lesbos",       lon: 26.30, lat: 39.20, blurb: "Aegean island of olive groves and the poet Sappho." },
  { name: "Chios",        lon: 26.05, lat: 38.40, blurb: "Famous for its mastic trees." },
  { name: "Psara",        lon: 25.57, lat: 38.54, blurb: "A small island with a fierce revolutionary history." },
  { name: "Oinousses",    lon: 26.22, lat: 38.51, blurb: "A cluster of islets home to shipping dynasties." },
  { name: "Samos",        lon: 26.80, lat: 37.75, blurb: "Birthplace of the mathematician Pythagoras." },
  { name: "Ikaria",       lon: 26.10, lat: 37.60, blurb: "A 'blue zone' island famed for longevity." },
  { name: "Fournoi",      lon: 26.46, lat: 37.58, blurb: "A former pirates' haven of small fishing villages." },

  // ---- Greece: Dodecanese ----
  { name: "Patmos",       lon: 26.55, lat: 37.31, blurb: "Where the Book of Revelation is said to have been written." },
  { name: "Lipsi",        lon: 26.76, lat: 37.30, blurb: "A small, peaceful Dodecanese island." },
  { name: "Leros",        lon: 26.85, lat: 37.15, blurb: "An island of deep bays and Italianate architecture." },
  { name: "Kalymnos",     lon: 26.98, lat: 36.98, blurb: "The island of sponge divers and rock climbers." },
  { name: "Kos",          lon: 27.20, lat: 36.85, blurb: "Birthplace of Hippocrates, father of medicine." },
  { name: "Astypalaia",   lon: 26.36, lat: 36.55, blurb: "A butterfly-shaped island between two seas." },
  { name: "Nisyros",      lon: 27.16, lat: 36.58, blurb: "Built around a still-steaming volcanic crater." },
  { name: "Tilos",        lon: 27.38, lat: 36.42, blurb: "A tranquil island and wildlife sanctuary." },
  { name: "Symi",         lon: 27.84, lat: 36.61, blurb: "Neoclassical mansions around a picturesque harbour." },
  { name: "Rhodes",       lon: 28.00, lat: 36.20, blurb: "Once site of the Colossus, one of the Seven Wonders." },
  { name: "Chalki",       lon: 27.60, lat: 36.22, blurb: "A small island off the coast of Rhodes." },
  { name: "Karpathos",    lon: 27.15, lat: 35.55, blurb: "A wind-swept island between Crete and Rhodes." },
  { name: "Kasos",        lon: 26.93, lat: 35.40, blurb: "The southernmost Dodecanese island." },
  { name: "Kastellorizo", lon: 29.59, lat: 36.15, blurb: "Greece's easternmost island, off the Turkish coast." },

  // ---- Greece: Crete ----
  { name: "Crete",        lon: 24.80, lat: 35.25, blurb: "Home of the Minoans and the myth of the Minotaur." },
  { name: "Gavdos",       lon: 24.08, lat: 34.85, blurb: "The southernmost point of Europe." },

  // ---- Cyprus ----
  { name: "Cyprus",       lon: 33.20, lat: 35.10, blurb: "Legendary birthplace of Aphrodite, at the eastern edge of the sea." },

  // ---- Turkey (Aegean) ----
  { name: "Gökçeada",     lon: 25.90, lat: 40.18, blurb: "Turkey's largest island, also known as Imbros." },
  { name: "Bozcaada",     lon: 26.05, lat: 39.83, blurb: "A wine-making island, ancient Tenedos." },
  { name: "Cunda",        lon: 26.68, lat: 39.35, blurb: "An Aegean island linked to Ayvalık by a bridge." },

  // ---- Tunisia ----
  { name: "Djerba",       lon: 10.90, lat: 33.80, blurb: "Sun-drenched island off the Tunisian coast." },
  { name: "Kerkennah",    lon: 11.15, lat: 34.70, blurb: "A low-lying, palm-fringed Tunisian archipelago." }
];
