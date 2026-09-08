import React, { useRef, useState } from 'react';
import { ImagePlus, Loader2, X, Link2, Trash2 } from 'lucide-react';
import { redimensionarParaDataUrl, arquivosParaDataUrls } from '../../lib/imagem';

export const UploadImagem: React.FC<{
  valor: string;
  onChange: (v: string) => void;
  dica?: string;
  semUrl?: boolean;
}> = ({ valor, onChange, dica, semUrl }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [carregando, setCarregando] = useState(false);

  const escolher = async (file: File) => {
    setCarregando(true);
    try {
      onChange(await redimensionarParaDataUrl(file));
    } catch {
      onChange('');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div>
      {valor ? (
        <div className="relative inline-block">
          <img src={valor} alt="" className="max-h-48 rounded-2xl border border-olive/15 object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-umber-soft text-umber-deep hover:bg-umber hover:text-white transition cursor-pointer"
            aria-label="Remover imagem"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full min-h-28 rounded-2xl border-2 border-dashed border-olive/30 bg-mist flex flex-col items-center justify-center gap-2 text-olive-deep hover:border-umber hover:bg-umber-soft/40 transition cursor-pointer p-4"
        >
          {carregando ? (
            <Loader2 className="w-6 h-6 animate-spin text-umber" />
          ) : (
            <ImagePlus className="w-6 h-6 text-umber" />
          )}
          <span className="text-sm font-semibold">{carregando ? 'Enviando imagem...' : 'Clique para enviar a imagem'}</span>
          <span className="text-[11px] text-muted">PNG ou JPG · será redimensionada automaticamente</span>
        </button>
      )}
      {!semUrl ? (
        <>
          <p className="mt-2 flex items-center gap-1.5 text-[11px] text-muted">
            <Link2 className="w-3 h-3" />
            <span>Preferimos o upload. Sem imagem local?</span>
          </p>
          <input
            value={typeof valor === 'string' && valor.startsWith('http') ? valor : ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="...ou cole a URL de uma imagem"
            className="mt-1 w-full px-3 py-2 rounded-xl bg-surface border border-olive/20 text-sm text-ink placeholder-muted focus:outline-none focus:border-umber transition"
          />
        </>
      ) : null}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void escolher(file);
          e.target.value = '';
        }}
      />
      {dica ? <p className="mt-1 text-[11px] text-muted">{dica}</p> : null}
    </div>
  );
};

export const UploadVarias: React.FC<{
  valor: string[];
  onChange: (v: string[]) => void;
}> = ({ valor, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [carregando, setCarregando] = useState(false);
  const [urlManual, setUrlManual] = useState('');
  const lista = Array.isArray(valor) ? valor : [];

  const escolher = async (files: FileList) => {
    setCarregando(true);
    try {
      const novidades = await arquivosParaDataUrls(files);
      onChange([...lista, ...novidades]);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {lista.map((foto, i) => (
          <div key={i} className="relative">
            <img src={foto} alt="" className="w-28 h-20 rounded-xl object-cover border border-olive/15 bg-mist" />
            <button
              type="button"
              onClick={() => onChange(lista.filter((_, x) => x !== i))}
              className="absolute -top-2 -right-2 p-1.5 rounded-full bg-umber-soft text-umber-deep hover:bg-umber hover:text-white transition cursor-pointer shadow"
              aria-label="Remover foto"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}

        {lista.length < 8 ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-28 h-20 rounded-xl border-2 border-dashed border-olive/30 bg-mist flex flex-col items-center justify-center gap-1 text-olive-deep hover:border-umber transition cursor-pointer"
          >
            {carregando ? (
              <Loader2 className="w-5 h-5 animate-spin text-umber" />
            ) : (
              <ImagePlus className="w-5 h-5 text-umber" />
            )}
            <span className="text-[10px] font-semibold">{carregando ? 'Enviando...' : 'Adicionar'}</span>
          </button>
        ) : null}
      </div>

      <div className="mt-2 flex gap-2">
        <input
          type="url"
          value={urlManual}
          onChange={(e) => setUrlManual(e.target.value)}
          placeholder="...ou adicionar por URL de imagem"
          className="flex-1 px-3 py-2 rounded-xl bg-surface border border-olive/20 text-sm text-ink placeholder-muted focus:outline-none focus:border-umber transition"
        />
        <button
          type="button"
          onClick={() => {
            if (urlManual.trim()) onChange([...lista, urlManual.trim()]);
            setUrlManual('');
          }}
          className="px-3 py-2 rounded-xl bg-olive-soft text-olive-deep text-xs font-bold hover:bg-olive hover:text-white transition cursor-pointer"
        >
          Adicionar
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) void escolher(e.target.files);
          e.target.value = '';
        }}
      />
      <p className="mt-1 text-[11px] text-muted">A primeira foto é a principal do card.</p>
    </div>
  );
};