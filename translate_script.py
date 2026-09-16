import json
import time
from deep_translator import GoogleTranslator

def main():
    translator = GoogleTranslator(source='en', target='gu')
    
    with open('scripts/translation-shards/gu-4.json', 'r', encoding='utf-8') as f:
        input_data = json.load(f)
        
    with open('src/locale/shards/gu-4.json', 'r', encoding='utf-8') as f:
        output_data = json.load(f)
        
    records = input_data['records']
    
    for r in records:
        str_id = str(r['id'])
        if str_id not in output_data:
            source = r['source']
            print(f"Translating {str_id}...", flush=True)
            attempts = 0
            while attempts < 3:
                try:
                    translated = translator.translate(source)
                    if translated:
                        output_data[str_id] = translated
                    else:
                        output_data[str_id] = source # Fallback
                    break
                except Exception as e:
                    print(f"Error: {e}", flush=True)
                    time.sleep(2)
                    attempts += 1
            if attempts == 3:
                print(f"Failed to translate {str_id}", flush=True)
            
            with open('src/locale/shards/gu-4.json', 'w', encoding='utf-8') as f:
                json.dump(output_data, f, ensure_ascii=False, indent=2)
                
if __name__ == "__main__":
    main()
