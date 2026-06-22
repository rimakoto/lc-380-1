import { Product } from '@/types';
import { X, ShoppingCart } from 'lucide-react';

interface ProductPreviewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (product: Product) => void;
  isPurchasing: boolean;
}

export const ProductPreview = ({ product, isOpen, onClose, onConfirm, isPurchasing }: ProductPreviewProps) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl overflow-hidden animate-scaleIn border border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-20"
          disabled={isPurchasing}
        >
          <X size={22} />
        </button>

        <div
          className="h-56 flex items-center justify-center relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${product.color}30 0%, ${product.color}60 50%, ${product.color}20 100%)`
          }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent 50%)`
            }}
          />
          {product.type === 'drink' ? (
            <div className="relative animate-float">
              <div
                className="w-28 h-44 rounded-[1.2rem] shadow-2xl relative overflow-hidden"
                style={{
                  background: `linear-gradient(180deg, #C0C0C0 0%, ${product.color} 8%, ${product.color} 92%, #C0C0C0 100%)`,
                  boxShadow: `0 10px 40px ${product.color}60, inset 0 0 20px rgba(0,0,0,0.1)`
                }}
              >
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center py-2 px-3"
                  style={{ backgroundColor: product.color }}
                >
                  <span
                    className="font-bold text-2xl tracking-wide"
                    style={{ color: product.labelColor, fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {product.name.slice(0, 2)}
                  </span>
                </div>
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-3 rounded-full bg-gray-300 border border-gray-400 shadow-inner">
                  <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-6 h-1.5 rounded-full bg-gray-400" />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative animate-float">
              <div
                className="w-32 h-40 rounded-xl shadow-2xl relative overflow-hidden"
                style={{
                  background: product.color,
                  boxShadow: `0 10px 40px ${product.color}60`
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-3 gap-2">
                  <span
                    className="font-black text-xl leading-tight text-center"
                    style={{ color: product.labelColor }}
                  >
                    {product.name}
                  </span>
                  <div className="w-16 h-1 rounded-full" style={{ backgroundColor: product.labelColor, opacity: 0.4 }} />
                  <div className="w-12 h-1 rounded-full" style={{ backgroundColor: product.labelColor, opacity: 0.3 }} />
                  <div className="w-10 h-1 rounded-full" style={{ backgroundColor: product.labelColor, opacity: 0.2 }} />
                </div>
                {[-0.3, -0.1, 0.1, 0.3].map((py, i) => (
                  <div
                    key={i}
                    className="absolute inset-x-2 h-0.5 rounded-full"
                    style={{
                      top: `${50 + py * 50}%`,
                      backgroundColor: product.labelColor,
                      opacity: 0.12,
                      transform: `rotate(${i % 2 === 0 ? 3 : -3}deg)`
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                {product.name}
              </h2>
              <span
                className="text-3xl font-black px-3 py-1 rounded-xl shrink-0"
                style={{
                  backgroundColor: product.color,
                  color: product.labelColor,
                  fontFamily: "'Orbitron', sans-serif",
                  boxShadow: `0 4px 15px ${product.color}50`
                }}
              >
                ¥{product.price.toFixed(1)}
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              {product.type === 'drink' ? '🥤 清凉饮品 · 冰镇畅爽' : '🍿 美味零食 · 新鲜现货'}
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              disabled={isPurchasing}
              className="flex-1 py-4 rounded-2xl bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white font-bold text-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              取消
            </button>
            <button
              onClick={() => onConfirm(product)}
              disabled={isPurchasing}
              className="flex-1 py-4 rounded-2xl text-white font-bold text-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: `linear-gradient(135deg, #2196F3 0%, #1976D2 100%)`,
                boxShadow: '0 4px 20px rgba(33, 150, 243, 0.4)'
              }}
            >
              <ShoppingCart size={22} />
              {isPurchasing ? '出货中...' : '立即购买'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
