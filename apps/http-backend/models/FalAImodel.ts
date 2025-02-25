import { BaseModel } from "./BaseModel.js";
import { fal } from "@fal-ai/client";

fal.config({
  credentials: process.env.FAL_KEY,
});

export class FalAIModel extends BaseModel {
  constructor() {
    super();
  }

  public async genearateImage(prompt: string, tensorPath: string) {
    const { request_id, response_url } = await fal.queue.submit(
      "fal-ai/flux-lora",
      {
        input: {
          prompt:
            'Extreme close-up of a single tiger eye, direct frontal view. Detailed iris and pupil. Sharp focus on eye texture and color. Natural lighting to capture authentic eye shine and depth. The word "FLUX" is painted over it in big, white brush strokes with visible texture.',
        },
        webhookUrl:`${process.env.WEBHOOK_BASE_URL}/fal-ai/generate`,
      }
    );
    return { request_id, response_url };
  }

    //@ts-ignore
  public async trainModel(zipUrl: string, triggerWord: string) {

    // WebHooks used for better ASYNCHRONOUS calls
    const { request_id, response_url } = await fal.queue.submit(
      "fal-ai/flux-lora-fast-training",
      {
        input: {
          images_data_url: zipUrl,
          trigger_word: triggerWord,
        },
        webhookUrl: `${process.env.WEBHOOK_BASE_URL}/fal-ai/train`,
        // Fal-AI connects to this webhook and sends response automatcally from fal-ai when event occur lik webHook
        // WebHook send requestid or imageid when work gets done and it is used to update status
      }
    );

    return { request_id,response_url };
  }
}
