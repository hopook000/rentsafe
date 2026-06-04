export default function Home() {
  return (
    <main style={{ fontFamily: "sans-serif", color: "#1a1a1a", background: "#ffffff" }}>

      {/* 導覽列 */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 40px", borderBottom: "1px solid #eee", background: "white"
      }}>
        <span style={{ fontWeight: "bold", fontSize: "20px" }}>🔒 租安 RentSafe</span>
        <a style={{
          background: "#2563eb", color: "white", border: "none",
          padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontSize: "15px"
        }}>
          免費開始使用
        </a>
      </nav>

      {/* 主標題區 */}
      <section style={{
        textAlign: "center", padding: "80px 40px",
        background: "#eff6ff"
      }}>
        <h1 style={{ fontSize: "42px", fontWeight: "bold", marginBottom: "16px" }}>
          租屋糾紛，從此有憑有據
        </h1>
        <p style={{ fontSize: "18px", color: "#555", marginBottom: "32px" }}>
          入住當天拍照記錄，退租時一鍵生成 PDF 報告，押金再也不怕被亂扣。
        </p>
        <a style={{
          background: "#2563eb", color: "white", border: "none",
          padding: "14px 32px", borderRadius: "10px", cursor: "pointer",
          fontSize: "17px", fontWeight: "bold"
        }}>
          立即免費記錄 →
        </a>
      </section>

      {/* 三個功能區塊 */}
      <section style={{
        display: "flex", gap: "24px", padding: "60px 40px",
        justifyContent: "center", flexWrap: "wrap", background: "#ffffff"
      }}>
        {[
          { icon: "📷", title: "入住照片記錄", desc: "拍照自動加時間戳，每個房間狀況清楚留存" },
          { icon: "📄", title: "一鍵生成報告", desc: "匯出有照片、日期、文字的正式 PDF 文件" },
          { icon: "🔍", title: "退租前後比對", desc: "入住 vs 退租照片並排，清楚看出差異" },
        ].map((item) => (
          <div key={item.title} style={{
            background: "white", border: "1px solid #e5e7eb",
            borderRadius: "12px", padding: "32px", width: "260px", textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
          }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>{item.icon}</div>
            <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>{item.title}</h3>
            <p style={{ color: "#666", fontSize: "15px" }}>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* 定價區塊 */}
      <section style={{ background: "#f9fafb", padding: "60px 40px", textAlign: "center" }}>
        <h2 style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "8px" }}>簡單透明的定價</h2>
        <p style={{ color: "#666", marginBottom: "40px" }}>免費用到你滿意，需要更多再升級</p>
        <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap" }}>

          {/* 免費方案 */}
          <div style={{
            background: "white", border: "1px solid #e5e7eb", borderRadius: "16px",
            padding: "32px", width: "260px"
          }}>
            <h3 style={{ fontSize: "20px", marginBottom: "8px" }}>免費版</h3>
            <div style={{ fontSize: "36px", fontWeight: "bold", color: "#2563eb", marginBottom: "16px" }}>$0</div>
            <ul style={{ textAlign: "left", color: "#555", lineHeight: "2", paddingLeft: "16px" }}>
              <li>最多 20 張照片</li>
              <li>基本文字記錄</li>
              <li>1 個租屋物件</li>
            </ul>
          </div>

          {/* 付費方案 */}
          <div style={{
            background: "#2563eb", border: "none", borderRadius: "16px",
            padding: "32px", width: "260px", color: "white"
          }}>
            <h3 style={{ fontSize: "20px", marginBottom: "8px" }}>專業版</h3>
            <div style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "4px" }}>$99</div>
            <div style={{ fontSize: "13px", marginBottom: "16px", opacity: 0.8 }}>每年 / 約每月 $8</div>
            <ul style={{ textAlign: "left", lineHeight: "2", paddingLeft: "16px" }}>
              <li>無限照片上傳</li>
              <li>一鍵匯出 PDF</li>
              <li>退租前後比對</li>
              <li>雲端備份</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "24px", color: "#aaa", fontSize: "13px", background: "#ffffff" }}>
        © 2025 租安 RentSafe · 保護台灣租屋族的權益
      </footer>

    </main>
  )
}