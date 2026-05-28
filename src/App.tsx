import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { BottomNav } from './components/BottomNav';
import type { TabType } from './components/BottomNav';
import { HomePage } from './pages/HomePage';
import { PredictPage } from './pages/PredictPage';
import { ResultPage } from './pages/ResultPage';
import { RankingPage } from './pages/RankingPage';
import { ProfilePage } from './pages/ProfilePage';
import { SharePage } from './pages/SharePage';
import { 
  getChampionVote, 
  getSupportRates,
  recordChampionVoteToPool,
  saveChampionVote, 
  getMatchPredictions, 
  saveMatchPrediction, 
  getUserProfile, 
  saveUserProfile, 
  addPointHistory 
} from './lib/storage';
import type { UserProfile, Prediction } from './lib/storage';
import { TEAMS } from './data/teams';
import { MATCHES } from './data/matches';
import { Sparkles, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

function App() {
  const [activeTab, setActiveTab] = useState<TabType | 'result' | 'share'>('home');
  const [championTeamId, setChampionTeamId] = useState<string | null>(getChampionVote);
  const [supportRates, setSupportRates] = useState<Record<string, number>>(getSupportRates);
  const [predictions, setPredictions] = useState<Record<string, Prediction>>(getMatchPredictions);
  const [profile, setProfile] = useState<UserProfile | null>(getUserProfile);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

  // Toast state — 顶部滑入+弹跳
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'info';
    show: boolean;
  }>({ message: '', type: 'info', show: false });

  const showToast = (message: string, type: 'success' | 'info' = 'info') => {
    setToast({ message, type, show: true });
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleVoteChampion = (teamId: string) => {
    if (championTeamId) return;
    saveChampionVote(teamId);
    recordChampionVoteToPool(teamId);
    setChampionTeamId(teamId);
    setSupportRates(getSupportRates());
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
    const votedTeam = TEAMS.find(t => t.id === teamId);
    showToast(`🎉 成功加入 ${votedTeam?.name || teamId} 支持阵营！`, 'success');
    if (profile) setProfile({ ...profile, championTeamId: teamId });
  };

  const handleSubmitPrediction = (
    matchId: string, 
    winnerId: string, 
    score: "2:0" | "2:1" | "3:0" | "3:1" | "3:2"
  ) => {
    const newPrediction: Prediction = {
      matchId, winnerTeamId: winnerId, score,
      createdAt: new Date().toISOString()
    };
    saveMatchPrediction(newPrediction);
    setPredictions({ ...predictions, [matchId]: newPrediction });
    const match = MATCHES.find(m => m.id === matchId);
    const teamA = TEAMS.find(t => t.id === match?.teamAId);
    const teamB = TEAMS.find(t => t.id === match?.teamBId);
    addPointHistory(`预测了 ${teamA?.name} vs ${teamB?.name} 比分`, 3);
    setProfile(getUserProfile());
    setSelectedMatchId(matchId);
    setActiveTab('result');
    confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } });
    showToast("🎯 预测已提交！获得 3 积分", "success");
  };

  const handleUpdateProfile = (newProfile: UserProfile) => {
    saveUserProfile(newProfile);
    setProfile(newProfile);
  };

  const getActiveMatchAndTeams = () => {
    if (!selectedMatchId) return { match: null, teamA: null, teamB: null, pred: null };
    const match = MATCHES.find((m) => m.id === selectedMatchId) || null;
    const teamA = match ? TEAMS.find((t) => t.id === match.teamAId) || null : null;
    const teamB = match ? TEAMS.find((t) => t.id === match.teamBId) || null : null;
    const pred = predictions[selectedMatchId] || null;
    return { match, teamA, teamB, pred };
  };

  const { match, teamA, teamB, pred } = getActiveMatchAndTeams();
  const favoriteTeam = championTeamId ? TEAMS.find(t => t.id === championTeamId) || null : null;

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage championTeamId={championTeamId} supportRates={supportRates} onVoteChampion={handleVoteChampion} />;
      case 'predict':
        return <PredictPage predictions={predictions} onSubmitPrediction={handleSubmitPrediction} onViewResult={(matchId) => { setSelectedMatchId(matchId); setActiveTab('result'); }} />;
      case 'ranking':
        return <RankingPage supportRates={supportRates} />;
      case 'profile':
        if (!profile) return null;
        return <ProfilePage profile={profile} predictions={predictions} onNavigateToTab={(tab) => setActiveTab(tab)} onViewResult={(matchId) => { setSelectedMatchId(matchId); setActiveTab('result'); }} onUpdateProfile={handleUpdateProfile} onShowToast={showToast} />;
      case 'result':
        if (!match || !teamA || !teamB || !pred) {
          return <div className="py-20 text-center text-xs text-grey-secondary select-none">未选中比赛结果数据，请返回赛程页面进行预测。</div>;
        }
        return <ResultPage match={match} teamA={teamA} teamB={teamB} prediction={pred} onGenerateShare={() => setActiveTab('share')} onBackToPredict={() => setActiveTab('predict')} />;
      case 'share':
        return <SharePage match={match} teamA={teamA} teamB={teamB} prediction={pred} favoriteTeam={favoriteTeam} onBack={() => { if (selectedMatchId) setActiveTab('result'); else setActiveTab('profile'); }} onShowToast={showToast} />;
      default:
        return null;
    }
  };

  const handleTabChange = (tab: TabType) => {
    if (tab === 'profile') setSelectedMatchId(null);
    setActiveTab(tab);
  };

  return (
    <>
      {/* Toast — 顶部滑入+弹跳 */}
      <div 
        className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[340px] transition-all duration-500 pointer-events-none select-none ${
          toast.show 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 -translate-y-6 scale-95'
        }`}
        style={toast.show ? { transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' } : {}}
      >
        <div className={`px-4 py-3 rounded-xl border flex items-center gap-2.5 shadow-glass ${
          toast.type === 'success' 
            ? 'bg-[#0F1218]/95 border-status-success/30 text-status-success shadow-[0_4px_15px_rgba(55,214,122,0.15)]' 
            : 'bg-[#0F1218]/95 border-valorant/30 text-white shadow-[0_4px_15px_rgba(255,59,69,0.15)]'
        }`}>
          {toast.type === 'success' ? (
            <Sparkles className="w-5 h-5 text-status-success animate-bounce" />
          ) : (
            <Trophy className="w-5 h-5 text-valorant" />
          )}
          <span className="text-xs font-black tracking-wide leading-relaxed">{toast.message}</span>
        </div>
      </div>

      <Layout>
        <div key={activeTab} className="page-enter">
          {renderContent()}
        </div>
      </Layout>

      {activeTab !== 'share' && (
        <BottomNav activeTab={activeTab === 'result' ? 'predict' : activeTab as TabType} onChangeTab={handleTabChange} />
      )}
    </>
  );
}

export default App;
