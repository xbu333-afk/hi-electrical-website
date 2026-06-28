/**
 * Generates a stable 32-character hex hash from hardware/browser signals that
 * persist across incognito sessions and cookie/localStorage clearing.
 *
 * Signals collected:
 *   1. Canvas pixel rendering (GPU-dependent color output)
 *   2. WebGL vendor + renderer strings (GPU model)
 *   3. Screen resolution + color depth
 *   4. Device pixel ratio
 *   5. Timezone
 *   6. Browser language
 *   7. Platform identifier
 *   8. CPU core count
 *
 * Returns null if the browser blocks SubtleCrypto (should never happen in practice).
 */
export async function generateDeviceFingerprint(): Promise<string | null> {
  try {
    const signals: string[] = [];

    // 1. Canvas fingerprint — pixel-level rendering varies by GPU driver/OS
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 50;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.textBaseline = "top";
        ctx.font = "14px Arial";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = "#069";
        ctx.fillText("HiElec\u{1F50C}", 2, 15);
        ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
        ctx.fillText("HiElec\u{1F50C}", 4, 17);
        signals.push(canvas.toDataURL());
      }
    } catch {
      // Canvas blocked (e.g. Firefox privacy.resistFingerprinting) — skip signal
    }

    // 2. WebGL GPU vendor + renderer
    try {
      const glCanvas = document.createElement("canvas");
      const gl = glCanvas.getContext("webgl") as WebGLRenderingContext | null;
      if (gl) {
        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        if (ext) {
          signals.push(
            String(gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) ?? "")
          );
          signals.push(
            String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) ?? "")
          );
        }
      }
    } catch {
      // WebGL unavailable
    }

    // 3. Screen geometry + color depth
    signals.push(
      `${screen.width}x${screen.height}x${screen.colorDepth}`
    );

    // 4. Device pixel ratio
    signals.push(String(window.devicePixelRatio ?? 1));

    // 5. Timezone
    signals.push(Intl.DateTimeFormat().resolvedOptions().timeZone);

    // 6. Browser language
    signals.push(navigator.language ?? "");

    // 7. Platform (e.g. "Win32", "MacIntel", "Linux x86_64", "iPhone")
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    signals.push(navigator.platform ?? "");

    // 8. CPU logical core count
    signals.push(String(navigator.hardwareConcurrency ?? ""));

    // Hash all signals into a 32-char hex string (first 128 bits of SHA-256)
    const combined = signals.join("|");
    const encoded = new TextEncoder().encode(combined);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, 32);
  } catch {
    return null;
  }
}
