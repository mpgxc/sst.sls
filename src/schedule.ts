import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import axios from "axios";
import { Resource } from "sst";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
});

export const handler = async () => {
  try {
    const { data } = await axios.get("https://api.github.com/");

    const command = new PutObjectCommand({
      Key: "data.json",
      Body: JSON.stringify(data),
      Bucket: Resource.BucketScheduleReportProcessing.name,
    });

    await s3.send(command);

    console.log("Upload concluído com sucesso!");
  } catch (error) {
    console.error("Erro ao realizar o upload:", error);
  }
};
