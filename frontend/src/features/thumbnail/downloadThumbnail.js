const FONT_STACK =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

function wrapText(ctx, text, maxWidth) {
    const words = text.split(/\s+/);
    const lines = [];
    let line = "";
    for (const word of words) {
        const test = line ? line + " " + word : word;
        if (ctx.measureText(test).width > maxWidth && line) {
            lines.push(line);
            line = word;
        } else {
            line = test;
        }
    }
    if (line) lines.push(line);
    return lines;
}

/**
 * Renders the thumbnail to a 1280×720 canvas and triggers a PNG download.
 */
export function downloadThumbnail(thumb, preset) {
    const W = 1280;
    const H = 720;
    const pad = 60;

    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    // Background gradient (135deg = top-left to bottom-right)
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, preset.from);
    bg.addColorStop(1, preset.to);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const align = thumb.align;
    const anchorX =
        align === "left" ? pad :
        align === "right" ? W - pad : W / 2;

    ctx.textAlign = align;
    ctx.fillStyle = thumb.textColor;

    const titleFont = `900 96px ${FONT_STACK}`;
    const subFont   = `600 36px ${FONT_STACK}`;
    const emojiFont = "80px sans-serif";
    const maxTextWidth = W - pad * 2;

    ctx.font = titleFont;
    const titleLines = wrapText(ctx, thumb.title || "", maxTextWidth);
    const titleLineHeight = 104;
    const titleBlockH = titleLines.length * titleLineHeight;

    const emojiH = thumb.emoji ? 96 : 0;
    const subH   = thumb.subtitle ? 48 : 0;
    const gap = 16;

    const totalH =
        emojiH +
        (thumb.emoji ? gap : 0) +
        titleBlockH +
        (thumb.subtitle ? gap + subH : 0);

    let y = (H - totalH) / 2;

    ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
    ctx.shadowBlur = 16;
    ctx.shadowOffsetY = 3;

    if (thumb.emoji) {
        ctx.font = emojiFont;
        ctx.textBaseline = "top";
        ctx.fillText(thumb.emoji, anchorX, y);
        y += emojiH + gap;
    }

    ctx.font = titleFont;
    ctx.textBaseline = "top";
    ctx.fillStyle = thumb.textColor;
    for (const line of titleLines) {
        ctx.fillText(line, anchorX, y);
        y += titleLineHeight;
    }

    if (thumb.subtitle) {
        y += gap - (titleLineHeight - 96);
        ctx.font = subFont;
        ctx.globalAlpha = 0.9;
        ctx.fillText(thumb.subtitle, anchorX, y);
        ctx.globalAlpha = 1;
    }

    // Badge (top-right, drawn last so it sits on top, no shadow)
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    if (thumb.badge) {
        ctx.font = `bold 28px ${FONT_STACK}`;
        const padX = 20;
        const padY = 12;
        const tw = ctx.measureText(thumb.badge).width;
        const bw = tw + padX * 2;
        const bh = 28 + padY * 2;
        const bx = W - bw - 40;
        const by = 40;

        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(bx, by, bw, bh, 10);
        } else {
            ctx.rect(bx, by, bw, bh);
        }
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(thumb.badge, bx + bw / 2, by + bh / 2 + 1);
    }

    const link = document.createElement("a");
    link.download = `thumbnail-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
}
