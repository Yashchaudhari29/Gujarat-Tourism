import json
from deep_translator import GoogleTranslator

translator = GoogleTranslator(source='en', target='gu')

with open('scripts/translation-shards/gu-4.json', 'r', encoding='utf-8') as f:
    input_data = json.load(f)
    
with open('src/locale/shards/gu-4.json', 'r', encoding='utf-8') as f:
    output_data = json.load(f)
    
records = input_data['records']

missing = [r for r in records if str(r['id']) not in output_data]
print(f"Missing left: {len(missing)}")

count = 0
for r in missing:
    if count >= 30:
        break
    str_id = str(r['id'])
    try:
        translated = translator.translate(r['source'])
        output_data[str_id] = translated or r['source']
        count += 1
    except Exception as e:
        print(e)
        pass

with open('src/locale/shards/gu-4.json', 'w', encoding='utf-8') as f:
    json.dump(output_data, f, ensure_ascii=False, indent=2)

print(f"Translated {count} items.")
