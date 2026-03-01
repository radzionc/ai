try
    -- Copy the selected text
    tell application "System Events"
        keystroke "c" using command down
    end tell
    delay 0.1
    
    -- Read the clipboard
    set selectedText to the clipboard
    if selectedText is "" then
        display dialog "No text was detected in the clipboard." buttons {"OK"} default button 1
        return
    end if
    
    -- Call Node script to transform voice transcription to concise message
    
    -- Absolute path to Node
    set nodePath to "{{nodePath}}"
    
    -- Path to your compiled grammar script
    set scriptPath to "{{scriptPath}}"
    
    -- Build the shell command (voice mode):
    set shellCommand to "echo " & quoted form of selectedText & " | " & nodePath & " " & quoted form of scriptPath & " voice"
    
    -- Run it
    set correctedText to do shell script shellCommand
    
    -- Put corrected text into the clipboard
    set the clipboard to correctedText
    delay 0.1
    
    -- Paste (Cmd+V)
    tell application "System Events"
        keystroke "v" using command down
    end tell
    
on error errMsg number errNum
    -- Show a dialog if there's an error
    display dialog "Error: " & errMsg & " (#" & errNum & ")" buttons {"OK"} default button 1
end try
