import axios from "axios";

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

async function main() {
  console.log("Running pagination consistency test...");

  // 1) Fetch page 1
  const page1Res = await axios.get(`${BASE_URL}/api/products`, {
    params: { limit: 20 }
  });

  const page1 = page1Res.data;
  const page1Ids = new Set(page1.data.map((item) => item.id));
  const snapshot = page1.pagination.snapshot;
  const nextCursor = page1.pagination.nextCursor;

  console.log("Fetched page 1");

  // 2) Simulate 50 changes
  await axios.post(`${BASE_URL}/api/dev/simulate-changes`, null, {
    params: {
      insertCount: 25,
      updateCount: 25
    }
  });

  console.log("Simulated 50 product changes");

  // 3) Fetch page 2 using SAME snapshot
  const page2Res = await axios.get(`${BASE_URL}/api/products`, {
    params: {
      limit: 20,
      cursor: nextCursor,
      snapshot
    }
  });

  const page2 = page2Res.data;
  const page2Ids = page2.data.map((item) => item.id);

  // 4) Check duplicates
  const duplicates = page2Ids.filter((id) => page1Ids.has(id));

  if (duplicates.length > 0) {
    console.error("Duplicate products found across page 1 and page 2:", duplicates);
    process.exit(1);
  }

  console.log("No duplicates found between page 1 and page 2");
  console.log("Snapshot used:", snapshot);
  console.log("Next cursor used:", nextCursor);
  console.log("Page 1 IDs:", [...page1Ids].slice(0, 5), "...");
  console.log("Page 2 IDs:", page2Ids.slice(0, 5), "...");
}

main().catch((error) => {
  console.error("Test failed:", error.response?.data || error.message);
  process.exit(1);
});