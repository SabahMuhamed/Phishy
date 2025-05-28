// popup.js
document.addEventListener('DOMContentLoaded', () => {
  const blacklistInput = document.getElementById('blacklistInput');
  const addBtn = document.getElementById('addBtn');
  const blacklistItemsUl = document.getElementById('blacklistItems');
  const emptyMessage = document.getElementById('emptyMessage');

  let currentBlacklist = []; // Holds the currently loaded blacklist

  // Function to render the blacklist in the popup
  function renderBlacklist(blacklistToRender) {
    if (!blacklistItemsUl || !emptyMessage) return;

    blacklistItemsUl.innerHTML = ''; // Clear existing items
    if (blacklistToRender.length === 0) {
      emptyMessage.classList.remove('hidden');
    } else {
      emptyMessage.classList.add('hidden');
      blacklistToRender.forEach((item, index) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = item;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('btn', 'btn-remove');
        removeBtn.setAttribute('aria-label', `Remove ${item}`);
        removeBtn.addEventListener('click', () => {
          removeItemFromBlacklist(index);
        });

        li.appendChild(span);
        li.appendChild(removeBtn);
        blacklistItemsUl.appendChild(li);
      });
    }
  }

  // Load blacklist from storage when popup opens
  function loadBlacklist() {
    chrome.storage.local.get(['blacklist'], (result) => {
      currentBlacklist = result.blacklist || [];
      renderBlacklist(currentBlacklist);
    });
  }

  // Save blacklist to storage
  function saveBlacklist() {
    chrome.storage.local.set({ blacklist: currentBlacklist }, () => {
      // Optional: console.log('Blacklist saved');
      // Inform content script about the change (optional, if content script doesn't poll)
      // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      //   if (tabs[0] && tabs[0].id) {
      //     chrome.tabs.sendMessage(tabs[0].id, { type: "BLACKLIST_UPDATED", blacklist: currentBlacklist });
      //   }
      // });
    });
  }

  // Add item to blacklist
  function addItemToBlacklist() {
    if (!blacklistInput) return;
    const itemText = blacklistInput.value.trim().toLowerCase();
    if (itemText && !currentBlacklist.includes(itemText)) {
      currentBlacklist.push(itemText);
      blacklistInput.value = ''; // Clear input
      renderBlacklist(currentBlacklist);
      saveBlacklist();
    } else if (itemText && currentBlacklist.includes(itemText)) {
      alert('This item is already in the blacklist.');
    }
    blacklistInput.focus();
  }

  // Remove item from blacklist
  function removeItemFromBlacklist(indexToRemove) {
    currentBlacklist.splice(indexToRemove, 1);
    renderBlacklist(currentBlacklist);
    saveBlacklist();
  }

  // Event Listeners
  if (addBtn) {
    addBtn.addEventListener('click', addItemToBlacklist);
  }

  if (blacklistInput) {
    blacklistInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        addItemToBlacklist();
      }
    });
  }

  // Initial load
  loadBlacklist();
});