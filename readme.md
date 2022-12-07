Still under construction. My first React work so it's definitely not good. I'll settle for working first. 

Designed to be an extension/add-on that can display a kanji and some information about it on the new tab page. I was inspired by [Kanjiday](https://kanjiday.com/) but it no longer exists on the chrome extension store. This has been fun to make as it is a solution to an actual problem I had once Kanjiday was removed. 

The user can select which time interval they'd like to retrieve a new kanji at as well as which grades of kanji will be considered in the random selection. They can also change the primary and secondary colors in a seperate menu. 

I'd like to be able to warn the user that they've selected two very similar colors but I'll leave that for another time. 
I'm thinking the menu for the color selection should probably not bring along any sort of modal background that darkens the user's view of the page as well as the position of the modal window being suboptimal but I'll rectify that in a future update.

There's an error message that appears when loading it as an unpacked extension in chrome about the icons entry in the manifest being the wrong type but no matter what I try I cannot get it to go away. It seems to be a chrome issue though as firefox doesn't report it. 

I used [framer-motion](https://www.framer.com/motion/) for the animation, [dayjs](https://day.js.org/) for date functions, as well as [react-colorful](https://omgovich.github.io/react-colorful/) for the color pickers. 

The api I used for the kanji and related info is provided by [Kanjiapi.dev](https://kanjiapi.dev/). I will be asking for forgiveness because I did not ask for permission. 

Chrome users: Download the release in the sidebar. Navigate to chrome://extensions/ and toggle dev mode on. Then select "Load unpacked" and select the folder you downloaded in releases. 

Firefox users: Grab the add-on [here](https://addons.mozilla.org/en-US/firefox/addon/kanjistart/) (when it's approved.)

# Screenshots

![Screen Shot 2022-12-06 at 21 24 31-fullpage](https://user-images.githubusercontent.com/50127921/206073075-16d9c76a-a2be-4c4b-8b87-f2c30a025053.png)

![Screen Shot 2022-12-06 at 21 38 44-fullpage](https://user-images.githubusercontent.com/50127921/206074347-3872b7c4-110b-4e21-8f7a-eb10fdb9c19b.png)

![Screen Shot 2022-12-06 at 21 28 42-fullpage](https://user-images.githubusercontent.com/50127921/206073086-d1b642f9-117f-404f-9754-a9b7aed4afb6.png)

