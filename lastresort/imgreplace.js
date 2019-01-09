// Jake Ledoux, 2019
// dev@jakeledoux.com
// fight me on github

var bodyClasses = document.body.classList;

// Super handy redesign check
var isRedesign = [
    "album-overview-new",
    "artist-overview-new",
    "track-overview-new"
].some(r => document.body.classList.contains(r));

// Get page type
var pageType;
if (bodyClasses.contains("artist-overview-new")) {
    pageType = "artist";
}
else if (bodyClasses.contains("album-overview-new")) {
    pageType = "album";
}
else if (bodyClasses.contains("track-overview-new")) {
    pageType = "track";
}
else if (document.URL.includes("last.fm/user/")) {
    pageType = "user";
}

// Grab options and run the replace code for each artist
var options;
chrome.storage.sync.get("imgreplace", function (details) {
    options = details["imgreplace"];
    
    for (let i = 0; i < options.length; i++) {
        Replace(options[i]["name"], options[i]["url"], options[i]["color"]);
    }
});

if (pageType == "user") {
    chrome.storage.sync.get("condense_padding", function(details) {
        if (details.condense_padding) {
            WriteCSS(".chartlist-row { padding: 5px; }");
        }
    });
}

function WriteCSS(css) {
    let style = document.getElementsByTagName("style");
    if (style.length == 0) {
        style = document.getElementsByTagName("head")[0].appendChild(document.createElement("style"));
    }
    else {
        style = style[0];
    }
    style.innerHTML += "\n"+css+"\n";
}

// Got this from a StackOverflow user. Thanks, "Tim Down"!
function HexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function ChangeImage(imgElement, imgURL) {
    imgElement.src = imgURL;
    imgElement.style.objectFit = "cover";
    imgElement.style.width = "100%";
    imgElement.style.height = "100%";
}

function Replace(artistName, imgURL, color)
{
    // The replace call is because Last.fm uses + instead of %20 for URL spaces.
    var artistString = "/music/" + encodeURIComponent(artistName).replace(/%20/g, '+');

    // Get all anchors that link the artist's page
    var artistElements = document.querySelectorAll("a[href='" + artistString + "']");

    // Artist/track/album pages
    if (document.URL.includes("last.fm" + artistString)) {

        // Legacy artist page
        if (!isRedesign) {
            let avatars = document.getElementsByClassName("avatar");
            for (let i = 0; i < avatars.length; i++) {

                if (avatars[i].parentElement.nodeName ==  "A") {
                    if (avatars[i].parentElement.href.includes(artistString)) {
                        avatars[i].src = imgURL;
                    }
                }
            }
        }
        else {
            // Redesigned Artist Page
            let colorRGB = HexToRgb(color);
            let colorString = `${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b}`;

            // Header
            if (pageType == "artist" || pageType == "track") {
                let header = document.getElementsByClassName("header-new-background-image")[0];
                header.style.backgroundImage = "url('" + imgURL + "')";
                header.parentElement.style.background = color;

                let gradient = document.getElementsByClassName("header-new-background-overlay")[0];
                let gradientMobile = document.getElementsByClassName("header-new-background-overlay-mobile")[0];

                gradient.style.background = `linear-gradient(0.25turn, rgb(${colorString}), rgba(${colorString}, 0))`;
                gradientMobile.style.background = `linear-gradient(0.25turn, rgb(${colorString}), rgba(${colorString}, 0))`;
            }
            
            // "About this artist"
            let artistImage = document.getElementsByClassName("gallery-preview-image--0");
            if (artistImage.length > 0) {
                artistImage[0].style.width = "100%";
                artistImage[0].style.height = "100%";
                ChangeImage(artistImage[0].firstElementChild, imgURL);
            }
        }
    }

    // User obsession/top track
    if (pageType == "user") {
        if (document.querySelector(".featured-item-details a.featured-item-artist").href.includes(artistString)) {
            let header = document.getElementsByClassName("header-background")[0];

            header.style.backgroundImage = `url("${imgURL}")`;
        }
    }

    // Most images
    for (let i = 0; i < artistElements.length; i++) {
        let artistElement = artistElements[i];

        if (artistElement.parentElement.classList.contains("grid-items-cover-image")) {
            let imgDiv = artistElement.parentElement.getElementsByClassName("grid-items-cover-image-image")[0];
            imgDiv.style.width = "100%";
            imgDiv.style.height = "100%";
            let imgElement = imgDiv.firstElementChild;
            ChangeImage(imgElement, imgURL);
        }
        else if (artistElement.parentElement.classList.contains("discovery-stat-top-item")) {
            let imgElement = artistElement.parentElement.getElementsByClassName("discovery-stat-top-item-image")[0];
            ChangeImage(imgElement, imgURL);
        }
        else if (artistElement.parentElement.classList.contains("chartlist-image") || 
            artistElement.parentElement.classList.contains("user-dashboard-catalogue-item-top-item") ||
            artistElement.parentElement.classList.contains("library-header")) {
            let imgElement = artistElement.parentElement.getElementsByClassName("avatar")[0].firstElementChild;
            
            ChangeImage(imgElement, imgURL);
        }
    }
}