
# How It Works
**This extension enhances your email security by:**

1.Automatically highlighting emails suspected of phishing in red.
2.Marking emails from senders on your blacklist with a dark red border.
3.Allowing you to curate a personal blacklist of suspicious email addresses or domains below.
Please Note: Highlighting serves as a precautionary alert. Always exercise your own judgment before interacting with any email.


# Phishy Shield - Chrome Extension

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Phishy Shield is a Chrome extension designed to enhance your email security within Gmail by automatically highlighting potentially suspicious emails and allowing you to maintain a personal blacklist of email addresses and domains.

## Features

*   **Automatic Phishing Detection:** Highlights emails in your Gmail inbox that contain common phishing-related keywords in their subject lines with a **<span style="color:red;">red</span>** border.
*   **Custom Blacklist:** Allows you to add specific email addresses or entire domains to a personal blacklist.
*   **Blacklist Highlighting:** Emails from senders on your blacklist are prominently marked with a **<span style="color:darkred;">dark red</span>** border.
*   **Informative Tooltips:** Hover over highlighted emails to see why they were flagged (keyword match or blacklist).
*   **User-Friendly Popup:** Easily manage your blacklist and understand how the extension works via a simple popup interface.




## How It Works

The extension operates in two main ways:

1.  **Content Script (`content.js`):**
    *   This script runs directly on `mail.google.com` pages.
    *   It scans your email rows for subject lines containing predefined phishing keywords.
    *   It also checks the sender's email address and domain against your personal blacklist (loaded from `chrome.storage`).
    *   Based on these checks, it applies visual styling (colored left borders and tooltips) to the email rows in your inbox.
    *   A `MutationObserver` is used to efficiently re-scan for new emails or changes in the Gmail interface.

2.  **Popup Interface (`popup.html`, `popup.js`, `popup.css`):**
    *   Accessible by clicking the extension icon in the Chrome toolbar.
    *   Provides information on how the extension functions.
    *   Includes a blacklist manager where you can:
        *   Add new email addresses or domains to your blacklist.
        *   View and remove existing entries from your blacklist.
    *   The blacklist is stored locally using `chrome.storage.local`.

## Installation (For Developers / Local Testing)

To install and test Phishy Shield locally:

1.  **Download or Clone the Repository:**
    *   If you have this project on GitHub, clone it:
        ```bash
        git clone https://github.com/SabahMuhamed/Phishy
        ```
    *   Alternatively, download the source code as a ZIP file and extract it.

2.  **Prepare Files:**
    Ensure all necessary files are present in the extension's root folder:
    *   `manifest.json`
    *   `popup.html`
    *   `popup.js`
    *   `popup.css`
    *   `content.js`
    *   `background.js`
    *   `content.css` (can be empty)
    *   An `icons/` folder containing `icon16.png`, `icon48.png`, and `icon128.png`.

3.  **Open Chrome Extensions Page:**
    *   Open your Google Chrome browser.
    *   Navigate to `chrome://extensions`.

4.  **Enable Developer Mode:**
    *   In the top-right corner of the Extensions page, turn ON the "Developer mode" toggle.

5.  **Load Unpacked Extension:**
    *   Click the "Load unpacked" button that appears.
    *   In the file dialog, navigate to and select the root folder of the Phishy Shield extension (the folder containing `manifest.json`).
    *   Click "Select Folder."

6.  **Verify:**
    *   The "Phishy Shield" extension should now appear in your list of installed extensions.

## Usage

1.  **Pin the Extension:** For easy access, click the puzzle piece (🧩) icon in your Chrome toolbar, find "Phishy Shield," and click the pin (📌) icon next to it.

2.  **Open Gmail:** Navigate to `mail.google.com`.
    *   The extension will automatically start highlighting emails based on phishing keywords or your blacklist.
    *   Hover over a highlighted email to see the reason.

3.  **Manage Your Blacklist:**
    *   Click the Phishy Shield icon in your toolbar to open the popup.
    *   Use the "Manage Blacklist" section to add or remove email addresses and domains. Changes are saved automatically.



## Future Enhancements (Ideas)

*   Allow users to customize the list of phishing keywords via the popup.
*   Option to whitelist specific senders or subjects.
*   More sophisticated phishing detection algorithms.
*   Synchronization of blacklist across devices (using `chrome.storage.sync`).
*   Improved UI/UX for the popup.

## Contributing

Contributions are welcome! If you have suggestions or find bugs, please open an issue or submit a pull request.

*(If you have specific contribution guidelines, add them here.)*

