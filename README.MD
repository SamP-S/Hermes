## Project Overview 

An infinite side-scrolling game developed jointly by Sam Pearson-Smith and Lloyd 
Arnold during the UK's first Covid-19 lockdown. Intended primarily as a way of 
building familiarity and comfort with javascript and web animation, the game is 
not currently hosted anywhere, but can be run on a local machine by cloning the 
repo and opening the "web-page.html" file. 

### Code Structure 

##### Main.js
The main game logic is held in this file; it is the entry point and 
contains the driving loop. Primarily written by Lloyd.

##### Graphics.js
A graphics module for use by game logic code. An instance of the 
'facade' design pattern, this file provides a simple interface between the rest of the 
project and the more complex Three.js libary. Graphics use WebGL, and are currently 
2D, but have potential to be replaced with 2.5D. Primarily written by Sam.

##### Input.js 
An input parsing module, allowing the program to take user input. Primarily written 
by Sam. 

##### Levels.js 
This module deals with creation of different 'blocks', that are chained together to give the
impression of an infinite platform universe. It works by adding one of a range of 
possible paradigms, with random mutations, to a queue, and then deleting them once they have 
been passed over. Logic was jointly designed, code implementation primarily by Lloyd. 

##### Objects.js
This module provides classes for basic in-game objects and implements physics on these. 
Primarily written by Lloyd, jointly debugged. 

##### Sprites.js 
This module extends basic object classes to implement sprites. Written by Lloyd. 

##### Three.js
WebGL library. 

##### Timer.js
Implement a game timer, used to keep score and to gradually increase run speed.
Written by Sam. 
