#!/bin/bash

# Exit if any command fails
set -e

# Define the paths
TEMPLATE_FILE="FixGrammar.template.applescript"
OUTPUT_FILE="FixGrammar.applescript"

# Get the absolute paths
NODE_PATH=$(which node)
SCRIPT_PATH=$(cd "$(dirname "./dist/index.js")" && pwd)/index.js

# Check if the template file exists
if [[ ! -f $TEMPLATE_FILE ]]; then
    echo "Error: Template file $TEMPLATE_FILE not found."
    exit 1
fi

# Replace placeholders in the template and write to output file
sed -e "s|{{nodePath}}|$NODE_PATH|g" -e "s|{{scriptPath}}|$SCRIPT_PATH|g" "$TEMPLATE_FILE" > "$OUTPUT_FILE"

# Make the output script readable
chmod 644 "$OUTPUT_FILE"

echo "FixGrammar.applescript has been generated successfully."

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

OUTPUT_FILE_ABSOLUTE_PATH=$(cd "$(dirname "$OUTPUT_FILE")" && pwd)/$(basename "$OUTPUT_FILE")

echo ""
echo "To use the generated FixGrammar.applescript in Automator, create a new workflow and add the following Shell Script action:"
echo ""
echo "osascript \"$OUTPUT_FILE_ABSOLUTE_PATH\""