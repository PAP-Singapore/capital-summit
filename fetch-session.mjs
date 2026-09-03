/**
 * fetch-sessions.mjs
 * Run once: node fetch-sessions.mjs
 * Outputs: src/data/sessions.ts
 *
 * Requirements: Node 18+ (native fetch built-in)
 */

// ─── CONFIG ────────────────────────────────────────────────────────────────────
const API_KEY = process.env.YOUTUBE_API_KEY;   // set YOUTUBE_API_KEY in your environment before running
const OUTPUT_PATH = "./src/data/sessions.ts";

// One entry per event. Sessions are emitted in this order (newest first).
// `city` is the display name; the archive maps it to a URL slug
// ("NEW YORK CITY" -> ?city=nyc, "CANNES" -> ?city=cannes).
const EVENTS = [
  {
    playlistId: "PLdLBAkDIO8CKZq7EG6zLeBTAaDP_fylzj",
    year: 2026,
    city: "NEW YORK CITY",
  },
  {
    playlistId: "PLdLBAkDIO8CLySxG3VHkobxxRKcHGpSwQ",
    year: 2026,
    city: "CANNES",
  },
  {
    playlistId: "PLdLBAkDIO8CIcc3lnxxdOkwRB4Tfh6PSm",
    year: 2025,
    city: "BUENOS AIRES",
  },
  {
    playlistId: "PLdLBAkDIO8CL0VzMnfSXRWKrwveul0qtY",
    year: 2025,
    city: "CANNES",
  },
  {
    playlistId: "PLdLBAkDIO8CK0lYJv9HyEvjEaLUmiCP56",
    year: 2025,
    city: "DENVER",
  },
  {
    playlistId: "PLdLBAkDIO8CJpmhpKuJ1ynNUj2XJQs2YY",
    year: 2024,
    city: "BANGKOK",
  },
  {
    playlistId: "PLdLBAkDIO8CK3ZuDP9mK08Uoqb9FIF6Oi",
    year: 2024,
    city: "CANNES",
  },
  {
    playlistId: "PLdLBAkDIO8CI0UiE4XIjaD_1rk3TSwz0j",
    year: 2024,
    city: "CANNES",
  },
  {
    playlistId: "PLdLBAkDIO8CKSR6hfO-_jOj1yK1Ga9auE",
    year: 2024,
    city: "CANNES",
  },
  {
    playlistId: "PLdLBAkDIO8CKmVaO5qk_jvMTg71-qmlAV",
    year: 2024,
    city: "DENVER",
  },
  {
    playlistId: "PLdLBAkDIO8CLmAjAt8Btn8dLh1DOEdu7K",
    year: 2023,
    city: "ISTANBUL",
  },
  {
    playlistId: "PLdLBAkDIO8CJ2N_42iYeUoTfepx_ox5jQ",
    year: 2023,
    city: "CANNES",
  },
  {
    playlistId: "PLdLBAkDIO8CLWsWnkDcZWCUgx4jEnnW4i",
    year: 2023,
    city: "CANNES",
  },
  {
    playlistId: "PLdLBAkDIO8CJbHiuLbZL4CO4NQjqDnSz0",
    year: 2023,
    city: "CANNES",
  },
];
// ───────────────────────────────────────────────────────────────────────────────

import fs from "fs";

// ── 1. Fetch all playlist items (handles pagination) ──────────────────────────
async function fetchAllPlaylistItems(playlistId, apiKey) {
  const items = [];
  let pageToken = "";

  do {
    const url =
      `https://www.googleapis.com/youtube/v3/playlistItems` +
      `?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}` +
      (pageToken ? `&pageToken=${pageToken}` : "");

    const res = await fetch(url);
    if (!res.ok) {
      const err = await res.json();
      throw new Error(`YouTube API error: ${JSON.stringify(err.error)}`);
    }
    const data = await res.json();
    items.push(...data.items);
    pageToken = data.nextPageToken || "";
  } while (pageToken);

  return items;
}

function cleanName(name) {
  return name
    .replace(/^and\s+/i, '') // remove "and " at the start
    .replace(/\s*\(Moderator\)\s*/i, ' (Moderator)') // normalize moderator label
    .trim();
}

// ── 2. Parse description ──────────────────────────────────────────────────────
function parseFeaturing(description) {
  let speakers = [];

  // Format 1: "Featuring: Name1, Name2, and Name3"
  const featMatch = description.match(/Featuring:\s*(.+?)(?:\n\n|Judged by|\n(?=[A-Z]))/s);
  if (featMatch) {
    speakers = featMatch[1]
      .split(/,(?![^(]*\))| and /) // split on commas not in parens, or " and "
      .map((s) => s.replace(/\n/g, " ").trim())
      .filter(Boolean);
  }

  // Format 2: "In this [panel/keynote/...], Name1 (Org1), Name2 (Org2), and Name3 (Org3) examine/talk/discuss..."
  if (speakers.length === 0) {
    const introMatch = description.match(/In this (?:panel|keynote|talk|fireside|discussion|session|presentation),\s*([\s\S]+?)\s*(?:explore|examine|talk|discuss|present|address|take|give|look|share|break|witness)s?\b/i);
    if (introMatch) {
      speakers = introMatch[1]
        .split(/,(?![^(]*\))| and /)
        .map((s) => s.replace(/\n/g, " ").trim())
        .filter(Boolean);
    }
  }

  // Format 3: "Name, Title of Org, presents..."
  if (speakers.length === 0) {
    const pitchMatch1 = description.match(/^([^,]+),\s*[^,]+\s+of\s+([^,]+?),\s+(?:presents|introduces|shares)/i);
    if (pitchMatch1) {
      speakers = [`${pitchMatch1[1].trim()} (${pitchMatch1[2].trim()})`];
    }
  }

  // Format 4: "Name from Org presents..." or "In this session, Name from Org presents..."
  if (speakers.length === 0) {
    const pitchMatch2 = description.match(/(?:In this session,\s+)?([^,\s]+)\s+from\s+([^,\s]+)\s+(?:presents|introduces|shares)/i);
    if (pitchMatch2) {
      speakers = [`${pitchMatch2[1].trim()} (${pitchMatch2[2].trim()})`];
    }
  }

  return speakers.map(cleanName);
}

