/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
import "sst"
export {}
declare module "sst" {
  export interface Resource {
    "BucketScheduleReportProcessing": {
      "name": string
      "type": "sst.aws.Bucket"
    }
    "LambdaScheduleReportProcessing": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "VPCScheduleReportProcessing": {
      "bastion": string
      "type": "sst.aws.Vpc"
    }
  }
}
