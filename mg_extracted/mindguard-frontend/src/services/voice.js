// MindGuard voice helper: prefers a clear, lower-pitched English male voice when the
// browser has one installed. Voice availability and quality depend on the user's OS/browser.
export function canSpeak() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window
}

function chooseMindGuardVoice(voices) {
  if (!voices?.length) return null

  const english = voices.filter((voice) => /^en([_-]|$)/i.test(voice.lang || ''))
  const candidates = english.length ? english : voices
  const score = (voice) => {
    const name = (voice.name || '').toLowerCase()
    const lang = (voice.lang || '').toLowerCase()
    let points = 0

    // Prefer voices explicitly identified as male, then familiar lower-register voices.
    if (/\bmale\b|\bman\b/.test(name)) points += 100
    if (/david|guy|mark|george|ryan|james|daniel|thomas|alex|fred|aaron|oliver|arthur|ravi|prabhat|matthew|andrew|christopher/.test(name)) points += 35
    if (/female|woman|zira|samantha|victoria|karen|susan|hazel|aria|jenny|sonia|natasha|heera|veena/.test(name)) points -= 80
    if (/en-in/.test(lang)) points += 12
    else if (/en-gb/.test(lang)) points += 10
    else if (/en-us/.test(lang)) points += 8
    if (/natural|online|neural/.test(name)) points += 5
    if (voice.default) points += 2
    return points
  }

  return [...candidates].sort((a, b) => score(b) - score(a))[0] || null
}

function cleanSpeechText(text) {
  return String(text)
    .replace(/```[\s\S]*?```/g, ' Code example omitted. ')
    .replace(/https?:\/\/\S+/g, ' link ')
    .replace(/[|*_#`~]/g, ' ')
    .replace(/\$\$([\s\S]*?)\$\$/g, '$1')
    .replace(/\$([^$]+)\$/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

export function speakMindGuard(text) {
  if (!canSpeak() || !text) return false

  try {
    const synthesis = window.speechSynthesis
    synthesis.cancel()
    const clean = cleanSpeechText(text)
    if (!clean) return false

    const utterance = new SpeechSynthesisUtterance(clean.slice(0, 4500))
    utterance.lang = 'en-IN'
    // A calm, medium-paced, lower-register delivery; pitch cannot change a voice's actual gender.
    utterance.rate = 0.93
    utterance.pitch = 0.84
    utterance.volume = 1

    const voice = chooseMindGuardVoice(synthesis.getVoices())
    if (voice) {
      utterance.voice = voice
      utterance.lang = voice.lang || 'en-IN'
    }

    synthesis.speak(utterance)
    return true
  } catch (error) {
    console.warn('MindGuard voice unavailable; text chat remains active.', error)
    return false
  }
}

export function stopMindGuardSpeech() {
  if (canSpeak()) window.speechSynthesis.cancel()
}
