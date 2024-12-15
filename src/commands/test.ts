import {
  ActionRow,
  Command,
  type CommandContext,
  Declare,
  Modal,
  TextInput,
} from "seyfert";
import { TextInputStyle } from "seyfert/lib/types/index.js";

@Declare({
  name: "test",
  description: "A test command!",
})
export default class TestCommand extends Command {
  public override run(ctx: CommandContext) {
    const { logger } = ctx.client;

    logger.debug("Creating name input");
    const nameInput = new TextInput()
      .setCustomId("name")
      .setStyle(TextInputStyle.Short)
      .setLabel("Name");

    logger.debug("Creating first action row");
    const row1 = new ActionRow<TextInput>().setComponents([nameInput]);

    logger.debug("Creating age input");
    const ageInput = new TextInput()
      .setCustomId("age")
      .setStyle(TextInputStyle.Short)
      .setLabel("Age");

    logger.debug("Creating second action row");
    const row2 = new ActionRow<TextInput>().setComponents([ageInput]);

    logger.debug("Creating modal");
    const modal = new Modal()
      .setCustomId("mymodal")
      .setTitle("My Modal")
      .setComponents([row1, row2]);

    logger.debug("Showing modal to user");
    return ctx.interaction.modal(modal);
  }
}
