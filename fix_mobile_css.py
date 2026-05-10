import os

css_path = "c:/Users/IVANAHMED32/Desktop/Phlebotomy_Trainer_Netlify_Deploy/style.css"
with open(css_path, "r", encoding="utf-8") as f:
    content = f.read()

# Make sure body has overflow-x: hidden
# In style.css:
# body {
#    ...
#    /* overflow-x: hidden; */
#    width: 100%;
# }

content = content.replace("/* overflow-x: hidden; */\n    width: 100%;", "overflow-x: hidden;\n    width: 100%;")

with open(css_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Restored overflow-x: hidden to body")
