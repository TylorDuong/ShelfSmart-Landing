import re

html = open(r'C:\Users\tduon\Downloads\index.html', 'r', encoding='utf-8').read()

# Extract body
body_match = re.search(r'<body>(.*?)<script>', html, re.DOTALL)
if not body_match:
    print('Failed to find body')
    exit(1)

body = body_match.group(1)

# Convert class to className
body = body.replace('class=', 'className=')
# Convert inline styles
def style_replacer(m):
    styles = m.group(1).strip().split(';')
    style_obj = []
    for s in styles:
        if not s.strip(): continue
        key, val = s.split(':', 1)
        key = key.strip()
        val = val.strip()
        # camelCase the key
        parts = key.split('-')
        key = parts[0] + ''.join(x.capitalize() for x in parts[1:])
        style_obj.append(f'{key}: "{val}"')
    return 'style={{ ' + ', '.join(style_obj) + ' }}'
body = re.sub(r'style="([^"]+)"', style_replacer, body)

# Auto close img, input, br
body = re.sub(r'<img([^>]*?)(?<!/)>', r'<img\1 />', body)
body = re.sub(r'<input([^>]*?)(?<!/)>', r'<input\1 />', body)
body = re.sub(r'<br([^>]*?)(?<!/)>', r'<br\1 />', body)

# novalidate
body = body.replace('novalidate', 'noValidate')

# svg attributes
svg_attrs = [
    'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-dasharray',
    'fill-rule', 'clip-rule', 'stroke-miterlimit', 'xml:space'
]
for attr in svg_attrs:
    camel = attr.split('-')[0] + ''.join(x.capitalize() for x in attr.split('-')[1:])
    body = body.replace(f'{attr}=', f'{camel}=')

# Handle HTML comments
body = re.sub(r'<!--(.*?)-->', r'{/*\1*/}', body, flags=re.DOTALL)

with open(r'C:\Users\tduon\Desktop\Programs\ShelfSmart-Landing\src\pages\HomeNew.tsx', 'w', encoding='utf-8') as f:
    f.write(body)
print('Done!')
