import json


# title
# description
# image - a url of the image being used
# source - a link to a source of the info if one exists
# optimism - value from 0-1 where 0 is worst case and 1 is best case
# dateRange - 2 dates for earliest possible year (optimism of 1), latest possible year (optimism of 0)
# relevance - value 0-1 where 1 is very important and 0 is not at all important
# isPositive - boolean for if the change is good or bad
# tags - a list of tags that this falls under

### optimism reference
# 0.0 - The world ends in the next few years
# 0.1 - The world ends in the next few hundred years
# 0.2 - The world doesnt end, but gets very dystopian
# 0.3 - stuf goes quite bad, but not quite dystopia
# 0.4 - General Downwards trend, but no world ending
# 0.5 - Quality of life stays about the same
# 0.6 - Mild upwards trend, generally moving towards higher optimism bands
# 0.7 - Strong upwards trend in quality of life
# 0.8 - All world ending threats removed, e.g. climate change, war
# 0.9 - World peace, any other large scale issues solved, diseases almost all cured
# 1.0 - World enters a Utopia, all diseases cured, pain no longer exists for any living being

### relevance reference
# 0.0 -
# 0.1 -
# 0.2 -
# 0.3 -
# 0.4 - An entire country aware of this, e.g. small discovery, or election
# 0.5 - 20% humans aware of this, e.g. somewhat large discovery, but not life changing, like photo of black hole
# 0.6 - 50% of humans aware of this, e.g. big discovery science advancement, mars colony
# 0.7 - most (80%) humans would be aware of this, large effect to the relevant community,
# 0.8 - all humans would be aware of this, some, e.g. 1 country greatly effected, e.g. large scale war between 2 countries like russia/ukraine
# 0.9 - all humans are somewhat effected, e.g. world war
# 1.0 - huge effect to all humanity, e.g. nuclear war




all_tags = [
    "AI",
    "Economy",
    "Environment",
    "Space",
    "Science",
    "Medicine",
    "Natural Disaster",
    "Social",
    "Politics",
]

