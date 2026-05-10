import re

def optimize():
    path = "c:\\Users\\IVANAHMED32\\Desktop\\Phlebotomy_Trainer_Netlify_Deploy\\index.html"
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()

    def replacer(m):
        tag = m.group(0)
        if 'loading=' in tag or 'logo-img-header' in tag or 'slide-img' in tag or 'hero' in tag:
            return tag
        if tag.endswith('/>'):
            return tag[:-2] + ' loading="lazy"/>'
        return tag[:-1] + ' loading="lazy">'

    new_html = re.sub(r'<img[^>]+>', replacer, html)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_html)

if __name__ == "__main__":
    optimize()
