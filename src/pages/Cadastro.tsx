import React, { useState } from 'react';
import { ClipboardCheck, Store, BadgeCheck, Crown, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { salvarCadastro } from '../lib/db';
import { Link } from '../lib/router';
import { SectionHeading } from '../components/ui/SectionHeading';

const passos = [
  { icon: ClipboardCheck, titulo: 'Cadastro grátis', texto: 'Preencha seus dados em 2 minutos. Não pedimos cartão.' },
  { icon: BadgeCheck, titulo: 'Aprovação do Guia', texto: 'Nosso time valida as informações e publica em até 48h.' },
  { icon: Store, titulo: 'Listagem simples', texto: 'Seu negócio aparece no Guararema.net com nome, endereço e contato.' },
  { icon: Crown, titulo: 'Plano completo (opcional)', texto: 'Quer card com fotos, horário e destaque? Fale com a gente para evoluir.' },
];

export const CadastroPage: React.FC = () => {
  const [dados, setDados] = useState({
    nome: '',
    categoria: '',
    descricao: '',
    endereco: '',
    bairro: '',
    telefone: '',
    whatsapp: '',
    email: '',
  });
  const [erro, setErro] = useState('');
  const [enviado, setEnviado] = useState(false);

  const patch = (p: Partial<typeof dados>) => setDados((d) => ({ ...d, ...p }));

  const enviar = () => {
    if (!dados.nome.trim() || !dados.endereco.trim() || !dados.categoria.trim()) {
      setErro('Preencha pelo menos nome do negócio, categoria e endereço.');
      return;
    }
    salvarCadastro({ ...dados, tipo: 'guia' });
    setEnviado(true);
    setErro('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (enviado) {
    return (
      <section className="py-24 bg-mist px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-olive-soft flex items-center justify-center mb-6">
            <CheckCircle2 className="w-9 h-9 text-olive-deep" />
          </div>
          <SectionHeading
            align="center"
            eyebrow="Cadastro recebido"
            title="Recebemos seu cadastro!"
          />
          <p className="mt-6 text-base text-muted leading-relaxed">
            O <strong className="text-olive-deep">{dados.nome}</strong> está
            <strong className="text-umber"> aguardando aprovação</strong> e deve aparecer na listagem
            simples do Guararema.net em até 48h.
          </p>
          <p className="mt-3 text-sm text-muted leading-relaxed">
            Ficou com dúvidas? Fale conosco pela página de contato.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/guia-de-comercios"
              className="inline-flex items-center gap-2 rounded-full bg-olive text-white font-semibold px-6 py-3 text-sm hover:bg-olive-deep transition"
            >
              Ver o Guararema.net <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#/contato"
              className="inline-flex items-center gap-2 rounded-full bg-surface text-olive-deep font-semibold px-6 py-3 text-sm border border-olive/15 hover:bg-olive-soft transition"
            >
              Falar com a gente
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-mist">
      <section className="relative overflow-hidden bg-olive-soft/40 py-20">
        <div className="absolute top-16 left-12 w-2.5 h-2.5 rounded-full bg-umber/40" />
        <div className="absolute bottom-10 right-16 w-3 h-3 rounded-full bg-olive/30" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            align="center"
            eyebrow="Área do comerciante"
            title="Divulgue seu negócio no Guararema.net"
            description="Cadastro grátis, sem compromisso. Seu comércio entra na listagem simples do maior guia local da cidade."
          />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                enviar();
              }}
              className="bg-surface border border-olive/10 rounded-[2rem] p-6 sm:p-8 space-y-5"
            >
              <h3 className="text-lg font-extrabold text-olive-deep">Dados do negócio</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label className="block sm:col-span-2">
                  <span className="block text-xs font-bold text-olive-deep uppercase tracking-wide mb-1.5">
                    Nome do negócio *
                  </span>
                  <input
                    value={dados.nome}
                    onChange={(e) => patch({ nome: e.target.value })}
                    placeholder="Ex.: Padaria Estação"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-olive/20 text-sm text-ink placeholder-muted focus:outline-none focus:border-umber focus:ring-2 focus:ring-umber/15 transition"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-bold text-olive-deep uppercase tracking-wide mb-1.5">
                    Categoria / segmento *
                  </span>
                  <input
                    value={dados.categoria}
                    onChange={(e) => patch({ categoria: e.target.value })}
                    placeholder="Ex.: Padaria, Cafeteria..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-olive/20 text-sm text-ink placeholder-muted focus:outline-none focus:border-umber focus:ring-2 focus:ring-umber/15 transition"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-bold text-olive-deep uppercase tracking-wide mb-1.5">
                    Endereço *
                  </span>
                  <input
                    value={dados.endereco}
                    onChange={(e) => patch({ endereco: e.target.value })}
                    placeholder="Rua, número"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-olive/20 text-sm text-ink placeholder-muted focus:outline-none focus:border-umber focus:ring-2 focus:ring-umber/15 transition"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-bold text-olive-deep uppercase tracking-wide mb-1.5">
                    Bairro / região
                  </span>
                  <input
                    value={dados.bairro}
                    onChange={(e) => patch({ bairro: e.target.value })}
                    placeholder="Ex.: Centro, Luís Carlos"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-olive/20 text-sm text-ink placeholder-muted focus:outline-none focus:border-umber focus:ring-2 focus:ring-umber/15 transition"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-bold text-olive-deep uppercase tracking-wide mb-1.5">
                    Telefone
                  </span>
                  <input
                    value={dados.telefone}
                    onChange={(e) => patch({ telefone: e.target.value })}
                    placeholder="(11) 0000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-olive/20 text-sm text-ink placeholder-muted focus:outline-none focus:border-umber focus:ring-2 focus:ring-umber/15 transition"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-bold text-olive-deep uppercase tracking-wide mb-1.5">
                    WhatsApp
                  </span>
                  <input
                    value={dados.whatsapp}
                    onChange={(e) => patch({ whatsapp: e.target.value })}
                    placeholder="(11) 00000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-olive/20 text-sm text-ink placeholder-muted focus:outline-none focus:border-umber focus:ring-2 focus:ring-umber/15 transition"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-bold text-olive-deep uppercase tracking-wide mb-1.5">
                    E-mail
                  </span>
                  <input
                    type="email"
                    value={dados.email}
                    onChange={(e) => patch({ email: e.target.value })}
                    placeholder="contato@seunegocio.com.br"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-olive/20 text-sm text-ink placeholder-muted focus:outline-none focus:border-umber focus:ring-2 focus:ring-umber/15 transition"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="block text-xs font-bold text-olive-deep uppercase tracking-wide mb-1.5">
                    Sobre o negócio
                  </span>
                  <textarea
                    value={dados.descricao}
                    onChange={(e) => patch({ descricao: e.target.value })}
                    rows={3}
                    placeholder="Conte em poucas linhas o que seu negócio oferece..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-olive/20 text-sm text-ink placeholder-muted focus:outline-none focus:border-umber focus:ring-2 focus:ring-umber/15 transition resize-y"
                  />
                </label>
              </div>

              {erro ? (
                <p className="text-xs font-semibold text-umber bg-umber-soft rounded-xl px-3 py-2">{erro}</p>
              ) : null}

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-olive text-white font-semibold px-7 py-3 w-full sm:w-auto hover:bg-olive-deep transition cursor-pointer"
                >
                  Enviar cadastro grátis <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-muted">
                  Ao enviar, seu negócio fica aguardando aprovação do Guia.
                </p>
              </div>
            </form>
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="bg-surface border border-olive/10 rounded-[2rem] p-6 sm:p-8">
              <h3 className="text-lg font-extrabold text-olive-deep mb-5">Como funciona</h3>
              <ul className="space-y-5">
                {passos.map((p, i) => (
                  <li key={p.titulo} className="flex gap-4">
                    <span className="relative shrink-0 w-10 h-10 rounded-xl bg-olive-soft flex items-center justify-center text-olive-deep">
                      <p.icon className="w-5 h-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-olive-deep">
                        <span className="text-umber mr-1">{i + 1}.</span>
                        {p.titulo}
                      </p>
                      <p className="text-xs text-muted leading-relaxed mt-0.5">{p.texto}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-olive-deep text-white rounded-[2rem] p-6 sm:p-8">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold">Listagem simples</h3>
                  <p className="text-xs text-white/70 mt-0.5">
                    No plano grátis, o negócio aparece com nome, categoria, endereço, bairro e contatos.
                  </p>
                </div>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Quer um <strong className="text-white">card completo</strong> com fotos, logo, horário e
                destaque na frente dos demais? Envie uma mensagem pela nossa página de contato.
              </p>
              <Link
                to="/contato"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-xs font-bold hover:bg-white/25 transition"
              >
                Solicitar plano completo
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};