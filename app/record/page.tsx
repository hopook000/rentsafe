'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function RecordPage() {
  const [title, setTitle] = useState('')
  const [room, setRoom] = useState('')
  const [note, setNote] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  async function handleSubmit() {
    setLoading(true)
    let image_url = null
    if (image) {
      const ext = image.name.split('.').pop()
      const fileName = `${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(fileName, image)
    if (uploadError) {
        console.error('上傳錯誤:', uploadError.message)
        alert('照片上傳失敗：' + uploadError.message)
    } else {
        const { data } = supabase.storage.from('photos').getPublicUrl(fileName)
        image_url = data.publicUrl
    }
    }
    const { error } = await supabase.from('records').insert({
      title, room, note, image_url, created_at: new Date().toISOString(),
    })
    setLoading(false)
    if (!error) setSuccess(true)
  }

  const inputStyle = {
    width: '100%', padding: '12px', border: '1px solid #e5e7eb',
    borderRadius: '8px', fontSize: '15px', background: 'white',
    boxSizing: 'border-box' as const, color: '#111'
  }

  return (
    <main style={{ fontFamily: 'sans-serif', background: '#f9fafb', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto', background: 'white', borderRadius: '16px', padding: '36px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        
        <a href="/" style={{ color: '#2563eb', fontSize: '14px', textDecoration: 'none' }}>← 回首頁</a>
        <h1 style={{ fontSize: '22px', fontWeight: 'bold', margin: '16px 0 4px', color: '#111' }}>新增入住記錄</h1>
        <p style={{ color: '#888', fontSize: '14px', marginBottom: '28px' }}>記錄房間現況，保護你的押金</p>

        {success ? (
          <div style={{ background: '#d1fae5', padding: '24px', borderRadius: '10px', color: '#065f46', textAlign: 'center', fontSize: '16px' }}>
            ✅ 記錄已儲存成功！
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px', color: '#111' }}>物件名稱</label>
              <input value={title} onChange={e => setTitle(e.target.value)}
                placeholder="例：台北信義區套房" style={inputStyle} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px', color: '#111' }}>房間位置</label>
              <input value={room} onChange={e => setRoom(e.target.value)}
                placeholder="例：主臥室、廁所、客廳" style={inputStyle} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px' , color: '#111'}}>狀況描述</label>
              <textarea value={note} onChange={e => setNote(e.target.value)}
                placeholder="例：牆壁左下角有缺口，約 2cm" rows={3}
                style={{ ...inputStyle, resize: 'vertical', color: '#111' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#111' }}>照片</label>
              
              {preview ? (
                <div style={{ position: 'relative' }}>
                  <img src={preview} alt="預覽"
                    style={{ width: '100%', borderRadius: '10px', maxHeight: '240px', objectFit: 'cover' }} />
                  <button onClick={() => { setImage(null); setPreview(null) }}
                    style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', fontSize: '14px' }}>
                    ✕
                  </button>
                </div>
              ) : (
                <label style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  border: '2px dashed #d1d5db', borderRadius: '10px', padding: '32px', cursor: 'pointer',
                  color: '#9ca3af', fontSize: '14px', gap: '8px'
                }}>
                  <span style={{ fontSize: '32px' }}>📷</span>
                  <span>點擊上傳照片</span>
                  <span style={{ fontSize: '12px' }}>支援 JPG、PNG</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                </label>
              )}
            </div>

            <button onClick={handleSubmit} disabled={loading}
              style={{
                background: loading ? '#93c5fd' : '#2563eb', color: 'white', border: 'none',
                padding: '14px', borderRadius: '10px', fontSize: '16px',
                cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold', marginTop: '4px'
              }}>
              {loading ? '儲存中...' : '儲存記錄 →'}
            </button>

          </div>
        )}
      </div>
    </main>
  )
}