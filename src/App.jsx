import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { 
  Shield, Flame, ChevronRight, Menu, X, MessageSquare, Send, 
  Award, Users, Rocket, UserPlus, Code2, Construction, Camera, 
  ChevronDown, ExternalLink, Play, Info, Heart, Briefcase, Car,
  Globe, Layout, Droplets, Zap, Box, Trash2, Coffee, Utensils,
  GraduationCap, Lock, Scissors, Landmark, TrainFront
} from 'lucide-react';

const apiKey = ""; 

// ==========================================
// 1. DATA CONFIGURATION (更新用データ)
// ==========================================

const APP_CONFIG = {
  title: "桜川県 HRP",
  discordUrl: "https://discord.gg/zXfJSnQGSB",
  robloxUrl: "https://www.roblox.com/ja/communities/767149098/Sakuragawa-Prefecture#!/about",
  pvYoutubeId: "9TywKfddUZQ"
};

const NEWS_DATA = [
  { id: 2, date: "2026.01.29", title: "公式サイトを更新", detail: "最新の組織情報および運営体制を反映し、UIの調整を行いました。" },
  { id: 1, date: "2026.01.6", title: "公式サイトを公開", detail: "リキッドグラス・デザインを採用し、直感的な操作が可能になりました。" }
];

const SNAPSHOTS = [
  { id: 1, url: "https://cdn.discordapp.com/attachments/1393149487194832949/1466048725062258719/8439333602_87905417474793_1769600111634.png?ex=697b53c5&is=697a0245&hm=0e95860400009fd879d5b3121b8b4f163eeaba7d8fc6ae2bc1868d92d1d1e7a7&", title: "認可済み事業:Light`s Pizza 店内" },
  { id: 2, url: "https://cdn.discordapp.com/attachments/1393149487194832949/1459912673813594227/8439333602_128388709341240_1768140459479.png?ex=697c1361&is=697ac1e1&hm=235ca7fae875e383c84ef7ac4f5ca52e88faf56ec7fa2fab37c8ffc9ff0645e3&", title: "救助工作車" },
  { id: 3, url: "https://cdn.discordapp.com/attachments/1420627208384544805/1466375513395298456/8439333602_128388709341240_1769681490590.png?ex=697c841e&is=697b329e&hm=d600d49bda56e1c7cb6afbbdfa4f6bf141bd1776933dc41e2b73e296cb4f34c2", title: "220系クラウンパトカー" },
  { id: 4, url: "https://cdn.discordapp.com/attachments/1420627208384544805/1466375747005452544/8439333602_128388709341240_1768303989468.png?ex=697c8456&is=697b32d6&hm=054ebe9a0555b1031d0a9bdafcd697c3e754ebae64077a1cc6c7065bce2d2934", title: "白バイ" },
  { id: 5, url: "https://cdn.discordapp.com/attachments/1420627208384544805/1457981527555313746/8439333602_87905417474793_1767424421452.png?ex=697c4d1c&is=697afb9c&hm=ba077f3f5945b71f8bfb5633df86f66f35373fa0cf333e494497fb6f861b3d1e", title: "紅葉町交差点" },
];

