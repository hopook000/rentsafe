'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Record = {
  title: string
  room: string
  note: string
  image_url: string | null
  created_at: string
}

export default function RecordsPage() {
  const [records, setRecords] = useState<Record[]>([])
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    async function fetchRecords() {
      const { data } = await supabase
        .from('records')
        .select('*')
        .order('created_at', { ascending: false })
      if (data) setRecords(data)
      setLoading(false)
    }
    fetchRecords()
  }, [])

  async function exportPDF() {
    setExporting(true)
    const { jsPDF } = await import('jspdf')
    const { default: html2canvas } = await import('html2canvas')

    const doc = new jsPDF('p', 'mm', 'a4')
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()

    for (let i = 0; i < records.length; i++) {
      const r = records[i]
      if (i > 0) doc.addPage()

      const el = document.getElementById(`pdf-card-${i}`)
      if (!el) continue

      const canvas = await html2canvas(el, { scale: 2, useCORS: true })
      const imgData = canvas.toDataURL('image/png')
      const imgHeight = (canvas.height * pageWidth) / canvas.width

      doc.addImage(imgData, 'PNG', 0, 0, pageWidth, Math.min(imgHeight, pageHeight))
    }

    doc.save('租安記錄報告.pdf')
    setExporting(false)
  }

  return (
    <main style={{ fontFamily: 'sans-serif', background: '#f9fafb', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <a href="/" style={{ color: '#2563eb', fontSize: '14px', textDecoration: 'none' }}>← 回首頁</a>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 0 28px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0, color: '#111' }}>所有記錄</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={exportPDF} disabled={exporting} style={{
              background: exporting ? '#9ca3af' : '#059669', color: 'white', border: 'none',
              padding: '10px 18px', borderRadius: '8px', fontSize: '14px',
              fontWeight: 'bold', cursor: exporting ? 'not-allowed' : 'pointer'
            }}>
              {exporting ? '匯出中...' : '📄 匯出 PDF'}
            </button>
            <a href="/record" style={{
              background: '#2563eb', color: 'white', padding: '10px 18px',
              borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold'
            }}>+ 新增記錄</a>
          </div>
        </div>

        {loading ? (
          <p style={{ color: '#888' }}>載入中...</p>
        ) : records.length === 0 ? (
          <p style={{ color: '#888' }}>還沒有任何記錄，點右上角新增吧！</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {records.map((r, i) => (
              <div key={i} style={{
                background: 'white', borderRadius: '12px', overflow: 'hidden',
                border: '1px solid #e5e7eb'
              }}>
                {r.image_url && (
                  <img src={r.image_url} alt="記錄照片"
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                )}
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#111' }}>{r.title}</span>
                    <span style={{ background: '#eff6ff', color: '#2563eb', padding: '2px 10px', borderRadius: '20px', fontSize: '13px' }}>{r.room}</span>
                  </div>
                  <p style={{ color: '#555', fontSize: '14px', margin: '0 0 8px' }}>{r.note}</p>
                  <p style={{ color: '#aaa', fontSize: '12px', margin: 0 }}>
                    {new Date(r.created_at).toLocaleString('zh-TW')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 隱藏的 PDF 版面 */}
      <div style={{ position: 'fixed', left: '-9999px', top: 0, width: '794px' }}>
        {records.map((r, i) => (
          <div id={`pdf-card-${i}`} key={i} style={{
            background: 'white', padding: '40px', width: '794px',
            fontFamily: 'sans-serif', color: '#111'
          }}>
            <div style={{ borderBottom: '2px solid #2563eb', paddingBottom: '12px', marginBottom: '20px' }}>
              <h1 style={{ fontSize: '22px', margin: '0 0 4px', color: '#2563eb' }}>🔒 租安 RentSafe</h1>
              <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>入住記錄報告</p>
            </div>
            <h2 style={{ fontSize: '18px', margin: '0 0 16px', color: '#111' }}>{r.title}</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '8px 12px', background: '#f3f4f6', fontWeight: 'bold', width: '100px', fontSize: '13px' }}>房間位置</td>
                  <td style={{ padding: '8px 12px', border: '1px solid #e5e7eb', fontSize: '13px' }}>{r.room}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 12px', background: '#f3f4f6', fontWeight: 'bold', fontSize: '13px' }}>狀況描述</td>
                  <td style={{ padding: '8px 12px', border: '1px solid #e5e7eb', fontSize: '13px' }}>{r.note}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 12px', background: '#f3f4f6', fontWeight: 'bold', fontSize: '13px' }}>記錄時間</td>
                  <td style={{ padding: '8px 12px', border: '1px solid #e5e7eb', fontSize: '13px' }}>{new Date(r.created_at).toLocaleString('zh-TW')}</td>
                </tr>
              </tbody>
            </table>
            {r.image_url && (
              <img src={r.image_url} crossOrigin="anonymous" alt="現場照片"
                style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }} />
            )}
          </div>
        ))}
      </div>
    </main>
  )
}