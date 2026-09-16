import json
from googletrans import Translator
import time
import sys

input_path = r'c:\Users\yashc\OneDrive\Documents\GitHub\Gujarat Tourism\scripts\translation-shards\gu-3.json'
output_path = r'c:\Users\yashc\OneDrive\Documents\GitHub\Gujarat Tourism\src\locale\shards\gu-3.json'

with open(input_path, 'r', encoding='utf-8') as f:
    input_data = json.load(f)

with open(output_path, 'r', encoding='utf-8') as f:
    output_data = json.load(f)

translator = Translator()
records = input_data['records']

new_count = 0
for record in records:
    id_str = str(record['id'])
    if id_str not in output_data:
        source_text = record['source']
        if source_text.strip():
            try:
                result = translator.translate(source_text, dest='gu', src='en')
                output_data[id_str] = result.text
            except Exception as e:
                print(f"Error on {id_str}: {e}")
                time.sleep(5)
                try:
                    result = translator.translate(source_text, dest='gu', src='en')
                    output_data[id_str] = result.text
                except Exception as e:
                    print(f"Retry failed on {id_str}: {e}")
                    continue
        else:
            output_data[id_str] = ""
        new_count += 1
        print(f"Translated {id_str}, count so far: {new_count}")
        sys.stdout.flush()
        
        if new_count % 10 == 0:
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(output_data, f, ensure_ascii=False, indent=2)

print(f"Added {new_count} translations. Total now: {len(output_data)}")

with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(output_data, f, ensure_ascii=False, indent=2)
