import json
import translators as ts
import time
import sys
import concurrent.futures

input_path = r'c:\Users\yashc\OneDrive\Documents\GitHub\Gujarat Tourism\scripts\translation-shards\gu-3.json'
output_path = r'c:\Users\yashc\OneDrive\Documents\GitHub\Gujarat Tourism\src\locale\shards\gu-3.json'

with open(input_path, 'r', encoding='utf-8') as f:
    input_data = json.load(f)

with open(output_path, 'r', encoding='utf-8') as f:
    output_data = json.load(f)

records = input_data['records']
missing = [r for r in records if str(r['id']) not in output_data and r['source'].strip()]

print(f"Missing to translate: {len(missing)}")

def translate_record(record):
    id_str = str(record['id'])
    src = record['source']
    try:
        res = ts.translate_text(src, translator='google', from_language='en', to_language='gu')
        return id_str, res
    except Exception as e:
        try:
            time.sleep(1)
            res = ts.translate_text(src, translator='bing', from_language='en', to_language='gu')
            return id_str, res
        except Exception as e2:
            return id_str, f"ERROR: {e2}"

new_count = 0
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
    futures = {executor.submit(translate_record, r): r for r in missing}
    for future in concurrent.futures.as_completed(futures):
        id_str, res = future.result()
        if not res.startswith("ERROR:"):
            output_data[id_str] = res
            new_count += 1
            print(f"Translated {id_str}, count so far: {new_count}")
            sys.stdout.flush()
        else:
            print(f"Failed {id_str}: {res}")
            
        if new_count % 20 == 0:
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(output_data, f, ensure_ascii=False, indent=2)

print(f"Added {new_count} translations. Total now: {len(output_data)}")

with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(output_data, f, ensure_ascii=False, indent=2)
