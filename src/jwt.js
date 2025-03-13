import crypto from "crypto";

export async function generateJWT({ name, email, external_id }) {
  const app_id = process.env.MESSAGING_APP_ID;
  const secret = process.env.MESSAGING_SECRET;

  console.log("Variables disponibles dans le service :", {
    MESSAGING_APP_ID: app_id,
  });

  if (!app_id || !secret) {
    console.error("Erreur: Variables d'environnement manquantes");
    throw new Error(
      "Missing environment variables: MESSAGING_APP_ID or MESSAGING_SECRET"
    );
  }

  const key = await crypto.subtle.importKey(
    "raw",
    utf8ToUint8Array(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const header = JSON.stringify({
    alg: "HS256",
    typ: "JWT",
    kid: app_id,
  });

  const payload = JSON.stringify({
    scope: "user",
    name: name,
    email: email,
    exp: Math.floor(new Date().getTime() / 1000.0) + 86400,
    external_id: String(external_id),
    email_verified: true,
  });

  const partialToken = `${base64URLStringify(
    utf8ToUint8Array(header)
  )}.${base64URLStringify(utf8ToUint8Array(payload))}`;

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    utf8ToUint8Array(partialToken)
  );

  const finalToken = `${partialToken}.${base64URLStringify(
    new Uint8Array(signature)
  )}`;

  return finalToken;
}

function base64URLParse(s) {
  return new Uint8Array(
    Array.prototype.map.call(
      atob(s.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "")),
      (c) => c.charCodeAt(0)
    )
  );
}

function base64URLStringify(a) {
  return btoa(String.fromCharCode.apply(0, a))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function utf8ToUint8Array(s) {
  return base64URLParse(btoa(unescape(encodeURIComponent(s))));
}
