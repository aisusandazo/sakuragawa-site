import React, { useState, useEffect, useRef } from 'react';
import { Shield, Flame, ChevronRight, Menu, X, ExternalLink, Hammer, ArrowLeft, Users, Activity, MessageSquare, Send, Sparkles, Loader2, Landmark, Building2, Stethoscope, Briefcase, Star, FileText, Bell, Clock, Info, Droplets, Zap, Box, Trash2, HardHat, AlertTriangle, FileCheck, Utensils, Coffee, Pizza, GraduationCap, Play, RefreshCw } from 'lucide-react';

/**
 * Gemini API 設定
 * 本来はここにAPIキーが入りますが、現在は空の状態です。
 */
const apiKey = "AIzaSyA5ksJw1Y6zwaGWR0XFDGErVx61gvRzy0s"; 

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

// リキッドグラス用の背景（流動的なアニメーション）
const LiquidBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0c]">
    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/15 blur-[120px] animate-pulse rounded-full"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-amber-600/10 blur-[150px] animate-pulse rounded-full" style={{ animationDelay: '2s' }}></div>
    <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] bg-blue-600/10 blur-[100px] animate-pulse rounded-full" style={{ animationDelay: '4s' }}></div>
  </div>
);

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  
  const [newsData] = useState([
    { id: 1, date: '2026.01.06', category: '重要', title: '公式サイトをリニューアルしました。', content: '桜川県公式サイトが新しくなりました。リキッドグラス・デザインを採用し、より直感的な操作が可能になりました。' },
    { id: 2, date: '2026.01.05', category: '公報', title: '次世代ロールプレイ体験の提供開始', content: '新しい市民生活シミュレーションシステムの導入により、さらにリアルな社会体験が可能になります。' },
  ]);

  const [businessData] = useState([
    { name: "桜川水道センター", owner: "代表: @1234072414091083856", icon: <Droplets size={24} />, content: "水漏れやつまりの対応、水質検査を実施。給水車の配備や社会科見学イベントも開催。", tag: "インフラ" },
    { name: "北京電力", owner: "代表: ほくと", icon: <Zap size={24} />, content: "火災や災害案件での電力遮断・復旧。重要施設への安定した電力供給を維持します。", tag: "エネルギー" },
    { name: "桜川広域産業総合倉庫", owner: "代表: @842752624486907904", icon: <Box size={24} />, content: "食品、物品、燃料等の保管・貯蔵および運搬。物流ネットワークの根幹を支えます。", tag: "物流・倉庫" },
    { name: "桜川クリーンセンター", owner: "代表: @1401146173120843869", icon: <Trash2 size={24} />, content: "廃棄物処理施設。安全で清潔なまちづくりを目的として、資源リサイクルを推進します。", tag: "環境整備" },
    { name: "岩魂", owner: "代表: Kyu Tetu", icon: <Utensils size={24} />, content: "ラーメンを主軸とした飲食店業務。地域に愛されるこだわりの味を提供します。", tag: "飲食" },
    { name: "Caturra coffee", owner: "代表: @1254764167747993633", icon: <Coffee size={24} />, content: "落ち着いた空間とこだわりの一杯を提供し、市民の交流の場を創出します。", tag: "飲食" },
    { name: "Light's Pizza", owner: "代表: shiryu20090328", icon: <Pizza size={24} />, content: "迅速なデリバリーと高品質なピザで、桜川の食卓に彩りを届けます。", tag: "飲食" },
    { name: "桜川県立大学 / 永理学園", owner: "代表: new_hazryon", icon: <GraduationCap size={24} />, content: "教育・学習支援。基礎知識から応用技能まで、幅広い学びの場を提供します。", tag: "教育" },
    { name: "桜川県警備保障株式会社", owner: "代表: @1266690884494164058", icon: <Shield size={24} />, content: "施設警備や町の巡回。プロの技術で桜川県の安全と資産を守り抜きます。", tag: "警備" }
  ]);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ role: 'ai', text: 'こんにちは。桜川県 AIコンシェルジュです。市政に関するご質問や、各種お手続きについてお手伝いしましょうか？' }]);
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

    // AI機能の核となるプロンプト
    const systemPrompt = "あなたは『桜川県』のAIコンシェルジュです。桜川県はRobloxの日本を舞台にした本格ロールプレイサーバーです。丁寧かつ親しみやすい日本語で、市民の質問に答えてください。";

    // APIリトライロジック
    const fetchWithRetry = async (retries = 5, delay = 1000) => {
      // APIキーがない場合の早期リターン（エラー防止）
      if (!apiKey) {
        throw new Error('MISSING_API_KEY');
      }

      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userMsg }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        });
        
        if (!response.ok) throw new Error('API_ERROR');
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "申し訳ございません。現在応答を生成できませんでした。";
      } catch (error) {
        if (error.message !== 'MISSING_API_KEY' && retries > 0) {
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
      let errorMsg = "申し訳ございません。システムが一時的にオフラインです。";
      if (error.message === 'MISSING_API_KEY') {
        errorMsg = "現在、AIコンシェルジュはメンテナンス中です（API設定待ち）。しばらくしてから再度お試しください。";
      }
      setChatMessages(prev => [...prev, { role: 'ai', text: errorMsg, isError: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  const NavContent = () => (
    <div className="flex gap-4 md:gap-10 items-center font-bold text-[10px] md:text-[12px] tracking-[0.2em]">
      <button onClick={() => setCurrentPage('home')} className={`relative py-2 transition-all hover:text-amber-400 ${currentPage === 'home' ? 'text-amber-500' : 'text-white'}`}>トップ</button>
      <button onClick={() => setCurrentPage('news')} className={`relative py-2 transition-all hover:text-amber-400 ${currentPage === 'news' ? 'text-amber-500' : 'text-white'}`}>お知らせ</button>
      <button onClick={() => setCurrentPage('orgs')} className={`relative py-2 transition-all hover:text-amber-400 ${currentPage === 'orgs' ? 'text-amber-500' : 'text-white'}`}>組織・事業</button>
      <button onClick={() => setCurrentPage('recruit')} className={`relative py-2 transition-all hover:text-amber-400 ${currentPage === 'recruit' ? 'text-amber-500' : 'text-white'}`}>採用・設立</button>
      <a href="https://discord.gg/zXfJSnQGSB" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-5 py-2 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white hover:text-black transition-all font-black text-[10px] backdrop-blur-md">
        コミュニティに参加 <ExternalLink size={12} />
      </a>
    </div>
  );

  const Home = () => (
    <div className="relative">
      {/* ヒーローセクション */}
      <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://cdn.discordapp.com/attachments/1420627208384544805/1457981527555313746/8439333602_87905417474793_1767424421452.png?ex=695dfa9c&is=695ca91c&hm=b6f1029d269ad5d08a0473b00d6a877231139fb422e4ff642d9b9c1bda90d63d&')] bg-cover bg-center opacity-40 grayscale contrast-125 scale-105 animate-slow-zoom"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-[#0a0a0c]/80"></div>
        </div>
        <div className="relative text-center z-10 w-full flex flex-col items-center">
          <span className="text-[11px] font-black tracking-[0.5em] text-amber-500 mb-6 uppercase animate-fade-in">至高のロールプレイ体験を、ここで。</span>
          <h1 className="font-black tracking-tighter animate-slide-up leading-[0.8] text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.1)] text-center mb-4" style={{ fontSize: 'clamp(3.5rem, 14vw, 16rem)' }}>SAKURAGAWA</h1>
          <p className="mt-4 text-[14px] font-black tracking-[1.2em] text-white/80 uppercase pl-[1.2em]">桜川県 公式ポータルサイト</p>
          <div className="mt-16 flex flex-col md:flex-row gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
             <a href="https://discord.gg/zXfJSnQGSB" target="_blank" rel="noopener noreferrer" className="px-12 py-5 bg-white text-black text-[11px] font-black uppercase tracking-widest hover:bg-amber-500 transition-all rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] inline-flex items-center gap-2">Discordに参加する <ExternalLink size={14} /></a>
             <button onClick={() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })} className="px-12 py-5 bg-white/5 border border-white/10 text-white text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition-all rounded-full backdrop-blur-xl">詳しく知る</button>
          </div>
        </div>
      </section>

      {/* アバウトセクション */}
      <section id="about-section" className="py-40 relative z-10">
        <RevealSection className="container mx-auto px-6 max-w-5xl">
          <div className="p-12 md:p-24 bg-white/5 border border-white/10 rounded-[3.5rem] backdrop-blur-[40px] shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] group-hover:bg-amber-500/20 transition-all duration-700"></div>
            <div className="relative flex flex-col items-center text-center">
              <div className="w-20 h-1 bg-amber-500 mb-12 rounded-full"></div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-10 text-white leading-tight">
                次世代のロールプレイが、<br/><span className="text-amber-500">日常</span>を塗り替える。
              </h2>
              <p className="text-zinc-400 text-sm md:text-lg leading-loose font-medium max-w-2xl text-justify md:text-center">
                桜川県は、Robloxで展開される国内有数の本格派ロールプレイサーバーです。
                法を司る警察、市民を救う消防、そして経済を回す民間企業。
                すべてのプレイヤーが歯車となり、絶えず変化し続ける「生きた世界」を創り出しています。
                あなたの選択が、この県の歴史を刻みます。
              </p>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* 動画セクション */}
      <section id="trailer-section" className="py-24 relative z-10">
        <RevealSection className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 text-white">
              <div className="text-center md:text-left">
                <span className="text-[11px] font-black tracking-[0.4em] text-amber-500 uppercase mb-4 block">公式プロモーションビデオ</span>
                <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">Trailer.</h2>
              </div>
              <p className="text-zinc-400 text-xs font-bold max-w-xs text-center md:text-right tracking-widest leading-relaxed">
                桜川県の世界観を凝縮した最新の映像をご覧ください。
              </p>
            </div>
            
            <div className="relative group mx-auto max-w-5xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-purple-500/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-black/40 backdrop-blur-sm">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/9TywKfddUZQ?si=d73yz7UmBgGKvZFZ&rel=0" 
                  title="桜川県 公式トレーラー" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* 統計セクション */}
      <section className="py-32 relative z-10">
        <RevealSection className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "県民数", value: "320", unit: "名", desc: "公式Discord 参加者数" },
              { label: "稼働組織数", value: "14", unit: "団体", desc: "行政機関および民間事業所" },
              { label: "満足度", value: "100", unit: "%", desc: "徹底したロールプレイ品質" }
            ].map((stat, i) => (
              <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl hover:bg-white/10 transition-all duration-500 group">
                <div className="text-[11px] font-black tracking-widest text-amber-500 uppercase mb-6">{stat.label}</div>
                <div className="flex items-baseline gap-2 mb-4">
                  <div className="text-6xl font-black italic tracking-tighter text-white">{stat.value}</div>
                  <div className="text-xl font-black italic text-zinc-500">{stat.unit}</div>
                </div>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em]">{stat.desc}</p>
              </div>
            ))}
          </div>
        </RevealSection>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0c] font-sans text-white overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">
      <LiquidBackground />

      {/* 開発状況バナー */}
      <div className="fixed top-0 w-full bg-amber-500/10 backdrop-blur-md text-amber-500 py-2.5 px-4 flex items-center justify-center gap-4 z-[120] border-b border-white/5">
        <Hammer size={12} className="animate-pulse" />
        <span className="text-[10px] font-black tracking-[0.5em] uppercase italic">公式開発ビルド v1.2 公開中</span>
      </div>

      {/* ナビゲーション */}
      <nav className="fixed w-full z-[100] transition-all duration-500 top-12 flex justify-center px-4">
        <div className={`px-8 py-4 rounded-full transition-all duration-700 flex items-center justify-center border border-white/10 shadow-2xl ${isScrolled ? 'bg-black/60 backdrop-blur-2xl py-3 scale-95' : 'bg-white/5 backdrop-blur-xl'}`}>
          <NavContent />
        </div>
      </nav>

      <main className="relative">
        {currentPage === 'home' && <Home />}
        
        {currentPage === 'news' && (
          <div className="pt-48 pb-24 px-6 animate-fade-in container mx-auto max-w-4xl">
            <button onClick={() => setCurrentPage('home')} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-zinc-500 hover:text-white mb-16 transition-colors"><ArrowLeft size={16} /> トップページへ戻る</button>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter italic mb-20">お知らせ<span className="text-amber-500 text-3xl ml-4 font-black">News</span></h2>
            <div className="space-y-6">
              {newsData.map(news => (
                <div key={news.id} className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl hover:bg-white/10 transition-all group">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="text-[11px] font-black tracking-widest text-zinc-500">{news.date}</span>
                    <span className="px-5 py-1.5 bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full">{news.category}</span>
                  </div>
                  <h3 className="text-2xl font-black mb-4 group-hover:text-amber-400 transition-colors">{news.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{news.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'orgs' && (
          <div className="pt-48 pb-24 animate-fade-in px-6">
            <div className="container mx-auto max-w-6xl">
              <button onClick={() => setCurrentPage('home')} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-zinc-500 hover:text-white mb-16 transition-colors"><ArrowLeft size={16} /> トップページへ戻る</button>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter italic mb-20">組織・事業所<span className="text-amber-500 text-3xl ml-4 font-black">Organizations</span></h2>
              
              <section className="mb-32">
                <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-10"><Shield size={20} className="text-amber-500" /><h3 className="text-xl font-black tracking-widest uppercase">行政・公共サービス</h3></div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[{ name: "桜川県警察", desc: "治安維持・交通捜査", icon: <Shield size={24}/> },{ name: "凪浦消防局", desc: "消火・救急・救助", icon: <Flame size={24}/> },{ name: "桜川県交通", desc: "交通インフラ整備", icon: <Activity size={24}/> },{ name: "県立病院", desc: "高度医療・地域診療", icon: <Stethoscope size={24}/> }].map(org => (
                    <div key={org.name} className="p-8 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl hover:bg-white hover:text-black transition-all duration-500 group">
                      <div className="text-amber-500 group-hover:text-amber-600 mb-6">{org.icon}</div>
                      <div className="font-black text-xl mb-2 tracking-tighter">{org.name}</div>
                      <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{org.desc}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-10"><Building2 size={20} className="text-amber-500" /><h3 className="text-xl font-black tracking-widest uppercase">認可民間企業</h3></div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {businessData.map((biz, idx) => (
                    <div key={idx} className="p-8 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl hover:border-white/30 transition-all group flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center gap-3 mb-6"><span className="px-3 py-1 bg-white/10 text-[9px] font-black uppercase tracking-widest rounded-full">{biz.tag}</span></div>
                        <h4 className="text-2xl font-black tracking-tighter mb-4 text-white group-hover:text-amber-400 transition-colors">{biz.name}</h4>
                        <div className="text-zinc-400 text-[12px] leading-relaxed mb-8">{biz.content}</div>
                      </div>
                      <div className="pt-6 border-t border-white/5 flex items-center justify-between text-zinc-500">
                        <span className="text-[10px] font-black uppercase tracking-widest">運営責任者</span>
                        <span className="text-[11px] font-bold text-white/60">{biz.owner}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {currentPage === 'recruit' && (
          <div className="pt-48 pb-24 animate-fade-in px-6">
            <div className="container mx-auto max-w-4xl">
              <button onClick={() => setCurrentPage('home')} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-zinc-500 hover:text-white mb-16 transition-colors"><ArrowLeft size={16} /> トップページへ戻る</button>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter italic mb-20">採用・設立申請<span className="text-amber-500 text-3xl ml-4 font-black">Recruitment</span></h2>
              <div className="grid gap-8">
                {[
                  { icon: <Shield size={32} />, title: "行政機関への採用", type: "公務員" },
                  { icon: <FileCheck size={32} />, title: "事業所設立ライセンス", type: "民間事業" }
                ].map((sec, i) => (
                  <section key={i} className="p-12 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-xl">
                    <div className="flex items-center gap-6 mb-12">
                      <div className="text-amber-500">{sec.icon}</div>
                      <h3 className="text-3xl font-black uppercase tracking-tighter">{sec.title}</h3>
                    </div>
                    <div className="space-y-10">
                      {[
                        { step: "01", title: "公式Discordへの参加", desc: "すべての申請・連絡・広報はDiscordサーバー内で行われます。" },
                        { step: "02", title: "募集要項の確認", desc: "該当チャンネルにて、最新の採用条件や設立ルールを確認してください。" },
                        { step: "03", title: "書類審査・面接テスト", desc: "本格的なロールプレイテストを経て、正式に配属または事業認可が行われます。" }
                      ].map(item => (
                        <div key={item.step} className="flex gap-10 items-start border-l border-white/10 pl-10 relative">
                          <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
                          <div className="text-amber-500 font-black italic text-2xl">{item.step}</div>
                          <div><div className="font-black text-xl mb-2 text-white">{item.title}</div><div className="text-zinc-500 text-sm leading-relaxed">{item.desc}</div></div>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* AI コンシェルジュ */}
      {!isChatOpen && (
        <button onClick={() => setIsChatOpen(true)} className="fixed bottom-10 right-10 z-[140] w-16 h-16 bg-white/10 border border-white/20 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:bg-white hover:text-black transition-all backdrop-blur-2xl group shadow-amber-500/10">
          <MessageSquare size={28} />
          <span className="absolute -top-2 -left-2 bg-amber-500 text-black text-[8px] font-black px-2 py-1 rounded-full animate-bounce">AI相談</span>
        </button>
      )}
      {isChatOpen && (
        <div className="fixed bottom-10 right-10 z-[150] w-[calc(100vw-40px)] md:w-[420px] h-[650px] bg-[#0a0a0c]/85 border border-white/20 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.6)] backdrop-blur-[80px] flex flex-col overflow-hidden animate-fade-in">
          <div className="p-8 border-b border-white/10 flex justify-between items-center font-black">
            <span className="text-[12px] tracking-[0.2em] flex items-center gap-2 italic">
              <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div> 
              桜川県 AIコンシェルジュ
            </span>
            <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 text-[12px] leading-relaxed rounded-[1.8rem] ${
                  msg.role === 'user' 
                    ? 'bg-amber-500 text-black rounded-tr-none font-bold' 
                    : msg.isError 
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20 rounded-tl-none italic'
                      : 'bg-white/5 text-zinc-200 border border-white/10 rounded-tl-none'
                }`}>
                  {msg.isError && <AlertTriangle size={14} className="mb-2" />}
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-5 rounded-[1.8rem] rounded-tl-none border border-white/10 flex gap-1.5 items-center">
                  <Loader2 size={14} className="animate-spin text-amber-500 mr-2" />
                  <div className="text-[10px] font-black text-amber-500/60 tracking-widest uppercase animate-pulse">Thinking</div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="p-6 border-t border-white/10 flex gap-3 bg-white/5">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="市政や手続きについて質問する..."
              disabled={isTyping}
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-[12px] focus:ring-2 focus:ring-amber-500/30 outline-none text-white placeholder:text-zinc-600 transition-all disabled:opacity-50"
            />
            <button 
              type="submit" 
              disabled={isTyping || !inputText.trim()} 
              className="p-4 bg-white text-black rounded-full hover:bg-amber-500 transition-all active:scale-90 shadow-xl disabled:opacity-50 disabled:bg-zinc-800 disabled:text-zinc-500"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}

      {/* フッター */}
      <footer className="relative bg-black/50 backdrop-blur-md pt-32 pb-16 text-center border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-amber-500/10"></div>
        <div className="text-5xl md:text-7xl font-black italic tracking-tighter mb-8">SAKURAGAWA</div>
        <p className="text-zinc-500 text-[12px] font-black uppercase tracking-[0.8em] px-4 mb-16">本格ロールプレイ・シミュレーションプロジェクト</p>
        <div className="pt-12 text-zinc-700 text-[11px] font-bold border-t border-white/5 container mx-auto flex flex-col md:flex-row justify-between items-center gap-8 px-8">
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a>
            <a href="#" className="hover:text-white transition-colors">利用規約</a>
            <a href="#" className="hover:text-white transition-colors">お問い合わせ</a>
          </div>
          <div>© 2026 SAKURAGAWA PREFECTURE. ALL RIGHTS RESERVED.</div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.1); } }
        .animate-fade-in { animation: fadeIn 1.5s ease-out forwards; }
        .animate-slide-up { animation: slideUp 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        .animate-slow-zoom { animation: slowZoom 30s ease-in-out infinite alternate; }
        body::-webkit-scrollbar { width: 6px; }
        body::-webkit-scrollbar-track { background: #0a0a0c; }
        body::-webkit-scrollbar-thumb { background: #222; border-radius: 10px; }
        body::-webkit-scrollbar-thumb:hover { background: #333; }
      `}} />
    </div>
  );
};

export default App;