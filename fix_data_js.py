import json

# Read original data.json
with open('data.json', 'r', encoding='utf-8') as f:
    content = f.read()

# Write to data.js with prefix
with open('data.js', 'w', encoding='utf-8') as f:
    f.write('const STATIC_DATA = ' + content)

print("Successfully recreated data.js")
