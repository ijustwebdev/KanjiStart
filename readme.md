Still under construction. My first React work so it's definitely not good. I'll settle for working first. 

Designed to be an extension/add-on that can display a kanji and some information about it on the new tab page. I was inspired by [Kanjiday](https://kanjiday.com/) but it no longer exists on the chrome extension store. This has been fun to make as it is a solution to an actual problem I had once Kanjiday was removed. 

Currently the user can select grades of kanji to be considered when randomly choosing a new kanji. 

The user can also choose how long until a new kanji is retrieved from a few options.

In the future I'd like to allow the user to select the colors used.

There's an error message that appears when loading it as an unpacked extension about the icons entry in the manifest but no matter what I try I cannot get it to go away.

I used framer-motion for the animation and dayjs for date functions. 

The api I used is provided by [Kanjiapi.dev](https://kanjiapi.dev/). I will be asking for forgiveness because I did not ask for permission. 

Chrome users: Download the release in the sidebar. Navigate to chrome://extensions/ and toggle dev mode to be on. Then select "Load unpacked" and select the folder you downloaded in releases. 

Firefox users: Grab the add-on [here](https://addons.mozilla.org/en-US/firefox/addon/kanjistart/) (when it's approved.)

![previewscreenshot_1280x800](https://user-images.githubusercontent.com/50127921/204089718-22a228cd-e832-4ac7-9dbd-aa125760b9d2.png)


![settingspreview_1280x800](https://user-images.githubusercontent.com/50127921/204090188-ddcb892e-ca3a-4f4b-b752-78777273d95b.png)
