import type { SNSEvent, SNSHandler } from "aws-lambda";
import axios from "axios";

export const handler: SNSHandler = async (event: SNSEvent): Promise<void> => {
	for (const message of event.Records) {
		console.log("Mensagem recebida:", message.Sns.Message);
	}

	try {
		const payload = {
			title: "Upload de arquivos",
			message: "Upload de arquivos concluído com sucesso!",
			details: new Error("Erro ao realizar o upload"),
			time: new Date().toISOString(),
		};

		const { status } = await axios.post(
			"https://wailing-translator-27.webhook.cool",
			payload,
		);

		if (status !== 200) throw new Error("Erro ao realizar o upload");

		console.log("Upload concluído com sucesso!");
	} catch (error) {
		console.error("Erro ao realizar o upload:", error);
	}
};
