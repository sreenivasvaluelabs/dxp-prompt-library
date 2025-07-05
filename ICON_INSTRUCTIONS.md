# Creating Extension Icon

Since we need a 128x128 PNG icon for the VS Code marketplace, here are the options:

## Option 1: Create Simple Text-based Icon
You can create a simple PNG with the letters "DXP" using any image editor:
- Size: 128x128 pixels
- Background: Dark blue (#0066cc)
- Text: "DXP" in white, bold font
- Save as: icon.png

## Option 2: Use VS Code Default Icon
For now, we can use a placeholder or remove the icon requirement.

## Option 3: Professional Icon Design
For marketplace publication, consider creating a professional icon that represents:
- Sitecore (red/orange colors)
- AI/Copilot (blue/purple colors)
- Code/Development (brackets, code symbols)

## Current Package.json Update Needed
Add this line to package.json after the license field:
```json
"icon": "icon.png"
```

But only if you have the icon.png file in the root directory.
