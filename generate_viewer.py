import os

html = "<html><body style='display:flex; flex-wrap:wrap; font-family:sans-serif;'>"
for root, dirs, files in os.walk('public/assets/categories'):
    for f in files:
        if f.lower().endswith('.jpg') or f.lower().endswith('.png'):
            path = os.path.join(root, f).replace('public/', '')
            html += f"<div style='margin:10px;text-align:center;'><img src='{path}' width='300'><br><span style='font-size:12px'>{path}</span></div>"
html += "</body></html>"

with open('public/gallery-viewer.html', 'w') as f:
    f.write(html)
