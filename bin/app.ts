#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {EC2Stack} from "../lib/ec2-stack";
import {
    ASK_GPT_VPC,
    AWS_DEFAULT_REGION,
    EC2_DEPLOYMENT_INSTANCE, EC2_DEPLOYMENT_INSTANCE_EIP,
    FREE_TIER, UBUNTU_64_X86_AMI
} from "../utils/constants";

const app = new cdk.App();

/**
 * Deploy this stack from local first. Once it goes to EC2, then deploy remaining stacks
 * EC2 Instance for deployment, this acts as your dev desktop
 */
// Create Deployment Stack
// Create a key pair first using the following -
// aws ec2 create-key-pair --region us-east-1 --key-name EC2DeploymentInstanceKeyPair --query 'KeyMaterial' --output text > EC2DeploymentInstanceKeyPair.pem
new EC2Stack(app, EC2_DEPLOYMENT_INSTANCE, {
    instanceType: FREE_TIER,
    amiId: UBUNTU_64_X86_AMI,
    instance: EC2_DEPLOYMENT_INSTANCE,
    vpc: ASK_GPT_VPC,
    region: AWS_DEFAULT_REGION,
    userDataScript: './startup-scripts/cloud-devdesktop-script.sh', // This path is relative to where CDK is running from
    eip: EC2_DEPLOYMENT_INSTANCE_EIP,
    keyName: "EC2DeploymentInstanceKeyPair"
});

