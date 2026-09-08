export async function redimensionarParaDataUrl(file: File, max = 1400, qualidade = 0.82): Promise<string> {
  const blobUrl = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('Imagem inválida'));
      el.src = blobUrl;
    });
    const ratio = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
    const w = Math.max(1, Math.round(img.naturalWidth * ratio));
    const h = Math.max(1, Math.round(img.naturalHeight * ratio));
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas indisponível');
    ctx.drawImage(img, 0, 0, w, h);
    const tipo = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
    return canvas.toDataURL(tipo, qualidade);
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
}

export async function arquivosParaDataUrls(files: FileList | File[]): Promise<string[]> {
  const resultado: string[] = [];
  for (const f of Array.from(files)) {
    try {
      resultado.push(await redimensionarParaDataUrl(f));
    } catch {
      // ignora arquivos que não são imagem
    }
  }
  return resultado;
}