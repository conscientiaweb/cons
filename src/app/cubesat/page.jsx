'use client'

import { useState, useMemo } from 'react'
import Hyperspeed from '../components/Hyperspeed'

export default function SingleCertificateGenerator() {
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [result, setResult] = useState(null)

  // ==========================================
  // CONFIGURATION: CHANGE THESE FOR EACH PAGE
  // ==========================================
  const CERTIFICATE_TITLE = 'Cubesat Certificate' 
  const CERTIFICATE_IMAGE_SRC = '/1.png' // Change this to '/2.png', '/3.png', or '/4.png' on your other pages
  // ==========================================

  const bgImageUrl = 'https://imgs.search.brave.com/KKb4y2i0yngGN6PEI3xbBevGanU4KSyfho_iEGHi298/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzcxLzYyLzI4/LzM2MF9GXzU3MTYy/Mjg4OF9yTXo1U1B2/aU9sTTBydzZvVm5Q/S3VnSTVLYkM4cU5L/bi5qcGc'

  const HYPERSPEED_OPTIONS = {
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 20,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 80,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [120, 160],
    movingCloserSpeed: [-160, -200],
    carLightsLength: [400 * 0.03, 400 * 0.2],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0xffffff,
      brokenLines: 0xffffff,
      leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
      rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
      sticks: 0x03b3c3,
    },
  }

  const hyperspeedEffectOptions = useMemo(() => HYPERSPEED_OPTIONS, [])

  const loadImage = (src) =>
    new Promise((res, rej) => {
      const img = new Image()
      img.src = src
      img.onload = () => res(img)
      img.onerror = rej
    })

  const generateCertificate = async () => {
    setStatus('')
    setResult(null)

    const trimmedName = name.trim()
    if (!trimmedName) {
      setStatus('Please enter a name')
      return
    }

    setStatus('Generating certificate...')

    try {
      const wkBase = await loadImage(CERTIFICATE_IMAGE_SRC)

      const canvas = document.createElement('canvas')
      canvas.width = wkBase.width
      canvas.height = wkBase.height
      const ctx = canvas.getContext('2d')

      ctx.drawImage(wkBase, 0, 0)

      // Exact mathematical positioning from original application layout
      const centerX = canvas.width / 2
      const centerY = canvas.height * 0.564

      // Layout styling elements matching original UI context
      ctx.font = `700 148px sans-serif`
      ctx.fillStyle = '#0b2447'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.lineWidth = 3
      ctx.strokeStyle = 'rgba(255,255,255,0.85)'
      ctx.shadowColor = 'rgba(0,0,0,0.25)'
      ctx.shadowBlur = 6
      ctx.strokeText(trimmedName, centerX, centerY)
      ctx.fillText(trimmedName, centerX, centerY)

      const dataUrl = canvas.toDataURL('image/png')
      const safeTitle = CERTIFICATE_TITLE.replace(/\s+/g, '_')
      const filename = `${trimmedName.replace(/\s+/g, '_')}_${safeTitle}.png`

      setResult({ dataUrl, filename })
      setStatus('Certificate generated successfully!')
    } catch (err) {
      setStatus('Error processing your certificate image source')
      console.error(err)
    }
  }

  const download = (dataUrl, filename) => {
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = filename
    a.click()
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0">
          <Hyperspeed effectOptions={hyperspeedEffectOptions} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#050505]/45 to-[#050505]" aria-hidden />
      </div>

      <div id="about" className="font-sans-header min-h-screen page-background flex justify-center items-start pt-16 pb-16 relative z-10">
        <div className="w-full max-w-7xl p-6 md:p-12 shadow-2xl rounded-lg">
          <div className="p-4 md:p-10 font-sans">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                
                {/* User Input UI Form Panel */}
                <div
                  className="relative p-8 md:p-12 text-white overflow-hidden"
                  style={{ backgroundImage: `url(${bgImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
                  <div className="relative z-10 space-y-6">
                    <h2 className="text-3xl font-bold text-white mb-4">{CERTIFICATE_TITLE}</h2>
                    
                    <div>
                      <label className="block text-sm font-semibold text-yellow-100 mb-2">Participant Name</label>
                      <input
                        className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-300 outline-none transition-all bg-white/95 text-gray-900 placeholder-gray-500 shadow font-medium text-lg"
                        placeholder="Type full name here..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        className={`w-full font-bold py-3 px-6 rounded-lg transition-colors shadow-lg text-center text-base uppercase tracking-wider ${name ? 'bg-amber-400 hover:bg-amber-500 text-black' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                        onClick={generateCertificate}
                        disabled={!name}
                      >
                        Create Certificate
                      </button>
                    </div>
                    {status && <p className="text-sm pt-1 text-yellow-100 italic">{status}</p>}
                  </div>
                </div>

                {/* Single Image Visual Result Preview Panel */}
                <div className="p-8 bg-gradient-to-tl from-gray-50 to-gray-100 flex flex-col items-center justify-start">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Certificate Preview</p>
                  <div className="w-full bg-white shadow-2xl rounded border border-gray-200 overflow-hidden p-6 flex flex-col items-center justify-center min-h-[300px]">
                    {!result ? (
                      <div className="aspect-[4/3] flex items-center justify-center text-gray-400 italic text-center p-6">
                        Provide a participant name on the left and click create to review the image layout here.
                      </div>
                    ) : (
                      <div className="w-full flex flex-col items-center bg-white">
                        <img src={result.dataUrl} alt="Certificate preview" className="max-w-[640px] w-full h-auto mb-4 rounded shadow-md transform transition-transform duration-300 hover:scale-105 cursor-pointer" />
                        <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-4 rounded text-sm flex items-center justify-center gap-2 shadow" onClick={() => download(result.dataUrl, result.filename)}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M12 3v10.586l3.293-3.293 1.414 1.414L12 17.414l-4.707-4.707 1.414-1.414L11 13.586V3h1z" />
                            <path d="M5 19h14v2H5z" />
                          </svg>
                          Download Document File
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
