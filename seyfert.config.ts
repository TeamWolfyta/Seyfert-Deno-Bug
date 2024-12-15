import "dotenv/config";

import { config } from "seyfert";

export default config.bot({
  locations: {
    base: "src",
    output: "src",
    commands: "commands",
    components: "components",
  },
  token: Deno.env.get("DISCORD_TOKEN") as string,
});
