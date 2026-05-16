const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function hasSupabaseConfig() {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseServiceRoleKey);
}

function assertValue(value: string | undefined, name: string) {
  if (!value) {
    throw new Error(`Missing ${name}`);
  }
  return value;
}

export function getSupabaseConfig() {
  return {
    url: assertValue(supabaseUrl, "NEXT_PUBLIC_SUPABASE_URL"),
    anonKey: assertValue(supabaseAnonKey, "NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    serviceRoleKey: assertValue(supabaseServiceRoleKey, "SUPABASE_SERVICE_ROLE_KEY"),
  };
}

export async function supabaseFetch<T>(
  path: string,
  init: RequestInit = {},
  useServiceRole = false,
) {
  const config = getSupabaseConfig();
  const apiKey = useServiceRole ? config.serviceRoleKey : config.anonKey;
  const response = await fetch(`${config.url}${path}`, {
    ...init,
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Supabase request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}
