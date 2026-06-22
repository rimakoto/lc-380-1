import { RefreshCw } from 'lucide-react';

interface RestockButtonProps {
  onClick: () => void;
  isRestocking?: boolean;
}

export const RestockButton = ({ onClick, isRestocking }: RestockButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isRestocking}
      className="fixed bottom-8 right-8 z-40 px-6 py-4 rounded-2xl text-white font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 border-2 border-white/20 disabled:opacity-60 disabled:cursor-not-allowed group"
      style={{
        background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
        boxShadow: '0 8px 30px rgba(76, 175, 80, 0.5)'
      }}
    >
      <RefreshCw
        size={24}
        className={`transition-transform duration-500 group-hover:rotate-180 ${isRestocking ? 'animate-spin' : ''}`}
      />
      <span style={{ fontFamily: "'Orbitron', sans-serif" }}>
        {isRestocking ? '补货中...' : '一键补货'}
      </span>
    </button>
  );
};
