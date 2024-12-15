import { ModalCommand, type ModalContext } from "seyfert";

export default class TestModal extends ModalCommand {
  public override filter(context: ModalContext) {
    return context.customId === "mymodal";
  }

  public override async run(context: ModalContext) {
    const {
      client: { logger },
      interaction,
    } = context;

    logger.debug("Starting modal processing");

    const name = interaction.getInputValue("name", true);
    logger.debug(`Received name: ${name}`);

    const age = interaction.getInputValue("age", true);
    logger.debug(`Received age: ${age}`);

    logger.debug("Preparing response");
    await context
      .write({
        content: `You are ${name} and you have ${age} years`,
      })
      .catch((error: Error) => {
        logger.error("Failed to send response", error.message);
      });

    logger.info("Important functions from ModalSubmitInteraction are missing.");
    logger.debug("interaction.deferReply", context.interaction.deferReply);
    logger.debug("interaction.reply", context.interaction.reply);

    logger.info(
      "Other important functions from ModalSubmitInteraction are NOT missing.",
    );
    logger.debug("interaction.editOrReply", context.interaction.editOrReply);
    logger.debug("interaction.write", context.interaction.write);
  }
}
