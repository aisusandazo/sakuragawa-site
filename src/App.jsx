import React, { useState, useEffect, useRef } from 'react';
import { Shield, Flame, ChevronRight, Menu, X, ExternalLink, Hammer, ArrowLeft, Users, Activity, MessageSquare, Send, Sparkles, Loader2, Landmark, Building2, Stethoscope, Briefcase, Star, FileText, Bell, Clock, Info, Droplets, Zap, Box, Trash2, HardHat, AlertTriangle, FileCheck, Utensils, Coffee, Pizza, GraduationCap, Play } from 'lucide-react';

/**
 * Gemini API Integration Setup
 */
const apiKey = ""; 

const RevealSection = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.1 });
    
    const current = domRef.current;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, []);

  return (
    <div
      ref={domRef}
      className={`${className} transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </div>
  );
};

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  
  const [newsData] = useState([
    { id: 1, date: '2026.01.06', category: '重要', title: '公式サイトをリニューアルしました。', content: '桜川県公式サイトが新しくなりました。最新情報はこちらでチェックしてください。' },
  ]);

  const [businessData] = useState([
    { name: "桜川水道センター", owner: "代表: @1234072414091083856", icon: <Droplets size={24} />, content: "水漏れやつまりの対応、水質検査を実施。給水車の配備や社会科見学イベントも開催。", tag: "インフラ" },
    { name: "北京電力", owner: "代表: ほくと", icon: <Zap size={24} />, content: "火災や災害案件での電力遮断・復旧。高圧発電機車や高所作業車を用い、重要施設への電力供給を維持します。", tag: "エネルギー" },
    { name: "桜川広域産業総合倉庫", owner: "代表: @842752624486907904", icon: <Box size={24} />, content: "食品、物品、燃料等の保管・貯蔵および運搬。各事業主様と連携し、物流ネットワークの根幹を支えます。", tag: "物流・倉庫" },
    { name: "桜川クリーンセンター", owner: "代表: @1401146173120843869", icon: <Trash2 size={24} />, content: "家庭ごみや資源ごみを適切に処理するために設置された廃棄物処理施設. 安全で清潔なまちづくりを目的としています。", tag: "環境整備" },
    { name: "岩魂", owner: "代表: Kyu Tetu", icon: <Utensils size={24} />, content: "桜川県にて、ラーメンを主軸とした飲食店業務およびデリバリー業務を展開。地域に愛される味を提供します。", tag: "飲食" },
    { name: "Caturra coffee", owner: "代表: @1254764167747993633", icon: <Coffee size={24} />, content: "カフェをモチーフにした飲食業. 落ち着いた空間とこだわりの一杯を提供し、市民の交流の場を創出します。", tag: "飲食" },
    { name: "Light's Pizza", owner: "代表: shiryu20090328", icon: <Pizza size={24} />, content: "ピザをメインにした飲食・デリバリー業務。迅速な配達と高品質なピザで桜川の食卓を彩ります。", tag: "飲食" },
    { name: "桜川県立大学 / 永理学園", owner: "代表: new_hazryon", icon: <GraduationCap size={24} />, content: "教育・学習支援業。参加者に対して生活・学習・交流に関する基礎的知識及び応用的技能を提供します。", tag: "教育" },
    { name: "桜川県警備保障株式会社", owner: "代表: @1266690884494164058", icon: <Shield size={24} />, content: "施設警備や町の巡回、将来的には現金輸送業務も計画。桜川県の安全と資産をプロの技術で守ります。", tag: "警備" }
  ]);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ role: 'ai', text: 'こんにちは。桜川県 AIコンシェルジュです。何かお手伝いしましょうか？' }]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => window.scrollTo(0, 0), [currentPage]);
  useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [chatMessages, isTyping]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const userMsg = inputText;
    setInputText("");
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const systemPrompt = "あなたは『桜川県』のAIコンシェルジュです。桜川県はRobloxの日本を舞台にしたロールプレイサーバーです。丁寧かつプロフェッショナルな口調で、市民の質問に答えてください。公式サイトの『お知らせ』『組織・事業』『採用・設立』の案内が可能です。";

    const fetchWithRetry = async (retries = 5, delay = 1000) => {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userMsg }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        });
        
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "申し訳ございません。応答を取得できませんでした。";
      } catch (error) {
        if (retries > 0) {
          await new Promise(res => setTimeout(res, delay));
          return fetchWithRetry(retries - 1, delay * 2);
        }
        throw error;
      }
    };

    try {
      const aiResponse = await fetchWithRetry();
      setChatMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'ai', text: "エラーが発生しました。接続を確認して再度お試しください。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const NavContent = () => (
    <div className={`flex gap-4 md:gap-10 items-center font-bold text-[9px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.4em]`}>
      <button onClick={() => setCurrentPage('home')} className={`relative py-2 transition-all hover:opacity-70 ${isScrolled || currentPage !== 'home' ? 'text-black' : 'text-white'}`}>トップ</button>
      <button onClick={() => setCurrentPage('news')} className={`relative py-2 transition-all hover:opacity-70 ${isScrolled || currentPage !== 'home' ? 'text-black' : 'text-white'}`}>お知らせ</button>
      <button onClick={() => setCurrentPage('orgs')} className={`relative py-2 transition-all hover:opacity-70 ${isScrolled || currentPage !== 'home' ? 'text-black' : 'text-white'}`}>組織・事業</button>
      <button onClick={() => setCurrentPage('recruit')} className={`relative py-2 transition-all hover:opacity-70 ${isScrolled || currentPage !== 'home' ? 'text-black' : 'text-white'}`}>採用・設立</button>
      <a href="https://discord.gg/zXfJSnQGSB" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${isScrolled || currentPage !== 'home' ? 'border-black text-black' : 'border-white text-white'} hover:bg-white hover:text-black transition-all font-black`}>
        COMMUNITY <ExternalLink size={10} />
      </a>
    </div>
  );

  const Home = () => (
    <div className="relative">
      {/* ヒーローセクション（黒背景） */}
      <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://cdn.discordapp.com/attachments/1420627208384544805/1457981527555313746/8439333602_87905417474793_1767424421452.png?ex=695dfa9c&is=695ca91c&hm=b6f1029d269ad5d08a0473b00d6a877231139fb422e4ff642d9b9c1bda90d63d&')] bg-cover bg-center opacity-40 grayscale group-hover:scale-105 transition-transform duration-1000"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60"></div>
        </div>
        <div className="relative text-center z-10 w-full flex flex-col items-center">
          <span className="text-[10px] font-black tracking-[0.6em] text-amber-500/80 mb-6 uppercase animate-fade-in">新ハードロールプレイ</span>
          <h1 className="font-black tracking-tighter animate-slide-up leading-[0.8] text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] text-center" style={{ fontSize: 'clamp(3rem, 12vw, 14rem)' }}>SAKURAGAWA</h1>
          <p className="mt-8 text-[12px] font-black tracking-[1.2em] text-white/90 uppercase pl-[1.2em]">桜川県</p>
          <div className="mt-12 flex flex-col md:flex-row gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
             <a href="https://discord.gg/zXfJSnQGSB" target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 transition-all rounded-sm shadow-2xl inline-flex items-center gap-2">Join Discord <ExternalLink size={12} /></a>
             <button onClick={() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })} className="px-10 py-5 bg-transparent border border-white/20 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all rounded-sm backdrop-blur-sm">Learn More</button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-pulse">
            <span className="text-[8px] font-bold tracking-[0.4em] uppercase text-white">Scroll</span>
            <div className="w-[1px] h-12 bg-white"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-section" className="py-40 bg-white relative z-10">
        <RevealSection className="container mx-auto px-5 md:px-10 max-w-5xl">
          <div className="flex flex-col items-center">
            <div className="w-16 h-1 bg-amber-500 mb-12"></div>
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className="text-left">
                <span className="text-[11px] font-black tracking-[0.4em] text-zinc-400 uppercase mb-4 block">Introduction</span>
                <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-8 uppercase text-black leading-none">About<br/>SAKURAGAWA.</h2>
              </div>
              <div className="text-left border-l border-zinc-100 pl-10">
                <h3 className="text-2xl font-black mb-6 text-black italic">日本を舞台にしたハードRP。</h3>
                <p className="text-zinc-500 text-sm md:text-base leading-loose font-medium mb-6">
                  桜川県は、Roblox上で運営されている日本をモチーフにした本格派ロールプレイサーバーです。
                  緻密に設計された法執行機関、公共インフラ、そして活発な民間事業が相互に作用する「もう一つの現実」を提供しています。
                </p>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* YouTube トレーラーセクション */}
      <section id="trailer-section" className="py-24 bg-zinc-50/50 relative z-10">
        <RevealSection className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
              <div className="text-center md:text-left">
                <span className="text-[10px] font-black tracking-[0.4em] text-amber-500 uppercase mb-4 block">公式PR動画</span>
                <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter text-black uppercase leading-none">Official Trailer.</h2>
              </div>
              <div className="w-full md:w-1/3 h-[1px] bg-zinc-200 hidden md:block"></div>
              <p className="text-zinc-400 text-xs font-bold max-w-xs text-center md:text-right uppercase tracking-widest leading-relaxed">
                Experience the next level of roleplay through our visual presentation.
              </p>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-zinc-200/30 rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative aspect-video w-full rounded-sm overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-white bg-black">
               <iframe width="560" height="315" src="https://www.youtube.com/embed/9TywKfddUZQ?si=d73yz7UmBgGKvZFZ&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-white relative z-10">
        <RevealSection className="container mx-auto px-5 md:px-10 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            <div className="group">
              <div className="text-[10px] font-black tracking-widest text-amber-500 uppercase mb-4 pl-1">Population</div>
              <div className="flex items-baseline gap-2 mb-4 border-b border-zinc-100 pb-4">
                <div className="text-6xl md:text-8xl font-black italic tracking-tighter text-black leading-none">320</div>
                <div className="text-xl font-black italic text-zinc-300">+</div>
              </div>
              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">Discord サーバー参加者数</p>
            </div>
            <div className="group">
              <div className="text-[10px] font-black tracking-widest text-amber-500 uppercase mb-4 pl-1">Infrastructures</div>
              <div className="flex items-baseline gap-2 mb-4 border-b border-zinc-100 pb-4">
                <div className="text-6xl md:text-8xl font-black italic tracking-tighter text-black leading-none">14</div>
                <div className="text-xl font-black italic text-zinc-300">+</div>
              </div>
              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">公的機関および認定民間事業</p>
            </div>
            <div className="group">
              <div className="text-[10px] font-black tracking-widest text-amber-500 uppercase mb-4 pl-1">Community</div>
              <div className="flex items-baseline gap-2 mb-4 border-b border-zinc-100 pb-4">
                <div className="text-6xl md:text-8xl font-black italic tracking-tighter text-black leading-none">100</div>
                <div className="text-xl font-black italic text-zinc-300">%</div>
              </div>
              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">大型イベント参加満足度</p>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* Community CTA Section */}
      <section className="py-40 bg-white relative z-10 overflow-hidden border-t border-zinc-50">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-zinc-50 rounded-full blur-[120px] -z-10 opacity-30 translate-x-1/2 -translate-y-1/2"></div>
        <RevealSection className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="mb-12 inline-block p-4 rounded-full bg-zinc-50 border border-zinc-100">
                <Sparkles className="text-amber-500" size={24} />
              </div>
              <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter text-black uppercase leading-[0.9] mb-10">
                Craft Your Own<br/>History in Sakuragawa.
              </h2>
              <p className="text-zinc-500 text-sm md:text-lg font-medium leading-loose mb-16 max-w-2xl">
                桜川県での生活を今すぐ始めましょう。警察、消防、民間企業、あるいは一市民として、あなたの物語がここから始まります。
              </p>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <a href="https://discord.gg/zXfJSnQGSB" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-6 px-16 py-7 bg-black text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-amber-500 hover:text-black transition-all rounded-sm shadow-2xl group">
                  Join the Discord <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-black overflow-x-hidden">
      <div className="fixed top-0 w-full bg-black text-white py-2 px-4 flex items-center justify-center gap-4 z-[120]">
        <Hammer size={12} className="animate-pulse" />
        <span className="text-[9px] font-black tracking-[0.5em] uppercase italic text-center">Under Development</span>
      </div>

      <nav className={`fixed w-full z-[100] transition-all duration-500 top-12 flex justify-center px-4`}>
        <div className={`px-6 md:px-12 py-5 rounded-full transition-all duration-500 flex items-center justify-center ${isScrolled || currentPage !== 'home' ? 'bg-white shadow-2xl border border-zinc-100' : 'bg-black/20 backdrop-blur-md border border-white/10'}`}>
          <NavContent />
        </div>
      </nav>

      <main>
        {currentPage === 'home' && <Home />}
        {currentPage === 'news' && (
          <div className="pt-48 pb-24 px-6 bg-white animate-fade-in container mx-auto max-w-4xl">
            <button onClick={() => setCurrentPage('home')} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black mb-16 transition-colors"><ArrowLeft size={16} /> ポータルに戻る</button>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter italic mb-20 text-black">News.</h2>
            <div className="divide-y divide-zinc-100">
              {newsData.map(news => (
                <div key={news.id} className="py-12 group hover:px-4 transition-all duration-300">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="text-[10px] font-black tracking-widest text-zinc-400">{news.date}</span>
                    <span className="px-3 py-1 bg-zinc-100 text-[9px] font-black uppercase tracking-widest rounded-full">{news.category}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black italic mb-4 group-hover:text-amber-500 transition-colors text-black">{news.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{news.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {currentPage === 'orgs' && (
          <div className="pt-48 pb-24 bg-white animate-fade-in px-6">
            <div className="container mx-auto max-w-6xl">
              <button onClick={() => setCurrentPage('home')} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black mb-16 transition-colors"><ArrowLeft size={16} /> ポータルに戻る</button>
              <h2 className="text-6xl md:text-9xl font-black tracking-tighter italic mb-20 text-black">Orgs & Biz.</h2>
              <div className="grid gap-24">
                <section>
                  <div className="flex items-center gap-4 border-b border-zinc-100 pb-6 mb-10"><Shield size={20} className="text-zinc-400" /><h3 className="text-xl font-black italic tracking-widest uppercase">County Services</h3></div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[{ name: "桜川県警察", desc: "治安維持・交通取締", icon: <Shield size={24}/> },{ name: "凪浦消防局", desc: "消火・救命・救助", icon: <Flame size={24}/> },{ name: "桜川県交通", desc: "公共交通・道路管理", icon: <Activity size={24}/> },{ name: "県立病院", desc: "高度医療・救急搬送", icon: <Stethoscope size={24}/> }].map(org => (
                      <div key={org.name} className="p-8 bg-zinc-50 border border-zinc-100 rounded-sm hover:bg-black hover:text-white transition-all group h-full text-black">
                        <div className="text-zinc-300 group-hover:text-white/40 mb-4">{org.icon}</div>
                        <div className="font-black text-lg italic mb-2">{org.name}</div>
                        <div className="text-[10px] font-bold text-zinc-400 group-hover:text-zinc-500 uppercase tracking-widest">{org.desc}</div>
                      </div>
                    ))}
                  </div>
                </section>
                <section>
                  <div className="flex items-center gap-4 border-b border-zinc-100 pb-6 mb-10"><Building2 size={20} className="text-zinc-400" /><h3 className="text-xl font-black italic tracking-widest uppercase">Registered Businesses</h3></div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {businessData.map((biz, idx) => (
                      <div key={idx} className="p-8 bg-zinc-50 border border-zinc-100 rounded-sm hover:shadow-xl transition-all relative overflow-hidden group h-full flex flex-col justify-between text-black">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">{biz.icon}</div>
                        <div>
                          <div className="flex items-center gap-3 mb-4"><span className="px-2 py-0.5 bg-zinc-200 text-[7px] font-black uppercase tracking-tighter rounded-sm">{biz.tag}</span><h4 className="text-xl font-black italic tracking-tighter">{biz.name}</h4></div>
                          <div className="text-zinc-500 text-[11px] leading-relaxed mb-6">{biz.content}</div>
                        </div>
                        <div className="pt-4 border-t border-zinc-200 flex items-center justify-between"><span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">OWNER</span><span className="text-[9px] font-bold">{biz.owner}</span></div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
        {currentPage === 'recruit' && (
          <div className="pt-48 pb-24 bg-white animate-fade-in px-6">
            <div className="container mx-auto max-w-4xl text-black">
              <button onClick={() => setCurrentPage('home')} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black mb-16 transition-colors"><ArrowLeft size={16} /> ポータルに戻る</button>
              <h2 className="text-6xl md:text-9xl font-black tracking-tighter italic mb-20">Join Us.</h2>
              <div className="grid gap-16">
                <section className="p-10 md:p-16 bg-zinc-50 border border-zinc-200 rounded-sm shadow-sm">
                  <div className="flex items-center gap-4 mb-10"><Shield size={28} className="text-black" /><h3 className="text-3xl font-black italic uppercase tracking-tighter">Organization Careers</h3></div>
                  <div className="space-y-8">
                    {[{ step: "01", title: "公式Discordへ参加", desc: "活動の拠点となるサーバーへ参加してください。" },{ step: "02", title: "広報の確認", desc: "募集状況をチェック。" },{ step: "03", title: "採用試験", desc: "RP能力や知識を問う試験を受け合格を目指します。" }].map(item => (
                      <div key={item.step} className="flex gap-8 items-start border-l border-zinc-200 pl-8 relative group">
                        <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-black rounded-full"></div>
                        <div className="text-black font-black italic text-xl">{item.step}</div>
                        <div><div className="font-black text-lg mb-2">{item.title}</div><div className="text-zinc-500 text-sm">{item.desc}</div></div>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="p-10 md:p-16 bg-zinc-50 border border-zinc-200 rounded-sm shadow-sm">
                  <div className="flex items-center gap-4 mb-10"><FileCheck size={28} className="text-black" /><h3 className="text-3xl font-black italic uppercase tracking-tighter">Establish a Business</h3></div>
                  <div className="space-y-8">
                    {[{ step: "01", title: "公式Discordへ参加", desc: "活動の拠点となるサーバーへ参加してください。" },{ step: "02", title: "事業計画の提出", desc: "内容、拠点、車両等を提出。" },{ step: "03", title: "運営審査・認可", desc: "審査を受け、ライセンスを取得します。" }].map(item => (
                      <div key={item.step} className="flex gap-8 items-start border-l border-zinc-200 pl-8 relative group">
                        <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-black rounded-full"></div>
                        <div className="text-black font-black italic text-xl">{item.step}</div>
                        <div><div className="font-black text-lg mb-2">{item.title}</div><div className="text-zinc-500 text-sm">{item.desc}</div></div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* AI Bot */}
      {!isChatOpen && (
        <button onClick={() => setIsChatOpen(true)} className="fixed bottom-8 right-8 z-[140] w-14 h-14 bg-black text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all shadow-black/20"><MessageSquare size={24} /></button>
      )}
      {isChatOpen && (
        <div className={`fixed bottom-8 right-8 z-[150] w-[calc(100vw-64px)] md:w-[400px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col border border-zinc-100 overflow-hidden animate-fade-in`}>
          <div className="bg-black p-6 text-white flex justify-between items-center font-black">
            <span className="text-[10px] tracking-widest uppercase italic">✨Sakuragawa AI</span>
            <button onClick={() => setIsChatOpen(false)}><X size={18} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-zinc-50">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 text-[11px] font-medium rounded-2xl ${msg.role === 'user' ? 'bg-black text-white rounded-tr-none' : 'bg-white text-zinc-800 shadow-sm rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                  <div className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="p-4 border-t border-zinc-100 bg-white flex gap-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="質問を入力..."
              className="flex-1 bg-zinc-100 border-none rounded-full px-4 py-2 text-[11px] focus:ring-1 focus:ring-black outline-none"
            />
            <button 
              type="submit"
              disabled={isTyping}
              className={`p-2 rounded-full transition-all ${isTyping ? 'bg-zinc-200 text-zinc-400' : 'bg-black text-white hover:scale-105'}`}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* フッター */}
      <footer className="bg-black text-white pt-24 pb-12 text-center border-t border-zinc-900">
        <div className="text-4xl font-black italic tracking-tighter mb-4">桜川県｜Sakuragawa Prefecture</div>
        <p className="text-zinc-500 text-[11px] font-black uppercase tracking-widest px-4 mb-8 font-bold">Professional Roleplay Project in Roblox.</p>
        <div className="border-t border-zinc-900 pt-8 text-zinc-600 text-[11px] font-bold">© 2026 制作: 桜川県制作委員会(同)</div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 1.2s ease-out forwards; }
        .animate-slide-up { animation: slideUp 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        body::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
};

export default App;