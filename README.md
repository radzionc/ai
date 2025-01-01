# Grammar Fixer Tool

This Mac tool allows you to fix the grammar of selected text with a shortcut using OpenAI's API. It works as a Quick Action made with Automator, running an AppleScript that invokes the compiled JavaScript file.

## Features
- Automatically detects and corrects grammar in selected text.
- Seamless integration with macOS Automator.
- Simple setup and usage.

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/radzionc/ai
cd ai
yarn
```

### 2. Set Up the Environment
Ensure you have an OpenAI API key. Export it as an environment variable:

```bash
export OPENAI_API_KEY="your_openai_api_key"
```

### 3. Build the Tool
Run the build script to compile the TypeScript and generate the AppleScript:

```bash
bash build.sh
```

### 4. Configure Automator

1. Open **Automator** on your Mac and create a new **Quick Action**.
2. Drag the **Run Shell Script** action into the workflow editor.
3. In the **Run Shell Script** editor, add the following command:
   ```bash
   osascript "<absolute-path-to-FixGrammar.applescript>"
   ```
   Replace `<absolute-path-to-FixGrammar.applescript>` with the path displayed at the end of the `build.sh` output (e.g., `/Users/username/path/to/FixGrammar.applescript`).
4. Save the workflow and assign a name (e.g., "Fix Grammar").

### 5. Assign a Shortcut
1. Open **System Preferences** → **Keyboard** → **Shortcuts**.
2. Find your Quick Action under **Services** and assign a keyboard shortcut.

### 6. Use the Tool
1. Highlight text in any application.
2. Use the assigned shortcut to fix grammar and replace the selected text with the corrected version.

## Notes
- Ensure you have Node.js installed, as the tool depends on it to run the compiled JavaScript file.
- If you encounter issues, verify that the `OPENAI_API_KEY` environment variable is set correctly and that the build script ran without errors.

Enjoy effortless grammar corrections!
