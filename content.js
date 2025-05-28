// content.js

// Default phishing words - consider making this configurable via storage later
const defaultPhishingWords = ["urgent", "click here", "verify", "account locked", "suspicious", "reset password", "bank", "login", "confirm", "security alert", "unusual activity"];

function highlightAndBlockEmails(phishingTerms, blacklist) {
  // More robust selector for Gmail rows, might need adjustment if Gmail changes significantly
  const emailRows = document.querySelectorAll('div[role="main"] table[role="grid"] tr[role="row"]');
  if (emailRows.length === 0) {
    // console.log("Phishy Shield: No email rows found with the current selector.");
    return;
  }

  emailRows.forEach(row => {
    // Skip header rows or other non-email rows if they get caught
    if (row.querySelectorAll('th').length > 0) return;

    // Reset previous styling to avoid accumulation if the script runs multiple times on the same rows
    row.style.border = "";
    row.style.backgroundColor = ""; // Reset background if you were changing it
    row.removeAttribute('title');   // Reset title

    // Attempt to find subject - Gmail's class names can change
    const subjectElement = row.querySelector('span[data-legacy-thread-id]'); // Common in newer Gmail
    let subjectText = "";
    if (subjectElement) {
        // Try to get the most relevant text content
        const subjectSpan = subjectElement.querySelector('span > span'); // often where actual subject text is
        subjectText = subjectSpan ? subjectSpan.innerText.trim().toLowerCase() : subjectElement.innerText.trim().toLowerCase();
    } else {
        // Fallback selectors for subject
        const altSubject = row.querySelector('.bog, .bqe'); // Older/different views
        subjectText = altSubject ? altSubject.innerText.trim().toLowerCase() : "";
    }


    // Attempt to find sender email - this is tricky as Gmail obfuscates it
    let senderEmail = null;
    const senderElements = row.querySelectorAll('td div[role="gridcell"] span[email]'); // Common pattern
    if (senderElements.length > 0) {
        // Prioritize the one that looks most like a primary sender
        for (const el of senderElements) {
            const email = el.getAttribute('email');
            if (email && email.includes('@')) {
                senderEmail = email.toLowerCase();
                break; // Take the first valid one
            }
        }
    }
    // Fallback: Sometimes sender is in a title attribute of a less specific span
    if (!senderEmail) {
        const senderNameSpans = row.querySelectorAll('td div[role="gridcell"] span[name]');
         for (const el of senderNameSpans) {
            if (el.title && el.title.includes('@')) {
                senderEmail = el.title.toLowerCase(); // This might be "Name <email@example.com>"
                // Extract just the email if needed
                const emailMatch = senderEmail.match(/<([^>]+)>/);
                if (emailMatch && emailMatch[1]) {
                    senderEmail = emailMatch[1];
                }
                break;
            }
         }
    }


    function isBlacklisted(email) {
      if (!email) return false;
      if (blacklist.includes(email)) return true;
      const domain = email.split('@')[1];
      if (domain && blacklist.includes(domain)) return true;
      return false;
    }

    const phishingDetected = phishingTerms.some(word => subjectText.includes(word));
    const spoofDetected = isBlacklisted(senderEmail);

    let originalBackgroundColor = row.style.backgroundColor; // Preserve if already set by Gmail (e.g., unread)

    if (spoofDetected) {
      row.style.borderLeft = "5px solid darkred"; // More prominent border
      row.title = `SPOOF/BLACKLISTED sender: ${senderEmail || 'Unknown'}`;
      // Optional: change background slightly
      // row.style.backgroundColor = "rgba(139, 0, 0, 0.05)";
    } else if (phishingDetected) {
      row.style.borderLeft = "5px solid red";
      row.title = `Possible Phishing (Keywords): ${subjectText}`;
      // Optional: change background slightly
      // row.style.backgroundColor = "rgba(255, 0, 0, 0.05)";
    } else {
      // Optionally mark as "safe" or just leave it alone
      // row.style.borderLeft = "5px solid green";
      // row.title = "Looks Safe";
    }
  });
}

// Fetch blacklist and phishing words from storage and run highlight
function runHighlighter() {
  chrome.storage.local.get(['blacklist', 'phishingWordsSetting'], result => {
    const blacklist = result.blacklist || [];
    const phishingTerms = result.phishingWordsSetting || defaultPhishingWords; // Use stored or default
    highlightAndBlockEmails(phishingTerms, blacklist);
  });
}


// --- Observer for dynamic content changes in Gmail ---
// Gmail loads content dynamically, so we need to observe changes.
let debounceTimer;
const observer = new MutationObserver((mutationsList, observer) => {
    // We only care if nodes were added or removed, or if character data changed in a significant way.
    // This is a simple check; more sophisticated checks might be needed if performance is an issue.
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
             // Debounce to avoid running too frequently on rapid changes
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(runHighlighter, 300); // Run after 300ms of no new mutations
            return; // No need to check other mutations once we've decided to run
        }
    }
});

// --- Start observing ---
// We need to wait for the main content area of Gmail to be available.
function startObserver() {
    const targetNode = document.querySelector('div[role="main"]'); // A common main container in Gmail
    if (targetNode) {
        observer.observe(targetNode, { childList: true, subtree: true });
        console.log("Phishy Shield: Observer started on Gmail main content.");
        runHighlighter(); // Run once immediately after observer starts
    } else {
        // If main content isn't ready, try again shortly
        setTimeout(startObserver, 1000);
    }
}


// Initial run and observer setup
console.log("Phishy Shield: Content script loaded.");
startObserver(); // Start the observer


// Optional: Listen for messages from popup (e.g., if blacklist is updated)
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.type === "BLACKLIST_UPDATED") {
//     console.log("Phishy Shield: Received blacklist update from popup.");
//     runHighlighter(); // Re-run with the new blacklist
//   }
// });