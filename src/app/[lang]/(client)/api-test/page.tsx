import { getApiUrl } from "@/lib/get-api-url";

async function testAPI() {
  const endpoints = [
    '/api/test',
    '/api/products',
    '/api/categories'
  ];

  const results = [];

  for (const endpoint of endpoints) {
    try {
      const url = getApiUrl(endpoint);
      console.log(`Testing ${url}...`);
      const res = await fetch(url);
      const text = await res.text();

      results.push({
        endpoint,
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        body: text.substring(0, 200)
      });
    } catch (error) {
      results.push({
        endpoint,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  return results;
}

export default async function APITestPage() {
  const results = await testAPI();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">API Test Results</h1>
      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={index} className="border p-4 rounded">
            <h2 className="font-bold">{result.endpoint}</h2>
            {result.error ? (
              <p className="text-red-500">Error: {result.error}</p>
            ) : (
              <>
                <p>Status: {result.status} {result.statusText}</p>
                <details>
                  <summary>Headers</summary>
                  <pre className="text-xs overflow-auto">{JSON.stringify(result.headers, null, 2)}</pre>
                </details>
                <details>
                  <summary>Body (first 200 chars)</summary>
                  <pre className="text-xs overflow-auto">{result.body}</pre>
                </details>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="font-bold mb-2">API URL for /api/test:</h2>
        <p>{getApiUrl('/api/test')}</p>
      </div>
    </div>
  );
}