const ORGANIZATIONS = {
  public: [
    { icon: Shield, name: "桜川県警察", desc: "犯罪捜査や交通取締りなどを行い、県の治安を維持します。" },
    { icon: Flame, name: "凪浦広域連合消防局", desc: "消火・救助活動を担う広域消防。現在体制整備中。" },
    { icon: TrainFront, name: "桜川県交通", desc: "鉄道､バス､タクシーの運行を行い、県の交通を支えます。" },
    { icon: Heart, name: "桜川県立総合病院", desc: "高度な医療サービスを提供する県内最大の医療機関。" }
  ],
  private: [
    { icon: Droplets, name: "桜川県民営広域上下水道局", desc: "水道工事や社会科見学などを行い、桜川県全域に安全な水を配給いたします。" },
    { icon: Zap, name: "北京電力", desc: "電気工事や災害復旧などを行い、桜川県全域に電力を供給します" },
    { icon: Box, name: "株式会社桜川広域産業総合倉庫", desc: "倉庫内にて食料品、業務用機器、危険物等の物資を貯蔵・運搬し桜川県内にある全ての事業を陰から支えており、有事の際は復旧拠点とし燃料を提供する企業" },
    { icon: Coffee, name: "Caturra coffee", desc: "本格コーヒーとスイーツでくつろぎのひとときを味わえる桜川県有数のカフェ" },
    { icon: Utensils, name: "Light's Pizza", desc: "手軽に早く食べられる桜川県内のピザ屋チェーン店" },
   { icon: Utensils, name: "粉もん一筋 KONA EAT | genmai-style Konamon", desc: "国産米粉を使用した粉もの提供するお店で､国産米粉の魅力を存分に味わえるお店" },
    { icon: GraduationCap, name: "学校法人 永環学園 桜川情報技術専門学校", desc: "Robloxの世界で授業も実践も体験できる、初心者歓迎の新感覚専門学校 " },
    { icon: Lock, name: "桜川県警備保障株式会社", desc: "警備要請があった場合警備・巡回警備・イベント時の警備などをする企業" },
    { icon: Scissors, name: "HAIR SALON SPOT", desc: "髪型も会話も楽しめる、Robloxの美容室 " },
    { icon: Landmark, name: "桜川総合法律事務所", desc: "桜川県において発生する契約・著作権・運営上の課題やトラブルについて、中立的な立場で整理・文書化・相談支援を行う法務支援事業" }
  ]
};

const DEV_TEAM = [
  { name: "SakuraGaokaCity", role: "創設者 / 運営" },
  { name: "aisusan_jpn", role: "運営" },
  { name: "pizabatto", role: "開発者" },
  { name: "スライム", role: "開発者" },
  { name: "tachikawakazu", role: "モデレーター" }
];

const ROLES = ["警察官", "消防士", "救急隊員", "カフェ店員", "タクシー運転手", "整備士", "会社員", "大学生", "起業家", "ジャーナリスト"];

// 一度再生されたアニメーション状態を保持するためのグローバルなキャッシュ
const animatedElements = new Set();

// ==========================================
// 2. REUSABLE UI COMPONENTS
// ==========================================

const Reveal = memo(({ children, delay = 0, className = "", id }) => {
  const [isVisible, setIsVisible] = useState(id ? animatedElements.has(id) : false);
  const domRef = useRef();

  useEffect(() => {
    if (isVisible) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (id) animatedElements.add(id);
          observer.unobserve(domRef.current);
        }
      });
    }, { threshold: 0.1 });
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, [isVisible, id]);

  return (
    <div
      ref={domRef}
      className={`${className} reveal-item ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
});

const DiscordButton = ({ text = "Discordに参加する", className = "" }) => (
  <a 
    href={APP_CONFIG.discordUrl}
    target="_blank" 
    rel="noopener noreferrer"
    className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#5865F2] text-white rounded-2xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-xl hover:shadow-[#5865F2]/20 ${className}`}
  >
    <ExternalLink size={20} />
    {text}
  </a>
);

const SectionTitle = ({ title, subtitle, idPrefix }) => (
  <Reveal id={`${idPrefix}-header`} className="text-center mb-16">
    <h2 className="text-5xl md:text-6xl font-black tracking-tighter italic uppercase">{title}</h2>
    {subtitle && <p className="text-slate-400 font-mono mt-4 uppercase tracking-widest text-xs">{subtitle}</p>}
  </Reveal>
);

// ==========================================
// 3. FEATURE COMPONENTS
// ==========================================

const GalleryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const autoPlayRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const scrollTo = useCallback((index) => {
    const slider = scrollRef.current;
    if (!slider) return;
    const item = slider.querySelector('.snap-center');
    if (!item) return;
    const itemWidth = item.offsetWidth;
    const gap = 32;
    slider.scrollTo({
      left: index * (itemWidth + gap),
      behavior: 'smooth'
    });
    setCurrentIndex(index);
  }, []);

  const handleScroll = () => {
    const slider = scrollRef.current;
    if (!slider) return;
    const item = slider.querySelector('.snap-center');
    if (!item) return;
    const itemWidth = item.offsetWidth + 32;
    const newIndex = Math.round(slider.scrollLeft / itemWidth);
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < SNAPSHOTS.length) {
      setCurrentIndex(newIndex);
    }
  };

  useEffect(() => {
    if (!isHovered) {
      autoPlayRef.current = setInterval(() => {
        const nextIndex = (currentIndex + 1) % SNAPSHOTS.length;
        scrollTo(nextIndex);
      }, 5000);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [currentIndex, isHovered, scrollTo]);

  return (
    <div className="relative w-full" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-8 overflow-x-auto pb-8 px-[10vw] snap-x snap-mandatory scroll-smooth no-scrollbar"
      >
        {SNAPSHOTS.map((snap) => (
          <div key={snap.id} className="snap-center shrink-0 w-[85vw] md:w-[600px]">
            <div className="aspect-video rounded-[3rem] overflow-hidden bg-slate-100 shadow-lg relative group border-2 border-white">
              <img src={snap.url} className="w-full h-full object-cover select-none pointer-events-none" alt={snap.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white font-bold text-xl">{snap.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-3 mt-6">
        {SNAPSHOTS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${currentIndex === i ? 'w-12 bg-blue-600' : 'w-2 bg-slate-200'}`}
          />
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 4. PAGE VIEWS
// ==========================================

const NewsView = ({ onBack }) => {
  const [expanded, setExpanded] = useState(null);
  return (
    <div className="pt-40 pb-32 px-6 max-w-4xl mx-auto">
      <SectionTitle title="News" subtitle="Latest Updates" idPrefix="news" />
      <div className="space-y-4">
        {NEWS_DATA.map(news => (
          <div key={news.id} onClick={() => setExpanded(expanded === news.id ? null : news.id)} className={`p-8 bg-white border border-slate-100 rounded-[2.5rem] cursor-pointer transition-all ${expanded === news.id ? 'shadow-2xl scale-[1.01] border-blue-200' : 'hover:shadow-lg'}`}>
            <div className="flex justify-between items-center">
              <div><span className="text-xs font-mono text-slate-400">{news.date}</span><h3 className="text-xl font-bold mt-1 text-slate-900">{news.title}</h3></div>
              <ChevronDown className={`transition-transform duration-500 ${expanded === news.id ? 'rotate-180' : ''}`} />
            </div>
            {expanded === news.id && <div className="mt-8 pt-8 border-t border-slate-50 text-slate-700 font-medium leading-relaxed animate-fade-in">{news.detail}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

const OrgsView = () => (
  <div className="pt-40 pb-32 px-6 max-w-6xl mx-auto">
    <SectionTitle title="Organizations" subtitle="Public & Private Sector" idPrefix="orgs" />
    <div className="space-y-24">
      <section>
        <h3 className="text-2xl font-black italic mb-10 flex items-center gap-4"><div className="w-8 h-1 bg-blue-600"></div> 行政・公共機関</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {ORGANIZATIONS.public.map((org, i) => (
            <Reveal key={i} id={`pub-${i}`} className="p-8 bg-slate-50 border border-slate-100 rounded-3xl flex items-start gap-6">
              <div className="shrink-0 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-sm"><org.icon size={24}/></div>
              <div><h4 className="text-lg font-black mb-2 italic">{org.name}</h4><p className="text-sm font-bold text-slate-500 leading-relaxed">{org.desc}</p></div>
            </Reveal>
          ))}
        </div>
      </section>
      <section>
        <h3 className="text-2xl font-black italic mb-10 flex items-center gap-4"><div className="w-8 h-1 bg-blue-600"></div> 認可民間企業</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ORGANIZATIONS.private.map((corp, i) => (
            <Reveal key={i} id={`priv-${i}`} className="p-6 bg-white border border-slate-100 rounded-3xl flex flex-col items-start h-full shadow-sm">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-blue-600 mb-4"><corp.icon size={20}/></div>
              <h4 className="text-md font-black mb-3 italic leading-tight">{corp.name}</h4>
              <p className="text-xs font-bold text-slate-400 leading-relaxed">{corp.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  </div>
);

const RecruitView = () => (
  <div className="pt-40 pb-32 px-6 max-w-6xl mx-auto text-center">
    <SectionTitle title="Careers" subtitle="How to join" idPrefix="recruit" />
    <Reveal id="recruit-info" className="p-12 bg-blue-50 border-2 border-blue-100 rounded-[4rem] text-left max-w-3xl mx-auto mb-16">
      <Info className="text-blue-600 mb-6" size={32} />
      <h3 className="text-2xl font-black mb-4 italic">応募・手続きに関する重要事項</h3>
      <p className="text-slate-700 font-bold leading-relaxed mb-4">桜川県での全ての採用手続きや新規事業申請は、公式Discordサーバー内でのみ行われます。</p>
      <ul className="space-y-2 text-sm font-bold text-slate-500 list-disc pl-5">
        <li>採用試験は不定期開催です。</li>
        <li>Robloxグループへの無断申請は控えてください。</li>
      </ul>
    </Reveal>
    <div className="grid md:grid-cols-2 gap-8">
      <Reveal id="recruit-citizen" className="p-16 bg-slate-900 text-white rounded-[4rem] text-left">
        <UserPlus className="text-blue-500 mb-10" size={48} />
        <h3 className="text-4xl font-black mb-6 italic uppercase tracking-tighter">Citizens</h3>
        <p className="text-slate-400 font-bold mb-10 leading-relaxed">まずは公式Discordに参加し、県民ロールを取得してください。</p>
        <DiscordButton className="w-full !py-6 !rounded-3xl" text="公式Discordへ参加" />
      </Reveal>
      <Reveal id="recruit-pro" className="p-16 bg-slate-50 border border-slate-100 rounded-[4rem] text-left">
        <Award className="text-slate-900 mb-10" size={48} />
        <h3 className="text-4xl font-black mb-6 italic uppercase tracking-tighter">Professionals</h3>
        <p className="text-slate-500 font-bold mb-10 leading-relaxed">事業への就職、起業は募集時期、設立要項を確認してください。</p>
        <div className="w-full py-6 bg-white border-2 border-slate-100 text-slate-400 font-black rounded-3xl text-center">Discordで募集確認</div>
      </Reveal>
    </div>
  </div>
);

const DevView = () => (
  <div className="pt-40 pb-32 px-6 max-w-6xl mx-auto text-center">
    <SectionTitle title="Development" subtitle="The Team" idPrefix="dev" />
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-24">
      {DEV_TEAM.map((member, i) => (
        <Reveal key={i} id={`dev-${i}`} delay={i * 30} className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
          <h4 className="text-sm font-black italic">{member.name}</h4>
          <p className="text-[10px] font-bold text-blue-600 uppercase mt-1">{member.role}</p>
        </Reveal>
      ))}
    </div>
    <div className="grid md:grid-cols-2 gap-8 text-left">
      <Reveal id="dev-pol" className="p-12 bg-white border border-slate-100 rounded-[3rem]">
        <h3 className="text-2xl font-black mb-4 italic">開発方針</h3>
        <p className="text-slate-500 font-bold leading-relaxed">リアリティと遊びやすさを両立。愛知県などの実在のスタイルを参考にしつつ、独自の世界観を構築しています。</p>
      </Reveal>
      <Reveal id="dev-status" className="p-12 bg-white border border-slate-100 rounded-[3rem]">
        <h3 className="text-2xl font-black mb-4 italic">公開状況</h3>
        <p className="text-slate-500 font-bold leading-relaxed">プレースは常時開放されておらず、公式イベント時のみ開放されます。スケジュールはDiscordをご確認ください。</p>
      </Reveal>
    </div>
  </div>
);

// ==========================================
// 5. MAIN APP COMPONENT
// ==========================================

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ role: 'ai', text: 'こんにちは！桜川県AIコンシェルジュです。何かお手伝いしましょうか？' }]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsMobileMenuOpen(false);
  }, [currentPage]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;
    const userMsg = inputText;
    setInputText("");
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMsg }] }],
          systemInstruction: { parts: [{ text: `あなたは『桜川県』のAIコンシェルジュです。桜川県はRoblox上の本格ロールプレイサーバーです。以下の知識を遵守し、丁寧かつ親しみやすい「案内役」として回答してください。

【重要なルール】
1. あなたが知らない情報、最新の事件、個別のプレイヤーの動向については「申し訳ございませんが、その件については私では把握しておりません」とはっきり伝え、必ず「公式Discordサーバー（https://discord.gg/zXfJSnQGSB）の該当チャンネルをご確認いただくか、運営スタッフにお問い合わせください」と案内してください。
2. 憶測で回答せず、常に公式設定に基づいた回答を行ってください。
3. 桜川県に関することのみ回答し、それ以外の質問は「私は桜川県のAIコンシェルジェであるため、桜川県に関することのみ回答できます。」と案内してください。

■ 桜川県の基本情報
- 桜川県の公式Robloxコミュニティーが存在し、URLは「https://www.roblox.com/ja/communities/767149098/Sakuragawa-Prefecture#!/about」
- 2026年1月時点で、公式が公表しているイベント時以外はプレースは解放されていない。イベントは公式Discordサーバーにて案内。
- 各機関・事業にもRobloxコミュニティーが存在するが、申請制であれば許可なく申請は控えること。URLはDiscordサーバーにある。
- 桜川県のモチーフ（モデル）は明確には存在せず、バスの塗装などは愛知県を参考にしている。
- 運営・開発者・モデレーターは合計で5名おり、創設者のSakuraGaokaCityと運営のaisusan_jpn、開発者のpizabattoとスライム、そしてモデレータのtachikawakazu。
- 認可民間企業及び公共機関は以下のもののみ。（更新が遅れている可能性もあり）

■ 行政・公共機関
- 桜川県警察: 犯罪捜査や交通取締りなどを行い、県の治安を維持します。
- 凪浦広域連合消防局: （現時点での説明文なし）
- 桜川県交通: 鉄道､バス､タクシーの運行を行い、県の交通を支えます。
- 桜川県立総合病院: （現時点での説明文なし）

■ 認可民間企業
- 桜川県民営広域上下水道局: 水道工事や社会科見学などを行い、桜川県全域に安全な水を配給いたします。  
- 北京電力: 電気工事や災害復旧などを行い、桜川県全域に電力を供給します
- 桜川広域産業総合倉庫: 倉庫内にて食料品、業務用機器、危険物等の物資を貯蔵・運搬し桜川県内にある全ての事業を陰から支えており、有事の際は復旧拠点とし燃料を提供する企業
- 桜川環境整備施設組合: 県内のし尿処理、ゴミ処理、河川と用水路の保全と管理、ごみ減量啓発などをする一般事業組合
- Caturra coffee: 本格コーヒーとスイーツでくつろぎのひとときを味わえる桜川県有数のカフェ
- Light's Pizza: 手軽に早く食べられる桜川県内のピザ屋チェーン店
- 学校法人 永環学園 桜川情報技術専門学校: Robloxの世界で授業も実践も体験できる、初心者歓迎の新感覚専門学校
- 桜川県警備保障(株): 警備要請があった場合警備・巡回警備・イベント時の警備などをする企業
- HAIR SALON SPOT: 髪型も会話も楽しめる、Robloxの美容室
- Link Table Group: デリバリーや飲食店を多数経営する事業
- 桜川総合法律事務所: 桜川県において発生する契約・著作権・運営上の課題やトラブルについて、中立的な立場で整理・文書化・相談支援を行う法務支援事業

■ 統計・現状
- 県民数: 約340名以上が公式Discordサーバーに参加。
- Robloxコミュニティー: 約180名以上が参加中
- 組織数: 約15以上の行政・民間組織が活動中。

■ 手続きについて
- 採用（警察・消防・病院など）や、新規事業所の設立申請は、すべて公式Discordサーバー内で行われます。ウェブサイト上で直接の応募はできません。
-機関のDiscordサーバーは関係者のみ共有されています。
-各機関・事業の職員になるには桜川県Discordサーバーに記載されている試験を受験し、不定期に行われる結果発表の指示に従う。` }] }
        })
      });
      const data = await response.json();
      setChatMessages(prev => [...prev, { role: 'ai', text: data.candidates?.[0]?.content?.parts?.[0]?.text || "接続に失敗しました。" }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'ai', text: "接続エラーが発生しました。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const navLinks = [
    { id: 'home', label: 'トップ' },
    { id: 'news', label: 'お知らせ' },
    { id: 'orgs', label: '組織・企業' },
    { id: 'recruit', label: 'キャリア' },
    { id: 'dev', label: '開発' }
  ];

  const isDarkNavbar = currentPage === 'home' && !isScrolled && !isMobileMenuOpen;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-600 selection:text-white antialiased overflow-x-hidden">
      {/* Navbar */}
      <nav className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <div onClick={() => setCurrentPage('home')} className={`text-2xl font-black tracking-tighter cursor-pointer transition-colors ${isDarkNavbar ? 'text-white' : 'text-slate-900'}`}>{APP_CONFIG.title}</div>
          <div className="hidden md:flex gap-2">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => setCurrentPage(link.id)} className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all ${currentPage === link.id ? (isDarkNavbar ? 'bg-white text-slate-900' : 'bg-slate-900 text-white') : (isDarkNavbar ? 'text-white/70 hover:text-white' : 'text-slate-500 hover:text-slate-900')}`}>{link.label}</button>
            ))}
          </div>
          <button className={`md:hidden p-3 rounded-2xl ${isDarkNavbar ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-900'}`} onClick={() => setIsMobileMenuOpen(true)}><Menu size={20}/></button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[200] bg-white transition-all duration-700 ease-[cubic-bezier(0.8,0,0.2,1)] ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col h-full p-12">
          <div className="flex justify-between items-center mb-16"><div className="font-black text-2xl uppercase tracking-tighter italic">Sakuragawa</div><button onClick={() => setIsMobileMenuOpen(false)} className="p-4 bg-slate-100 rounded-full"><X/></button></div>
          <div className="flex flex-col gap-6">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => { setCurrentPage(link.id); setIsMobileMenuOpen(false); }} className={`text-5xl font-black tracking-tighter text-left ${currentPage === link.id ? 'text-blue-600' : 'text-slate-900'}`}>{link.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
        {currentPage === 'home' && (
          <div className="bg-white">
            <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-slate-900">
              <div className="absolute inset-0 z-0">
                <img src="https://cdn.discordapp.com/attachments/1420627208384544805/1466377361103519869/8439333602_87905417474793_1769681972175.png?ex=697c85d6&is=697b3456&hm=44c2ceae328b187c48665a0d5ed402219e8eb54ff3defef48798c3752fefac90" className="w-full h-full object-cover opacity-50 scale-105 animate-slow-zoom" alt="City" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-white"></div>
              </div>
              <div className="relative z-10 px-6">
                <Reveal id="hero-title" delay={100}><h1 className="text-[15vw] md:text-[10rem] font-black text-white leading-none tracking-tighter drop-shadow-2xl italic">桜川県</h1></Reveal>
                <Reveal id="hero-sub" delay={200}><p className="text-xl md:text-3xl text-blue-100 font-bold tracking-widest mt-4 drop-shadow-md italic">「なりたい自分」を、ここで見つける。</p></Reveal>
                <Reveal id="hero-btns" delay={300} className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
                  <DiscordButton /><button onClick={() => document.getElementById('drama')?.scrollIntoView({behavior:'smooth'})} className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold hover:bg-white/20 transition-all">街について知る</button>
                </Reveal>
              </div>
            </section>
            <section id="drama" className="pt-32 pb-0 px-6">
              <div className="max-w-5xl mx-auto text-center mb-16">
                <Reveal id="drama-title"><h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter italic mb-8 leading-[1.1]">ただのゲームではない。<br/><span className="text-blue-600">今日、あなたは<br className="md:hidden"/>どんなドラマを創りますか？</span></h2></Reveal>
              </div>
              <div className="relative w-full overflow-hidden py-10 bg-slate-50 border-y border-slate-100">
                <div className="flex animate-scroll whitespace-nowrap">
                  {[...ROLES, ...ROLES].map((role, i) => (
                    <div key={i} className="mx-8 flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span className="text-2xl md:text-4xl font-black text-slate-800 tracking-tighter italic uppercase">{role}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 py-24 px-6">
                {[
                  { icon: Heart, title: "HRPとは？", text: "Hard Roleplayの略。物語を作る脚本家となり、それを演じる役者となります。" },
                  { icon: Briefcase, title: "街の仕組み", text: "公共インフラから商店まで、すべてがプレイヤーによって運営されており、採用試験と研修を導入することにより、よりリアルなドラマを創ります。" },
                  { icon: Car, title: "自由な選択", text: "県民として生きるか、公僕として尽くすか。選択はあなたに委ねられています。" }
                ].map((item, i) => (
                  <Reveal key={i} id={`card-${i}`} delay={i * 50} className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-xl transition-all">
                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6"><item.icon size={28}/></div>
                    <h4 className="text-xl font-black mb-4 italic">{item.title}</h4>
                    <p className="text-slate-500 leading-relaxed text-sm font-bold">{item.text}</p>
                  </Reveal>
                ))}
              </div>
            </section>
            <section className="py-24 bg-slate-900">
              <div className="max-w-6xl mx-auto px-6">
                <Reveal id="pv-vid" className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10 bg-black">
                  <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${APP_CONFIG.pvYoutubeId}`} title="PV" frameBorder="0" allowFullScreen></iframe>
                </Reveal>
              </div>
            </section>
            <section className="py-32">
              <SectionTitle title="Gallery" subtitle="Development Snapshots" idPrefix="home-gal" />
              <GalleryCarousel />
            </section>
          </div>
        )}
        {currentPage === 'news' && <NewsView />}
        {currentPage === 'orgs' && <OrgsView />}
        {currentPage === 'recruit' && <RecruitView />}
        {currentPage === 'dev' && <DevView />}
      </main>

      {/* Footer */}
      <footer className="py-24 bg-white border-t border-slate-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-left">
          <div className="col-span-1">
            <div className="text-2xl font-black tracking-tighter italic mb-6 uppercase text-slate-900">Sakuragawa HRP</div>
            <p className="text-slate-400 text-sm font-bold leading-relaxed mb-6">究極の没入型ロールプレイ体験を、あなたに。</p>
            <DiscordButton className="!px-6 !py-3 !text-sm" />
          </div>
          <div>
            <h5 className="font-black text-xs tracking-widest uppercase mb-6 text-blue-600">Links</h5>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li><a href={APP_CONFIG.robloxUrl} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">Robloxコミュニティ</a></li>
              <li className="cursor-pointer hover:text-slate-900" onClick={() => setCurrentPage('news')}>最新ニュース</li>
              <li className="cursor-pointer hover:text-slate-900" onClick={() => setCurrentPage('orgs')}>組織一覧</li>
            </ul>
          </div>
          <div className="text-right flex flex-col justify-end">
            <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase">© 2026 SAKURAGAWA PREFECTURAL GOVERNMENT.</p>
          </div>
        </div>
      </footer>

      {/* AI Chat */}
      <div className="fixed bottom-8 right-8 z-[150] flex flex-col items-end">
        {isChatOpen && (
          <div className="w-[380px] h-[580px] max-h-[80vh] bg-white rounded-[3rem] shadow-2xl border border-slate-100 flex flex-col mb-6 overflow-hidden animate-pop-up origin-bottom-right">
            <div className="p-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <span className="font-black text-xs tracking-widest uppercase text-slate-600">HRP Guide AI</span>
              <button onClick={() => setIsChatOpen(false)}><X size={20}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/30 no-scrollbar">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-5 rounded-[2rem] text-[13px] font-bold max-w-[85%] ${msg.role === 'user' ? 'bg-slate-900 text-white shadow-xl' : 'bg-white border border-slate-100 text-slate-700 shadow-sm'}`}>{msg.text}</div>
                </div>
              ))}
              {isTyping && <div className="flex justify-start"><div className="bg-white p-4 rounded-full border border-slate-100 flex gap-1"><div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce"></div><div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce delay-75"></div><div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce delay-150"></div></div></div>}
            </div>
            <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-slate-50 flex gap-2">
              <input type="text" value={inputText} onChange={e => setInputText(e.target.value)} placeholder="街について質問する..." className="flex-1 px-6 py-4 bg-slate-50 rounded-full text-sm font-bold outline-none focus:bg-white transition-all" />
              <button type="submit" className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center"><Send size={16}/></button>
            </form>
          </div>
        )}
        <button onClick={() => setIsChatOpen(!isChatOpen)} className={`w-16 h-16 rounded-[2.2rem] flex items-center justify-center transition-all ${isChatOpen ? 'bg-white text-slate-900 border-2 border-slate-100' : 'bg-slate-900 text-white shadow-2xl'}`}>
          {isChatOpen ? <X size={24}/> : <MessageSquare size={24}/>}
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.15); } }
        @keyframes popUp { from { opacity: 0; transform: scale(0.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-slow-zoom { animation: slowZoom 30s ease-out infinite alternate; }
        .animate-pop-up { animation: popUp 0.4s cubic-bezier(0.3, 1.5, 0.5, 1) forwards; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .animate-scroll { animation: scroll 40s linear infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .reveal-item { opacity: 0; transform: translateY(30px); transition: opacity 1s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1s cubic-bezier(0.2, 0.8, 0.2, 1); will-change: opacity, transform; }
        .reveal-item.is-visible { opacity: 1; transform: translateY(0); }
      `}} />
    </div>
  );
};

export default App;