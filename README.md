# Phishy
A simple extention for avoiding phishing emails in Gmail.
# How It Works
This extension enhances your email security by:

1.Automatically highlighting emails suspected of phishing in red.
2.Marking emails from senders on your blacklist with a dark red border.
3.Allowing you to curate a personal blacklist of suspicious email addresses or domains below.
Please Note: Highlighting serves as a precautionary alert. Always exercise your own judgment before interacting with any email.


# How to Use

# Part 1: Preparing Your Extension Files
Create a Main Folder:
On your computer, create a new folder. Let's name it phishy-shield-extension. This folder will hold all your extension's files.
Organize Files Inside:
Place all the files directly into this phishy-shield-extension folder:
manifest.json
popup.html
popup.js
popup.css
content.js
background.js
content.css (You can create this as an empty file if you don't have specific styles for it yet)
Create the icons Folder:
Inside the phishy-shield-extension folder, create another folder named icons.
# Add Icons:
Place your icon files into the icons folder. You'll need:
icon16.png (16x16 pixels)
icon48.png (48x48 pixels)
icon128.png (128x128 pixels)
(If you don't have icons yet, you can find simple placeholder PNGs online, or create them. The extension will still load without them, but it won't have an icon in the toolbar or extensions page).
# Your final folder structure should look like this:
phishy-shield-extension/
├── manifest.json
├── popup.html
├── popup.js
├── popup.css
├── content.js
├── content.css
├── background.js
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
Use code with caution.
# Part 2: Loading the Extension in Chrome (Developer Mode)
Open Chrome Extensions Page:
Open your Google Chrome browser.
In the address bar, type chrome://extensions and press Enter.
Alternatively, click the three vertical dots (⋮) in the top-right corner of Chrome, go to "More tools," and then select "Extensions."
Enable Developer Mode:
On the Extensions page, look for a toggle switch labeled "Developer mode" (usually in the top-right corner).
Turn this toggle ON. This will reveal new options, including "Load unpacked."
(Image for illustration)
Load Unpacked Extension:
With Developer mode enabled, you'll see a button that says "Load unpacked." Click this button.


# Select Your Extension Folder:
A file dialog will open. Navigate to and select the phishy-shield-extension folder (the main folder you created, not any file inside it).
Click "Select Folder" or "Open."
# Verify Installation:
If there are no errors in your manifest.json or other critical files, your "Phishy Shield" extension should now appear in the list of installed extensions.
You should see its name, version, and icon (if provided).
Any errors during loading will typically be displayed on this page. Common errors are related to typos in manifest.json.

# Part 3: Using the "Phishy Shield" Extension
Pin the Extension (Optional but Recommended):
Click the puzzle piece icon (🧩) in Chrome's toolbar (this is the "Extensions" menu).
Find "Phishy Shield" in the list.
Click the pin icon (📌) next to it. This will make the extension's icon visible directly in your Chrome toolbar for easy access.
# Open Gmail:
Navigate to https://mail.google.com/ and log in to your Gmail account.
Observe Email Highlighting (Content Script):
The content.js script should automatically start working.
Look at your emails in the inbox list.
Emails with subjects containing keywords like "urgent," "verify," "bank," etc., should have a red left border.
If you later add a sender's email or domain to the blacklist via the popup, emails from that sender should have a dark red left border.
Hover over a highlighted email row to see a tooltip with the reason (e.g., "SPOOF/BLACKLISTED sender:..." or "Possible Phishing (Keywords):...").
Note: The selectors in content.js for finding email rows, subjects, and senders in Gmail can be fragile. If Gmail updates its HTML structure, these might stop working correctly. This is a common challenge with extensions that modify complex websites.
# Open the Popup:
Click the "Phishy Shield" icon in your Chrome toolbar (the one you pinned, or find it in the puzzle piece menu).
The popup window will appear.
Using the Popup:
Information: The top section explains how the extension works and includes the disclaimer.
# Manage Blacklist:
Add Item: In the "Enter email or domain" input field, type an email address (e.g., scammer@example.com) or a domain (e.g., bad-phishing-site.org).
Click the "Add" button or press Enter.
The item will be added to the "Current Blacklist" list below.
Remove Item: In the "Current Blacklist," find an item you want to remove and click the "Remove" button next to it.
The blacklist is saved automatically.
# Test Blacklist:
After adding an email or domain to the blacklist, refresh your Gmail page (or wait for new emails to load).
Emails from senders on your blacklist should now be highlighted with a dark red border.
# Part 4: Updating and Debugging
Making Changes:
If you edit any of your extension files (e.g., popup.js, content.js, manifest.json), you need to reload the extension for the changes to take effect.
Reloading the Extension:
Go back to the chrome://extensions page.
Find your "Phishy Shield" extension.
Click the reload icon (a circular arrow) on the extension's card.
Important: If the popup was open, close it before reloading to avoid the "context invalidated" error during development.
# Debugging:
Popup Errors: Right-click on the open popup and select "Inspect." This will open Developer Tools for the popup, where you can see console logs and errors from popup.js.
Content Script Errors: In your Gmail tab, open Developer Tools (Ctrl+Shift+I or Cmd+Opt+I). Check the "Console" tab for logs and errors from content.js.
Background Script Errors: On the chrome://extensions page, find your extension and click the "Service worker" link (if available, for Manifest V3) or "background page" link (for Manifest V2). This opens Developer Tools for your background script.
You're all set! This should get your extension loaded and running. Remember that developing for a dynamic site like Gmail can sometimes require adjustments to your content script's selectors if Google changes its page structure.
