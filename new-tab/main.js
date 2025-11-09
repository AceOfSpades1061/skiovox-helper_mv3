import { DragController } from "./drag-controller.js";
import { FullscreenController } from "./fullscreen-controller.js";
import { BatteryDisplay } from "./battery-display.js";
import { DateDisplay } from "./date-display.js";
import { TimeDisplay } from "./time-display.js";
import { BackgroundController } from "./background-controller.js";

const WIFI_URL = "chrome://network/#select";
const BLUETOOTH_URL = "chrome://bluetooth-pairing";
const SETTINGS_URL = "chrome://settings";
const CUSTOMIZE_URL = "chrome://customize-chrome-side-panel.top-chrome";
const FILES_URL = "chrome://file-manager";
const HELP_URL = "https://github.com/AceOfSpades1061/skiovox-helper_mv3";
const WEBSTORE_URL = "https://chromewebstore.google.com";
const ADDSESSION_URL = "https://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fwww.google.com%2F&hl=en&flowName=GlifWebSignIn&flowEntry=AddSession";

let [
    help,
    webStore,
    addAccount,
    move,
    fullscreen,
    reset,
    theme,
    colorChange,
    wifi,
    bluetooth,
    files,
    settings
] = document.querySelectorAll('svg')

let version = document.querySelector('.version')
let date = document.querySelector('.date')
let time = document.querySelector('.time')
let battery = document.querySelector('.battery')

version.textContent = "v" + chrome.runtime.getManifest().version

wifi.addEventListener('click', () => {
    chrome.tabs.create({ url: WIFI_URL })
})

bluetooth.addEventListener('click', () => {
    chrome.tabs.create({ url: BLUETOOTH_URL })
})

settings.addEventListener('click', () => {
    chrome.tabs.create({ url: SETTINGS_URL })
})

theme.addEventListener('click', () => {
    chrome.tabs.create({ url: CUSTOMIZE_URL })
})

files.addEventListener('click', () => {
    chrome.tabs.create({}, (tab) => {
        chrome.tabs.update(tab.id, { url: FILES_URL })
    })
})

help.addEventListener('click', () => {
    chrome.tabs.create({ url: HELP_URL })
})

webStore.addEventListener('click', () => {
    let version = Number(navigator.appVersion.match(/Chrom(e|ium)\/([0-9]+)/)[2]);
    if (version < 113) { // not sure if this is actually the version
        alert("This web store may not supported by your version");
    }

    chrome.tabs.create({ url: WEBSTORE_URL })
})

addAccount.addEventListener('click', () => {
    chrome.tabs.create({ url: ADDSESSION_URL })
})

reset.addEventListener('click', () => {
    if (confirm("Are you sure you want to reset Skiovox helper settings? Note: This will replace the current tab with the default new tab page.")) {
        localStorage.clear()
        chrome.runtime.reload()
    }
})

new DragController(move);
new FullscreenController(fullscreen);
new BatteryDisplay(battery);
new DateDisplay(date);
new TimeDisplay(time);
new BackgroundController(colorChange);
