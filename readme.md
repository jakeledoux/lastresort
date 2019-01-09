# Last Resort
A browser extension that fixes annoying cosmetic Last.fm issues.

Created by [Jake Ledoux](https://jakeledoux.com). Contact: <dev@jakeledoux.com>
***

## How can I install this?

You can find the extenion [here on the Chrome Web Store](https://chrome.google.com/webstore/detail/last-resort/afpofkgganekekgfenmgciebodcbkomh). It's unlisted for now, and will remain that way until v1.0. If you have problems, please create an issue here instead of leaving a negative review. It's in beta, so bugs and odd behaviour should be expected.

## Why does it exist?

Most of us are pretty familiar with the fact that Last.fm combines artists of the same name into one page. As a result of this, if the artist you actually listen to doesn't get as many votes on their photos, your profile and stats will show some band you may have never even heard of before.

Not cool.

I think this will be fixed eventually, but **I want it fixed now, damnit.** That's why.

*To be clear, the changes this extension makes are only visible to **you** on **your** browser. It's purely local and cosmetic.*

## Firefox?

Not yet ):  
Once we're at a point where the codebase is mostly stable then I'll look at porting it. Check out [this issue](https://github.com/jakeledoux/lastresort/issues/4).

## Can I help?

Absolutely! Refer to the [contribution guide](https://github.com/jakeledoux/lastresort/blob/master/CONTRIBUTING.md) to get started.
***

# Changelog

*Because lists!*

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.6]
### Added
- Browser action to manually trigger the script. Just click the extension icon.
- User page top track/obession banner is now replaced too.
### Changed
- The script now works even if you navigate using the back/forward buttons!
- Better support for the redesigned artist/track/album pages. No longer overwrites album headers.
- Minor code restructuring.


## [0.4/0.5]
### Changed
- Non-ASCII characters now supported.