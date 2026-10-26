/**
 * Extra device identifiers for anti-fraud (client side).
 *
 * 1. Visitor-ID backup in IndexedDB — restores the ID if only cookies were
 *    cleared. (Clearing *all* site data or incognito wipes it too — by design,
 *    we don't use "un-deletable" tricks.)
 * 2. device_fingerprint_v2 — richer hash (adds audio rendering, installed
 *    fonts, memory, touch points, colour gamut…). Fewer collisions on Android
 *    and desktop. Not trusted alone on iPhones.
 * 3. device_hint — "lite" hash of signals that browsers do NOT randomise in
 *    private mode (screen, DPR, timezone, language, platform, cores, touch
 *    points, GPU string). Same hint + same IP within an hour ≈ same phone,
 *    e.g. someone who switches to an incognito tab to click again — works on
 *    iPhones too.
 */

const IDB_NAME = "hi_elec";
const IDB_STORE = "kv";
const IDB_TIMEOUT_MS = 600;

function withTimeout<T>(p: Promise<T>, ms: number, fallback: T): Promise<T> {
  return new Promise((resolve) => {
    const t = setTimeout(() => resolve(fallback), ms);
    p.then(
      (v) => {
        clearTimeout(t);
        resolve(v);
      },
      () => {
        clearTimeout(t);
        resolve(fallback);
      }
    );
  });
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") return reject(new Error("no idb"));
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(IDB_STORE)) {
        req.result.createObjectStore(IDB_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export function idbGet(key: string): Promise<string | null> {
  const run = openDb().then(
    (db) =>
      new Promise<string | null>((resolve) => {
        try {
          const tx = db.transaction(IDB_STORE, "readonly");
          const req = tx.objectStore(IDB_STORE).get(key);
          req.onsuccess = () =>
            resolve(typeof req.result === "string" ? req.result : null);
          req.onerror = () => resolve(null);
          tx.oncomplete = () => db.close();
        } catch {
          resolve(null);
        }
      })
  );
  return withTimeout(run, IDB_TIMEOUT_MS, null);
}

export function idbSet(key: string, value: string): Promise<void> {
  const run = openDb().then(
    (db) =>
      new Promise<void>((resolve) => {
        try {
          const tx = db.transaction(IDB_STORE, "readwrite");
          tx.objectStore(IDB_STORE).put(value, key);
          tx.oncomplete = () => {
            db.close();
            resolve();
          };
          tx.onerror = () => resolve();
        } catch {
          resolve();
        }
      })
  );
  return withTimeout(run, IDB_TIMEOUT_MS, undefined);
}

async function sha256Hex32(input: string): Promise<string | null> {
  try {
    const buf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(input)
    );
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, 32);
  } catch {
    return null;
  }
}

function gpuString(): string {
  try {
    const gl = document
      .createElement("canvas")
      .getContext("webgl") as WebGLRenderingContext | null;
    if (!gl) return "";
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const vendor = ext ? gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) : "";
    const renderer = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "";
    const maxTex = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    return `${vendor}|${renderer}|${maxTex}`;
  } catch {
    return "";
  }
}

/** Signals browsers keep stable in private/incognito mode. */
function liteSignals(): string[] {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return [
    `${screen.width}x${screen.height}x${screen.colorDepth}`,
    String(window.devicePixelRatio ?? 1),
    Intl.DateTimeFormat().resolvedOptions().timeZone ?? "",
    navigator.language ?? "",
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    navigator.platform ?? "",
    String(navigator.hardwareConcurrency ?? ""),
    String(navigator.maxTouchPoints ?? ""),
    String(nav.deviceMemory ?? ""),
    gpuString(),
  ];
}

function colorGamut(): string {
  try {
    for (const g of ["rec2020", "p3", "srgb"]) {
      if (window.matchMedia(`(color-gamut: ${g})`).matches) return g;
    }
  } catch {
    /* ignore */
  }
  return "";
}

const FONT_PROBES = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier New",
  "Verdana",
  "Georgia",
  "Tahoma",
  "Segoe UI",
  "Roboto",
  "Noto Sans Hebrew",
  "David",
  "Miriam",
  "Narkisim",
  "Arial Hebrew",
  "Calibri",
  "Cambria",
  "SF Pro Text",
  "Samsung Sans",
  "Ubuntu",
  "Comic Sans MS",
];

function installedFonts(): string {
  try {
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return "";
    const text = "mmmmmmmmlliWW אבגד 1234";
    const base: Record<string, number> = {};
    for (const b of ["monospace", "serif", "sans-serif"]) {
      ctx.font = `32px ${b}`;
      base[b] = ctx.measureText(text).width;
    }
    return FONT_PROBES.filter((f) =>
      ["monospace", "serif", "sans-serif"].some((b) => {
        ctx.font = `32px "${f}", ${b}`;
        return ctx.measureText(text).width !== base[b];
      })
    ).join(",");
  } catch {
    return "";
  }
}

async function audioSignal(): Promise<string> {
  try {
    const Ctx =
      (window as unknown as { OfflineAudioContext?: typeof OfflineAudioContext })
        .OfflineAudioContext ??
      (window as unknown as { webkitOfflineAudioContext?: typeof OfflineAudioContext })
        .webkitOfflineAudioContext;
    if (!Ctx) return "";
    const ctx = new Ctx(1, 5000, 44100);
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = 10000;
    const comp = ctx.createDynamicsCompressor();
    osc.connect(comp);
    comp.connect(ctx.destination);
    osc.start(0);
    const buf = await withTimeout(ctx.startRendering(), 500, null);
    if (!buf) return "";
    const data = buf.getChannelData(0);
    let sum = 0;
    for (let i = 4500; i < 5000; i++) sum += Math.abs(data[i]);
    return sum.toFixed(6);
  } catch {
    return "";
  }
}

function canvasSignal(): string {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 220;
    canvas.height = 60;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    ctx.textBaseline = "alphabetic";
    ctx.font = "16px Arial";
    ctx.fillStyle = "#f60";
    ctx.fillRect(100, 5, 80, 25);
    ctx.fillStyle = "#069";
    ctx.fillText("ח.י HiElec \u{26A1}", 4, 30);
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = "rgba(255,0,255,0.6)";
    ctx.beginPath();
    ctx.arc(60, 30, 25, 0, Math.PI * 2);
    ctx.fill();
    return canvas.toDataURL();
  } catch {
    return "";
  }
}

export interface ExtraDeviceSignals {
  device_fingerprint_v2: string | null;
  device_hint: string | null;
}

/** Never throws; resolves within ~1s even on slow devices. */
export async function collectExtraDeviceSignals(): Promise<ExtraDeviceSignals> {
  try {
    const lite = liteSignals();
    const [hint, audio] = await Promise.all([
      sha256Hex32(lite.join("|")),
      audioSignal(),
    ]);
    const rich = [
      ...lite,
      `${screen.availWidth}x${screen.availHeight}`,
      colorGamut(),
      installedFonts(),
      canvasSignal(),
      audio,
      Intl.NumberFormat().resolvedOptions().numberingSystem ?? "",
    ];
    const v2 = await sha256Hex32(rich.join("|"));
    return { device_fingerprint_v2: v2, device_hint: hint };
  } catch {
    return { device_fingerprint_v2: null, device_hint: null };
  }
}