function parseJudges(description) {
  const judgeMatch = description.match(/Judged by\s*(.+?)(?:\n\n|\n(?=[A-Z])|$)/s);
  if (!judgeMatch) return [];

  return judgeMatch[1]
    .split(/,(?![^(]*\))| and /)
    .map((s) => s.replace(/\n/g, " ").trim())
    .filter(Boolean)
    .map(name => `${cleanName(name)} [Judge]`);
}

// ── 3. Guess session type from title + description ────────────────────────────
function guessType(title, description) {
  const text = (title + " " + description).toLowerCase();

  if (/keynote|opening|closing|fireside/i.test(text)) return "KEYNOTE";
  if (/panel|discussion|debate/i.test(text)) return "PANEL";
  if (/workshop|hands-on|tutorial|lab\b/i.test(text)) return "WORKSHOP";
  // "pitch" sessions → PANEL (multiple presenters + judges)
  if (/pitch/i.test(text)) return "PANEL";
  return "TALK";
}

// ── 4. Guess topic from title ─────────────────────────────────────────────────
const TOPIC_RULES = [
  [/stablecoin|peg|collateral|usdc|usdt|dai/i, "Stablecoins"],
  [/defi|liquidity|amm|yield|lending|curve|aave|liquity|morpho/i, "DeFi & Liquidity"],
  [/regulat|compliance|legal|policy|sec\b|law|mica/i, "Enterprise & Regulation"],
  [/layer.?2|rollup|scaling|l2\b|zk\b|optimism|arbitrum|starknet/i, "Web3 Infrastructure"],
  [/ai\b|agent|llm|machine learn/i, "AI & Automation"],
  [/nft|digital owner|token standard/i, "NFTs & Digital Ownership"],
  [/tokenomic|token design|token economy/i, "Tokenomics"],
  [/pitch|early.?stage|\$0\s*tvl/i, "Pitch & Early Stage"],
  [/privacy|zk.proof|zero.knowledge|stealth/i, "Privacy & ZK"],
  [/chain|interop|bridge|cross.chain|messaging|multichain/i, "Cross-chain & Interop"],
  [/institutional|bank|corporate|enterprise|ledger|asset/i, "Institutional Finance"],
  [/macro|economy|market|finance/i, "Market Dynamics"],
];

function guessTopic(title) {
  for (const [regex, topic] of TOPIC_RULES) {
    if (regex.test(title)) return topic;
  }
  return "General"; // Fallback topic instead of empty string
}

// ── 5. Build Session object ───────────────────────────────────────────────────
function buildSession(item, id, event) {
  const snippet = item.snippet;
  const title = snippet.title.trim();
  const description = snippet.description || "";
  const videoId = snippet.resourceId?.videoId || "";

  const featuring = parseFeaturing(description);
  const judges = parseJudges(description);
  const speakers = [...featuring, ...judges];

  // Pick the best available thumbnail
  const thumbnails = snippet.thumbnails || {};
  const bestThumbnail =
    thumbnails.maxres?.url ||
    thumbnails.standard?.url ||
    thumbnails.high?.url ||
    thumbnails.medium?.url ||
    thumbnails.default?.url;

  return {
    id: String(id),
    year: event.year,
    city: event.city,
    type: guessType(title, description),
    topic: guessTopic(title),
    title,
    speakers: speakers.length ? speakers : ["TBA"],
    thumbnail: bestThumbnail,
    youtubeId: videoId || undefined,
  };
}

// ── 6. Generate TypeScript file ───────────────────────────────────────────────
function generateTs(sessions) {
  const sessionsJson = JSON.stringify(sessions, null, 2);

  return `// Auto-generated by fetch-sessions.mjs — do not edit manually
// Re-run the script to refresh from YouTube

import { Session } from "../types/session";

export const MOCK_SESSIONS: Session[] = ${sessionsJson};
`;
}

// ── Main ──────────────────────────────────────────────────────────────────────
(async () => {
  if (!API_KEY) {
    console.error("❌ Please set the YOUTUBE_API_KEY environment variable first.");
    process.exit(1);
  }

  const sessions = [];

  for (const event of EVENTS) {
    console.log(`📡 Fetching ${event.city} playlist:`, event.playlistId);
    const items = await fetchAllPlaylistItems(event.playlistId, API_KEY);
    console.log(`✅ Found ${items.length} videos for ${event.city}`);

    for (const item of items) {
      sessions.push(buildSession(item, sessions.length + 1, event));
    }
  }

  // Print a preview
  console.log("\n── Preview (first 3) ──────────────────────────────");
  sessions.slice(0, 3).forEach((s) => {
    console.log(`\n[${s.city}] [${s.type}] ${s.title}`);
    console.log(`  Topic:    ${s.topic || "(blank — fill manually)"}`);
    console.log(`  Speakers: ${s.speakers.join(", ")}`);
  });

  const ts = generateTs(sessions);
  fs.writeFileSync(OUTPUT_PATH, ts, "utf8");
  console.log(`\n✅ Wrote ${sessions.length} sessions to ${OUTPUT_PATH}`);
  console.log("   Review & tweak any blank 'topic' or wrong 'type' fields, then commit!\n");
})();
