import torch,re,json,numpy as np,soundfile as sf,subprocess,pathlib,hashlib,argparse,tempfile
parser=argparse.ArgumentParser();parser.add_argument("--model",required=True,help="Local facebook/mms-tts-guj safetensors directory");args=parser.parse_args()
from transformers import VitsModel,AutoTokenizer
root=pathlib.Path(__file__).resolve().parent.parent/'public'
work=tempfile.TemporaryDirectory();wave=pathlib.Path(work.name)/'chapter.wav'
torch.set_num_threads(4);torch.manual_seed(42)
m=VitsModel.from_pretrained(args.model,local_files_only=True)
t=AutoTokenizer.from_pretrained(args.model,local_files_only=True)
eps=json.loads(subprocess.check_output(['node','--input-type=module','-e',f"import {{episodes}} from '{(root.parent/'src/data/content.js').as_uri()}';process.stdout.write(JSON.stringify(episodes))"],text=True))
out=root/'assets/audio';out.mkdir(exist_ok=True);manifest={}
for key,e in eps.items():
 for i,c in enumerate(e['chapters']):
  text=c[1];parts=[]
  for sentence in re.split(r'(?<=[.!?।])\s+',text):
   if not sentence.strip():continue
   with torch.inference_mode(): a=m(**t(sentence,return_tensors='pt')).waveform[0].numpy()
   parts.extend([a,np.zeros(int(m.config.sampling_rate*.30),dtype=np.float32)])
  a=np.concatenate(parts);sf.write(str(wave),a,m.config.sampling_rate)
  name=f'{key}-{i+1}.mp3'
  subprocess.run(['ffmpeg','-y','-v','error','-i',str(wave),'-af','loudnorm=I=-16:TP=-1.5:LRA=9','-ar','24000','-b:a','64k',str(out/name)],check=True)
  manifest[name]={'seconds':round(len(a)/m.config.sampling_rate,2),'transcript_sha256':hashlib.sha256(text.encode()).hexdigest()}
  print(name,manifest[name]['seconds'],flush=True)
(out/'manifest.json').write_text(json.dumps(manifest,indent=2))
