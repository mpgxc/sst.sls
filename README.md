```txt
+-----------------------------------------+
|                                         |
|      sls-ecommerce-stores-reports       |
|                                         |
+-----------------------------------------+
               |
               |
               v
+-----------------------------------------+
|     VPC - ScheduleReportProcessing      |
|       (us-east-1, NAT Managed)          |
|                                         |
|  +------------------------------------+ |
|  |                                    | |
|  |   Lambda Function                  | |
|  |   - Runtime: Node.js 20.x          | |
|  |   - Handler: src/schedule.handler  | |
|  |   - Environment:                   | |
|  |     BUCKET_NAME                    | |
|  |                                    | |
|  +------------------------------------+ |
|               |                         |
|               | (Link to Bucket)        |
|               v                         |
|  +------------------------------------+ |
|  |                                    | |
|  |    S3 Bucket                       | |
|  |    - ScheduleReportProcessing      | |
|  |                                    | |
|  +------------------------------------+ |
|                                         |
+-----------------------------------------+
               |
               |  (Job Execution)
               |
               v
+-----------------------------------------+
|                Cron Scheduler           |
| - Schedule: cron(0 0 ? * MON-FRI *)     |
| - Job: ScheduleReportProcessing         |
+-----------------------------------------+
```
