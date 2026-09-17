const fs = require("fs");
const path = "astro/src/data/projects.ts";
let s = fs.readFileSync(path, "utf8");
s = s.replace(/import \{[\s\S]*?\} from "lucide-react";\r?\n/, "");
s = s.replace(/\n\s*icon:\s*\w+,/g, "");
fs.writeFileSync(path, s);
console.log("projects cleaned");
