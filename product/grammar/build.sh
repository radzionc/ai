#!/bin/bash

# Exit if any command fails
set -e
trap 'echo "An error occurred."; exit 1' ERR

# Ensure OPENAI_API_KEY is set
if [[ -z "${OPENAI_API_KEY}" ]]; then
  echo "Error: OPENAI_API_KEY environment variable is not set."
  exit 1
fi

# Run the build script with OPENAI_API_KEY injected
yarn run build --define:process.env.OPENAI_API_KEY="'${OPENAI_API_KEY}'"

# Check if the build was successful
if [[ $? -eq 0 ]]; then
  echo "Build completed successfully."
else
  echo "Build failed."
  # exit 1
fi

# Get the absolute paths
NODE_PATH=$(which node)
SCRIPT_PATH=$(cd "$(dirname "./dist/index.js")" && pwd)/index.js

# Generate FixGrammar.applescript
FIX_GRAMMAR_TEMPLATE="FixGrammar.template.applescript"
FIX_GRAMMAR_OUTPUT="FixGrammar.applescript"

if [[ ! -f $FIX_GRAMMAR_TEMPLATE ]]; then
    echo "Error: Template file $FIX_GRAMMAR_TEMPLATE not found."
    exit 1
fi

sed -e "s|{{nodePath}}|$NODE_PATH|g" -e "s|{{scriptPath}}|$SCRIPT_PATH|g" "$FIX_GRAMMAR_TEMPLATE" > "$FIX_GRAMMAR_OUTPUT"
chmod 644 "$FIX_GRAMMAR_OUTPUT"
echo "FixGrammar.applescript has been generated successfully."

# Generate VoiceToMessage.applescript
VOICE_TEMPLATE="VoiceToMessage.template.applescript"
VOICE_OUTPUT="VoiceToMessage.applescript"

if [[ ! -f $VOICE_TEMPLATE ]]; then
    echo "Error: Template file $VOICE_TEMPLATE not found."
    exit 1
fi

sed -e "s|{{nodePath}}|$NODE_PATH|g" -e "s|{{scriptPath}}|$SCRIPT_PATH|g" "$VOICE_TEMPLATE" > "$VOICE_OUTPUT"
chmod 644 "$VOICE_OUTPUT"
echo "VoiceToMessage.applescript has been generated successfully."

# Print setup instructions
SCRIPT_DIR=$(cd "$(dirname "$FIX_GRAMMAR_OUTPUT")" && pwd)
FIX_GRAMMAR_ABSOLUTE="$SCRIPT_DIR/FixGrammar.applescript"
VOICE_ABSOLUTE="$SCRIPT_DIR/VoiceToMessage.applescript"

echo ""
echo "To use in Automator, create Quick Actions and add the following Shell Script actions:"
echo ""
echo "  Grammar fix (light editing):"
echo "  osascript \"$FIX_GRAMMAR_ABSOLUTE\""
echo ""
echo "  Voice-to-message (condense dictation):"
echo "  osascript \"$VOICE_ABSOLUTE\""