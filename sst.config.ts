/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: "app-notifications",
			removal: input?.stage === "production" ? "retain" : "remove",
			home: "aws",
		};
	},
	async run() {
		const topic = new aws.sns.Topic("app-notifications-topic", {
			name: "app-notifications-topic",
			displayName: "App Notifications Topic",
		});

		const lambda = new sst.aws.Function("app-notifications-lambda", {
			name: "app-notifications-lambda",
			runtime: "nodejs20.x",
			handler: "src/handler.handler",
		});

		sst.aws.SnsTopic.subscribe(topic.arn, lambda.arn);

		return {
			topic,
			lambda,
		};
	},
});
