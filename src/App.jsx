import React, { useState, useEffect } from 'react';
import { Shield, Flame, ChevronRight, Menu, X, ExternalLink, Hammer, ArrowLeft, Users, Activity } from 'lucide-react';

/**
 * 【カスタマイズガイド】
 * * 1. テキストの変更: Ctrl+F で表示されている日本語を検索して書き換え
 * * 2. 画像の変更: url('...') や src="..." のURLを差し替え
 * * 3. リンクの変更: href="https://..." のリンク先をDiscord等の招待URLに書き換え
 */

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const NavContent = () => (
    <div className={`hidden md:flex gap-16 items-center font-bold text-[10px] uppercase tracking-[0.4em] ${isScrolled || currentPage !== 'home' ? 'text-black' : 'text-white/60'}`}>
      <button onClick={() => setCurrentPage('home')} className="hover:text-black transition-colors">トップ</button>
      <button onClick={() => setCurrentPage('orgs')} className="hover:text-black transition-colors">組織図</button>
      <button onClick={() => setCurrentPage('recruit')} className="hover:text-black transition-colors">採用情報</button>
      <a href="https://discord.gg/zXfJSnQGSB" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-50 transition-opacity">Discord <ExternalLink size={10} /></a>
    </div>
  );

  const Home = () => (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-white"></div>
        </div>
        
        <div className="relative w-full max-w-full text-center z-10 px-2 flex flex-col items-center">
          <span className="text-[10px] font-black tracking-[0.6em] text-white/50 mb-6 uppercase animate-fade-in">
            A New Reality on Roblox
          </span>
          
          <h1 className="font-black tracking-tighter animate-slide-up leading-[0.8] text-white drop-shadow-2xl w-full mx-auto whitespace-nowrap text-center"
              style={{ fontSize: 'clamp(3rem, 15vw, 14rem)' }}>
            SAKURAGAWA
          </h1>
          
          <div className="flex flex-col items-center gap-6 mt-12 animate-fade-in delay-500">
             <p className="text-[min(3vw,1.25rem)] font-black tracking-[1em] text-white uppercase opacity-80 pl-[1em]">
                桜川県
             </p>
             <div className="h-[1px] w-12 bg-white/20"></div>
          </div>
        </div>
      </section>

      {/* PR Video Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-5 md:px-10 max-w-6xl">
          <div className="flex flex-col items-center mb-16 gap-4 text-center">
            <span className="text-[10px] font-black tracking-[0.5em] text-zinc-300 uppercase italic">Roblox Project Cinema</span>
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter">PROJECT TRAILER</h2>
          </div>
          <div className="relative aspect-video w-full bg-black shadow-2xl overflow-hidden rounded-sm">
            <iframe 
              width="560" 
              height="315" 
              src="https://www.youtube-nocookie.com/embed/9TywKfddUZQ?si=duEtjHC21vWIVuvC&amp;controls=0" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Roblox Emphasis Section */}
      <section className="py-24 bg-black text-white overflow-hidden">
        <div className="container mx-auto px-10 text-center">
           <div className="inline-block px-6 py-2 border border-white/20 mb-8">
              <span className="text-[10px] font-black tracking-[0.4em] uppercase">Built for Roblox</span>
           </div>
           <p className="text-xl md:text-4xl font-black italic tracking-tighter leading-tight opacity-90">
             ROBLOXの可能性を極限まで引き出す、<br className="hidden md:block" />
             日本最大級のハード・ロールプレイ。
           </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-32 bg-zinc-50 border-y border-zinc-100">
        <div className="container mx-auto px-5 md:px-10 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div className="flex flex-col items-center text-center gap-4">
              <Users className="text-zinc-300" size={32} />
              <div className="text-4xl md:text-5xl font-black italic tracking-tighter">320+</div>
              <div className="text-[10px] font-black tracking-widest text-zinc-400 uppercase">Citizens / 登録市民数</div>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <Shield className="text-zinc-300" size={32} />
              <div className="text-4xl md:text-5xl font-black italic tracking-tighter">14+</div>
              <div className="text-[10px] font-black tracking-widest text-zinc-400 uppercase">Organizations / 公認組織数</div>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <Activity className="text-zinc-300" size={32} />
              <div className="text-4xl md:text-5xl font-black italic tracking-tighter">98%</div>
              <div className="text-[10px] font-black tracking-widest text-zinc-400 uppercase">Uptime / 稼働率</div>
            </div>
          </div>
        </div>
      </section>

      {/* Concept Summary */}
      <section className="py-48 bg-white relative overflow-hidden">
        <div className="container mx-auto px-5 md:px-10 max-w-4xl relative z-10 text-center">
            <div className="space-y-16">
              <h2 className="text-3xl md:text-7xl font-black tracking-tighter leading-[1.1] italic px-4">
                自治、経済、そして<br />
                <span className="text-zinc-300">新しいリアリティ。</span>
              </h2>
              <div className="max-w-2xl mx-auto space-y-10 text-zinc-500 text-sm md:text-lg font-medium leading-[2.2] px-6">
                <p>
                  警察・消防といった県直轄組織、およびプレイヤーが運営する「公認事業」。
                  桜川県は、ROBLOX上で単なる「ごっこ遊び」を超えたハードRP（ロールプレイ）を提供しています。
                </p>
                <div className="pt-16 flex flex-col items-center gap-4">
                   <div className="w-12 h-[1px] bg-zinc-200"></div>
                   <p className="text-black font-black text-[10px] tracking-[0.5em] uppercase italic">制作: 桜川県制作委員会(同)</p>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Navigation Buttons */}
      <section className="pb-32 bg-white">
        <div className="container mx-auto px-5 md:px-10 grid md:grid-cols-2 gap-4 max-w-6xl">
          <button onClick={() => setCurrentPage('orgs')} className="group p-12 md:p-16 bg-zinc-50 hover:bg-black hover:text-white transition-all duration-500 text-left flex flex-col items-start gap-8">
            <h3 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase">Organizations</h3>
            <p className="text-zinc-400 text-xs md:text-sm max-w-xs group-hover:text-zinc-500">組織体系：県直轄組織と民間公認事業の共存。</p>
            <div className="mt-auto flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">詳細を見る <ChevronRight size={14}/></div>
          </button>
          <button onClick={() => setCurrentPage('recruit')} className="group p-12 md:p-16 bg-zinc-50 hover:bg-black hover:text-white transition-all duration-500 text-left flex flex-col items-start gap-8">
            <h3 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase">Recruitment</h3>
            <p className="text-zinc-400 text-xs md:text-sm max-w-xs group-hover:text-zinc-500">採用・設立：各組織への加入および事業ライセンスの申請。</p>
            <div className="mt-auto flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">詳細を見る <ChevronRight size={14}/></div>
          </button>
        </div>
      </section>
    </>
  );

  const OrgsPage = () => (
    <div className="pt-48 pb-24 bg-white animate-fade-in px-4">
      <div className="container mx-auto max-w-5xl">
        <button onClick={() => setCurrentPage('home')} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black mb-16 transition-colors">
          <ArrowLeft size={16} /> ポータルに戻る
        </button>
        <div className="mb-24">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter italic mb-4">Orgs.</h2>
            <p className="text-zinc-300 font-bold text-lg tracking-[0.5em] uppercase pl-1">組織構成</p>
        </div>

        <div className="grid gap-32">
          <section className="space-y-12">
            <div className="flex items-center gap-4 border-b border-zinc-100 pb-8">
              <h3 className="text-xl md:text-2xl font-black italic tracking-tight uppercase">01 / 県直轄組織</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-px bg-zinc-100 border border-zinc-100 shadow-sm">
              <div className="p-10 md:p-12 bg-white space-y-6">
                <h4 className="text-2xl md:text-3xl font-black italic">桜川県警察</h4>
                <p className="text-zinc-500 leading-relaxed text-sm">
                  治安維持、交通規制、犯罪捜査。Roblox県内最大の自治権を持ち、秩序の要となります。
                </p>
              </div>
              <div className="p-10 md:p-12 bg-white space-y-6">
                <h4 className="text-2xl md:text-3xl font-black italic">凪浦広域連合消防局</h4>
                <p className="text-zinc-500 leading-relaxed text-sm">
                  災害対応、救命救急。あらゆる緊急事態において市民の生命を守る最前線です。
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-12 pb-24">
            <div className="flex items-center gap-4 border-b border-zinc-100 pb-8">
              <h3 className="text-xl md:text-2xl font-black italic tracking-tight uppercase">02 / 民間公認事業</h3>
            </div>
            <div className="p-10 md:p-16 bg-zinc-50 space-y-8 rounded-sm">
                 <h4 className="text-3xl md:text-4xl font-black italic">公認ライセンス事業</h4>
                 <p className="text-zinc-500 text-sm md:text-lg leading-relaxed max-w-2xl">
                   審査を通過した組織には、県からの公認ライセンスが付与されます。
                   Robloxでの運送、警備、報道など、自由な発想で「事業」を展開することが可能です。
                 </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  const RecruitPage = () => (
    <div className="pt-48 pb-24 bg-white animate-fade-in px-4">
      <div className="container mx-auto max-w-4xl">
        <button onClick={() => setCurrentPage('home')} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black mb-16 transition-colors">
          <ArrowLeft size={16} /> ポータルに戻る
        </button>
        <div className="mb-24">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter italic mb-4">Recruit</h2>
            <p className="text-zinc-300 font-bold text-lg tracking-[0.5em] uppercase pl-1">募集要項</p>
        </div>
        
        <div className="space-y-8">
          <div className="p-10 md:p-16 bg-zinc-900 text-white space-y-10 rounded-sm">
            <h3 className="text-3xl md:text-4xl font-black italic tracking-tight">募集ステータス</h3>
            <p className="text-zinc-400 text-sm md:text-lg leading-relaxed">
              Roblox内での県公認組織職員（警察・消防）、および公認事業の申請を受け付けています。
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 md:p-8 border border-white/10 hover:border-white/40 transition-colors">
                <div className="font-black text-xl italic mb-2">県職員採用</div>
                <p className="text-[10px] text-zinc-500 leading-relaxed uppercase tracking-widest font-black">選考実施中</p>
              </div>
              <div className="p-6 md:p-8 border border-white/10 hover:border-white/40 transition-colors">
                <div className="font-black text-xl italic mb-2">プレイヤー事業</div>
                <p className="text-[10px] text-zinc-500 leading-relaxed uppercase tracking-widest font-black">申請受付中</p>
              </div>
            </div>
            <div className="pt-10">
              <a href="https://discord.gg/zXfJSnQGSB" target="_blank" rel="noopener noreferrer" className="block w-full py-5 md:py-6 bg-white text-black font-black uppercase tracking-[0.5em] text-[10px] md:text-xs hover:bg-zinc-200 transition-all text-center">
                公式Discordへ参加
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-black overflow-x-hidden select-none">
      {/* 開発状況バー */}
      <div className="fixed top-0 w-full bg-black text-white py-2 px-4 flex items-center justify-center gap-4 z-[120]">
        <Hammer size={12} className="animate-pulse" />
        <span className="text-[9px] font-black tracking-[0.5em] uppercase">Status: Under Development / 開発進行中</span>
      </div>

      {/* ナビゲーション */}
      <nav className={`fixed w-full z-[100] transition-all duration-500 top-12 flex justify-center px-4`}>
        <div className={`px-8 md:px-12 py-4 md:py-5 rounded-full transition-all duration-500 flex items-center justify-center ${isScrolled || currentPage !== 'home' ? 'bg-white/90 backdrop-blur-xl shadow-2xl border border-zinc-100' : 'bg-transparent'}`}>
          <NavContent />
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <X className="text-black" size={20} />
            ) : (
              <Menu className={isScrolled || currentPage !== 'home' ? 'text-black' : 'text-white'} size={20} />
            )}
          </button>
        </div>
        
        {/* モバイル用メニュー */}
        <div className={`fixed inset-0 bg-white z-[110] transition-transform duration-500 ease-in-out md:hidden flex flex-col items-center justify-center gap-12 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <button className="absolute top-10 right-10" onClick={() => setMobileMenuOpen(false)}><X size={32}/></button>
          <div className="flex flex-col items-center gap-10 font-black text-2xl uppercase tracking-[0.5em]">
            <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}>トップ</button>
            <button onClick={() => { setCurrentPage('orgs'); setMobileMenuOpen(false); }}>組織図</button>
            <button onClick={() => { setCurrentPage('recruit'); setMobileMenuOpen(false); }}>採用情報</button>
            <a href="https://discord.gg/zXfJSnQGSB" className="text-zinc-300">Discord</a>
          </div>
        </div>
      </nav>

      <main>
        {currentPage === 'home' && <Home />}
        {currentPage === 'orgs' && <OrgsPage />}
        {currentPage === 'recruit' && <RecruitPage />}
      </main>

      {/* フッター */}
      <footer className="bg-black text-white py-32 relative overflow-hidden">
        <div className="container mx-auto px-5 md:px-10 max-w-6xl relative z-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
            <div className="max-w-md">
              <div className="text-4xl md:text-5xl font-black tracking-tighter mb-4 italic">SAKURAGAWA</div>
              <p className="text-zinc-600 text-[10px] md:text-xs leading-[2.2] font-black uppercase tracking-widest">
                Professional Roleplay Project in Roblox.<br />
                Directed by Sakuragawa Executive Committee.
              </p>
              <p className="text-zinc-400 font-black text-[10px] mt-6 uppercase italic">制作: 桜川県制作委員会(同)</p>
            </div>
            <div className="flex flex-col gap-4 text-left">
                <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">Powered by</span>
                <span className="text-2xl font-black italic tracking-tighter text-white/40">ROBLOX Engine</span>
            </div>
          </div>
          <div className="pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black text-zinc-800 uppercase tracking-[0.4em]">
            <p>© 2026 SAKURAGAWA PROJECT. ALL RIGHTS RESERVED.</p>
            <div className="flex items-center gap-8">
              <span>Roblox / Discord / Twitter</span>
            </div>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 1.5s ease-out forwards; }
        .animate-slide-up { animation: slideUp 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        ::selection { background-color: #000; color: #fff; }
        body { scrollbar-width: none; -ms-overflow-style: none; overflow-x: hidden; }
        body::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
};

export default App;