import "dotenv/config";

import { Client, EntryPointCommand, type ParseClient } from "seyfert";

const client = new Client();
const development_guild_id = Deno.env.get("DISCORD_DEVELOPMENT_GUILD_ID");

if (client.commands) {
  client.commands.onCommand = (instance) => {
    const command = new instance();
    if (!(command instanceof EntryPointCommand) && development_guild_id)
      command.guildId = [development_guild_id];
    return command;
  };
  client.commands.onSubCommand = (instance) => new instance();
}

client
  .start()
  .then(() => client.uploadCommands({ cachePath: "./commands.json" }));

declare module "seyfert" {
  interface UsingClient extends ParseClient<Client<true>> {}
}
