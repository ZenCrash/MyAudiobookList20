<h1>My Audiobook List</h1>
(React Native App, for android and ios)

When it comes to audiobooks some of them are client side files, and others are in-app or on a cloud based service.
With that its hard to keep track of ones audiobooks, how far you got in one, and what audiobooks you have dropped.
this project aims to provide a solution for this.

It should be said this is also one of my first js projects and first introduction to react/react native.
so features will tike some time to implement. and this first edition is made for android.

Features this project aims to do.
Bottom tab menu with the following tabs.

* Home
* Planner
* Library
* Subscriptions

<h3>Home</h3>
(Not implemented yet)
home aims to show popular new audiobooks, recent listen books
and generally info in regards to previous interactions done in the audio book

<h3>Planner</h3>
(not implemented yet)
Iam reluctant to mention this since i fear this comparison is to the entertainment space of anime/manga. 
But looking at the anime / manga(japanese comic books) this have an unofficial popular industri standard called MyAnimeList.com
wich is a 3. party site for keeping track of Watched, Plan to watch, dropped, onhold. for most titles in the space
more over a lot of websites in the space allow you to import this list for their service.

With this we want to create our own app with this in mind.
so with that we don't have a designated website for audiobooks info.
but what we do have is popular websites people share info about Audiobooks on.
Audible, Goodreads.
so with that the planner pages aims to create a list from public titles and info that can be gleamed from on of those sites.
and with that create your own planning list.

<h3>Library</h3>
(work in progress)
Library page, this is ment for the user to access their own files on their mobile device, and external storages.
Files played with automatically create a playlist of all the other files in the folder the file is played from.

In addition to this custom playlist should also be able to be created.

<h3>Subcriptions</h3>
(Not implemented yet)
in addition to planning. over time a admit audiobooks reader listens to a lot of books, and artists.
this section aims to subscribe to authors, Book series, and narrators.
so the user can see if a previous book series, or known artist, has published something new.

Requirements:
* android studio
* vs code
* react native expo needs to be installed in the repository. to achieve this we do the following.
  1. open vs code and open a terminal. in the terminal navigate to your github folder / desires projects location using "cd C:/FOLDERNAME"
  2. once navigated to your desired folder, in the terminal enter the command "npx create-expo-app@latest MYPROJECTNAME"
  3. once the project has been installed, navigate to the folder in your file explore, and extract this project in the folder.
  4. open vc code, select the project folder. and you are good to go.
  5. to run application type "npm run android". (make sure the terminal is in the right folder before running the project)
