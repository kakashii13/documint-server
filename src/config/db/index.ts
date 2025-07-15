import { seedAdmin } from "./seedAdmin";
import { seedRole } from "./seedRole";

seedAdmin().catch((err) => {
  console.error("❌ Seed admin failed:", err);
  process.exit(1);
});

seedRole().catch((err) => {
  console.error("❌ Seed role failed:", err);
  process.exit(1);
});
