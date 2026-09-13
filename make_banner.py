from PIL import Image,ImageOps,ImageDraw
from pathlib import Path
files=sorted(Path('assets').glob('snipers-banner-source-*.jpg'))
imgs=[]
for f in files:
 im=Image.open(f).convert('RGB'); im.thumbnail((900,700),Image.Resampling.LANCZOS); imgs.append(im)
w=1800; h=600; out=Image.new('RGB',(w,h),(7,9,20)); x=12
for im in imgs[:5]:
 box=(x,12,x+340,h-12); tile=ImageOps.fit(im,(328,h-24),Image.Resampling.LANCZOS,centering=(.5,.5)); out.paste(tile,(x+6,18)); ImageDraw.Draw(out).rectangle(box,outline=(244,160,30),width=5); x+=354
out.save('assets/dothan-snipers-banner.jpg',quality=95,optimize=True)
