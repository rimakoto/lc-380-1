import { useState, useCallback } from 'react';
import { Scene } from '@/components/Scene';
import { VendingMachine } from '@/components/VendingMachine';
import { ProductPreview } from '@/components/UI/ProductPreview';
import { RestockButton } from '@/components/UI/RestockButton';
import { Product } from '@/types';
import { useSound } from '@/hooks/useSound';
import { useInventory } from '@/hooks/useInventory';
import { Sparkles } from 'lucide-react';

const Home = () => {
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [fallingProduct, setFallingProduct] = useState<Product | null>(null);
  const [showDispenserGlow, setShowDispenserGlow] = useState(false);
  const [isRestocking, setIsRestocking] = useState(false);

  const { playButtonClick, playRestockSound } = useSound();
  const { inventory, removeProduct, restock } = useInventory();

  const handleProductClick = useCallback((product: Product) => {
    setPreviewProduct(product);
    setIsPreviewOpen(true);
  }, []);

  const handleClosePreview = useCallback(() => {
    if (isPurchasing) return;
    setIsPreviewOpen(false);
    setTimeout(() => setPreviewProduct(null), 200);
  }, [isPurchasing]);

  const handleConfirmPurchase = useCallback((product: Product) => {
    if (!inventory[product.id]) return;
    setIsPurchasing(true);
    playButtonClick();
    setIsPreviewOpen(false);
    setTimeout(() => {
      setPreviewProduct(null);
      setFallingProduct(product);
    }, 150);
  }, [inventory, playButtonClick]);

  const handleFallingComplete = useCallback(() => {
    if (fallingProduct) {
      removeProduct(fallingProduct.id);
    }
    setShowDispenserGlow(true);
    setTimeout(() => {
      setFallingProduct(null);
      setIsPurchasing(false);
    }, 100);
    setTimeout(() => setShowDispenserGlow(false), 3500);
  }, [fallingProduct, removeProduct]);

  const handleRestock = useCallback(() => {
    playButtonClick();
    setIsRestocking(true);
    setShowDispenserGlow(false);
    setFallingProduct(null);
    setIsPurchasing(false);
    setTimeout(() => {
      restock();
      playRestockSound();
    }, 400);
    setTimeout(() => setIsRestocking(false), 1000);
  }, [playButtonClick, restock, playRestockSound]);

  return (
    <div className="w-full h-screen relative overflow-hidden bg-[#0f0f1a]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#1a1a3a]/60 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/60 to-transparent z-10" />
      </div>

      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <h1
          className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 tracking-wider flex items-center gap-3"
          style={{ fontFamily: "'Orbitron', sans-serif", textShadow: '0 0 30px rgba(100, 150, 255, 0.5)' }}
        >
          <Sparkles size={28} className="text-yellow-400 animate-pulse" />
          3D 自动售货机
          <Sparkles size={28} className="text-yellow-400 animate-pulse" />
        </h1>
        <p className="text-center text-gray-400 text-sm mt-2 tracking-widest">
          CLICK · BUY · ENJOY!
        </p>
      </div>

      <div className="absolute inset-0">
        <Scene>
          <VendingMachine
            inventory={inventory}
            onPreview={handleProductClick}
            isPurchasing={isPurchasing}
            fallingProduct={fallingProduct}
            onFallingComplete={handleFallingComplete}
            showDispenserGlow={showDispenserGlow}
          />
        </Scene>
      </div>

      <div className="absolute bottom-6 left-6 z-20 space-y-2 max-w-xs">
        <div className="bg-black/50 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <p className="text-white/90 text-sm font-bold mb-2 flex items-center gap-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            📖 使用说明
          </p>
          <ul className="text-gray-300 text-xs space-y-1.5">
            <li>🖱️ 点击商品查看详情</li>
            <li>✅ 确认购买，商品自动掉落</li>
            <li>🔊 建议打开音效体验更佳</li>
            <li>🔄 售罄后点击右下角补货</li>
          </ul>
        </div>
      </div>

      <ProductPreview
        product={previewProduct}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        onConfirm={handleConfirmPurchase}
        isPurchasing={isPurchasing}
      />

      <RestockButton onClick={handleRestock} isRestocking={isRestocking} />

      {showDispenserGlow && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-bounce">
          <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-2xl border-2 border-white/30"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            🎉 请从取物口取走您的商品！
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
