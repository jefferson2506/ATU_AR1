import pathlib, sys
htmls = list(pathlib.Path('.').glob('*.html'))
missing = []
for p in htmls:
    text = p.read_text(encoding='utf-8')
    css_path = 'css/' + p.stem + '.css'
    js_path = 'js/' + p.stem + '.js'
    if not pathlib.Path(css_path).exists():
        missing.append('CSS missing ' + css_path + ' for ' + p.name)
    if not pathlib.Path(js_path).exists():
        missing.append('JS missing ' + js_path + ' for ' + p.name)
    if css_path not in text:
        missing.append('CSS ref missing in ' + p.name + ' -> ' + css_path)
    if js_path not in text:
        missing.append('JS ref missing in ' + p.name + ' -> ' + js_path)
if missing:
    print('\n'.join(missing))
    sys.exit(1)
print('HTML checked:', len(htmls))
print('All HTML pages have matching css/js file references and files exist.')