data = [
    {"title":"Mars Colony",
     "description":"The first permanent human settlement on Mars is likely to begin as a small base, gradually expanding into a self-sustaining colony.",
     "image":"mars_colony.jpg",
     "source":[],
     "optimism":[{"lowerBound":0.6,
                 "upperBound":1}],
     "dateRange":{"earliestYear":2030,
                  "latestYear":2060},
     "relevance":0.6,
     "isPositive":True,
     "tags":["Space", "Science"],
     },
    {"title":"Humans return to the Moon",
     "description":"For the first time since 1972, humans will set foot on the Moon as part of NASA’s Artemis III mission.",
     "image":"return_to_moon.jpg",
     "source": [],
     "optimism":[{"lowerBound":0.3,
                 "upperBound":1}],
     "dateRange":{"earliestYear":2026,
                  "latestYear":2028},
     "relevance":0.55,
    "isPositive":True,
     "tags":["Space", "Science"],
     },
    {"title":"Moon Colony",
     "description":"The Moon is expected to host permanent or semi-permanent bases in the 2030s. These early colonies will serve as research stations, testing grounds for Mars missions, and even potential commercial hubs",
     "image":"moon_colony.jpg",
     "source":[],
     "optimism":[{"lowerBound":0.65,
                 "upperBound":1}],
     "dateRange":{"earliestYear":2030,
                  "latestYear":2050},
     "relevance":0.6,
     "isPositive": True,
     "tags":["Space", "Science"],
     },

    {"title":"First AGI",
     "description":"AGI refers to a type of artificial intelligence capable of performing any intellectual task that a human can do, with the ability to learn, adapt, and generalize across a wide range of activities.",
     "image":"first_AGI.webp",
     "source": [],
     "optimism":[{"lowerBound":0, "upperBound":0.25},
                 {"lowerBound":0.7, "upperBound":1}],
     "dateRange":{"earliestYear":2027,
                  "latestYear":2060},
     "relevance":0.75,
     "isPositive": True,
     "tags":["Science", "AI"],
     },
    {"title":"Commercially Viable Fusion Power",
     "description":"Fusion power is the holy grail for clean and virtually limitless energy. In fusion light atomic nuclei like hydrogen combine, forming heavier nuclei and releasing immense energy.",
     "image":"fusion_energy.jpg",
     "source":["https://en.wikipedia.org/wiki/Commercial_fusion#:~:text=The%20advent%20of%20commercial%20fusion,to%20the%20grid%20before%202035."],
     "optimism":[{"lowerBound":0.6,
                 "upperBound":1}],
     "dateRange":{"earliestYear":2032,
                  "latestYear":2050},
     "relevance":0.85,
     "isPositive": True,
     "tags":["Science"],
     },
    {"title": "Cure for Cancer",
     "description": "Cancer is a complex group of diseases with over 100 types, each with unique behaviors and genetic profiles. A universal cure is difficult, but not impossible.",
     "image": "cure_for_cancer.jpg",
     "source":[],
     "optimism": [{"lowerBound": 0,
                  "upperBound": 1}],
     "dateRange": {"earliestYear": 2025,
                   "latestYear": 2050},
     "relevance": 0.75,
     "isPositive": True,
     "tags": ["Medicine", "Science"],
     },
    {"title": "Exceed 2°C",
     "description": "Crossing the 2°C threshold above pre-industrial levels marks a dangerous point in climate change. This level of warming could lead to some irreversible impacts to the planet.",
     "image": "2_degrees.png",
     "source":["https://www.carbonbrief.org/analysis-when-might-the-world-exceed-1-5c-and-2c-of-global-warming/#:~:text=Similarly%2C%20if%20future%20emissions%20remain,between%20the%202030s%20and%202050s"],
     "optimism": [{"lowerBound": 0,
                  "upperBound": 0.7}],
     "dateRange": {"earliestYear": 2030,
                   "latestYear": 2070},
     "relevance": 0.7,
     "isPositive": False,
     "tags": ["Environment"],
     },
# AI generated stuf
   {
     "title": "Asteroid Apophis Near-Earth Flyby",
     "description": "The 370-meter asteroid Apophis will pass extremely close to Earth — closer than some satellites — on Friday, April 13, 2029.",
     "image": "apophis_flyby.jpg",
     "source": ["https://www.nasa.gov/feature/planetary-defense-in-action-nasa-analysts-track-asteroid-apophis"],
     "optimism": [{"lowerBound": 0.2, "upperBound": 0.9}],
     "dateRange": {"earliestYear": 2029, "latestYear": 2029},
     "relevance": 0.7,
     "isPositive": True,
     "tags": ["Space", "Natural Disaster", "Science"]
   },
   {
     "title": "First Climate Refugee Crisis",
     "description": "As climate change accelerates, certain regions may become uninhabitable due to flooding, heatwaves, or desertification, displacing millions.",
     "image": "climate_refugees.jpg",
     "source": ["https://www.unhcr.org/en-us/climate-change-and-displacement"],
     "optimism": [{"lowerBound": 0.1, "upperBound": 0.4}],
     "dateRange": {"earliestYear": 2030, "latestYear": 2050},
     "relevance": 0.8,
     "isPositive": False,
     "tags": ["Environment", "Social", "Politics"]
   },
   {
     "title": "AI Replaces 50% of Jobs",
     "description": "Widespread adoption of advanced AI may automate nearly half of all current human jobs, disrupting economies and social systems worldwide.",
     "image": "ai_jobs.png",
     "source": ["https://www.weforum.org/agenda/2020/10/future-of-jobs-report-2020-pandemic-automation-recession/"],
     "optimism": [{"lowerBound": 0.2, "upperBound": 0.6}],
     "dateRange": {"earliestYear": 2035, "latestYear": 2060},
     "relevance": 0.9,
     "isPositive": False,
     "tags": ["AI", "Economy", "Social"]
   },
    {
       "title": "First Use of Autonomous AI in Warfare",
       "description": "A military force deploys AI-controlled autonomous weapons capable of independently selecting and engaging targets without human oversight.",
       "image": "ai_warfare.jpg",
       "source": ["https://www.un.org/en/artificial-intelligence/weaponization"],
       "optimism": [{"lowerBound": 0.1, "upperBound": 0.4}],
       "dateRange": {"earliestYear": 2027, "latestYear": 2045},
       "relevance": 0.85,
       "isPositive": False,
       "tags": ["AI", "Politics", "Social"]
     },
     {
       "title": "Limited Nuclear Conflict",
       "description": "A regional nuclear exchange involving a small number of warheads disrupts global systems and escalates geopolitical tensions, triggering widespread humanitarian crises.",
       "image": "limited_nuclear_war.jpg",
       "source": ["https://www.armscontrol.org/factsheets/nuclearscenarios"],
       "optimism": [{"lowerBound": 0.0, "upperBound": 0.2}],
       "dateRange": {"earliestYear": 2025, "latestYear": 2040},
       "relevance": 1.0,
       "isPositive": False,
       "tags": ["Politics", "Natural Disaster", "Environment"]
     },
     {
       "title": "Global Ban on Autonomous Weapons",
       "description": "The international community agrees to a legally binding treaty banning fully autonomous weapons, aiming to prevent AI-driven conflicts.",
       "image": "ai_weapon_ban.jpg",
       "source": ["https://www.hrw.org/news/2023/11/09/global-push-ban-killer-robots"],
       "optimism": [{"lowerBound": 0.5, "upperBound": 0.9}],
       "dateRange": {"earliestYear": 2028, "latestYear": 2045},
       "relevance": 0.8,
       "isPositive": True,
       "tags": ["Politics", "AI", "Social"]
     },
     {
       "title": "World War III Scenario Avoided",
       "description": "A near-miss escalatory incident between major powers is defused through rapid diplomacy, narrowly avoiding global war.",
       "image": "ww3_avoided.jpg",
       "source": ["https://www.brookings.edu/articles/the-future-of-war-scenarios-and-policy-options/"],
       "optimism": [{"lowerBound": 0.4, "upperBound": 0.9}],
       "dateRange": {"earliestYear": 2025, "latestYear": 2050},
       "relevance": 0.95,
       "isPositive": True,
       "tags": ["Politics", "Social"]
     },
     {
       "title": "Treaty to Eliminate All Nuclear Weapons",
       "description": "A landmark global agreement leads to verified dismantling of all nuclear weapons, reducing existential risk for humanity.",
       "image": "nuclear_disarmament.webp",
       "source": ["https://www.un.org/disarmament/wmd/nuclear/tpnw/"],
       "optimism": [{"lowerBound": 0.7, "upperBound": 1.0}],
       "dateRange": {"earliestYear": 2035, "latestYear": 2100},
       "relevance": 1.0,
       "isPositive": True,
       "tags": ["Politics", "Social", "Environment"]
     },
     {
       "title": "Cyber War Causes Infrastructure Collapse",
       "description": "A massive cyberattack cripples major infrastructure — including power grids and internet — causing widespread chaos and economic damage.",
       "image": "cyberwar_infra.jpg",
       "source": ["https://www.cisa.gov/topics/cyber-threats"],
       "optimism": [{"lowerBound": 0.1, "upperBound": 0.5}],
       "dateRange": {"earliestYear": 2025, "latestYear": 2040},
       "relevance": 0.85,
       "isPositive": False,
       "tags": ["Politics", "Economy", "Social"]
     },
     {
       "title": "First Orbital Military Engagement",
       "description": "Two or more spacefaring nations engage in hostile actions in Earth orbit, targeting satellites or other space assets, marking the start of space warfare.",
       "image": "space_warfare.jpg",
       "source": ["https://www.cfr.org/backgrounder/militarization-space-outer-space-treaty"],
       "optimism": [{"lowerBound": 0.2, "upperBound": 0.5}],
       "dateRange": {"earliestYear": 2030, "latestYear": 2050},
       "relevance": 0.7,
       "isPositive": False,
       "tags": ["Space", "Politics", "Science"]
     },
  {
    "title": "Room-Temperature Superconductors",
    "description": "The discovery of room-temperature, ambient-pressure superconductors would revolutionize energy transmission, electronics, and magnetic systems.",
    "image": "superconductors.jpg",
    "source": ["https://www.nature.com/articles/s41586-020-2801-z"],
    "optimism": [{"lowerBound": 0.5, "upperBound": 0.9}],
    "dateRange": {"earliestYear": 2030, "latestYear": 2050},
    "relevance": 0.75,
    "isPositive": True,
    "tags": ["Science"]
  },
  {
    "title": "Longevity Therapies Become Mainstream",
    "description": "Anti-aging treatments that significantly extend healthy human lifespan become widely available, including senolytics, telomere therapies, and gene editing.",
    "image": "longevity.jpg",
    "source": ["https://www.lifespan.io/news/senolytics-and-longevity/"],
    "optimism": [{"lowerBound": 0.6, "upperBound": 1}],
    "dateRange": {"earliestYear": 2030, "latestYear": 2055},
    "relevance": 0.7,
    "isPositive": True,
    "tags": ["Medicine", "Science"]
  },
  {
    "title": "First Human Brain Emulation",
    "description": "A complete simulation of a human brain at the neuronal level is achieved, representing a breakthrough in neuroscience and AI modeling.",
    "image": "brain_emulation.png",
    "source": ["https://en.wikipedia.org/wiki/Whole_brain_emulation"],
    "optimism": [{"lowerBound": 0.3, "upperBound": 0.8}],
    "dateRange": {"earliestYear": 2040, "latestYear": 2080},
    "relevance": 0.85,
    "isPositive": True,
    "tags": ["Science", "AI"]
  },
  {
    "title": "Universal Antiviral Drug Created",
    "description": "A broad-spectrum antiviral treatment is developed that can neutralize a wide range of viruses, reducing the risk of future pandemics.",
    "image": "universal_antiviral.jpg",
    "source": ["https://www.nih.gov/news-events/news-releases/researchers-develop-broad-spectrum-antiviral-agents"],
    "optimism": [{"lowerBound": 0.6, "upperBound": 1}],
    "dateRange": {"earliestYear": 2028, "latestYear": 2040},
    "relevance": 0.75,
    "isPositive": True,
    "tags": ["Medicine", "Science"]
  },
  {
    "title": "CRISPR-Based Genetic Disease Elimination",
    "description": "Gene-editing technology like CRISPR is used to prevent or cure inheritable genetic disorders at the embryonic or early-childhood stage.",
    "image": "crispr_cure.jpg",
    "source": ["https://www.nature.com/articles/d41586-023-00910-7"],
    "optimism": [{"lowerBound": 0.5, "upperBound": 1}],
    "dateRange": {"earliestYear": 2026, "latestYear": 2045},
    "relevance": 0.8,
    "isPositive": True,
    "tags": ["Medicine", "Science"]
  },
  {
    "title": "Discovery of New Physics Beyond the Standard Model",
    "description": "Experimental results from particle colliders or cosmological observations reveal physics that cannot be explained by the Standard Model, changing our fundamental understanding of the universe.",
    "image": "new_physics.jpg",
    "source": ["https://home.cern/science/physics/standard-model"],
    "optimism": [{"lowerBound": 0.6, "upperBound": 1}],
    "dateRange": {"earliestYear": 2035, "latestYear": 2075},
    "relevance": 0.7,
    "isPositive": True,
    "tags": ["Science"]
  },
  {
    "title": "Artificial Photosynthesis for Energy",
    "description": "Scientists create efficient, scalable systems that mimic plants to convert sunlight, water, and CO₂ into fuel — enabling clean, sustainable energy.",
    "image": "artificial_photosynthesis.jpg",
    "source": ["https://www.energy.gov/eere/solar/artificial-photosynthesis"],
    "optimism": [{"lowerBound": 0.5, "upperBound": 0.9}],
    "dateRange": {"earliestYear": 2030, "latestYear": 2050},
    "relevance": 0.65,
    "isPositive": True,
    "tags": ["Science", "Environment"]
  },
  {
    "title": "Global Climate Migration Crisis",
    "description": "Rising sea levels, heatwaves, drought, and extreme weather force tens to hundreds of millions to relocate across and within borders, creating major geopolitical pressure.",
    "image": "climate_migration.jpg",
    "source": ["https://www.iom.int/news/climate-migration-numbers-could-soar-216-million-2050-world-bank-warns"],
    "optimism": [{"lowerBound": 0.2, "upperBound": 0.5}],
    "dateRange": {"earliestYear": 2030, "latestYear": 2100},
    "relevance": 0.9,
    "isPositive": False,
    "tags": ["Environment", "Politics", "Social"]
  },
  {
    "title": "Global Carbon Neutrality Achieved",
    "description": "Global carbon emissions reach net-zero, either through massive adoption of renewables, carbon capture, reforestation, and lifestyle changes.",
    "image": "carbon_neutral.jpg",
    "source": ["https://www.iea.org/reports/net-zero-by-2050"],
    "optimism": [{"lowerBound": 0.7, "upperBound": 1}],
    "dateRange": {"earliestYear": 2040, "latestYear": 2100},
    "relevance": 1.0,
    "isPositive": True,
    "tags": ["Environment", "Politics"]
  },
  {
    "title": "Greenhouse Gas Removal at Scale",
    "description": "Direct air capture, ocean carbon sinks, and soil carbon sequestration technologies scale up to remove billions of tons of CO₂ per year.",
    "image": "carbon_removal.jpg",
    "source": ["https://www.iea.org/reports/direct-air-capture-2023"],
    "optimism": [{"lowerBound": 0.6, "upperBound": 1}],
    "dateRange": {"earliestYear": 2035, "latestYear": 2080},
    "relevance": 0.8,
    "isPositive": True,
    "tags": ["Environment", "Science"]
  },
  {
    "title": "Geoengineering Deployed to Cool Earth",
    "description": "Climate engineering technologies like stratospheric aerosol injection or marine cloud brightening are used to temporarily reduce global temperatures.",
    "image": "geoengineering.jpg",
    "source": ["https://www.nature.com/articles/s41558-019-0661-5"],
    "optimism": [{"lowerBound": 0.2, "upperBound": 0.7}],
    "dateRange": {"earliestYear": 2035, "latestYear": 2080},
    "relevance": 0.8,
    "isPositive": True,
    "tags": ["Environment", "Science", "Politics"]
  },
  {
    "title": "Major Ocean Current Disruption",
    "description": "A shutdown or major slowing of key ocean circulation systems like the Atlantic Meridional Overturning Circulation (AMOC) leads to dramatic regional climate shifts.",
    "image": "amoc_collapse.jpg",
    "source": ["https://www.nature.com/articles/s41467-021-25226-5"],
    "optimism": [{"lowerBound": 0, "upperBound": 0.4}],
    "dateRange": {"earliestYear": 2030, "latestYear": 2100},
    "relevance": 0.9,
    "isPositive": False,
    "tags": ["Environment", "Natural Disaster"]
  },
  {
    "title": "Global Treaty on Climate Justice",
    "description": "A legally binding international framework is created to compensate countries most affected by climate change, addressing historical emissions and inequity.",
    "image": "climate_justice_treaty.png",
    "source": ["https://www.un.org/en/climatechange/adaptation-loss-and-damage"],
    "optimism": [{"lowerBound": 0.5, "upperBound": 0.9}],
    "dateRange": {"earliestYear": 2030, "latestYear": 2060},
    "relevance": 0.7,
    "isPositive": True,
    "tags": ["Environment", "Politics", "Social"]
  },
  {
    "title": "Global Coral Reef Collapse",
    "description": "Warming oceans and acidification cause over 90% of coral reefs to die off, leading to massive biodiversity loss and impacts to food chains and tourism economies.",
    "image": "coral_reef_collapse.webp",
    "source": ["https://www.ipcc.ch/report/ar6/wg2/"],
    "optimism": [{"lowerBound": 0, "upperBound": 0.3}],
    "dateRange": {"earliestYear": 2025, "latestYear": 2055},
    "relevance": 0.7,
    "isPositive": False,
    "tags": ["Environment", "Natural Disaster"]
  }
]

"""
    {"title": "",
     "description": "",
     "image": "",
     "source": [],
     "optimism": [{"lowerBound": 0,
                  "upperBound": 1}],
     "dateRange": {"earliestYear": 2025,
                   "latestYear": 2050},
     "relevance": 0.5,
     "isPositive": True,
     "tags": [],
     },
 """

def test_date_filter(optimism, entry):
    """
    test function to show how an entered optimism value
    would edit the year of an entry.

    :param optimism: float 0-1 of the entered optimism
    :param entry: an entry of the data, with an optimism and dateRange attribute
    :return: int year, the year of the event to occur
    """
    return 0

with open("timeline_data.json","w") as f:
    json.dump(data, f)

