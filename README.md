# Pacman-Game-Project

I started this project in week 3 of my Software engineering course. It took me around 4 days to complete. The project is based on the game Pac-man, it’s a simple retro style game. I used three different languages to complete this. HTML, JavaScript, and CSS.


Deployment link
https://onlyonelz.github.io/Pacman-Game-Project/ 

The time frame for this project was around a week. I worked independently.

Front End:
HTML: Used to structure the web pages and define the content of the Pacman game.
CSS: Employed for styling and layout, ensuring a visually appealing and responsive design for the game interface.
JavaScript: Utilised to implement the game logic, handle user interactions, and manage the dynamic behaviour of Pacman and other game elements.
Development Tools:
VS Code: Chosen as the integrated development environment (IDE) for writing, debugging, and managing the codebase of the Pacman game.
Project Planning and Collaboration:
Trello Board: Employed as a project management tool to plan, organise, and track tasks throughout the development process. Trello facilitated effective collaboration and ensured that each team member could easily manage their respective responsibilities.
Excalidraw: Utilised for visual planning and diagramming during the project's initial stages. Excalidraw helped in creating wireframes and visual representations of the game structure, enhancing the clarity of the development roadmap.

Brief

Create a game using Vanilla JavaScript
You must have win/lose functionality 


Planning

Here I mapped out my plan for my game using Excalidraw. Added must have features and stretch goals lists. I used images so i could visualise how I wanted my game to look 
And went into small detail about each part of functionality so i could break up each individual task


Build/Code Process

So I started off by trying to figure out the set interval function
After a lot of trial and error I managed to accomplish my goal of using it to allow the pac-man icon to move continuously in one direction, with only the click of a button, until it reached a wall
Next I tried to think about how I could set boundaries for the icons, essentially creating a map.
I started of by making a variable full of all the grid cell ids that i wanted as my boundary,
Then i gave all the array items a class of ‘wall’
I then ran into a problem trying to create the conditional statements for the for loop that controls movement. I had to find a way to stop the icon moving up/right/left/down depending on what the cell to the up/right/left/down was

And finally I added in a function that created a coin class and added the background of the coin to the cells I wanted it to and also added a remove function once pacman entered the same cell.
Now it's time to add the Ghosts. I achieved this by creating a function that generated a random number depending on the length of an array that contained left right up and down, essentially giving a number between 0 - 3 then using that number as an index giving a random direction each time the function runs. In the same function, I then used an if else statement with the same conditionals as the handle movement if else statements. This made it so the ghosts would try to move in a random direction and if it couldn't move in that direction because of a wall it would run the function again and generate another random direction, giving them a kind of odd movement. 
I used this method to achieve the movement of the ghosts because it made them very unpredictable, never allowing the user to get comfy while playing.



I then added a life count and created an if statement for the collision detection. I put this inside the ghost movement function as everytime the ghosts move it should check whether pacman is in the cell it's moving into, if so it should reset pacman and the ghosts back to starting positions and remove one life from the player. 

My next challenge was that only when the ghosts moved into the cell pacman was in did the lose life if statement run, which was causing a bug. So sometimes when pacman would be hit by the ghosts it wouldn't reset. I overcame this by adding the same hit detection in the pacman handle movement function, so now when pac man moves into a cell where the ghosts are it will also reset the game. 




Getting towards the end of my code I added a few finishing functions, I added the scoreboard if statement in the remove coin function as everytime a coin is removed it adds ten to the score.
and the game's winning function which was very simple. I  just created an if statement for the max score you can acquire. Which is the same every time as there are only a certain amount of coins in the grid. 
Challenges

One of my biggest challenges was getting the ghosts to stay in their little box until the user wanted to play. So I created a bar essentially, adding the cell id of the two cells that blocked them into the wall array. Then to allow them to pass through it after the game started I used the slice method to remove them from the array.

Another challenge was removing the coins from specific areas on the grid. For example the ghosts home position and the cells in the tunnel. To do this I added another if statement in the add coins function with the conditional that says if cells does not contain the cells that i didn't want coins to be in then add coin.


Wins

I am most proud of the ghost movement as It took many hours to code and really brought the game to life. I believe there is still a lot to work on making it more efficient, for example making the ghosts movement generic and actually target the pacman.


Key Learnings/Takeaways

I definitely feel more confident using if else statements and have more of an understanding of each of the methods I can use
I am more comfortable using functions to maximise efficiency when coding and not repeat myself 


Bugs

First one I couldn’t get the blue wall to disappear out of the grid after splicing the ids and removing the class wall from them.


Future Improvements

I definitely will be coming back to this project to work on and improve it as much as I can.
For the future i would like to add:
Powerup coins to make the ghosts vulnerable for ten seconds allowing pac-man to eat them resetting them back to their starting positions and remaining there for 5 seconds.
More detailing to the css
A pause button 
A drop down menu at the start of the game listing instruction 
Updating the audio played when different things happen in the game 
