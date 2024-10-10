/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: "sls-ecommerce-stores-reports",
			removal: input?.stage === "production" ? "retain" : "remove",
			home: "aws",
			providers: {
				aws: {
					region: "us-east-1",
					accessKey: process.env.AWS_ACCESS_KEY_ID,
					secretKey: process.env.AWS_SECRET_ACCESS_KEY,
				},
			},
		};
	},
	async run() {
		const vpc = new sst.aws.Vpc("ScheduleReportProcessing", {
			bastion: true,
			nat: "managed",
		});

		const bucket = new sst.aws.Bucket("ScheduleReportProcessing");

		const job = new sst.aws.Function("ScheduleReportProcessing", {
			vpc,
			runtime: "nodejs20.x",
			link: [bucket],
			handler: "src/schedule.handler",
			environment: {
				BUCKET_NAME: bucket.name,
			},
		});

		const schedule = new sst.aws.Cron("ScheduleReportProcessing", {
			schedule: "cron(0 0 ? * MON-FRI *)",
			job: job.arn,
		});

		return {
			job,
			bucket,
			schedule,
		};
	},
});
