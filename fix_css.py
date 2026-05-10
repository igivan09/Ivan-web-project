import os

css_path = "c:/Users/IVANAHMED32/Desktop/Phlebotomy_Trainer_Netlify_Deploy/style.css"
with open(css_path, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("scroll-behavior: smooth;", "/* scroll-behavior: smooth; */")
content = content.replace("overflow-x: hidden;", "/* overflow-x: hidden; */")

with open(css_path, "w", encoding="utf-8") as f:
    f.write(content)

print("CSS updated")
