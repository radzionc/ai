# Keyboard shortcuts setup

The grammar product has two modes, each triggered by its own Quick Action and shortcut:

| Shortcut | Action |
|----------|--------|
| **Ctrl+Option+Cmd+G** | Grammar fix (light editing) |
| **Ctrl+Option+Cmd+V** | Voice-to-message (condense dictation) |

Do the following once per Quick Action (you may already have the Grammar fix one).

## 1. Create the Quick Action in Automator

1. Open **Automator** (Spotlight → “Automator”).
2. **File → New** → choose **Quick Action**.
3. At the top:
   - **Workflow receives**: “no input”
   - **in**: “any application”
4. In the left sidebar, open **Actions → Utilities** (or search “Shell”).
5. Drag **Run Shell Script** into the workflow.
6. In the script box, paste **one** of the commands below (use your actual path if different):

   **Grammar fix (G):**
   ```bash
   osascript "/Users/rodion/projects/ai/product/grammar/FixGrammar.applescript"
   ```

   **Voice-to-message (V):**
   ```bash
   osascript "/Users/rodion/projects/ai/product/grammar/VoiceToMessage.applescript"
   ```

7. **File → Save** and name it:
   - `Fix Grammar` (for G), or
   - `Voice to Message` (for V).

8. Repeat from step 2 to create the other Quick Action if you don’t have it yet.

## 2. Assign the keyboard shortcut

1. Open **System Settings** (or **System Preferences** on older macOS).
2. Go to **Keyboard → Keyboard Shortcuts**.
3. In the left list, open **Services**.
4. In the **General** section, find your new service:
   - **Fix Grammar** → set shortcut to **⌃⌥⌘G** (Ctrl+Option+Cmd+G).
   - **Voice to Message** → set shortcut to **⌃⌥⌘V** (Ctrl+Option+Cmd+V).

   If the shortcut field is disabled, click it and press the key combo (e.g. Ctrl+Option+Cmd+V).

5. Ensure the checkbox next to the service is **on**.

## 3. Permissions

- **Accessibility**: System Settings → Privacy & Security → Accessibility — add **Automator** (and optionally **Terminal** if you run the script from there).
- The first time you use the shortcut in an app (e.g. Slack), macOS may ask for permission for **Automator** to control that app; allow it.

## Summary

- **Grammar fix**: Ctrl+Option+Cmd+G → runs `FixGrammar.applescript` (light edit).
- **Voice-to-message**: Ctrl+Option+Cmd+V → runs `VoiceToMessage.applescript` (condense dictation).

After building with `./build.sh`, the `.applescript` files are in the same folder as this project; the paths in step 6 must match that location.
