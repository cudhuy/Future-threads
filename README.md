# FutureThreads
FutureThreads is a futuristic simulation game where players make policy decisions each year.

- These choices directly impact:

- The balance of power

- Public trust in the government

- The state of the environment

If the player fails to manage these elements effectively, the game ends—representing a failed policy strategy.

The goal is to give players a deeper understanding of how complex policy-making can be, the ripple effects of decisions, and the challenge of maintaining long-term stability.

### Solution

FutureThreads engages players by presenting annual decisions and policies that shape in-game events. These choices impact critical aspects such as:

- **Balance of Power**: How decisions shift influence among societal factions.

- **Public Trust**: The effect of policies on government credibility.

- **Environmental Stability**: The consequences of actions on nature.

The game provides a clear view of how policies affect not only their intended targets but also create side effects, highlighting the complexities of governance and long-term decision-making.

### Code Summary

The project is divided into two main components:

- **Frontend**: Built with React, the frontend is responsible for rendering dynamic content in an accessible and user-friendly manner. It displays events and choices to the player, ensuring a smooth and engaging experience.

- **Backend**: Powered by Express, the backend handles the logic for selecting events and choices presented to the player. It stores data in two JSON files, enabling easy data management without requiring a live database. This design also facilitates integration with AI tools like Gemini for potential dynamic content generation.

While the project currently relies on manually curated data (reviewed using Gemini), future plans include automating content generation to enhance scalability and variety.

### Future Enhancements

- Implement dynamic content generation using AI tools like Gemini.

- Expand the range of events and choices for greater replayability.

- Enhance the frontend with additional visualizations for policy impacts.
